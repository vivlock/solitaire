import React, { Component } from 'react';
import Card from 'Card'
import 'styles/stacks.scss'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

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

    const { unicodeMode } = this.props;
    const { connectDropTarget } = this.props;

    // TODO: faceup should be set on the card by the controller, not hard coded

    return connectDropTarget(
      <div className={className}>
      {
        cards.map((card, index) => (
          <Card key={ card.id } faceup={ true } canDrag={ this.canDragCard.bind(this) }
            style={{ [posType]: `${offset * index}px` }} unicodeMode={ unicodeMode }
            removeFromPreviousStack={ this.removeCard.bind(this) }
            {...card} />
        ))
      }
      </div>
    );
  }

  removeCard(cardId) {
    console.log('removecard tableau ' + this.props.idx, cardId);
    this.props.removeCard(cardId, this.props.idx);
  }

  canDragCard(cardId) {
    return this.props.canDragCard(cardId, this.props.idx);
  }
}

const tableauDropSpec = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    card.removeFromPreviousStack(card.id);
    props.handleMoveOnto(card, props.idx);
  },
  canDrop(props, monitor) {
    return props.canMoveOnto(monitor.getItem(), props);
  }
}

function tableauCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default DropTarget(ItemTypes.CARD, tableauDropSpec, tableauCollect)(Tableau);
