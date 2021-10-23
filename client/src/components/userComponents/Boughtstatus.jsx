import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bought } from "../../actions/boughtStatusActions";
import { Book, BookName, BookImg, BookInfo } from "./Home";
const Boughtstatus = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(bought("6166b2fba18545cd06feaffe"));
  }, [dispatch]);
  return (
    <>
      <Section>
        <Book>
          <BookImg src="https://images-na.ssl-images-amazon.com/images/I/5160dwNeqSL._SX323_BO1,204,203,200_.jpg"></BookImg>
          <BookName>Harry Potter</BookName>
          <BookInfo>Sold by: Mr.x</BookInfo>
          <BookInfo>$20</BookInfo>
        </Book>
        <StatusInfo>
          <h3>Status:</h3>
          <Status>Accepted</Status>
        </StatusInfo>
      </Section>
    </>
  );
};
const Section = styled.div`
  width: 30vw;
  height: 40vh;
  margin: auto;
`;
const StatusInfo = styled.div``;
const Status = styled.p`
  color: #001b48;
`;
export default Boughtstatus;
