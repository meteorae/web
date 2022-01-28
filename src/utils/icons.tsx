import { GetLibraries_libraries_libraries } from '../components/__generated__/GetLibraries';
import { mdiHelp, mdiMovie } from '@mdi/js';

export function getIconFromLibrary(
  library: GetLibraries_libraries_libraries | null,
) {
  switch (library?.type) {
    case 'movie':
      return mdiMovie;
    default:
      return mdiHelp;
  }
}
