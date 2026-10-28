/**
 * 사용자 관련 API 타입 정의
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

