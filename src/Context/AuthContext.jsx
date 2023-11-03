import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used withi, an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (usuario) => {
    try {
      const res = await registerRequest(usuario);
      //console.log(res.data);
      setUsuario(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };

  const signin = async (usuario) => {
    try {
      const res = await loginRequest(usuario);
      //console.log(res)
      setIsAuthenticated(true);
      setUsuario(res.data);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data.error)) {
        return setErrors(error.response.data.error);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUsuario(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        //console.log(res);
        if (!res.data){
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        setIsAuthenticated(true);
        setUsuario(res.data);
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false);
        setUsuario(null);
        setLoading(false)
      }
    }
    checkLogin();
  }, []);
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, loading, usuario, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
