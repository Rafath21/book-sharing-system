import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../../actions/placeOrderActions";
import Loader from "./Home";
import { FadingBalls } from "react-cssfx-loading";
const Placeorder = () => {
  let dispatch = useDispatch();
  const { loading, error, orderPlaced } = useSelector(
    (state) => state.orderPlaced
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [phone, setPhone] = useState(Number);
  const [city, setCity] = useState("");
  let location = useLocation();
  let history = useHistory();
  let bookid = location.state.bookid;
  let state = location.state;
  useEffect(() => {
    if (state.booksoldby == user.username) {
      alert("You cannot buy your own book");
      history.push("/");
    }
  }, []);
  const order = () => {
    if (isNaN(pincode)) {
      alert("Pincode is invalid!");
    } else if (isNaN(phone)) {
      alert("Phone number is invalid!");
    } else if (address == "" || pincode == "" || phone == "" || city == "") {
      alert("Please fill all the required fields correctly.");
    } else {
      const shippingInfo = {
        address,
        pincode,
        phone,
        city,
      };
      dispatch(placeOrder(user.username, bookid, shippingInfo));
      history.push("/");
    }
  };
  return (
    <>
      {loading ? (
        <Loader>
          <FadingBalls width="50px" height="50px" color="#001b48" />
        </Loader>
      ) : (
        <Wrapper>
          <BookSection>
            <Img src={state.bookimg}></Img>
            <BookInfo>{state.bookname}</BookInfo>
            <BookInfo>Sold by: {state.booksoldby}</BookInfo>
            <BookInfo>$ {state.bookprice}</BookInfo>
          </BookSection>
          <h4>Shipping Available only in: {state?.shipsTo}</h4>
          <ShippingInfo>
            <h2>SHIPPING INFO:</h2>
            <Info>
              <h4>Address:</h4>
              <Input
                type="text"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></Input>
            </Info>
            <Info>
              <h4>Pincode:</h4>
              <Input
                required
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              ></Input>
            </Info>
            <Info>
              <h4>Phone:</h4>
              <Input
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></Input>
            </Info>
            <Info>
              <h4>City:</h4>
              <Input
                type="text"
                required
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></Input>
            </Info>
          </ShippingInfo>
          <PlaceOrder onClick={order}>Place Order</PlaceOrder>
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", "HelveticaNeue-Light", sans-serif;
`;
const BookSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  color: #001b48;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  max-width: 12%;
`;
const BookInfo = styled.p`
  font-size: 1.2rem;
  margin-top: 2px;
`;
const Input = styled.input`
  padding: 12px;
  border: none;
  border-bottom: 2px solid #001b48;
  &:focus {
    outline: none;
  }
`;

const PaymentInfo = styled.div``;
const PlaceOrder = styled.button`
  padding: 20px;
  border-radius: 10px;
  background: orange;
  color: white;
  border: none;
  margin-top: 15px;
`;
export default Placeorder;
