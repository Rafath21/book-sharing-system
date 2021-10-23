import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getallUsers } from "../../actions/adminActions";
import axios from "axios";
const AllUsers = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const { allusers } = useSelector((state) => state.allusers);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(async () => {
    dispatch(getallUsers());
  }, [user, isAuthenticated, isUpdated, dispatch]);
  async function handleDelete(user) {
    let confirmation = window.confirm(
      "Are you Sure you want to delete this user?"
    );

    if (confirmation) {
      try {
        const { data } = await axios({
          method: "delete",
          data: {
            userid: user._id,
          },
          withCredentials: true,
          url: "/api/v1/allusers",
        }).then(() => {
          setIsUpdated(true);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function handleUpdate(user) {
    let UserRole;
    if (user.role == "admin") {
      UserRole = "user";
    } else {
      UserRole = "admin";
    }
    let confirmation = window.confirm(
      "Are you Sure you want to update this user?"
    );
    if (confirmation) {
      try {
        const { data } = await axios({
          method: "put",
          data: {
            userid: user._id,
            role: UserRole,
          },
          withCredentials: true,
          url: "/api/v1/allusers",
        }).then(() => {
          setIsUpdated(true);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <Section>
      <h1>All Users on BookSharing app:</h1>
      {allusers &&
        allusers.map((user, index) => {
          return (
            <Element key={index}>
              <h4>Username:</h4>
              <Username>{user.username}</Username>
              <h4>Role:</h4>
              <Role>{user.role}</Role>
              <h4>Bought:</h4>
              <p>{user.orders.length}</p>
              <h4>Sold:</h4>
              <p>{user.sold.length}</p>
              <Delete
                onClick={() => {
                  handleDelete(user);
                }}
              >
                Delete
              </Delete>
              <Update
                onClick={(e) => {
                  e.preventDefault();
                  setRole(user.role);
                  handleUpdate(user);
                }}
              >
                {user.role == "admin" ? "Remove Admin" : "Make Admin"}
              </Update>
            </Element>
          );
        })}
    </Section>
  );
};
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", "HelveticaNeue-Light", sans-serif;
  @media (max-width: 700px) {
    padding: 1rem;
  }
`;
export const Element = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 2px solid orange;
  width: 70%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Username = styled.p``;
const Role = styled.p``;
export const Delete = styled.button`
  border: none;
  background: #d92626;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
  &:hover {
    background: #d92626a6;
  }
`;
const Update = styled.button`
  border: none;
  background: #00a1ffe3;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
  &:hover {
    background: #00a1ff8a;
  }
`;
export default AllUsers;
