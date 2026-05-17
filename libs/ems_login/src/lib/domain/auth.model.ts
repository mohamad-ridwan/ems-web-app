export interface LoginRequest {
  username: string;
  password:  string;
  group: string;
}

export interface LoginResponse {
  access_token: string;
  employee: {
    username: string;
    group: string;
  };
}
