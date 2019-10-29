import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    salt: { type: String }
});