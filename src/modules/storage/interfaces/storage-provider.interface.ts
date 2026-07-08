export interface IStorageProvider {
  uploadFile(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string,
  ): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}
