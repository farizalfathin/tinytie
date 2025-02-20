import { UserRelation } from "./user";

export type Post = {
  id: string;
  created_at: Date;
  image: string;
  caption: string;
  user_id: string;
  tag: string[];
  users: UserRelation;
};

export type ImagePosting = {
  id: string;
  image: string;
};

export type Comment = {
  id: string;
  created_at: Date | string;
  message: string;
  users: UserRelation;
};
