import api from "./index";

export const GetProjectList = async () => {
  //   try {
  //     const response = await api.get("/api/projects");
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }

  return [
    {
      id: 1,
      projectName: "데모 프로젝트",
      description: "데모용 전광판 hdmap 작업1",
      date: "2025/03/21",
      fileName: "32645787_20250321.pcd",
      auth: "나만 보기",
    },
    {
      id: 2,
      projectName: "데모 프로젝트",
      description: "데모용 전광판 hdmap 작업2",
      date: "2025/03/21",
      fileName: "32645787_20250321.pcd",
      auth: "조직원만",
    },
    {
      id: 3,
      projectName: "데모 프로젝트",
      description: "데모용 전광판 hdmap 작업3",
      date: "2025/03/21",
      fileName: "32645787_20250321.pcd",
      auth: "나만 보기",
    },
  ];
};
