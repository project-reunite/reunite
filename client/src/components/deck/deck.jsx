import React from 'react';
import Grid, { GridItem } from 'mineral-ui/Grid';
import axios from 'axios';
import PersonCard from '../person-card';
import MatchCard from '../match-card';

class Deck extends React.Component {
  constructor() {
    super();
    this.state = {
      deckIndex: 0,
      cardInfo: [],
    };
  }

  componentDidMount = () => {
    const { deckIndex } = this.state;
    this.setCardInfo(deckIndex);
  }

  // TODO: Update the deckIndex in here from the API response
  setCardInfo = (deckIndex) => {
    try {
      axios.get(`http://localhost:9100/api/v1/persons/pairs/${deckIndex}`)
        .then(response => this.setState({ cardInfo: response.data }));
    } catch (error) {
      throw new Error(error);
    }
  }

  reactToCardClick = () => {
    const { deckIndex } = this.state;
    const newDeckIndex = deckIndex + 1;
    this.setState({ deckIndex: newDeckIndex });
    this.setCardInfo(newDeckIndex);
  }

  renderChildren = (data) => {
    const children = [];
    const { deckIndex } = this.state;
    data.forEach((person) => {
      children.push(
        <GridItem key={person.name} data-cy={`deck-${deckIndex}`}>
          <PersonCard
            name={person.name}
            age={person.age}
            gender={person.gender}
            img={person.img_url}
            onClick={() => {
              this.reactToCardClick();
            }}
          />
        </GridItem>,
      );
    });
    return children;
  }

  render() {
    const gridStyle = { padding: '30px' };
    const { deckIndex, cardInfo } = this.state;
    if (deckIndex < 8) {
      return (
        <Grid
          gutterWidth="lg"
          style={gridStyle}
        >
          {this.renderChildren(cardInfo)}
        </Grid>
      );
    }
    return <MatchCard />;
  }
}

export default Deck;
