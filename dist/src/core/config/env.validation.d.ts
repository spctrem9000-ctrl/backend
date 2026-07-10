declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    STORAGE_DRIVER: string;
    LOCAL_PUBLIC_URL: string;
    R2_ACCOUNT_ID: string;
    R2_ACCESS_KEY: string;
    R2_SECRET_KEY: string;
    R2_BUCKET: string;
    R2_ENDPOINT: string;
    R2_PUBLIC_URL: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
