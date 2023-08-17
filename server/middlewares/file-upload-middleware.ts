import { ApiError } from '../exceptions/api-error.js';
import { ErrorRequestHandler } from 'express';
import multer from 'multer';

const memoryStorage = multer.memoryStorage();

function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const uploadFileSizeLimit = 104857600;

export const fileSizeLimitErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return next(ApiError.PayloadTooLarge(`File is too large. Maximum file is ${formatBytes(uploadFileSizeLimit)}`));
  } else {
    next();
  }
};

export const upload = multer({ 
  storage: memoryStorage, 
  limits: {
    fileSize: uploadFileSizeLimit,
  },
});
