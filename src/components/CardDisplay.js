import React from 'react';

import { ItemTypes } from 'helpers/constants';
import { DragSource } from 'react-dnd';

import CardLogic from 'helpers/cardLogic';
import CardSymbols from 'helpers/cardSymbols';
import 'styles/card.scss';

function CardDisplay ({ isDragging, unicodeMode, ...props }) {
  if  (isDragging) {
    return null;
  }
  if (unicodeMode) {
    return renderUnicodeMode(props);
  }
  return renderStandardMode(props);
}

// use unicode card characters
function renderUnicodeMode ({ rank, suit, faceup, style, connectDragSource }) {
  const className = "card card-" + suit;
  const unicodeCard = CardSymbols.cards[rank + '-' + suit];

  if(faceup) {
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

// TODO: finish standard mode
function renderStandardMode ({ rank, suit, style, faceup, connectDragSource }) {
  const className = "card card-" + suit;
  const suitSymbol = CardSymbols.colorSuits[suit];
  if(faceup) {
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

// TODO: flex pips on rank
// TODO: handle face cards
function pips (rank, suitSymbol) {
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

const cardDragSpec = {
  beginDrag({ id, rank, suit, stackId }, monitor, component) {
    const card = {
      id, rank, suit, stackId,
    };
    return card;
  },
  canDrag({ canDrag, ...props }, monitor) {
    return canDrag(props);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(ItemTypes.CARD, cardDragSpec, collect)(CardDisplay);
