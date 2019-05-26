import { Document, Schema, model } from 'mongoose';

export interface Schedule extends Document {
	type?: number;
	guild?: string;
	channel?: string;
	message?: string;
}

const Schedule: Schema = new Schema({
	type: Number,
	guild: String,
	channel: String,
	message: String
}, {
	strict: false
});

export default model<Schedule>('Schedule', Schedule);

