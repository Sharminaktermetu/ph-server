import { Model, Types } from 'mongoose';



export type TBuyer = {
  id: string;
  user: Types.ObjectId;
  name: string;
  businessName:'string'
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  profileImg?: string;
  address?:string;
  isDeleted: boolean;
};

//for creating static
export interface BuyerModel extends Model<TBuyer> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TBuyer | null>;
}
