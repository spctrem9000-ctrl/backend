# Divado Storage Module

The Storage Module is an agnostic, production-ready system capable of securely processing, optimizing, and uploading files to both Local Storage and Cloudflare R2 without any code modifications required.

## Architecture

1. **Dependency Injection**: The `StorageFactory` determines which provider (`LocalStorageProvider` or `R2StorageProvider`) to instantiate by reading the `STORAGE_DRIVER` variable from the environment.
2. **Sharp Integration**: Incoming images are caught via `FileInterceptor` and processed in-memory by `ImageProcessorService`. They are strictly compressed into `WebP` formats at three resolutions (Original, Medium 600px, Thumbnail 150px) to enhance mobile loading speeds.
3. **Security**: We sanitize all folder paths, strictly limit files to 5MB, restrict MIME types to valid images, and generate secure UUIDs to completely eradicate path-traversal vulnerabilities.

---

## Configuration

To select your storage provider, update the `.env` file.

### Option 1: Local Storage (Development Default)
```env
STORAGE_DRIVER=local
LOCAL_PUBLIC_URL=http://localhost:3000/uploads
```
- Files are saved to the `/uploads/{folder}` directory relative to the project root.
- `ServeStaticModule` will instantly expose these images publicly on `GET /uploads/*`.

### Option 2: Cloudflare R2 (Production Default)
```env
STORAGE_DRIVER=r2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY=your_r2_access_key
R2_SECRET_KEY=your_r2_secret_key
R2_BUCKET=your_r2_bucket_name
R2_PUBLIC_URL=https://cdn.your-domain.com
```
- Ensure your Cloudflare R2 bucket has public access routing configured correctly to your `R2_PUBLIC_URL`.
- The AWS SDK v3 is used under the hood via the S3-compatibility API provided by Cloudflare.

---

## API Usage

### `POST /api/v1/storage/upload/single?folder=products`
Requires `multipart/form-data` with a key named `file`.
Returns:
```json
{
  "originalUrl": "...",
  "mediumUrl": "...",
  "thumbnailUrl": "..."
}
```

### `POST /api/v1/storage/upload/multiple?folder=categories`
Requires `multipart/form-data` with a key named `files`.
Returns an array of URL objects.

### `DELETE /api/v1/storage?url=...`
Deletes the specific file permanently from the active driver.
