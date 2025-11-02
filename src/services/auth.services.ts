import { authKey } from "../Constants/Constants";
import { setToLocalStorage } from "../utils/local-storage";

export const storeUserInfo = (accessToken: string) => {
    return setToLocalStorage(authKey, accessToken);
  };