import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isChatOpen, setIsChatOpen] = useState(true); // State to control chat visibility

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      );
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsChatOpen(true); // Open the chat component when a contact is selected
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); // Close the chat component
  };

  return (
    <>
      <Container isChatOpen={isChatOpen}>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {isChatOpen && (
            <div className="chat-container">
              <CloseButton onClick={handleCloseChat}>×</CloseButton>
              {currentChat === undefined ? (
                <Welcome />
              ) : (
                <ChatContainerWrapper>
                  <ChatContainer currentChat={currentChat} socket={socket} />
                </ChatContainerWrapper>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: ${({ isChatOpen }) => (isChatOpen ? "25% 75%" : "100%")};
    position: relative;

    @media screen and (min-width: 480px) and (max-width: 1080px) {
      grid-template-columns: ${({ isChatOpen }) => (isChatOpen ? "35% 65%" : "100%")};
    }
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;

const ChatContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: red;
  }
`;
