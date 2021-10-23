import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getallBooks } from "../../actions/adminActions";
import { Section, Element, Delete } from "./AllUsers";
import { useEffect } from "react";
const AllBooks = () => {
  const dispatch = useDispatch();
  const { allbooks } = useSelector((state) => state.allbooks);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getallBooks());
  }, [dispatch]);
  return (
    <Section>
      <h1>All Books on BookSharing app:</h1>
      {allbooks &&
        allbooks.map((book, index) => {
          return (
            <Element key={index}>
              <Image src={book.img.url}></Image>
              <h4>Name:</h4>
              <p>{book.name}</p>
              <h4>Sold By:</h4>
              <p>{book.soldby}</p>
              <h4>price:</h4>
              <p>$ {book.price}</p>
              <h4>Status:</h4>
              <p>{book.bookStatus}</p>
            </Element>
          );
        })}
    </Section>
  );
};

export default AllBooks;
const Image = styled.img`
  max-width: 5%;
  max-height: 10%;
  @media (max-width: 700px) {
    max-width: 20%;
  }
`;
