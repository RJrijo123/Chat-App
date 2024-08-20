import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Logout from "./Logout";
import { FaBars } from "react-icons/fa";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    setIsDrawerOpen(false); // Close the drawer
  };

  return (
    <Container>
      <div className="header">
        <img src={Logo} alt="logo" />
        <h3>ConvoR</h3>
        <FaBars className="menu-icon" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
      </div>
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="contacts">
          {contacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="current-user">
        <Logout />
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #080420;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #131324;

    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    .menu-icon {
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      display: none; /* Hidden by default */
    }
  }

  .drawer {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100%;
    background-color: #080420;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    transition: left 0.3s ease;
    overflow-y: auto;
    z-index: 1000;

    &.open {
      left: 0;
    }

    .contacts {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      margin-top: 2rem;

      .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;

        .avatar img {
          height: 3rem;
        }
        .username h3 {
          color: white;
        }
      }
      .selected {
        background-color: #9a86f3;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    position: relative;
    z-index: 10;

    .avatar img {
      height: 4rem;
      max-inline-size: 100%;
    }
    .username h2 {
      color: white;
    }
  }

  /* Responsive Styles */
  @media (max-width: 720px) {
    .header .menu-icon {
      display: block; /* Show menu icon on mobile */
    }
  }
`;
