import { gql, useQuery } from '@apollo/client';
import map from 'lodash-es/map';
import React from 'react';
import { getIconFromLibrary } from '../utils/icons';
import SidebarItem from './SidebarItem';
import { GetLibraries } from './__generated__/GetLibraries';

export const GET_LIBRARIES = gql`
  query GetLibraries {
    libraries {
      libraries {
        id
        name
        type
      }
    }
  }
`;

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
