import React, { useEffect, useRef } from "react";

const SimplePotreeViewer = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Potree가 로드되었는지 확인
    const checkPotreeLoaded = () => {
      if (window.Potree && containerRef.current) {
        initializePotree();
      } else {
        // 1초 후 다시 확인
        setTimeout(checkPotreeLoaded, 1000);
      }
    };

    const initializePotree = () => {
      try {
        console.log("Potree 초기화 시작...");

        // 컨테이너 생성
        const container = containerRef.current;
        container.innerHTML = `
          <div class="potree_container" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px;">
            <div id="potree_render_area" style="background-image: url('/potree/resources/images/background.jpg');"></div>
            <div id="potree_sidebar_container"></div>
          </div>
        `;

        // Potree 뷰어 생성
        const viewer = new window.Potree.Viewer(
          document.getElementById("potree_render_area")
        );
        viewerRef.current = viewer;

        // 기본 설정
        viewer.setEDLEnabled(true);
        viewer.setFOV(60);
        viewer.setPointBudget(2_000_000);
        viewer.loadSettingsFromURL();

        // GUI 로드
        viewer.loadGUI(() => {
          viewer.setLanguage("en");
          if (window.$) {
            window.$("#menu_tools").next().show();
            window.$("#menu_scene").next().show();
            viewer.toggleSidebar();
          }
        });

        // 예시 포인트 클라우드 로드 (실제 파일이 있다면 경로를 변경하세요)
        console.log("포인트 클라우드 로드 시도...");

        // 테스트용 더미 데이터로 뷰어만 초기화
        console.log("Potree 뷰어가 성공적으로 초기화되었습니다.");

        // 실제 포인트 클라우드가 있다면 아래 주석을 해제하세요
        /*
        window.Potree.loadPointCloud("/pointclouds/your_cloud/cloud.js", "pointcloud", function(e) {
          let scene = viewer.scene;
          scene.addPointCloud(e.pointcloud);

          let material = e.pointcloud.material;
          material.size = 1;
          material.pointSizeType = window.Potree.PointSizeType.ADAPTIVE;

          viewer.fitToScreen();
        });
        */
      } catch (error) {
        console.error("Potree 초기화 중 오류 발생:", error);
      }
    };

    // Potree 로드 확인 시작
    checkPotreeLoaded();

    // 클린업 함수
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.dispose();
        } catch (error) {
          console.error("뷰어 정리 중 오류:", error);
        }
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        <h3>Potree 뷰어 테스트</h3>
        <p>Potree 라이브러리가 로드되면 3D 뷰어가 표시됩니다.</p>
        <p>실제 포인트 클라우드 파일을 추가하면 3D 데이터를 볼 수 있습니다.</p>
      </div>
    </div>
  );
};

export default SimplePotreeViewer;
