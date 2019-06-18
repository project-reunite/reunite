import React from 'react';
import Grid, { GridItem } from 'mineral-ui/Grid';
import PersonCard from '../person-card';
import Data from '../../data';
import MatchCard from '../match-card';

class Deck extends React.Component {
  constructor() {
    super();
    this.state = {
      deckIndex: 0,
    };
  }

  renderChildren(data) {
    const children = [];
    const { deckIndex } = this.state;
    data.forEach((person) => {
      children.push(
        <GridItem key={person.name} data-cy={`deck-${deckIndex}`}>
          <PersonCard
            name={person.name}
            age={person.age}
            gender={person.gender}
            img={person.img}
            onClick={() => {
              this.setState(prevState => ({ deckIndex: prevState.deckIndex + 1 }));
            }}
          />
        </GridItem>,
      );
    });
    return children;
  }

  render() {
    const gridStyle = { padding: '30px' };
    const { deckIndex } = this.state;
    if (deckIndex < Data.length) {
      const data = Data[deckIndex];
      return (
        <Grid
          gutterWidth="lg"
          style={gridStyle}
        >
          {this.renderChildren(data)}
        </Grid>
      );
    }
    return <MatchCard />;
  }
}

export default Deck;