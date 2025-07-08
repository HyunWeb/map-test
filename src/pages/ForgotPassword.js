import React, { useState } from "react";
import { DiVim } from "react-icons/di";
import { TbMapX } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/userApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // 비밀번호 재설정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length) {
      alert("이메일이 입력되지 않았습니다.");
    } else if (!email.includes("@")) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await requestPasswordReset(email);
      if (response.success) {
        alert(response.message);
        navigate("/login");
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>비밀번호 찾기</h2>
        <input
          type="email"
          placeholder="이메일"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={styles.button} onClick={handleSubmit}>
          재설정 메일 발송
        </button>
        <div style={styles.links}>
          <span style={styles.text}>이미 계정이 있으신가요?</span>
          <Link to="/login" style={styles.link}>
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: `2rem`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    flexDirection: "column",
    minHeight: "calc(100vh - 200px)",
  },
  formContainer: {
    maxWidth: `400px`,
    width: `100%`,
  },
  form: {
    width: `100%`,
    maxWidth: `400px`,
    borderRadius: `12px`,
    padding: `2rem`,
    boxSizing: `border-box`,
  },
  input: {
    padding: `0.75rem`,
    borderRadius: `6px`,
    border: `1px solid #E2E8F0`,
    fontSize: `0.9rem`,
    width: `100%`,
    marginBottom: `20px`,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: "2rem",
    textAlign: "center",
  },
  button: {
    backgroundColor: "rgb(11, 28, 64)",
    color: "rgb(255, 255, 255)",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "1rem",
    boxSizing: "border-box",
    width: `100%`,
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
};
