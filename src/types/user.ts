export interface User {
  id: number;
  name: string;
  email: string;
  age: number | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
  city?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
  city?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface UserListResponse extends Omit<ApiResponse<User[]>, 'count'> {
  count: number;
}

export interface UserResponse extends ApiResponse<User> {}

export interface CreateUserResponse extends ApiResponse<User> {
  message: string;
}

export interface UpdateUserResponse extends ApiResponse<User> {
  message: string;
}

export interface DeleteUserResponse extends ApiResponse<User> {
  message: string;
}
