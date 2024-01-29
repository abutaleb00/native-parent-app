export type Login = {
  error: error;
  success: boolean;
  message?: string;
  data: {
    payload: any;
    tokens: {accessToken: string; refreshToken: string};
  };
  // sites:[{id:number; name:string; units: []}]
};
export type Auth = {
  error: error;
  success: boolean;
  data: any | undefined;
  message?: string;
};
export type error = {
  code: number;
  message: string;
  cause: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};
export type RefreshToken = {
  accessToken: string;
};

export type LoginData = {
  userId: string;
  password: string;
};

export type RefreshTokenData = {
  token: string;
};

export type ChangePassword = {
  error: error;
  success: boolean;
};
