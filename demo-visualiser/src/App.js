import React, { useState, useEffect } from "react";
import { origin } from "./config";
// import apiRequests from "./utils/apiRequests";
import socketIOClient from "socket.io-client";
import posed, { PoseGroup } from "react-pose";
import { shuffleArray, shuffleArray2 } from "./utils/util-functions";
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

  const makeUrls = ids => {
    return ids.map(id => `/images/generated/6_features/${id}.png`);
  };

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient("http://localhost:9100");
        socket.on("rankedPeople", data => {
          const urls = makeUrls(data);
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
