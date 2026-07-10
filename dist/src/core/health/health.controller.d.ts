import { HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
export declare class HealthController {
    private health;
    private http;
    private db;
    private prisma;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, db: PrismaHealthIndicator, prisma: PrismaService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database"> & import("@nestjs/terminus").HealthIndicatorResult<"nestjs-docs">, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database"> & import("@nestjs/terminus").HealthIndicatorResult<"nestjs-docs">> | undefined, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database"> & import("@nestjs/terminus").HealthIndicatorResult<"nestjs-docs">> | undefined>>;
}
