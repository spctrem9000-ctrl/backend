export declare class ImageProcessorService {
    private readonly logger;
    processImage(buffer: Buffer): Promise<{
        original: Buffer;
        medium: Buffer;
        thumbnail: Buffer;
        filename: string;
    }>;
}
