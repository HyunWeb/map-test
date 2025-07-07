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

// 회원가입
export const PostSignup = async (
  username,
  password,
  fullName,
  organization,
  requireTerm
) => {
  //   try {
  //     const response = await api.post("/api/users/users", {
  //       user: {
  //         username: username, // 이메일
  //         password: password, // 비밀번호
  //         fullName: fullName, // 이름
  //         requireTerm: requireTerm, // 약관 동의 여부
  //         status: 3, // 3: 회원가입 완료 & 미승인 상태
  //       },
  //       company: {
  //         id: organization, // 소속
  //       },
  //     });
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  return {
    user: {
      id: 1,
      username: "test@example.com",
      fullName: "테스트 사용자",
      phone: "010-1234-5678",
      requireTerm: true,
      createdAt: "2025-06-27T10:25:00",
      updatedAt: "2025-06-27T10:25:00",
      lastLoginAt: null,
      status: 0,
    },
  };
};

// 로그인
export const PostLogin = async (email, password) => {
  //   const response = await api.post("/api/users/auth/tokens", {
  //     username: email,
  //     password: password,
  //   });
  //   return response.data;

  return {
    token: "1234567890",
    tokenType: "Bearer",
    roles: ["user"],
  };
};

// 회사 목록 조회(회원가입 소속 선택 시 사용)
export const GetCompanies = async () => {
  // try {
  //     const response = await api.get("/api/companies");
  //     return response.data;
  // } catch (err) {
  //     console.error(err);
  //     throw new Error("회사 목록을 불러오지 못했습니다.");
  // }
  return [
    {
      id: 1,
      name: "테크 솔루션",
      status: 1,
      statusName: "활성",
      createdAt: "2025-07-02T10:25:00",
    },
    {
      id: 2,
      name: "이노베이션 컴퍼니",
      status: 1,
      statusName: "활성",
      createdAt: "2025-07-01T14:30:00",
    },
  ];
};
