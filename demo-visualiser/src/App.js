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
  const { src, name, personSeen, id, currentPersons } = props;
  let imgClass = "face";
  if (personSeen) imgClass += " filtered";
  if (currentPersons.includes(id)) imgClass += " selected";
  return (
    <div className="person-container">
      <img className={imgClass} src={src} alt="Missing person"></img>
      {name}
    </div>
  );
};

function App() {
  const [rankedPersons, setRankedPersons] = useState([]);
  const [currentPersons, setCurrentPersons] = useState([]);

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient(origin);
        socket.on("rankedPersons", rankedPersons => {
          setCurrentPersons(rankedPersons.currentPersons);
          setRankedPersons(rankedPersons.rankedPersons);
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
          {rankedPersons.map(person => (
            <Item key={person.name}>
              <Face
                key={person.name}
                id={person._id}
                src={`${origin}${person.img_url}`}
                name={person.name}
                personSeen={person.personSeen}
                currentPersons={currentPersons}
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
