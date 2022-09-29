import { Insurance } from "Insurance";

export class User{
    name: string;
    email: string;
    password: string;
    contact: number;
    address: string;
    dob: Date;
    insurance: Array<Insurance>;
}