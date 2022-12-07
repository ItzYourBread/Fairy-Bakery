import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    id: string;
    cash: number;
    daily: {
        time: number;
        streak: number;
    };
    bakeries: {
        biscuits: number;
    };
    resources: {
        wheats: number;
    };
}
declare const User: mongoose.Model<IUser, {}, {}, {}, any>;
export { User };
