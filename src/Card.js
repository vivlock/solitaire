import React from 'react';
import CardLogic from 'helpers/cardLogic'
import 'styles/card.scss'

export default function Card (props) {
  const className = "card card-" + CardLogic.getSuitName(props.suit)

  // TODO: flex pips on rank
  const pips = <div className="pip">{ props.suit }</div>

  if(props.faceup) {
    return (
      <div className={ className } style={ props.style }>
        <div className="card-inner">
          <div className="top-left">
            <span className="rank">{ props.rank }</span>
            <span className="suit">{ props.suit }</span>
          </div>
          <div className="pips">
            { pips }
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div class="card card-back"></div>
  }
}
