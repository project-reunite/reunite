import React, { useState, useEffect } from "react";
import { origin } from "./config";
// import apiRequests from "./utils/apiRequests";
import socketIOClient from "socket.io-client";
import posed, { PoseGroup } from "react-pose";
import "./App.css";

//TODO: call this at start ?
// const getUrls = async () => {
//   const response = await apiRequests.getPersonUrls();
//   const urls = response.data;
//   return urls;
// };

const Item = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

const Face = props => {
  const { src } = props;
  return <img className="face" src={src} alt="Missing person"></img>;
};

function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient(origin);
        socket.on("rankedPeople", urls => {
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
            <Item key={url}>
              <Face key={url} src={`${origin}${url}`} />
            </Item>
          ))}
        </PoseGroup>
      </ul>
    );
  };

  return [faces()];
}

export default App;
