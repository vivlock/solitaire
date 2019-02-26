import React from 'react';

import { ItemTypes } from 'helpers/constants';
import { DragSource } from 'react-dnd';

import CardLogic from 'helpers/cardLogic';
import CardSymbols from 'helpers/cardSymbols';
import 'styles/card.scss';

function Card ({ connectDragSource, isDragging, ...props }) {

  // TODO: flex pips on rank
  //const pips = <div className="pip">{ props.suit }</div>
  const pips = (rank, suitSymbol) => {
    const rankVal = CardLogic.getRankValue(rank);
    if (rankVal < 11) { // only generate pips for non-face cards
      let pipItems = [];
      for(let i = 0; i < rankVal; i++) {
        pipItems.push(<div className="pip">{ suitSymbol }</div>)
      }
      return (
        <div className="pips">
          { pipItems }
        </div>
      )
    }
    else {
      return null;
    }
  }

  if  (isDragging) {
    // hide in stack while dragging
    return null;
  }
  else {
    if (props.unicodeMode) {
      const { rank, suit, style } = props;
      const className = "card card-" + suit;
      const unicodeCard = CardSymbols.cards[rank + '-' + suit];

      if(props.faceup) {
        return connectDragSource(
          <div className={ className } style={ style }>
            <div className='card-symbol'>
              { unicodeCard }
            </div>
          </div>
        );
      }
      else {
        return connectDragSource(
          <div className='card' style={ style }>
            { CardSymbols.cards['card-back'] }
          </div>
        );
      }
    }

    // this display isn't finished yet
    else {
      const { rank, suit, style } = props;
      const className = "card card-" + suit;
      const suitSymbol = CardSymbols.colorSuits[suit];
      if(props.faceup) {
        return connectDragSource(
          <div className={ className } style={ style }>
            <div className="card-inner">
              <div className="top-left">
                <div className="rank">{ rank }</div>
                <div className="suit">{ suitSymbol }</div>
              </div>
              { pips(rank, suitSymbol) }
            </div>
          </div>
        );
      }
      else {
        return connectDragSource(
          <div class="card card-back"></div>
        );
      }
    }
  }
}

const cardDragSpec = {
  beginDrag(props, monitor, component) {
    const card = {
      id: props.id,
      rank: props.rank,
      suit: props.suit,
      removeFromPreviousStack: props.removeFromPreviousStack
    };
    return card;
  },

  canDrag(props, monitor) {
    let canDrag = props.canDrag(props.id);
    console.log('candrag'+props.id, canDrag);
    return canDrag;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(ItemTypes.CARD, cardDragSpec, collect)(Card);
