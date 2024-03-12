import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // let [user, setUser] = useState({});
  const [user, setUser] = useState(() =>
    sessionStorage.getItem("aToken")
      ? JSON.parse(sessionStorage.getItem("aToken"))
      : {}
  );

  // recommended by: https://stackoverflow.com/questions/72847471/how-to-fix-public-route-in-react-router-v6-showing-the-login-for-a-spli-second
  const [isLoading, setLoading] = useState(false);

  function signin(newUser, callback) {
    setLoading(true);
    if (newUser) {
      try {
        sessionStorage.setItem("aToken", JSON.stringify(newUser));
        setUser(newUser);
        localStorage.setItem("token", newUser.accessToken);
      } catch (err) {}
    } else {
      sessionStorage.removeItem("aToken");
      setUser({});
      localStorage.removeItem("token");
    }
    setLoading(false);
    callback();
  }

  function signout(callback) {
    setLoading(true);
    if (sessionStorage.getItem("aToken")) sessionStorage.clear();
    if (localStorage.getItem("token")) localStorage.clear();
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
