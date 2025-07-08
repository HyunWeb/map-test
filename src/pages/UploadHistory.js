import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import { GetProjectList } from "../api/projectApi";
import EditModal from "../components/EditModal";

function UploadHistory() {
  // 체크박스 상태 관리 [false, false, false, false, false...]
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAuth, setEditAuth] = useState("");
  const [originalList, setOriginalList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // 프로젝트 목록 조회
  useEffect(() => {
    const fetchProjectList = async () => {
      const response = await GetProjectList();
      setOriginalList(response);
      setProjectList(response);
      setSelectedItems(Array.from({ length: response.length }, () => false));
    };
    fetchProjectList();
  }, []);

  // 체크박스 상태 관리 함수
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 선택된 프로젝트 id 추출
  const selectedId = Object.keys(selectedItems).find((id) => selectedItems[id]);
  const selectedProject = projectList.find(
    (item) => String(item.id) === selectedId
  );

  // 지도 페이지로 이동
  const handleViewMap = (id) => {
    navigate(`/google-map?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/upload");
  };

  const handleEdit = (id) => {
    setEditingProject(projectList[id - 1]);
    setEditDescription(projectList[id - 1].description);
    setEditAuth(projectList[id - 1].auth);
    setIsModalOpen(true);
    if (selectedProject) {
    }
  };

  const handleDelete = () => {
    if (selectedProject) {
      // 실제 삭제 로직은 백엔드 연동 필요
      alert(`프로젝트(id: ${selectedProject.id})를 삭제합니다.`);
    }
  };

  // 수정 저장
  const handleSaveEdit = () => {
    // 실제 서비스에서는 API 호출로 저장
    // 이 예시에서는 로컬 데이터만 업데이트

    // 실제 구현 시 여기서 API 호출

    alert("수정이 저장되었습니다.");
    handleCloseModal();
  };

  const handleAuthChange = (e) => {
    const selectedAuth = e.target.value;
    if (selectedAuth === "all") {
      setProjectList(originalList);
    } else if (selectedAuth === "public") {
      setProjectList(originalList.filter((item) => item.auth === "내부 공유"));
    } else if (selectedAuth === "private") {
      setProjectList(originalList.filter((item) => item.auth === "비공개"));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.map((item) => !item));
  };

  return (
    <>
      <PageContainer
        title="내역 대시보드"
        tooltipContent="올려서 작업 내역의 지도를 확인할 수 있습니다."
      >
        <section style={styles.uploadHistorySection}>
          <header style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>업로드 내역</h3>
            <div style={styles.actionButtonsContainer}>
              <button style={styles.actionButton} onClick={handleAdd}>
                추가
              </button>
              <button
                style={styles.actionButton}
                onClick={handleDelete}
                disabled={!selectedProject}
              >
                삭제
              </button>
              <select style={styles.actionButton} onChange={handleAuthChange}>
                <option value="all">모두 보기</option>
                <option value="public">내부 공유</option>
                <option value="private">비공개</option>
              </select>
            </div>
          </header>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, ...styles.thFirst }}>
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === projectList.length &&
                        selectedItems.every((item) => item)
                      }
                      onChange={handleSelectAll}
                      style={styles.checkbox}
                    />
                  </th>
                  <th style={styles.th}>프로젝트명</th>
                  <th style={styles.th}>프로젝트 설명</th>
                  <th style={styles.th}>날짜</th>
                  <th style={styles.th}>권한</th>
                  <th style={styles.th}>파일명</th>
                  <th style={{ ...styles.th, ...styles.thLast }}>수정</th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={selectedItems[item.id - 1] || false}
                        onChange={() => handleCheckboxChange(item.id - 1)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td
                      style={styles.LinkTd}
                      onClick={() => handleViewMap(item.id)}
                    >
                      {item.projectName}
                    </td>
                    <td style={styles.td}>{item.description}</td>
                    <td style={styles.td}>{item.date}</td>
                    <td style={styles.td}>{item.auth}</td>
                    <td style={styles.td}>{item.fileName}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 수정 모달 */}
          {isModalOpen && editingProject && (
            <EditModal
              setIsModalOpen={setIsModalOpen}
              setEditingProject={setEditingProject}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              editAuth={editAuth}
              setEditAuth={setEditAuth}
              handleSaveEdit={handleSaveEdit}
              handleCloseModal={handleCloseModal}
              editingProject={editingProject}
            />
          )}
        </section>
      </PageContainer>
      {/* <Footer /> */}
    </>
  );
}

const styles = {
  uploadHistorySection: {
    padding: "1rem",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 2rem",
    marginBottom: "1rem",
  },
  tableTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1E293B",
  },
  actionButtonsContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  tableContainer: {
    overflowY: "auto",
    maxHeight: "calc(65vh - 160px)", // header(60px) + footer(60px) + 여유(40px)
    minHeight: "calc(65vh - 160px)",
    WebkitOverflowScrolling: "touch",
    padding: "1rem 0",
  },
  table: {
    width: "100%",
    minWidth: "800px",
    borderCollapse: "separate",
    borderSpacing: "0",
    padding: "0 2rem",
  },
  th: {
    padding: "0.75rem 1rem",

    textAlign: "center",
    fontSize: "0.875rem",
    color: "#64748B",
    backgroundColor: "#FFFFFF",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #E2E8F0",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  thFirst: {
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
  },
  thLast: {
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  tr: {
    // cursor: "pointer",
    transition: "background-color 0.2s ease",
    textAlign: "center",
  },
  td: {
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#334155",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #E2E8F0",
  },
  LinkTd: {
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#334155",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #E2E8F0",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
  },
  checkboxCell: {
    padding: "0.75rem 1rem",
    width: "40px",
    textAlign: "center",
    borderBottom: "1px solid #E2E8F0",
  },
  checkbox: {
    cursor: "pointer",
    width: "16px",
    height: "16px",
  },
  tooltip: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "0.875rem",
    zIndex: 1000,
  },
  actionButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    color: "#334155",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    opacity: 1,
    outline: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    ":hover": {
      backgroundColor: "#F8FAFC",
    },
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  editButton: {
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
};

export default UploadHistory;
