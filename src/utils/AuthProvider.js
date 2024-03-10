import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // let [user, setUser] = useState({});
  const [user, setUser] = useState(() =>
    sessionStorage.getItem("Token")
      ? JSON.parse(sessionStorage.getItem("Token"))
      : {}
  );

  // recommended by: https://stackoverflow.com/questions/72847471/how-to-fix-public-route-in-react-router-v6-showing-the-login-for-a-spli-second
  const [isLoading, setLoading] = useState(false);

  function signin(newUser, callback) {
    setLoading(true);
    if (newUser) {
      try {
        sessionStorage.setItem("Token", JSON.stringify(newUser));
        setUser(newUser);
      } catch (err) {}
    } else {
      sessionStorage.removeItem("Token");
      setUser({});
    }
    setLoading(false);
    callback();
  }

  function signout(callback) {
    setLoading(true);
    if (sessionStorage.getItem("Token")) sessionStorage.clear();
    setUser({});
    setLoading(false);
    callback();
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        setUser,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
