export interface TextValue {
  text: string;
  value: any;
}

export interface ApiResponse<T> {
  data: T;
  errors: {
    errorCode: string,
    message: string
  };
}

export interface Customer {
  clientId: number;
  companyId: string;
  companyName: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  phone: string;
  role: string;
  roleNormalized: string;
}
