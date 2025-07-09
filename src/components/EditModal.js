import React, { useEffect } from "react";

export default function EditModal({
  isModalOpen,
  setIsModalOpen,
  setEditingProject,
  editDescription,
  setEditDescription,
  editAuth,
  setEditAuth,
  editingProject,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // 수정 저장
  const handleSaveEdit = () => {
    // 실제 서비스에서는 API 호출로 저장
    // 이 예시에서는 로컬 데이터만 업데이트

    // 실제 구현 시 여기서 API 호출

    alert("수정이 저장되었습니다.");
    handleCloseModal();
  };

  // 권한 옵션 목록
  const authOptions = ["내부 공유", "비공개"];
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>프로젝트 정보 수정</h3>
          <button style={styles.closeButton} onClick={handleCloseModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>프로젝트명</label>
            <input
              type="text"
              value={editingProject.projectName}
              onChange={(e) => setEditingProject(e.target.value)}
              style={{
                ...styles.formControl,
              }}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>프로젝트 설명</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{ ...styles.formControl, minHeight: "80px" }}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>파일명</label>
            <input
              type="text"
              value={editingProject.fileName}
              readOnly
              style={{
                ...styles.formControl,
                backgroundColor: "#f1f5f9",
                color: "#a3a3a3",
              }}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>권한 설정</label>
            <select
              value={editAuth}
              onChange={(e) => setEditAuth(e.target.value)}
              style={styles.formControl}
            >
              {authOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.cancelButton} onClick={handleCloseModal}>
            취소
          </button>
          <button style={styles.saveButton} onClick={handleSaveEdit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // 모달 스타일
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    width: "500px",
    maxWidth: "90%",
    maxHeight: "90%",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    padding: "1rem",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1E293B",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#64748b",
  },
  modalBody: {
    padding: "1rem",
    overflowY: "auto",
  },
  modalFooter: {
    padding: "1rem",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  formLabel: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#334155",
  },
  formControl: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    fontSize: "0.875rem",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#e2e8f0",
    color: "#334155",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  saveButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0B1C40",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
  },
};
