import { createContext } from "react";
import { useState } from "react";

import React from "react";
const Usercontext = createContext();

const Userprovider = ({ children }) => {
  const [user, setuser] = useState(" ");
  return (
    <Usercontext.Provider value={{ user, setuser }}>
      {children}
    </Usercontext.Provider>
  );
};

export { Userprovider, Usercontext };
