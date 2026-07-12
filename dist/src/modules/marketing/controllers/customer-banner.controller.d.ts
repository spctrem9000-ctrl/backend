import { BannerService } from '../services/banner.service';
export declare class CustomerBannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    getBanners(): Promise<any[]>;
}
