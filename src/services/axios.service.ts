import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseURL = 'https://5ny4ma0hqf.execute-api.ap-southeast-1.amazonaws.com';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (req): Promise<typeof req> => {
    const authTokens = localStorage.getItem('21cenAuthTokens')
      ? JSON.parse(localStorage.getItem('21cenAuthTokens'))
      : null;

    if (!authTokens) {
      return req;
    }

    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;

    const user: { userId: string; iat: number; exp: number } = jwt_decode(authTokens.accessToken);

    if (Date.now() <= user.exp * 1000) {
      return req;
    } else {
      const response = await axios.post(`${baseURL}/user/token/`, {
        token: authTokens.refreshToken,
      });

      localStorage.setItem(
        '21cenAuthTokens',
        JSON.stringify({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }),
      );
      req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    }

    return req;
  },
);

export default axiosInstance;
