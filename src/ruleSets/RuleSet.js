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
    CardLogic.ranks.forEach(function (rank) {
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
        props: { ...this.defaultTableauProps },
        stack: new Stack()
      });
    }
    return tableaus;
  }

  createFoundations () {
    let foundations = [];
    for (let i = 0; i < this.foundationCount; i++) {
      foundations.push({
        id: 'fdtn-' + i,
        props: { ...this.defaultFoundationProps },
        stack: new Stack()
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

  render () {
    return null;
  }
}
