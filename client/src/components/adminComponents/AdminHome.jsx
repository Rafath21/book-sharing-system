import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const AdminHome = () => {
  let history = useHistory();
  return (
    <Container>
      <h1
        onClick={() => {
          history.push("/allorders");
        }}
      >
        All Orders
      </h1>
      <h1
        onClick={() => {
          history.push("/allusers");
        }}
      >
        All Users
      </h1>
      <h1
        onClick={() => {
          history.push("/allbooks");
        }}
      >
        All Books
      </h1>
    </Container>
  );
};
const Container = styled.div`
  text-align: center;
  text-decoration: underline;
  padding: 3rem;
`;

export default AdminHome;
