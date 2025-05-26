import mongoose, { Schema, Document } from 'mongoose';

export interface IRequestLog extends Document {
  timestamp: Date;
  method: string;
  route: string;
  statusCode: number;
  requestBody: any;
  responseBody: any;
}

const RequestLogSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  method: { type: String, required: true },
  route: { type: String, required: true },
  statusCode: { type: Number, required: true },
  requestBody: { type: Schema.Types.Mixed },
  responseBody: { type: Schema.Types.Mixed },
});

export default mongoose.model<IRequestLog>('RequestLog', RequestLogSchema);
