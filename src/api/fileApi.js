import api from "./index";

export const initFileUpload = async (file) => {
  const fileSize = file.size;
  try {
    // const response = await api.post("/api/files/upload/init", {
    //   filename: file,
    //   fileSize: fileSize,
    // });
    // return response.data;

    return {
      fileId: 1,
      chunkSize: 10485760,
      totalChunks: 103,
    };
  } catch (error) {
    console.error("파일업로드 초기화 에러", error);
  }
};

export const uploadChunk = async (
  fileId,
  chunkSize,
  totalChunks,
  selectedFile
) => {
  try {
    // for (let i = 0; i < totalChunks; i++) {
    //   const start = i * chunkSize;
    //   const end = Math.min(start + chunkSize, selectedFile.size);
    //   const chunk = selectedFile.slice(start, end);

    //   const formData = new FormData();
    //   formData.append("fileId", fileId);
    //   formData.append("chunkNumber", i);
    //   formData.append("chunk", chunk);

    //   const response = await api.post("/api/files/upload/chunk", formData);

    //   if (!response.data.success) {
    //     throw new Error("파일 청크 업로드 실패");
    //   }
    // }
    return true;
  } catch (err) {
    console.error("파일 청크 업로드 에러", err);
    return false;
  }
};

export const CompleteFileUpload = async (fileId) => {
  try {
    // const response = await api.post(`/api/files/upload/${fileId}/complete`);
    // return response.data;

    return {
      success: true,
      message: "파일 업로드가 완료되었습니다.",
    };
  } catch (err) {
    console.error("파일 업로드 완료 에러", err);
  }
};

export const GetFileList = async () => {
  try {
    // const response = await api.get("/api/files/list");
    // return response.data;

    return [
      {
        id: 1,
        location:
          "서울특별시 강남구 역삼동 123-45 6층 101호 서울특별시 강남구 역삼동 123-45 6층 101호",
        uploader: "홍길동",
        createdAt: "2025-01-01",
        download: "다운로드",
      },
      {
        id: 2,
        location: "대전",
        uploader: "김길동",
        createdAt: "2025-01-01",
        download: "다운로드",
      },
    ];
  } catch (err) {
    console.error("파일 목록 조회 에러", err);
  }
};
