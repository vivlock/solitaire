import React, { Component } from 'react';
import Card from 'Card'
import 'styles/stacks.scss'

class Tableau extends Component {
  render () {
    const empty = this.props.stack.isEmpty();
    const cards = this.props.stack.cards;
    const className="tableau tableau-" +
      (this.props.display ? this.props.display : 'vertical') +
      (empty ? " tableau-empty" : "");

    const posType = (this.props.display === 'horizontal') ? 'left' : 'top';
    let offset;
    if(this.props.unicodeMode) {
      offset = (this.props.display === 'horizontal' ? 16 : 26);
    }
    else {
      offset = (this.props.display === 'horizontal') ? 20 : 30;
    }
    const { draggable, unicodeMode } = this.props;
    // TODO: faceup should be set on the card by the controller, not hard coded
    return (
      <div className={className}>
      {
        cards.map((card, index) => (
          <Card key={ card.id } faceup={ true } draggable={ draggable }
            style={{ [posType]: `${offset * index}px` }} unicodeMode={ unicodeMode }
            {...card} />
        ))
      }
      </div>
    );
  }
}

export default Tableau;
