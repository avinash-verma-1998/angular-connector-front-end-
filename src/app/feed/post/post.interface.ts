import { User } from '../../auth/user.model';
export interface PostInterface {
  _id: string;
  user: any;
  postImageUrl?: string;
  caption?: string;
  comments?: any;
  likes?: any;
  createdAt?: any;
}
