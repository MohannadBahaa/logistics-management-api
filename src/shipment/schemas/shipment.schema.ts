import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ShipmentDocument = Shipment & Document;

export interface StatusHistory {
  status: string;
  timestamp: Date;
}

export interface Feedback {
  rating: number;
  comment?: string;
  createdBy: string; // Assuming createdBy is of type string
  createdAt: Date;
}
// this schema is not finalized yet
@Schema()
export class Shipment extends Document {
  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({
    required: true,
    enum: ['Scheduled', 'In_Transit', 'Delivered', 'Canceled'],
    default: 'Scheduled',
  })
  status: string;

  @Prop({
    type: [
      {
        status: {
          type: String,
          enum: ['Scheduled', 'In_Transit', 'Delivered', 'Canceled'],
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: () => [{ status: 'Scheduled', timestamp: new Date() }], // Update default value to use a function
  })
  statusHistory: StatusHistory[];

  @Prop()
  deliveryRoute: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ type: Object }) // Assuming Feedback is an object type
  feedback: Feedback;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);

// Reusable function to update status history
function updateStatusHistory(this: Shipment, next: Function) {
  if (this.isModified('status')) {
    const newStatus = this.status;
    this.statusHistory.push({ status: newStatus, timestamp: new Date() });
    console.log(`Status changed to ${newStatus}`);
  }
  next();
}

ShipmentSchema.pre('save', function (next) {
  updateStatusHistory.call(this, next);
});

ShipmentSchema.pre('findOneAndUpdate', function (next) {
  updateStatusHistory.call(this, next);
});
