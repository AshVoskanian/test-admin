export interface UrlData {
  id: string,
  token: string,
}

export interface ResetPassword {
  newPassword: string;
  token: string;
  id: string;
}
