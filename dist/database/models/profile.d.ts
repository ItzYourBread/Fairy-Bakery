import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    id: string;
    cash: number;
    bakeries?: {
        biscuits: number;
    };
    resources?: {
        wheats: number;
    };
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    id: string;
    cash: number;
    bakeries?: {
        biscuits: number;
    };
    resources?: {
        wheats: number;
    };
}>>;
export { User };
