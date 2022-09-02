import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  Grid,
  GridCellProps,
  Index,
  IndexRange,
  InfiniteLoader,
  SectionRenderedParams, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  Size, // @ts-ignore
} from 'react-virtualized';

import { ItemsResult } from '@meteorae/graphql-types';
import { MediaCard } from '@meteorae/ui-react';

import { useAppSelector } from '../../app/hooks';

type ItemGridProps = {
  fetchMore: () => Promise<unknown>;
  data?: ItemsResult;
  square?: boolean;
};

function ItemGrid({ fetchMore, data, square }: ItemGridProps) {
  let _onRowsRendered: (params: IndexRange) => void;
  let _grid: Grid | null = null;

  const cardWidth = useAppSelector((state) => state.settings.cardSize);
  const autoSizerParent = useRef<HTMLDivElement | null>(null);

  const [columnCount, setColumnCount] = useState(3);
  const [rowCount, setRowCount] = useState(3);
  const [renderedRowCount, setRenderedRowCount] = useState(0);

  const cardHeight = square
    ? Math.round(cardWidth * 1)
    : Math.round(cardWidth * 1.5);

  useEffect(() => {
    if (data?.total) {
      setRowCount(Math.ceil(data.total / columnCount));
      setRenderedRowCount(Math.ceil((data?.items?.length ?? 0) / columnCount));
    }
  }, [columnCount, rowCount, data]);

  function cellRenderer({ columnIndex, rowIndex, key, style }: GridCellProps) {
    const index = rowIndex * columnCount + columnIndex;

    if (index < (data?.items?.length ?? 0)) {
      const item = data?.items?.[index];

      return <MediaCard width={160} key={key} item={item} style={style} />;
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
        {({ onRowsRendered, registerChild }: any) => {
          _onRowsRendered = onRowsRendered;
          return (
            <AutoSizer onResize={onResize}>
              {({ width, height }: any) => (
                <Grid
                  ref={(grid: any) => {
                    _grid = grid;
                    registerChild(grid);
                  }}
                  columnCount={columnCount}
                  columnWidth={cardWidth + 16}
                  rowCount={rowCount}
                  rowHeight={Math.round(cardHeight) + 16 + 36 + 16}
                  width={width}
                  height={height}
                  cellCount={data?.items?.length ? data?.items?.length : 0}
                  cellRenderer={cellRenderer}
                  onCellsRendered={onRowsRendered}
                  onSectionRendered={_onSectionRendered}
                  overscanRowCount={10}
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
