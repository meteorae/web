import { useQuery } from '@apollo/client';
import map from 'lodash-es/map';
import React from 'react';
import { loader } from 'graphql.macro';
import { getIconFromLibrary } from '@/utils/icons';
import SidebarItem from '@/components/SidebarItem';
import { GetLibraries } from '@/components/__generated__/GetLibraries';

const GET_LIBRARIES = loader('../graphql/GetLibraries.gql');

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
