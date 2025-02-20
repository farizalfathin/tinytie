export type User = {
  id: string;
  updated_at: string | null;
  fallback: string;
  email: string;
  username: string;
  full_name: string;
  bio: string | null;
  avatar_url: string;
};

export type UserRelation = {
  id: string;
  username: string;
  fallback: string;
  avatar_url: string;
};
