import React from 'react';

import { ItemTypes } from 'helpers/dragHelper';
import { DragSource } from 'react-dnd';

import CardLogic from 'helpers/cardLogic';
import CardSymbols from 'helpers/cardSymbols';
import 'styles/card.scss';

const cardSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      // need a reference to the fromStack - pass in from props?
    };
  },
  canDrag(props, monitor) {
    return props.draggable;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

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

  if (props.unicodeMode) {
    const { rank, suit, style, draggable } = props;
    const className = "card card-" + suit + (draggable ? ' draggable' : '');
    const unicodeCard = CardSymbols.cards[rank + '-' + suit];

    if(props.faceup) {
      return connectDragSource(
        <div className={ className } style={ style } draggable={ draggable }>
          <div className='card-symbol'>
            { unicodeCard }
          </div>
        </div>
      );
    }
    else {
      return connectDragSource(
        <div className='card' style={ style } draggable={ draggable }>
          { CardSymbols.cards['card-back'] }
        </div>
      );
    }
  }

  // this display isn't finished yet
  else {
    const { rank, suit, style, draggable } = props;
    const className = "card card-" + suit + (draggable ? 'draggable' : '')
    const suitSymbol = CardSymbols.colorSuits[suit];
    if(props.faceup) {
      return connectDragSource(
        <div className={ className } style={ style } draggable={ draggable }>
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

export default DragSource(ItemTypes.CARD, cardSpec, collect)(Card);
