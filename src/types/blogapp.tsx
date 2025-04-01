export interface BlogResponseDTO {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  category: string; // You can adjust this if you use a Category entity.
}

export interface CreateBlogDTO {
  title: string;
  content: string;
  userID: number;
  category: string; // Assuming category is a string. If it's a reference to a category entity, adjust accordingly.
}

export interface CommentResponseDTO {
  id: number;
  content: string;
  commenterName: string;
}

export interface CreateCommentDTO {
  content: string;
  blogId: number;
  userId: number;
}

export interface ErrorResponseDTO {
  timestamp: string; // Assuming the timestamp will be a string in ISO format.
  status: number;
  error: string;
  details: { [key: string]: string };
}

export interface UserResponseDTO {
  id: number;
  username: string;
  email: string;
  roles: string[];
}
