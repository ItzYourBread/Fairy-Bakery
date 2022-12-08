import mongoose, { Schema, Document } from 'mongoose';

// --- Data Interface ---
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

// --- Data Schema ---
const Profile: Schema = new Schema({
    id: { type: String, unique: true, required: true },
    coin: { type: Number, default: 100 },
    daily: {
        time: { type: Date, default: new Date() },
        streak: { type: Number, default: 0 },
    },
    bakeries: {
        miniBreads: { type: Number, default: 0 },
    },
    stocks: {
        milks: { type: Number, default: 0 },
        eggs: { type: Number, default: 0 },
        sugars: { type: Number, default: 0 },
        chocolates: { type: Number, default: 0 },
        creams: { type: Number, default: 0 },
    },
});

const User = mongoose.model<IUser>('Profile', Profile);
export { User };
