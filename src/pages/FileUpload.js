import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import {
  CompleteFileUpload,
  initFileUpload,
  uploadChunk,
} from "../api/fileApi";
import { CreatProject } from "../api/projectApi";
import LoadingModal from "../components/LoadingModal";

function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  // 입력값 상태 추가
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectAuth, setProjectAuth] = useState("");
  const projectAuthOptions = ["내부 공유", "비공개"];

  // 파일 업로드 처리 함수
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  // 프로젝트 생성 처리 함수
  const CreatProjectHandler = async () => {
    try {
      // 파일 업로드 초기화
      const response = await initFileUpload(selectedFile);
      const { fileId, chunkSize, totalChunks } = response;

      // 파일 청크 업로드
      const result = await uploadChunk(
        fileId,
        chunkSize,
        totalChunks,
        selectedFile
      );

      // 파일 업로드 완료 처리
      if (result) {
        const response = await CompleteFileUpload(fileId);
        console.log("파일 업로드 완료 응답", response);
        if (response.success) {
          // 프로젝트 생성
          const projectResponse = await CreatProject(
            projectName,
            projectDesc,
            fileId,
            projectAuth
          );
          console.log("프로젝트 생성 응답", projectResponse);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageContainer
        title="HD MAP 파일 업로드"
        tooltipContent="HD맵 생성을 위한 파일을 업로드할 수 있습니다."
      >
        <div style={styles.uploadSection}>
          <div style={styles.uploadArea}>
            {/* 업로드 완료 전: 입력 폼 및 업로드 UI */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>*프로젝트명</label>
              <input
                type="text"
                placeholder="프로젝트 명을 입력해주세요."
                style={styles.input}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>*프로젝트 설명</label>
              <input
                type="text"
                placeholder="프로젝트에 대한 설명을 입력해주세요."
                style={styles.input}
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>*열람 권한 설정</label>
              <select
                style={{
                  ...styles.input,
                  cursor: "pointer",
                  minWidth: "180px",
                }}
                value={projectAuth}
                onChange={(e) => setProjectAuth(e.target.value)}
              >
                <option value="" disabled>
                  권한을 선택해주세요
                </option>
                {projectAuthOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.fileInfoSection}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>업로드 파일</label>
                <div style={styles.fileInfo}>
                  {selectedFile ? (
                    <span style={styles.fileName}>{selectedFile.name}</span>
                  ) : (
                    <span style={styles.noFile}>선택된 파일이 없습니다.</span>
                  )}
                </div>
              </div>
            </div>
            <div style={styles.dropZone}>
              <p style={styles.dropZoneText}>파일을 드래그하여 업로드하거나</p>
              <input
                type="file"
                onChange={handleFileUpload}
                style={styles.fileInput}
                accept=".pcd, .las"
                id="fileInput"
              />
              <button
                style={styles.uploadButton}
                onClick={() => document.getElementById("fileInput").click()}
              >
                파일 선택하기
              </button>
              <p style={styles.fileTypeText}>
                .las, .pcd 파일만 업로드 가능합니다.
              </p>
            </div>

            {/* {isUploading && (
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
                <div style={styles.progressText}>
                  <span>{uploadProgress}%</span>
                  <span>{uploadStatus}</span>
                </div>
              </div>
            )} */}

            <div style={styles.submitButtonContainer}>
              <button style={styles.submitButton} onClick={CreatProjectHandler}>
                파일 분석
              </button>
            </div>
          </div>
        </div>
        {/* <LoadingModal /> */}
      </PageContainer>
      {/* <Footer /> */}
    </>
  );
}

const styles = {
  uploadSection: {
    padding: "2rem 4rem",
  },
  uploadArea: {
    borderRadius: "12px",
    padding: "2rem",
  },
  inputGroup: {
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "700",
    color: "#000000",
    width: "120px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    border: "1px solid #E2E8F0",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
    maxWidth: "400px",
  },
  dropZone: {
    border: "2px dashed #E2E8F0",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#F8FAFC",
    marginTop: "2rem",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
  },
  dropZoneText: {
    margin: "0 0 1rem 0",
    color: "#64748B",
    fontSize: "0.9rem",
  },
  uploadButton: {
    backgroundColor: "#0B1C40",
    color: "#FFFFFF",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  fileTypeText: {
    margin: "1rem 0 0 0",
    color: "#94A3B8",
    fontSize: "0.8rem",
  },
  fileInput: {
    display: "none",
  },
  progressContainer: {
    marginTop: "2rem",
    width: "100%",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#E2E8F0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#60A5FA",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  progressText: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    color: "#64748B",
    fontSize: "0.9rem",
  },
  fileInfoSection: {
    marginBottom: "1.5rem",
    borderBottom: "1px solid #E2E8F0",
    paddingBottom: "1.5rem",
  },
  fileInfo: {
    flex: 1,
    padding: "0.75rem 1rem",
    backgroundColor: "#F8FAFC",
    borderRadius: "6px",
    fontSize: "0.9rem",
    maxWidth: "400px",
  },
  fileName: {
    color: "#1E293B",
  },
  noFile: {
    color: "#94A3B8",
  },
  viewMapContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#0B1C40",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    width: "300px",
    height: "50px",
    marginTop: "20px",
  },
};

export default FileUpload;
