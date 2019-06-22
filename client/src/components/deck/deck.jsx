import React from 'react';
import Grid, { GridItem } from 'mineral-ui/Grid';
import axios from 'axios';
import PersonCard from '../person-card';
import MatchCard from '../match-card';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckIndex: null,
      choices: [],
      deckStatus: 0,
    };
  }

  componentDidMount = () => {
    const { startingDecisionID } = this.props;
    this.setDeckChoices(startingDecisionID);
  }

  setDeckChoices = (deckIndex) => {
    try {
      axios.get(`http://localhost:9100/api/v1/decisions/${deckIndex}`)
        .then(response => this.setState({ choices: response.data.choices }));
    } catch (error) {
      throw new Error(error);
    }
  }

  reactToCardClick = (nextId) => {
    const { onFailure } = this.props;
    if (!nextId) {
      onFailure();
    } else {
      this.setState({
        deckIndex: nextId,
      });
      this.setDeckChoices(nextId);
    }
  }

  renderChildren = (choices) => {
    const children = [];
    choices.forEach((choice) => {
      const { persons_id, next_decision_id } = choice;
      children.push(
        <GridItem key={persons_id} data-cy={`deck-${persons_id}`}>
          <PersonCard
            id={persons_id}
            onClick={() => {
              this.reactToCardClick(next_decision_id);
            }}
          />
        </GridItem>,
      );
    });
    return children;
  }

  render() {
    const gridStyle = { padding: '30px' };
    const { choices } = this.state;
    return (
      <Grid
        gutterWidth="lg"
        style={gridStyle}
      >
        {this.renderChildren(choices)}
      </Grid>
    );
  }
}

export default Deck;
