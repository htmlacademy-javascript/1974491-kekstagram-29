import { generatePhotos } from './data.js';
//import { generateThumbnails } from './thumbnail.js';
import './form.js';

//generateThumbnails(generatePhotos());

import { renderingGallery } from './gallery.js';
renderingGallery (generatePhotos());

