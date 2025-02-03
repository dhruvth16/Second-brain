import { useState } from "react";
import { UserDataContext } from "./UserDataContext";

import { ReactNode } from "react";

const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
