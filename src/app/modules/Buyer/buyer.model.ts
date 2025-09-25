import { Schema, model } from 'mongoose';
import { BuyerModel, TBuyer } from './buyer.interface';




const buyerSchema = new Schema<TBuyer, BuyerModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      
    },
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
   
 
    address: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
  
    profileImg: { type: String, default: '' },
   
    isDeleted: {
      type: Boolean,
      default: false,
    },
   
   
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual


// Query Middleware
buyerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

buyerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

buyerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
buyerSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Buyer.findOne({ id });
  return existingUser;
};

export const Buyer = model<TBuyer, BuyerModel>('Buyer', buyerSchema);
