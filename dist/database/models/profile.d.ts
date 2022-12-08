import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    id: string;
    coin: number;
    daily: {
        time: number;
        streak: number;
    };
    bakeries: {
        miniBreads: number;
    };
    stocks: {
        milks: number;
        eggs: number;
        sugars: number;
        chocolates: number;
        creams: number;
    };
}
declare const User: mongoose.Model<IUser, {}, {}, {}, any>;
export { User };
