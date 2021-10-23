import React from "react";
import styled from "styled-components";
import { Books, Book, BookImg, BookName, BookInfo, Nobooks } from "./Home";
import {
  HomeContainer as SellContainer,
  BuynowBtn as ShowStatusBtn,
} from "./Home";
import { useHistory } from "react-router-dom";
import { getSoldBooks, sellBook } from "../../actions/sellActions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Home";
import { FadingBalls } from "react-cssfx-loading";
const Sell = () => {
  const dispatch = useDispatch();
  const [sellBoxOpen, setsellBoxOpen] = useState(false);
  let [bookname, setBookname] = useState("");
  let [price, setPrice] = useState("");
  let [cardno, setCardno] = useState(Number);
  const [bookPreview, setBookPreview] = useState("/DefBook.png");
  const [bookImg, setBookImg] = useState("");
  let [shipsTo, setShipsTo] = useState("");
  const { loading, error, soldBooks } = useSelector((state) => state.soldBooks);
  const { result } = useSelector((state) => state.result);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    dispatch(getSoldBooks(user?._id));
  }, [dispatch, result, history, isAuthenticated]);

  const updateBookImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBookPreview(reader.result);
        setBookImg(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const sell = (e) => {
    dispatch(sellBook(user._id, bookname, price, bookImg, shipsTo, cardno));
    setsellBoxOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader>
          <FadingBalls width="50px" height="50px" color="#001b48" />
        </Loader>
      ) : (
        <SellContainer>
          <Header>
            <Heading>Your Books</Heading>
            <SellnowBtn
              onClick={() => {
                setsellBoxOpen(true);
              }}
            >
              Sell now
            </SellnowBtn>
          </Header>
          <Books>
            {soldBooks ? (
              soldBooks.map((book, index) => {
                return (
                  <Book key={index}>
                    <BookImg src={book.img.url}></BookImg>
                    <BookName>{book.name}</BookName>
                    <BookInfo>Sold by:</BookInfo>
                    <BookInfo>{book.soldby}</BookInfo>
                    <BookInfo>$ {book.price}</BookInfo>
                    <BookSt>{book.bookStatus.toUpperCase()}</BookSt>
                    <ShowStatusBtn
                      onClick={() => {
                        history.push({
                          pathname: "/soldstatus",
                          state: book,
                        });
                      }}
                    >
                      Update Status
                    </ShowStatusBtn>
                  </Book>
                );
              })
            ) : (
              <h3>No Books Sold Yet!</h3>
            )}
          </Books>
        </SellContainer>
      )}

      {sellBoxOpen ? (
        <SellBox>
          <>
            <Icon
              onClick={() => {
                setsellBoxOpen(false);
              }}
            >
              <i class="fas fa-window-close"></i>
            </Icon>
            <SellImg src={bookPreview}></SellImg>
            <InputImg
              type="file"
              accept="image/*"
              onChange={updateBookImg}
            ></InputImg>
          </>
          <Field>Book Name:</Field>
          <InputInfo
            type="text"
            onChange={(e) => {
              setBookname(e.target.value);
            }}
          ></InputInfo>
          <Field>Book Price:(in usd)</Field>
          <InputInfo
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></InputInfo>
          <Field>Your account no:</Field>
          <InputInfo
            onChange={(e) => {
              setCardno(e.target.value);
            }}
          ></InputInfo>
          <Field>Ships to:</Field>
          <Field>
            Please seperate the locations by commas if there is more than one
            place(states,countries etc)
          </Field>
          <InputInfo
            onChange={(e) => {
              setShipsTo(e.target.value);
            }}
          ></InputInfo>
          <SellBtn onClick={sell}>POST</SellBtn>
        </SellBox>
      ) : (
        ""
      )}
    </>
  );
};
const Header = styled.h1`
  font-size: 2rem;
  color: #f17e0b;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 62px;
  background: #001b48;
  @media (max-width: 700px) {
    font-size: 0.7rem;
  }
`;
const Heading = styled.h3``;
const SellnowBtn = styled.button`
  margin-left: 10%;
  height: 51%;
  border: none;
  background: #f17e0b;
  color: #ffff;
  border-radius: 8%;
  padding: 8px;
`;
const SellBox = styled.div`
  width: 33vw;
  padding: 1%;
  background: #001b48;
  position: absolute;
  top: 10%;
  left: 30%;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", "HelveticaNeue-Light", sans-serif;
  @media (max-width: 800px) {
    width: 80vw;
    padding: 7%;
    top: 10%;
    left: 3%;
  }
`;
const Field = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #ffff;
`;
const InputInfo = styled.input`
  padding: 7px;
  border: none;
  background: #001b48;
  border-bottom: 2px solid #ffff;
  color: #ffff;
  &:focus {
    outline: none;
  }
`;
const SellImg = styled.img`
  max-width: 15%;
  max-height: 24%;
`;
const InputImg = styled.input`
  margin: 3px;
`;
const SellBtn = styled.button`
  padding: 10px;
  background: #f17e0b;
  color: white;
  border: none;
  &:hover {
    background: #ffa50094;
  }
  margin: 8px;
`;
const Icon = styled.div`
  color: #fff;
`;
const BookSt = styled.div`
  font-size: 1.2rem;
  color: orange;
  margin-top: -12px;
  font-weight: bold;
`;
export default Sell;
