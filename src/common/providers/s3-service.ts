import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({ 
    region: 'eu-north-1'
  });


  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nest-practice00',
        Key: fileName,
        Body: file,
      })
    );
  }

}