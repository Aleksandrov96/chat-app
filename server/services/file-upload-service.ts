import { bucket } from '../index.js';

export class FileUploadService {
  static async fileUpload(file: Express.Multer.File, chatroomId: string): Promise<string> {  
    const fileName = `${chatroomId}/${Date.now()}.${file.originalname}`;
  
    const bucketFile = bucket.file(fileName);
    
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
      gzip: true,
    });
  
    const url = await bucketFile.getSignedUrl({
      action: 'read', 
      expires: '03-09-2491',
    }) as string[];

    return url[0];
  }
}