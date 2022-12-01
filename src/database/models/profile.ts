import mongoose from 'mongoose';

const Profile = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 100 },
});

const User = mongoose.model('Profile', Profile);
export { User };
