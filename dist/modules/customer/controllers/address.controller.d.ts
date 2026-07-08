import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(user: {
        id: number;
    }, dto: CreateAddressDto): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        title: string;
        street: string;
        building: string | null;
        floor: string | null;
        apartment: string | null;
        landmark: string | null;
        latitude: number | null;
        longitude: number | null;
        isDefault: boolean;
        customerId: number;
    }>;
    findAll(user: {
        id: number;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        title: string;
        street: string;
        building: string | null;
        floor: string | null;
        apartment: string | null;
        landmark: string | null;
        latitude: number | null;
        longitude: number | null;
        isDefault: boolean;
        customerId: number;
    }[]>;
    update(user: {
        id: number;
    }, id: number, dto: UpdateAddressDto): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        title: string;
        street: string;
        building: string | null;
        floor: string | null;
        apartment: string | null;
        landmark: string | null;
        latitude: number | null;
        longitude: number | null;
        isDefault: boolean;
        customerId: number;
    }>;
    remove(user: {
        id: number;
    }, id: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        title: string;
        street: string;
        building: string | null;
        floor: string | null;
        apartment: string | null;
        landmark: string | null;
        latitude: number | null;
        longitude: number | null;
        isDefault: boolean;
        customerId: number;
    }>;
    setDefault(user: {
        id: number;
    }, id: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        title: string;
        street: string;
        building: string | null;
        floor: string | null;
        apartment: string | null;
        landmark: string | null;
        latitude: number | null;
        longitude: number | null;
        isDefault: boolean;
        customerId: number;
    }>;
}
