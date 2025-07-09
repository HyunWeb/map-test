import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";

export default function DataCleaning() {
  const navigate = useNavigate();

  // 두 표를 가로로 나란히 보여주는 함수 (보정후는 보정방식 컬럼 제외)
  const renderBeforeAfterTables = (
    beforeTitle,
    afterTitle,
    beforeData,
    afterData,
    setBeforeData
  ) => (
    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
      <div style={{ flex: 1 }}>
        {renderEditableTable(beforeTitle, beforeData, setBeforeData, [
          "no",
          "x",
          "y",
          "method",
        ])}
      </div>
      <div style={{ flex: 1 }}>
        {renderTable(afterTitle, afterData, ["no", "x", "y"])}
      </div>
    </div>
  );

  // 보정 전 테이블에서 드롭다운/인풋박스 렌더링
  const renderEditableTable = (
    title,
    data,
    setData,
    columns = ["no", "x", "y", "method"]
  ) => (
    <div style={{ flex: 1, margin: "0 1rem" }}>
      <div
        style={{
          background: "#F1F5F9",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          borderRadius: "6px 6px 0 0",
          border: "1px solid #E2E8F0",
          borderBottom: "none",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #E2E8F0",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            <th style={tableStyles.th}>번호</th>
            <th style={tableStyles.th}>X좌표</th>
            <th style={tableStyles.th}>Y좌표</th>
            {columns.includes("method") && (
              <th style={tableStyles.th}>보정 방식</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.no}>
              <td style={tableStyles.td}>{row.no}</td>
              <td style={tableStyles.td}>
                {row.method === "직접 입력" ? (
                  <input
                    type="text"
                    value={row.x === "Null" ? "" : row.x}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[idx].x = e.target.value;
                      setData(newData);
                    }}
                    style={tableStyles.input}
                    placeholder="X좌표 입력"
                  />
                ) : (
                  row.x
                )}
              </td>
              <td style={tableStyles.td}>
                {row.method === "직접 입력" ? (
                  <input
                    type="text"
                    value={row.y === "Null" ? "" : row.y}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[idx].y = e.target.value;
                      setData(newData);
                    }}
                    style={tableStyles.input}
                    placeholder="Y좌표 입력"
                  />
                ) : (
                  row.y
                )}
              </td>
              {columns.includes("method") && (
                <td style={tableStyles.td}>
                  <select
                    value={row.method}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[idx].method = e.target.value;
                      setData(newData);
                    }}
                    style={tableStyles.select}
                  >
                    {methodOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              )}
            </tr>
          ))}
          {/* 데이터가 3개 미만인 경우 빈 행 추가하여 높이 유지 */}
          {data.length < 3 &&
            Array(3 - data.length)
              .fill()
              .map((_, i) => (
                <tr key={`empty-${i}`}>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  {columns.includes("method") && (
                    <td style={tableStyles.emptyTd}>&nbsp;</td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );

  // 표 렌더링 함수 (컬럼 동적)
  const renderTable = (title, data, columns = ["no", "x", "y", "method"]) => (
    <div style={{ flex: 1, margin: "0 1rem" }}>
      <div
        style={{
          background: "#F1F5F9",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          borderRadius: "6px 6px 0 0",
          border: "1px solid #E2E8F0",
          borderBottom: "none",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #E2E8F0",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            <th style={tableStyles.th}>번호</th>
            <th style={tableStyles.th}>X좌표</th>
            <th style={tableStyles.th}>Y좌표</th>
            {columns.includes("method") && (
              <th style={tableStyles.th}>보정 방식</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.no}>
              <td style={tableStyles.td}>{row.no}</td>
              <td style={tableStyles.td}>{row.x}</td>
              <td style={tableStyles.td}>{row.y}</td>
              {columns.includes("method") && (
                <td style={tableStyles.td}>{row.method}</td>
              )}
            </tr>
          ))}
          {/* 데이터가 3개 미만인 경우 빈 행 추가하여 높이 유지 */}
          {data.length < 3 &&
            Array(3 - data.length)
              .fill()
              .map((_, i) => (
                <tr key={`empty-${i}`}>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  <td style={tableStyles.emptyTd}>&nbsp;</td>
                  {columns.includes("method") && (
                    <td style={tableStyles.emptyTd}>&nbsp;</td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );

  // 보정방식 옵션
  const methodOptions = [
    "직접 입력",
    "평균값 보간",
    "최빈값 보간",
    "선형 보간",
  ];

  // 보정후 데이터: isApplied에 따라 값이 채워짐
  const outlierListAfter = outlierListBefore.map((row) => ({
    no: row.no,
    x: isApplied ? row.x : "",
    y: isApplied ? row.y : "",
  }));
  const missingListAfter = missingListBefore.map((row) => ({
    no: row.no,
    x: isApplied ? row.x : "",
    y: isApplied ? row.y : "",
  }));

  // 더미 데이터: 이상치 리스트 (보정전)
  const initialOutlierListBefore = [
    { no: 1, x: "127.000123", y: "999.999999", method: "직접 입력" },
    { no: 2, x: "888.888888", y: "37.123456", method: "직접 입력" },
    { no: 3, x: "127.484189", y: "37.456789", method: "평균값 보간" },
  ];
  // 더미 데이터: 결측치 리스트 (보정전)
  const initialMissingListBefore = [
    { no: 4, x: "127.000123", y: "Null", method: "직접 입력" },
    { no: 5, x: "Null", y: "37.123457", method: "직접 입력" },
    { no: 6, x: "127.000125", y: "Null", method: "평균값 보간" },
  ];

  // 상태로 관리
  const [outlierListBefore, setOutlierListBefore] = useState(
    initialOutlierListBefore
  );
  const [missingListBefore, setMissingListBefore] = useState(
    initialMissingListBefore
  );

  // 일괄적용 상태
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyAll = () => {
    // 일괄 적용 기능 구현
    setIsApplied(true);
    console.log("일괄 적용하기 클릭");
  };

  const handleViewMap = () => {
    navigate("/map");
  };

  return (
    <>
      <PageContainer
        title="HD MAP 파일 업로드"
        tooltipContent="HD맵 생성을 위한 파일을 업로드할 수 있습니다."
      >
        <div style={styles.uploadSection}>
          <div style={styles.uploadArea}>
            {/* 업로드 완료 후: 리스트 뷰만 표시 */}
            <div
              style={{
                marginTop: "2.5rem",
                background: "#F8FAFC",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              {/* 이상치 리스트: 보정전/보정후 */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  정밀 주행 환경정보 파일 업로드 이상치 리스트 뷰
                </div>
                {renderBeforeAfterTables(
                  "보정전",
                  "보정후",
                  outlierListBefore,
                  outlierListAfter,
                  setOutlierListBefore
                )}
              </div>
              {/* 결측치 리스트: 보정전/보정후 */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  정밀 주행 환경정보 파일 업로드 결측치 리스트 뷰
                </div>
                {renderBeforeAfterTables(
                  "보정전",
                  "보정후",
                  missingListBefore,
                  missingListAfter,
                  setMissingListBefore
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  style={{
                    ...styles.uploadButton,
                    width: "220px",
                    fontSize: "1.1rem",
                  }}
                  onClick={handleApplyAll}
                  disabled={isApplied}
                >
                  일괄적용하기
                </button>
                {isApplied && (
                  <button
                    style={{
                      ...styles.uploadButton,
                      width: "220px",
                      fontSize: "1.1rem",
                      backgroundColor: "#2563EB",
                    }}
                    onClick={handleViewMap}
                  >
                    지도보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
      {/* <Footer /> */}
    </>
  );
}

const styles = {};
const tableStyles = {
  th: {
    border: "1px solid #E2E8F0",
    padding: "0.75rem",
    background: "#F8FAFC",
    fontWeight: "600",
    fontSize: "0.95rem",
    minWidth: "100px",
  },
  td: {
    border: "1px solid #E2E8F0",
    padding: "0.75rem",
    textAlign: "center",
    fontSize: "0.95rem",
    height: "63px",
    minWidth: "100px",
  },
  emptyTd: {
    border: "1px solid #E2E8F0",
    padding: "0.75rem",
    textAlign: "center",
    fontSize: "0.95rem",
    height: "58px",
    color: "transparent",
    minWidth: "100px",
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.9rem",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s ease",
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    height: "36px",
    minWidth: "80px",
  },
  select: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.9rem",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    outline: "none",
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontFamily: "inherit",
    cursor: "pointer",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1rem",
    paddingRight: "2rem",
    textAlign: "center",
    height: "36px",
    minWidth: "120px",
  },
};
