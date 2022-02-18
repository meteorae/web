import { GetLibraries_libraries_libraries } from '@/graphql/__generated__/GetLibraries';
import { mdiHelp, mdiImage, mdiMovie } from '@mdi/js';

export function getIconFromLibrary(
  library: GetLibraries_libraries_libraries | null,
) {
  switch (library?.type) {
    case 'movie':
      return mdiMovie;
    case 'image':
      return mdiImage;
    default:
      return mdiHelp;
  }
}
