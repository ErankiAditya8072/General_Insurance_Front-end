import { Claim } from "Claim";
import { User } from "User";
import { Vehicle } from "Vehicle";

export class Insurance{
    policy_no: number;
    premium_amount: number;
    insurance_value: number;
    total_claimed_amount: number;
    start_date: string;
    duration: number;
    claimed_status: string;
    user: User;
    vehicleIns:  Vehicle;
    claimIns: Array<Claim>;
   
    
}