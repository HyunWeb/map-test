import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터를 통해 매번 토큰을 동적으로 추가시킨다.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // 두번째 인자 : 에러발생 시 처리
  (error) => Promise.reject(error)
);

export const PostLogin = async (email, password) => {
  //   const response = await api.post("/api/users/auth/tokens", {
  //     username: email,
  //     password: password,
  //   });
  //   return response.data;

  return {
    token: "1234567890",
    tokenType: "Bearer",
    roles: ["none"],
  };
};
