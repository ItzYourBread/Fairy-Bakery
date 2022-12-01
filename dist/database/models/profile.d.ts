import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    id: string;
    cash: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    id: string;
    cash: number;
}>>;
export { User };
