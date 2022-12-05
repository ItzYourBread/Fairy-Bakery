import mongoose, { Schema, Document } from 'mongoose';

// --- Data Interface ---
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

// --- Data Schema ---
const Profile: Schema = new Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 100 },
    daily: {
        time: { type: Date, default: new Date() },
        streak: { type: Number, default: 0 },
    },
    bakeries: {
        biscuits: { type: Number, default: 0 },
    },
    resources: {
        wheats: { type: Number, default: 0 },
    },
});

const User = mongoose.model<IUser>('Profile', Profile);
export { User };
