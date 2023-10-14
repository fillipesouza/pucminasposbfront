export default interface Device {
    deviceId: string;
    customerId : string;
     operatorId: string;

    sampleTime: number


    deviceAlias: string;
    deviceType: string;
    measurementValue: number;
}