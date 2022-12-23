import axios from "axios";
import create, { SetState } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  email: string;
  username: string;
  password: string;
  token: string;
  isAuth: boolean;
}
type RegisterState = {
  email: string;
  username: string;
  password: string;
};

type AuthState = {
  username: string;
  password: string;
};

const defaultUserState: IUser = {
  email: "",
  username: "",
  password: "",
  token: "",
  isAuth: false,
};

interface IUserState {
  user: IUser;
  errors: boolean;
  register: (registerState: RegisterState) => void;
  auth: (authState: AuthState) => void;
  authToken: () => void
}

export const useUser = create(
  persist<IUserState>((set, get) => ({
    user: defaultUserState as IUser,
    errors: false,
    register: (registerState) => {
      userRegister(get(), registerState, set);
    },

    auth: (authState) => {
        userAuth(get(), authState, set)
    },

    authToken: async () => {
        await userAuthToken(get(), set)
    }

  }), {name: 'userState'})
);

const userRegister = async (
  state: IUserState,
  registerState: RegisterState,
  set: SetState<IUserState>
) => {
  const response = await axios.post<RegisterState>(
    "http://127.0.0.1:8000/auth/users/",
    registerState
  );
  let isErrors = false;
  if (response.status === 201) {
    isErrors = false;
    set({ user: { ...state.user, ...response.data } });
    state.auth({
      username: response.data.username,
      password: registerState.password,
    });
  } else {
    isErrors = true;
  }
};

const userAuth = async (
  state: IUserState,
  authState: AuthState,
  set: SetState<IUserState>
) => {
  const response = await axios.post<{ auth_token: string }>(
    "http://127.0.0.1:8000/auth/token/login/",
    authState
  );
  let isErrors = false;

  if (response.status === 200) {
    isErrors = false;
    set({
      user: { ...state.user, token: response.data.auth_token, isAuth: true },
    });
  } else {
    isErrors = true;
  }
  set({ errors: isErrors });
};

const userAuthToken = async (state: IUserState, set: SetState<IUserState>) => {
    const response = await axios.get<{ auth_token: string }>("http://127.0.0.1:8000/auth/users/me/", {headers: {'Authorization': `token ${state.user.token}`}} );
    if(response.status === 200){
        set({user: {...state.user, ...response.data}})
    }else{
        set({user: defaultUserState})
    }
}