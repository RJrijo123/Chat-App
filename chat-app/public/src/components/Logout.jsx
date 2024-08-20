import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    // Use the specific key for retrieving the current user
    const user = localStorage.getItem("chat-app-current-user");

    if (user) {
      const { _id } = JSON.parse(user);

      try {
        const { status } = await axios.get(`${logoutRoute}/${_id}`);
        
        if (status === 200) {
          // Clear localStorage and navigate to login page
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
