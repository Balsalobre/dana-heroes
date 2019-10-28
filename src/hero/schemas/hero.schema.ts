import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skill: String,
    country: { type: mongoose.Schema.Types.ObjectId, ref:'Country'},
    createdAt: {
        type: Date,
        default: Date.now
    }
});