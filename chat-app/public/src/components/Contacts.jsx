import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Logout from "./Logout";
import { FaBars } from "react-icons/fa"; // Import icon for menu

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isContactsVisible, setIsContactsVisible] = useState(false);

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
  };

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>ConvoR</h3>
        
      </div>
      <div className={`contacts ${isContactsVisible ? "show" : ""}`}>
      <FaBars className="menu-icon" onClick={() => setIsContactsVisible(!isContactsVisible)} />
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
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    position: relative; // Added to position menu icon

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }

    .menu-icon {
      display: none; // Hide menu icon by default
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      right: 1rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    transition: transform 0.3s ease-in-out; // Transition for sliding effect

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

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

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }

    &.show {
      transform: translateX(0); // Show the contacts list
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .contacts {
      position: fixed;
      top: 10%;
      right: 0;
      width: 80%;
      height: 90%;
      background-color: #080420;
      transform: translateX(100%); // Hide the contacts list by default
      z-index: 1000;
      overflow: auto;
      border-left: 1px solid #ffffff39;
    }

    .contacts.show {
      transform: translateX(0); // Show the contacts list when toggled
    }

    .brand .menu-icon {
      display: block; // Show menu icon on mobile
    }

    .current-user {
      gap: 1rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
