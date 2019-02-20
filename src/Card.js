import React from 'react';
import CardLogic from 'helpers/cardLogic';
import CardSymbols from 'helpers/cardSymbols';
import 'styles/card.scss';

export default function Card (props) {
  const className = "card card-" + props.suit;

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

  if(props.faceup) {
    const { rank, style, draggable } = props;
    const suitSymbol = CardSymbols.colorSuits[props.suit];
    return (
      <div className={ className } style={ style } draggable={ draggable }>
        <div className="card-inner">
          <div className="top-left">
            <div className="rank">{ rank }</div>
            <div className="suit">{ suitSymbol }</div>
          </div>
          { pips(rank, suitSymbol) }
        </div>
      </div>
    )
  }
  else {
    return <div class="card card-back"></div>
  }
}
