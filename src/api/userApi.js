import api from "./index";

// 회원가입
export const PostSignup = async (
  username,
  password,
  fullName,
  organization,
  requireTerm
) => {
  try {
    const response = await api.post("/api/users/non", {
      user: {
        userName: username, // 이메일
        password: password, // 비밀번호
        fullName: fullName, // 이름
        requireTerm: requireTerm, // 약관 동의 여부
        status: 1, // 3: 회원가입 완료 & 미승인 상태
      },
      companyId: organization,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  // return {
  //   user: {
  //     id: 1,
  //     username: "test@example.com",
  //     fullName: "테스트 사용자",
  //     phone: "010-1234-5678",
  //     requireTerm: true,
  //     createdAt: "2025-06-27T10:25:00",
  //     updatedAt: "2025-06-27T10:25:00",
  //     lastLoginAt: null,
  //     status: 0,
  //   },
  // };
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

export const requestPasswordReset = async (email) => {
  // try {
  //   const response = await api.get(`/api/users/non/auth/password/${email}`);
  //   return response.data;
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }

  return {
    success: true,
    message: "비밀번호 재설정 url이 이메일로 전송되었습니다",
  };
};

// 비밀번호 재설정
export const resetPassword = async (token, password) => {
  // try {
  //   const response = await api.post(`/api/users/auth/password`, {
  //     token: token,
  //     newPassword: password,
  //   });
  //   return response.data;
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }

  return {
    success: true,
    message: "비밀번호가 성공적으로 변경되었습니다",
    updatedAt: "2025-06-27T11:30:00",
  };
};

export const getUserData = async () => {
  return [
    {
      id: 1,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
    {
      id: 2,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
    {
      id: 3,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
    {
      id: 4,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
    {
      id: 5,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
    {
      id: 6,
      email: "user1@example.com",
      fullName: "홍길동",
      organization: "데이터메티카",
      createdAt: "2025-07-10",
      statusName: "승인 대기",
    },
  ];
};

export const getCompanyData = async () => {
  return [
    {
      id: 1,
      name: "데이터메티카",
      statusName: "승인 대기",
      createdAt: "2025-07-10",
    },
    {
      id: 2,
      name: "테크 솔루션",
      statusName: "승인 대기",
      createdAt: "2025-07-10",
    },
    {
      id: 3,
      name: "이노베이션 컴퍼니",
      statusName: "승인 대기",
      createdAt: "2025-07-10",
    },
  ];
};
