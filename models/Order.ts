import { Address } from "./Address";

export default interface Order {
    _id: string;
    customerId : string;
    customerName : string;
    providerId: string;
    providerName: string;
    creationDate: Date;
    lastUpdate: Date;
    areaPlan: number;
    devicePlan: number;
    address: Address
}