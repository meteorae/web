import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  Grid,
  GridCellProps,
  Index,
  IndexRange,
  InfiniteLoader,
  SectionRenderedParams,
  Size,
} from 'react-virtualized';
import { useAppSelector } from '../app/hooks';
import ItemCard from '@/components/ItemCard';
import { GetItems_items } from '@/graphql/__generated__/GetItems';

type ItemGridProps = {
  fetchMore: () => Promise<unknown>;
  data?: GetItems_items['items'];
  total: number;
};

function ItemGrid({ fetchMore, data, total }: ItemGridProps) {
  let _onRowsRendered: (params: IndexRange) => void;
  let _grid: Grid | null = null;

  const cardWidth = useAppSelector((state) => state.settings.cardSize);
  const autoSizerParent = useRef<HTMLDivElement | null>(null);

  const [columnCount, setColumnCount] = useState(3);
  const [rowCount, setRowCount] = useState(3);
  const [renderedRowCount, setRenderedRowCount] = useState(0);

  useEffect(() => {
    if (data) {
      setRowCount(Math.ceil(total / columnCount));
      setRenderedRowCount(Math.ceil((data?.length ?? 0) / columnCount));
    }
  }, [columnCount, rowCount, data, total]);

  function cellRenderer({ columnIndex, rowIndex, key, style }: GridCellProps) {
    const index = rowIndex * columnCount + columnIndex;

    if (index < (data?.length ?? 0)) {
      const item = data?.[index];

      return <ItemCard item={item} key={key} style={style} />;
    }

    return <Box key={key} style={style} />;
  }

  function isRowLoaded({ index }: Index) {
    return index < renderedRowCount;
  }

  const onResize = useCallback(
    ({ width }: Size) => {
      setColumnCount(Math.floor((width - 48 * 2) / (cardWidth + 16)));

      _grid?.recomputeGridSize();
    },
    [cardWidth, _grid],
  );

  useEffect(() => {
    // Force a resize event on the grid's parent to recalculate the column count
    const resizeTriggers =
      autoSizerParent.current?.getElementsByClassName('resize-triggers')[0];

    if (resizeTriggers) {
      onResize({
        width: resizeTriggers.clientWidth,
        height: resizeTriggers.clientHeight,
      });
    }
  }, [cardWidth, onResize]);

  function _onSectionRendered({
    rowStartIndex,
    rowStopIndex,
  }: SectionRenderedParams) {
    _onRowsRendered({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex,
    });
  }

  return (
    <Box ref={autoSizerParent} h='100%' w='100%'>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={() => {
          return fetchMore();
        }}
        rowCount={rowCount}
        threshold={1}>
        {({ onRowsRendered, registerChild }) => {
          _onRowsRendered = onRowsRendered;
          return (
            <AutoSizer onResize={onResize}>
              {({ width, height }) => (
                <Grid
                  ref={(grid) => {
                    _grid = grid;
                    registerChild(grid);
                  }}
                  columnCount={columnCount}
                  columnWidth={cardWidth + 16}
                  rowCount={rowCount}
                  rowHeight={Math.round(cardWidth * 1.5) + 16 + 36 + 16}
                  width={width}
                  height={height}
                  cellCount={data?.length ? data.length : 0}
                  cellRenderer={cellRenderer}
                  onCellsRendered={onRowsRendered}
                  onSectionRendered={_onSectionRendered}
                  overscanRowCount={2}
                  style={{
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                  }}
                />
              )}
            </AutoSizer>
          );
        }}
      </InfiniteLoader>
    </Box>
  );
}

export default ItemGrid;
