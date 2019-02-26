import { Component } from 'react';
import CardLogic from 'helpers/cardLogic';
import Stack from 'stacks/Stack';

export default class RuleSet extends Component {
  constructor (props) {
    super(props);
    // defaults
    this.tableauCount = 7;            // number of tableau piles
    this.foundationCount = 4;         // number of foundation piles
    this.defaultDeckProps = {};       // props to be passed to deck
    this.defaultTableauProps = {};    // props to be passed to tableaus
    this.defaultFoundationProps = {}; // props to be passed to foundations
  }

  // standard single 52-card poker deck
  //   only need to override for mixed deck games like Spider
  //   --be sure to set up unique card ids if overriding
  createCards () {
    let cards = [];
    Object.keys(CardLogic.ranks).forEach(function (rank) {
      for(let suit in CardLogic.suits) {
        cards.push({ suit: CardLogic.suits[suit], rank: rank, id: `card-${rank}-${suit}` });
      }
    });
    return cards;
  }

  createTableaus () {
    let tableaus = [];
    for (let i = 0; i < this.tableauCount; i++) {
      tableaus.push({
        id: 'tbl-' + i,
        stack: new Stack(),
        props: { idx: i, ...this.defaultTableauProps }
      });
    }
    return tableaus;
  }

  createFoundations () {
    let foundations = [];
    for (let i = 0; i < this.foundationCount; i++) {
      foundations.push({
        id: 'fdtn-' + i,
        stack: new Stack(),
        props: { idx: i, ...this.defaultFoundationProps }
      });
    }
    return foundations;
  }

  createDeck () {
    return {
      props: { ...this.defaultDeckProps },
      stack: new Stack(this.createCards())
    };
  }

  handleMoveOntoFoundation (card, foundationIdx) {
    const { foundations } = this.state;
    let foundation = foundations[foundationIdx];
    foundation.stack.push(card);
    this.setState({
      foundations: foundations.slice(0, foundationIdx)
        .concat([foundation])
        .concat(foundations.slice(foundationIdx + 1))
    });
  }

  handleMoveOntoTableau (card, tableauIdx) {
    const { tableaus } = this.state;
    let tableau = tableaus[tableauIdx];
    tableau.stack.push(card);
    this.setState({
      tableaus: tableaus.slice(0, tableauIdx)
        .concat([tableau])
        .concat(tableaus.slice(tableauIdx + 1))
    });
  }

  handleRemoveFoundationCard (cardId, foundationIdx) {
    console.log('removecard foundation ruleset');
    const { foundations } = this.state;
    let foundation = foundations[foundationIdx];
    foundation.stack.removeCardById(cardId);
    console.log('stack after remove', foundation.stack);
    this.setState({
      foundations: foundations.slice(0, foundationIdx)
        .concat([foundation])
        .concat(foundations.slice(foundationIdx + 1))
    });
  }

  handleRemoveTableauCard (cardId, tableauIdx) {
    console.log('removecard tableau ruleset');
    const { tableaus } = this.state;
    let tableau = tableaus[tableauIdx];
    tableau.stack.removeCardById(cardId);
    this.setState({
      tableaus: tableaus.slice(0, tableauIdx)
        .concat([tableau])
        .concat(tableaus.slice(tableauIdx + 1))
    });
  }

  render () {
    return null;
  }
}
