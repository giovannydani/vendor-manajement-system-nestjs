import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  moveFile(
    sourcePath: string,
    destinationFolder: string,
    filename: string,
  ): string {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    const destinationPath = destinationFolder + '/' + filename;

    try {
      fs.renameSync(sourcePath, destinationPath);
      return destinationPath;
    } catch (error) {
      throw new Error(`Failed to move the file: ${error.message}`);
    }
  }

  deleteFile(sourcePath: string) {
    fs.unlinkSync(sourcePath);
  }
}
