import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  STORAGE_DRIVER: string;

  @IsOptional()
  @IsString()
  LOCAL_PUBLIC_URL: string;

  @IsOptional()
  @IsString()
  R2_ACCOUNT_ID: string;

  @IsOptional()
  @IsString()
  R2_ACCESS_KEY: string;

  @IsOptional()
  @IsString()
  R2_SECRET_KEY: string;

  @IsOptional()
  @IsString()
  R2_BUCKET: string;

  @IsOptional()
  @IsString()
  R2_ENDPOINT: string;

  @IsOptional()
  @IsString()
  R2_PUBLIC_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
