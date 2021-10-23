import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderUpdate, sold } from "../../actions/soldStatusActions";
const Soldstatus = () => {
  let location = useLocation();
  let book = location.state;
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [phone, setPhone] = useState(Number);
  const [city, setCity] = useState("");
  const { soldStatus } = useSelector((state) => state.soldStatus);
  const { isOrderUpdated } = useSelector((state) => state.isOrderUpdated);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [newStatus, setnewStatus] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(sold(book._id));
  }, [dispatch, isOrderUpdated, isAuthenticated]);
  const shipping = soldStatus.shippingInfo;
  useEffect(() => {
    setAddress(shipping?.address);
    setPhone(shipping?.phone);
    setPincode(shipping?.pincode);
    setCity(shipping?.city);
  }, [soldStatus]);
  const handleUpdate = () => {
    dispatch(orderUpdate(book._id, newStatus));
  };
  return (
    <>
      <Section>
        <Order>
          <OrderImg src={book.img.url}></OrderImg>
          <OrderName>{book.name}</OrderName>
          <OrderedBy>Ordered by:</OrderedBy>
          <OrderInfo>{soldStatus ? soldStatus.boughtBy : "None"} </OrderInfo>
          <OrderInfo>$ {book.price}</OrderInfo>
        </Order>
        {soldStatus ? (
          <Shipping>
            <h3>Shipping Info</h3>
            <ShippingInfo>Pincode: {pincode}</ShippingInfo>
            <ShippingInfo>Address: {address}</ShippingInfo>
            <ShippingInfo>Phone: {phone}</ShippingInfo>
            <ShippingInfo> City: {city}</ShippingInfo>
          </Shipping>
        ) : (
          ""
        )}

        {soldStatus ? (
          <StatusInfo>
            <h3>Update Status:</h3>
            <Select
              onChange={(e) => {
                setnewStatus(e.target.value);
              }}
            >
              <option value="processing">Processing</option>
              <option value="Accepted">Accepted</option>
              <option value="Denied">Denied</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </Select>
            <br />
            <Status>Current Status:{soldStatus.OrderStatus}</Status>
            <StatusSubmitbtn
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              Submit
            </StatusSubmitbtn>
          </StatusInfo>
        ) : (
          ""
        )}
      </Section>
    </>
  );
};
const Section = styled.div`
  width: 60vw;
  height: 40vh;
  margin: auto;
  font-family: "Roboto", "HelveticaNeue-Light", sans-serif;
  @media (max-width: 800px) {
    width: 85vw;
  }
`;
const StatusInfo = styled.div`
  margin-left: 40px;
`;
const Status = styled.p`
  color: #001b48;
`;
const StatusSubmitbtn = styled.button`
  padding: 10px;
  background: orange;
  color: #ffff;
  border: none;
  margin: auto;
  border-radius: 10px;
`;
const Order = styled.div`
  width: 74%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 800px) {
    width: 95%;
    padding: 3px;
    margin-top: 60px;
  }
`;
const OrderImg = styled.img`
  @media (max-width: 800px) {
    width: 24%;
  }
`;
const OrderName = styled.p`
  @media (max-width: 800px) {
    display: none;
  }
`;
const OrderedBy = styled.p`
  color: #001b48;
  font-weight: bold;
`;
const OrderInfo = styled.p``;
const Shipping = styled.div`
  margin-left: 40px;
`;
const ShippingInfo = styled.p``;
const Select = styled.select`
  padding: 11px;
  border: 2px solid #001b48;
`;
export default Soldstatus;
