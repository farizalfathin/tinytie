export type Post = {
  id: string;
  created_at: Date;
  image: string;
  caption: string;
  user_id: string;
  tag: string[];
  users: {
    id: string;
    username: string;
    fallback: string;
    avatar_url: string;
  };
};
