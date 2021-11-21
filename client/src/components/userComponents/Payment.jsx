import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "../../css/payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const orderid = location.state.orderid;
  const totalPrice = location.state.price;
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const payBtn = useRef();
  const stripe = useStripe();
  const [succeedded, setSucceeded] = useState(false);
  const elements = useElements();
  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };
  const submitHandler = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/v1/payment/process",
        withCredentials: true,

        data: {
          amount: paymentData.amount,
          id: orderid,
        },
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) alert("Please enter correct information");
      else {
        const result = await stripe
          .confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
              },
            },
          })
          .then(() => {
            setSucceeded(true);
            alert("Your payment was successful!");
            history.push("/");
          });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <PaymentContainer>
        <PaymentForm>
          <h1>Card Info</h1>
          <div>
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <CardCvcElement className="paymentInput" />
          </div>
          <PaymentInput
            type="submit"
            value={`Pay - $ ${totalPrice}`}
            ref={payBtn}
            onClick={(e) => {
              e.preventDefault();
              e.target.value = "Processing";
              submitHandler();
            }}
          />
        </PaymentForm>
        <p>Since it's a portfolio project with no real users,</p>
        <p>
          please do not enter your personal credit card details.<b></b>
          Instead, you can enter "424242..." right from the card number to cvv.
        </p>
      </PaymentContainer>
    </>
  );
};
const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PaymentForm = styled.form`
  padding: 2rem;
`;
const PaymentInput = styled.input`
  padding: 1rem;
  outline: none;
  margin: 2rem;
  color: white;
  background: #001b48;
  border: none;
  border-radius: 10px;
  margin-left: 100px;
  &:hover {
    background: #001b48b5;
  }
`;
export default Payment;
