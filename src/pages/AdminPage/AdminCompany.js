import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCompanyData } from "../../api/userApi";

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  padding-bottom: 20px;
  background-color: #f3f8fb;
  padding-top: 70px;
  min-height: calc(100vh - 70px);
  border-radius: 12px;
`;

const Card = styled.div`
  width: 25%;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  padding: 20px;
  font-size: 16px;
  border-radius: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-evenly;

  p {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    color: #333;
    strong {
      color: #a3a3a3;
    }
  }

  button {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  .allow {
    background-color: rgb(75, 156, 78);
    color: white;
  }
  .denied {
    background-color: rgb(240, 80, 69);
    color: white;
  }
`;

export default function AdminCompany() {
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    const fetchCompanyData = async () => {
      const response = await getCompanyData();
      setCompanyData(response);
    };
    fetchCompanyData();
  }, []);

  return (
    <Section>
      {companyData &&
        companyData.map((item) => {
          return (
            <Card key={item.id}>
              <p>
                <strong>이름</strong> {item.name}
              </p>
              <p>
                <strong>가입일</strong> {item.createdAt}
              </p>
              <p>
                <strong>상태</strong>
                <span class="pending">{item.statusName}</span>
              </p>
              <ButtonWrap>
                <button className="allow">승인</button>
                <button className="denied">반려</button>
              </ButtonWrap>
            </Card>
          );
        })}
    </Section>
  );
}
