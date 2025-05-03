import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((res, rej) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'bookshelf',
            transformation: [
              {
                width: 80,
                height: 150,
                crop: 'limit',
              },
              {
                gravity: 'center',
                crop: 'fill',
              },
              { quality: 'auto' },
              { fetch_format: 'auto' },
            ],
          },
          (err: Error | null | undefined, result: UploadApiResponse) => {
            if (err) {
              rej(err);
            } else {
              res(result);
            }
          },
        )
        .end(file.buffer);
    });
  }
}
