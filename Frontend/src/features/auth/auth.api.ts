import axios from "@/lib/axios"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const res = await axios.post("/auth/login", payload)
  return res.data
}

export const logout = async () => {
  const res = await axios.post("/auth/logout");
  const localStorageToken = localStorage.getItem("token");
  const localStoragePersistAuth = localStorage.getItem("persist:auth");
  if (localStoragePersistAuth) {
    localStorage.removeItem("persist:auth");
  }
  if (localStorageToken) {
    localStorage.removeItem("token");
       localStorage.removeItem("persist:auth");
  }
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await axios.post("/users/register", payload)
  return res.data
}

export const getMe = async () => {
  const res = await axios.get("/users/me");
  return res.data.data;
};