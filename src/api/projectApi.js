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
      auth: "비공개",
    },
    {
      id: 2,
      projectName: "데모 프로젝트",
      description: "데모용 전광판 hdmap 작업2",
      date: "2025/03/21",
      fileName: "32645787_20250321.pcd",
      auth: "내부 공유",
    },
    {
      id: 3,
      projectName: "데모 프로젝트",
      description: "데모용 전광판 hdmap 작업3",
      date: "2025/03/21",
      fileName: "32645787_20250321.pcd",
      auth: "비공개",
    },
  ];
};

export const CreatProject = async (name, description, fileId, accessType) => {
  try {
    // const response = await api.post("/api/projects", {
    //   name: name,
    //   description: description,
    //   fileId: fileId,
    //   accessType: accessType,
    // });
    // return response.data;

    return {
      id: 1,
      name: "도시 지역 최적 경로 프로젝트",
      description: "A지점에서 B지점까지의 최적 경로를 찾는 프로젝트",
      userName: "testuser",
      userFullName: "테스트 사용자",
      fileId: 123,
      startX: 199519.8282506466,
      startY: 551063.8087487221,
      startZ: 47.41800093650818,
      endX: 199502.7990000248,
      endY: 551097.0292499065,
      endZ: 46.939000964164734,
      routes: null,
      obstacles: [
        {
          id: 1,
          name: "장애물 1",
          points: [
            {
              x: 199519.8282,
              y: 551063.8087,
              z: 47.418,
            },
          ],
          description: "건물 장애물",
          type: "building",
        },
      ],
      status: 1,
      statusName: "생성됨",
      createdAt: "2025-07-02T10:25:00",
      updatedAt: "2025-07-02T10:25:00",
    };
  } catch (error) {
    console.error("프로젝트 생성 에러", error);
  }
};

export const DeleteProject = async (id) => {
  try {
    // const response = await api.delete(`/api/projects/${id}`);
    // return response.data;
  } catch (error) {
    console.error("프로젝트 삭제 에러", error);
  }
};
