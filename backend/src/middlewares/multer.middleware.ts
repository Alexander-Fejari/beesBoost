import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../../uploaded_pp/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [`image/jpeg`, `image/png`, `image/gif`];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } 
  else {
    cb(new Error(`Invalid file type. Only JPEG, PNG and GIF files are allowed.`), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
});

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const uploadSingle = upload.single(`profile_pic`);

  uploadSingle(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === `LIMIT_FILE_SIZE`) {
        return res.status(400).json({ error: `File size is too large. Maximum size is 4MB.` });
      }
      return res.status(400).json({ error: err.message });
    } 
    else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

export default uploadMiddleware;