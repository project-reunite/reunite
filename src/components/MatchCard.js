import React from "react";

export default class MatchCard extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <Firework />
        <h1> MATCH! Please find an aid worker as soon as possible</h1>
      </div>
    );
  }
}

const Firework = () => {
  return <img src={"firework.jpg"} alt={""} />;
};

const divStyle = {
  color: "black",
  fontSize: "40px"
};
