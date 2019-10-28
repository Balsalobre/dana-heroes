import { Document } from 'mongoose';

export interface Hero extends Document {
    readonly name: string;
    readonly skill: string;
    readonly createdAt: Date;
}