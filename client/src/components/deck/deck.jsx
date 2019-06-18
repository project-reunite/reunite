import React from 'react';
import Grid, { GridItem } from 'mineral-ui/Grid';
import axios from 'axios';
import PersonCard from '../person-card';
import Data from '../../data';
import MatchCard from '../match-card';

class Deck extends React.Component {
  constructor() {
    super();
    this.state = {
      deckIndex: 0,
    };
    this.cardInfo = [];
    this.renderChildren = this.renderChildren.bind(this);
  }

  async componentDidMount() {
    this.cardInfo = await this.getData();
    this.setState({});
  }

  async getData() {
    const { deckIndex } = this.state;
    try {
      console.log(deckIndex);
      const response = await axios.get(`http://localhost:9100/api/v1/persons/pairs/${deckIndex}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  renderChildren(data) {
    const children = [];
    const { deckIndex } = this.state;
    // console.log(data);
    data.forEach((person) => {
      children.push(

        <GridItem key={person.name} data-cy={`deck-${deckIndex}`}>
          <PersonCard
            name={person.name}
            age={person.age}
            gender={person.gender}
            img={person.img_url}
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
      return (
        <Grid
          gutterWidth="lg"
          style={gridStyle}
        >
          {this.renderChildren(this.cardInfo)}
        </Grid>
      );
    }
    return <MatchCard />;
  }
}

export default Deck;
