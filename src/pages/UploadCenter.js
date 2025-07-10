import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { GetFileList } from "../api/fileApi";

export default function UploadCenter() {
  const [fileList, setFileList] = useState([]);
  const handleAdd = () => {
    console.log("추가");
  };

  useEffect(() => {
    const fetchProjectList = async () => {
      const response = await GetFileList();
      setFileList(response);
    };
    fetchProjectList();
  }, []);
  return (
    <>
      <PageContainer
        title="자료실"
        tooltipContent="자료실에 올린 파일을 내려받을 수 있습니다."
      >
        <section style={styles.uploadHistorySection}>
          <header style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>자료 목록</h3>
            <div style={styles.actionButtonsContainer}>
              <button
                style={styles.actionButton}
                onClick={handleAdd}
                tabIndex="0"
              >
                추가
              </button>
            </div>
          </header>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, ...styles.thFirst }}>번호</th>
                  <th style={styles.th}>지역명</th>
                  <th style={styles.th}>업로더</th>
                  <th style={styles.th}>등록일</th>
                  <th style={styles.th}>다운로드</th>
                  <th style={{ ...styles.th, ...styles.thLast }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {fileList.map((file, idx) => (
                  <tr key={file.id} style={styles.tr}>
                    <td style={styles.td}>{idx + 1}</td>
                    <td style={styles.td}>{file.location}</td>
                    <td style={styles.td}>{file.uploader}</td>
                    <td style={styles.td}>{file.createdAt}</td>
                    <td style={styles.td}>
                      <button style={styles.editButton}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-download"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                        </svg>
                      </button>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.editButton}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    fontSize: "16px",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
