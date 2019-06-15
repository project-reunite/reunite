import React from 'react';
import UIServiceCard from './UIServiceCard';
import Grid, { GridItem } from 'mineral-ui/Grid';
import Data from '../data';
import MatchCard from './MatchCard';
class Deck extends React.Component {
  constructor() {
    super();
    this.state = {
      deckIndex: 0
    };
  }

  renderChildren(data) {
    const children = [];
    data.forEach((person, index) => {
      children.push(
        <GridItem key={index}>
          <UIServiceCard
            name={person.name}
            age={person.age}
            gender={person.gender}
            img={person.img}
            key={index}
            onClick={() => {
              this.setState({ deckIndex: this.state.deckIndex + 1 });
            }}
          />
        </GridItem>
      );
    });
    return children;
  }

  render() {
    if (this.state.deckIndex < Data.length) {
      const data = Data[this.state.deckIndex];
      return (
        <Grid
          gutterWidth='lg'
          style={{
            padding: '30px'
          }}
        >
          {this.renderChildren(data)}
        </Grid>
      );
    } else {
      return <MatchCard />;
    }
  }
}

export default Deck;
