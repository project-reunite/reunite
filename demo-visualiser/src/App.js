import React, { useState, useEffect } from "react";
import { origin } from "./config";
import socketIOClient from "socket.io-client";
import posed, { PoseGroup } from "react-pose";
import "./App.css";

const Item = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

const Face = props => {
  const { src, name } = props;
  return (
    <div className="person-container">
      <img className="face" src={src} alt="Missing person"></img>
      {name}
    </div>
  );
};

function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient(origin);
        socket.on("rankedPeople", urls => {
          console.log(urls);
          setUrls(urls);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchNewOrder();
  }, []);

  const faces = () => {
    return (
      <ul id="#menu">
        <PoseGroup>
          {urls.map(url => (
            <Item key={url.name}>
              <Face
                key={url.name}
                src={`${origin}${url.img_url}`}
                name={url.name}
              />
            </Item>
          ))}
        </PoseGroup>
      </ul>
    );
  };

  return [faces()];
}

export default App;
