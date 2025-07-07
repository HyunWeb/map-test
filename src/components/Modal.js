import React from "react";

export default function Modal({ setIsModalOpen }) {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalContentTitle}>개인정보 수집 및 이용 동의</h2>
        <div>
          <p style={styles.modalContentText}>
            회사는 회원가입 및 서비스 제공을 위해 아래와 같이 개인정보를 수집 및
            이용합니다.
          </p>
          <p style={styles.modalContentText}>
            1. 수집 항목
            <br />- 이메일(ID), 비밀번호, 이름, 전화번호
          </p>
          <p style={styles.modalContentText}>
            2. 이용 목적
            <br />- 회원가입 및 회원관리
            <br />- 본인확인 및 서비스 이용에 따른 정보 제공
          </p>
          <p style={styles.modalContentText}>
            3. 보유 및 이용 기간
            <br />- 회원 탈퇴 시까지
            <br />
            (단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간까지)
          </p>
          <p style={styles.modalContentText}>
            4. 동의 거부에 대한 안내
            <br />- 위 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
            있습니다.
            <br />- 다만, 필수 항목에 대한 동의를 거부할 경우 회원가입이 제한될
            수 있습니다.
          </p>
        </div>
        <button style={styles.modalContentButton} onClick={handleClose}>
          확인
        </button>
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    minWidth: "300px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
  },
  modalContentTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContentText: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  modalContentButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#0B1C40",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};
