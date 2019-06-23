import React from 'react';
import Grid, { GridItem } from 'mineral-ui/Grid';
import axios from 'axios';
import PersonCard from '../person-card';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
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
    if (nextId) {
      this.setDeckChoices(nextId);
    } else {
      onFailure();
    }
  }

  renderChildren = (choices) => {
    const { onMatch } = this.props;
    const children = [];
    choices.forEach((choice) => {
      const personId = choice.persons_id;
      const nextDecisionId = choice.next_decision_id;
      children.push(
        <GridItem key={personId} data-cy="deck">
          <PersonCard
            id={personId}
            onClick={() => {
              this.reactToCardClick(nextDecisionId);
            }}
            onMatch={onMatch}
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
