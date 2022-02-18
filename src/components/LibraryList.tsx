import { useQuery } from '@apollo/client';
import map from 'lodash-es/map';
import React from 'react';
import GET_LIBRARIES from '../graphql/GetLibraries.gql';
import { getIconFromLibrary } from '../utils/icons';
import SidebarItem from '@/components/SidebarItem';
import { GetLibraries } from '@/components/__generated__/GetLibraries';

function LibraryList() {
  const { data } = useQuery<GetLibraries, undefined>(GET_LIBRARIES);

  return (
    <React.Fragment>
      {map(data?.libraries?.libraries, (library) => (
        <SidebarItem
          to={`/library/${library?.id}`}
          icon={getIconFromLibrary(library)}
          key={library?.id}>
          {library?.name || ''}
        </SidebarItem>
      ))}
    </React.Fragment>
  );
}

export default LibraryList;
