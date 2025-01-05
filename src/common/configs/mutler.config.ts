import { diskStorage } from 'multer';

// Multer configuration
export const multerConfig = () => ({
  dest: process.env.UPLOAD_LOCATION,
});

// Multer upload options
export const multerOptions = () => ({
  storage: diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, multerConfig().dest);
    },
    filename: (_req, file, callback) => {
      // Define the filename format
      const filename = `${Date.now()}-${file.originalname}`;
      callback(null, filename);
    },
  }),
});
