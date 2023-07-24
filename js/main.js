import { generatePhotos } from './data.js';
import { generateThumbnails } from './thumbnail.js';
import { renderingGallery } from './gallery.js';

renderingGallery ();
generateThumbnails(generatePhotos());
