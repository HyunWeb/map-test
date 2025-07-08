import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetCompanies, PostSignup } from "../api/userApi";
import { hover } from "@testing-library/user-event/dist/hover";
import Modal from "../components/Modal";

function Signup() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    organization: "0",
    requireTerm: false,
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await GetCompanies();
      setCompanies(response);
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.organization === "0") {
      alert("소속을 선택해 주세요.");
      return;
    }
    try {
      const response = await PostSignup(
        formData.email,
        formData.password,
        formData.name,
        formData.organization,
        formData.requireTerm
      );
      console.log(response);
      if (response) {
        alert("회원가입 성공");
        navigate("/login");
      }
    } catch (err) {
      console.error("회원가입 실패", err);
    }
    // if (formData.password !== formData.confirmPassword) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    // console.log("회원가입 시도:", formData);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.formSection}>
            <h2 style={styles.title}>회원가입</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="아이디(이메일)"
                style={styles.input}
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                style={styles.input}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호 확인"
                style={styles.input}
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름"
                style={styles.input}
                required
              />
              <select
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="소속"
                style={styles.input}
                required
              >
                <option value="0">소속을 선택해 주세요</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <div style={styles.checkboxContainer}>
                <span
                  style={styles.checkboxText}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  개인정보 수집 및 이용 동의
                </span>
                <input
                  type="checkbox"
                  name="requireTerm"
                  value={formData.requireTerm}
                  onChange={handleChange}
                  placeholder="약관 동의"
                  required
                  style={styles.checkbox}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                회원가입
              </button>
              <div style={styles.links}>
                <span style={styles.text}>이미 계정이 있으신가요?</span>
                <Link to="/login" style={styles.link}>
                  로그인
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 200px)",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  formSection: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "12px",
    padding: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: "2rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #E2E8F0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    "&:focus": {
      borderColor: "#3B82F6",
    },
  },
  submitButton: {
    backgroundColor: "#0B1C40",
    color: "#ffffff",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  text: {
    color: "#64748B",
    fontSize: "0.9rem",
  },
  link: {
    color: "#0B1C40",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    fontSize: "14px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  checkboxText: {
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
  },
};

export default Signup;
