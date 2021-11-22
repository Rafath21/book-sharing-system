import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/myOrdersActions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FadingBalls } from "react-cssfx-loading";
import Loader from "./Home";
const Orders = () => {
  let dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { orders, loading } = useSelector((state) => state.orders);
  let history = useHistory();
  useEffect(() => {
    dispatch(myOrders(user.username));
  }, [history, dispatch, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader>
          <FadingBalls width="50px" height="50px" color="#001b48" />
        </Loader>
      ) : (
        <Container>
          <Heading>Your Orders</Heading>
          <Items>
            {orders.length > 0
              ? orders.map((order, index) => {
                  return (
                    <Item key={index}>
                      <ItemImg src={order.book.img.url}></ItemImg>
                      <ItemName>{order.book.name}</ItemName>
                      <Soldby>Sold by:</Soldby>
                      <ItemInfo>{order.book.soldby} </ItemInfo>
                      <ItemInfo>$ {order.book.price}</ItemInfo>
                      <OrderStatus>
                        {order.OrderStatus == "Denied" ? (
                          <OrderDenied>
                            <ItemInfo>Order Accepted</ItemInfo>
                          </OrderDenied>
                        ) : (
                          <OrderPlaced>
                            <ItemInfo>{order.OrderStatus}</ItemInfo>
                          </OrderPlaced>
                        )}
                        <PaymentInfo>
                          {order.paymentInfo == "paid" ? (
                            <Paid>Paid</Paid>
                          ) : (
                            <Paynow
                              onClick={() => {
                                console.log(order.book.price);
                                history.push({
                                  pathname: "/payment",
                                  state: {
                                    price: order.book.price,
                                    orderid: order._id,
                                  },
                                });
                              }}
                            >
                              Pay now
                            </Paynow>
                          )}
                        </PaymentInfo>
                      </OrderStatus>
                    </Item>
                  );
                })
              : ""}
          </Items>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", "HelveticaNeue-Light", sans-serif;
`;
const Heading = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;
const Items = styled.div`
  flex-grow: 0.8;
  display: flex;
  flex-direction: column;
  width: 50vw;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  padding: 5px;
  border-bottom: 2px solid orange;
`;
export const Soldby = styled.p`
  font-weight: bold;
`;
export const ItemImg = styled.img`
  max-height: 10%;
  max-width: 17%;
`;
export const ItemInfo = styled.p``;
export const ItemName = styled.p`
  color: #001b48;
  @media (max-width: 800px) {
    display: none;
  }
`;

const OrderPlaced = styled.div`
  background: #90d790a6;
  padding: 3px;
  border-radius: 15px;
  color: #1d5c5c;
  border: 2px solid #47976a;
  font-size: 0.8rem;
  text-align: center;
`;
const OrderDenied = styled.div`
  background: #f38787;
  padding: 3px;
  border-radius: 15px;
  color: #800000;
  border: 2px solid red;
  font-size: 0.8rem;
`;
const PaymentInfo = styled.button`
  background: #87cbf3;
  padding: 3px;
  text-align: center;
  border-radius: 10px;
  color: #001b48;
  border: 2px solid #6c8ff1;
  height: 10%;
  margin-top: 5px;
  margin-left: 16px;
`;
const Paid = styled.p``;
const Paynow = styled.p``;

const OrderStatus = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Orders;
