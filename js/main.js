import { generatePhotos } from './data.js';
import { generateThumbnails } from './thumbnail.js';

generateThumbnails(generatePhotos());

import { renderingGallery } from './gallery.js';
renderingGallery (generatePhotos());
