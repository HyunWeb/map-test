import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserData } from "../../api/userApi";

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  padding-bottom: 20px;
  background-color: #f3f8fb;
  padding-top: 70px;
  min-height: calc(100vh - 70px);
  border-radius: 12px;
  align-items: flex-start;
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

export default function AdminSignup() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        console.log(response);

        setUserData(response);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Section>
      {userData &&
        userData.map((item, idx) => (
          <Card key={idx}>
            <p>
              <strong>이메일</strong> {item.email}
            </p>
            <p>
              <strong>이름</strong> {item.fullName}
            </p>
            <p>
              <strong>소속</strong> {item.organization}
            </p>
            <p>
              <strong>가입일</strong> {item.createdAt}
            </p>
            <p>
              <strong>상태</strong>{" "}
              <span class="pending">{item.statusName}</span>
            </p>
            <ButtonWrap>
              <button className="allow">승인</button>
              <button className="denied">반려</button>
            </ButtonWrap>
          </Card>
        ))}
    </Section>
  );
}
