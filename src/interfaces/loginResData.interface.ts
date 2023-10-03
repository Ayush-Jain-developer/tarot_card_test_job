interface LoginResDataInterface {
  id: string;
  role: string;
  stripeCusId: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiry: string;
  profileUpdated?: boolean;
}

export default LoginResDataInterface;
