import { authKey } from "../constants/constants";
import { decodedToken } from "../utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
