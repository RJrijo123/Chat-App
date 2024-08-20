import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding: 1rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      font-size: 1.5rem; // Adjusted font size for mobile
      text-align: center; // Center-align text
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap; // Allow avatars to wrap to the next line
    gap: 1rem; // Adjusted gap for mobile
    justify-content: center; // Center avatars in the container

    .avatar {
      border: 0.3rem solid transparent; // Adjusted border size for mobile
      padding: 0.3rem; // Adjusted padding for mobile
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out; // Adjusted transition time
      img {
        height: 4rem; // Adjusted image height for mobile
        width: 4rem; // Ensure image is square
        transition: 0.3s ease-in-out;
      }
    }
    .selected {
      border: 0.3rem solid #4e0eff; // Adjusted border size for selected avatar
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 0.75rem 1.5rem; // Adjusted padding for mobile
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 0.9rem; // Adjusted font size for mobile
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  @media (max-width: 768px) {
    .title-container {
      h1 {
        font-size: 1.25rem; // Further reduce font size for tablets
      }
    }
    .avatars {
      gap: 0.5rem; // Further reduce gap for tablets
    }
    .submit-btn {
      padding: 0.5rem 1rem; // Further reduce padding for tablets
      font-size: 0.8rem; // Further reduce font size for tablets
    }
  }

  @media (max-width: 480px) {
    .title-container {
      h1 {
        font-size: 1rem; // Further reduce font size for mobile
      }
    }
    .avatars {
      gap: 0.25rem; // Further reduce gap for mobile
    }
    .submit-btn {
      padding: 0.5rem 0.75rem; // Further reduce padding for mobile
      font-size: 0.7rem; // Further reduce font size for mobile
    }
  }
`;
