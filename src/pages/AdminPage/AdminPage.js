import React, { useState } from "react";
import styled from "styled-components";
import AdminSignup from "./AdminSignup";
import AdminCompany from "./AdminCompany";

const Main = styled.main`
  padding-top: 70px;
`;

const Styledul = styled.ul`
  display: flex;
  li {
    list-style: none;
  }
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
`;

const TabButton = styled.button`
  background-color: transparent;
  position: relative;
  font-size: 20px;
  font-weight: 600;
  color: #b5b5b5;
  cursor: pointer;
  border: none;
  &.active {
    color: #000;
    border-bottom: 2px solid #000;
  }
`;

export default function AdminPage() {
  const [tabState, setTabState] = useState(true);
  return (
    <Main>
      <Styledul>
        <li>
          <TabButton
            onClick={() => setTabState(true)}
            className={tabState ? "active" : ""}
          >
            회원가입 승인
          </TabButton>
        </li>
        <li>
          <TabButton
            onClick={() => setTabState(false)}
            className={tabState ? "" : "active"}
          >
            기업 승인
          </TabButton>
        </li>
      </Styledul>
      {tabState ? <AdminSignup /> : <AdminCompany />}
    </Main>
  );
}
