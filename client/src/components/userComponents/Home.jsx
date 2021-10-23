import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getBooks } from "../../actions/homeActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/authActions";
import { Delete as Dashboard } from "../adminComponents/AllUsers";
import { FadingBalls } from "react-cssfx-loading";
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, books } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader>
          <FadingBalls width="50px" height="50px" color="#001b48" />
        </Loader>
      ) : (
        <HomeContainer>
          <Header>
            <Logo
              src="/bookLogo.png"
              onClick={() => {
                history.push("/");
              }}
            ></Logo>
            <NavItem
              onClick={() => {
                if (user==null) {
                  history.push("/login");
                } else {
                  history.push(`/sell/${user._id}`);
                }
              }}
            >
              Sell
            </NavItem>
            {user ? (
              <>
                <NavItem
                  onClick={() => {
                    history.push("/orders");
                  }}
                >
                  Orders
                </NavItem>
                <NavItem
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </NavItem>
                {user?.role == "admin" ? (
                  <Dashboard
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/admin");
                    }}
                  >
                    Dashboard
                  </Dashboard>
                ) : (
                  ""
                )}
              </>
            ) : (
              <NavItem
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </NavItem>
            )}
          </Header>
          <Books>
            {books.length > 0 ? (
              books.map((book, index) => {
                return (
                  <Book key={index}>
                    <BookImg src={book.img.url}></BookImg>
                    <BookName>{book.name}</BookName>
                    <BookInfo>Sold by:</BookInfo>
                    <BookInfo> {book.soldby}</BookInfo>
                    <BookInfo>$ {book.price}</BookInfo>
                    <BuynowBtn
                      onClick={() => {
                        if (user==null) {
                          history.push("/login");
                        } else {
                          history.push({
                            pathname: `/placeorder/${book._id}`,
                            state: {
                              bookimg: book.img.url,
                              bookid: book._id,
                              bookname: book.name,
                              bookprice: book.price,
                              booksoldby: book.soldby,
                              shipsTo: book.shipsTo,
                            },
                          });
                        }
                      }}
                    >
                      Buy now
                    </BuynowBtn>
                  </Book>
                );
              })
            ) : (
              <Nobooks>No Books Available</Nobooks>
            )}
          </Books>
        </HomeContainer>
      )}
    </>
  );
};
export const HomeContainer = styled.div`
  background: white;
  color: black;
  display: flex;
  margin: -12px;
  padding: 0;
  flex-direction: column;
`;
export const Logo = styled.img`
  max-width: 5%;
  @media (max-width: 700px) {
    max-width: 11%;
  }
`;
export const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-grow: 0.9;
  grid-row-gap: 20px;
  margin-top: 20px;
  align-items: flex-end;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 13px;
  }
`;
export const Book = styled.div`
  width: 74%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 45vw;
  }
`;
export const BookImg = styled.img`
  max-height: 15%;
  max-width: 47%;
  flex-grow: 0.7;
  @media (max-width: 700px) {
    max-height: 46%;
    max-width: 91%;
  }
`;

export const BookName = styled.h3`
  font-size: 1.2rem;
  color: #001b48;
  font-weight: bold;
`;
export const BookInfo = styled.p`
  font-size: 1.2rem;
  margin: 8px;
  margin-top: -8px;
`;
export const BuynowBtn = styled.button`
  padding: 14px;
  color: white;
  background: #001b48;
  border: none;
  border-radius: 20px;
  &:hover {
    background: #001b48ab;
  }
  @media (max-width: 700px) {
    padding: 6px;
  }
`;
export const Nobooks = styled.h3`
  font-size=2rem;
  flex-grow:0.9;
  margin-left: 20%;
  color:#001b48;
  `;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #f17e0b;
  background: #001b48;
`;
export const NavItem = styled.p`
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: #ffff;
    transition: 0.3s;
  }
  @media (max-width: 700px) {
    font-size: 0.7rem;
  }
`;
export const Loader = styled.div`
  margin-left: 43%;
  margin-top: 23%;
`;
export default Home;
