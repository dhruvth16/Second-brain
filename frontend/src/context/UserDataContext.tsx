import { createContext, Dispatch, SetStateAction } from "react";

type UserType = {
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
};

type UserContextType = {
  user: UserType;

  setUser: Dispatch<SetStateAction<UserType>>;
};

export const UserDataContext = createContext<UserContextType>({
  user: {
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  },

  setUser: () => {},
});
