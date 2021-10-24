import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getallOrders } from "../../actions/adminActions";
import { Section, Element } from "./AllUsers";
import { useEffect } from "react";
const AllOrders = () => {
  const dispatch = useDispatch();
  const { allorders } = useSelector((state) => state.allorders);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getallOrders());
  }, [user, isAuthenticated]);

  return (
    <Section>
      <h1>All Orders on BookSharing app:</h1>
      {allorders &&
        allorders.map((order, index) => {
          return (
            <Element key={index}>
              <h4>Book name:</h4>
              <p>{order.book.name}</p>
              <h4>Sold By:</h4>
              <p>{order.book.soldby}</p>
              <h4>Ordered By:</h4>
              <p>{order.boughtBy}</p>
              <h4>Status</h4>
              <p>{order.OrderStatus}</p>
            </Element>
          );
        })}
    </Section>
  );
};

export default AllOrders;
