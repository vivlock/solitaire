import React, { Component } from 'react';
import Card from 'components/CardDisplay';
import 'styles/stacks.scss';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class FoundationDisplay extends Component {
  render () {
    const { connectDropTarget } = this.props;
    const cards = (this.props.cards === undefined ? [] : this.props.cards);
    const empty = cards.length === 0;

    const className="foundation" + (empty ? " foundation-empty" : "");
    const topCard = cards[-1];

    return connectDropTarget(
      <div className={ className }>
        { !empty ?
          <Card key={ topCard.id } canDrag={ this.canDragCard.bind(this) }
            faceup={ true }
            removeFromPreviousStack={ this.removeCard.bind(this) }
            { ...topCard }
          /> : "" }
      </div>
    )
  }
  removeCard(cardId) {
    this.props.removeCard(cardId, this.props.id);
  }
  canDragCard(card) {
    return this.props.canDragCard(card, this.props.id);
  }
}

const foundationDropSpec = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    card.removeFromPreviousStack(card.id);
    props.handleMoveOnto(card, props.id);
  },
  canDrop(props, monitor) {
    return props.canMoveOnto(monitor.getItem(), props.id);
  }
}

function foundationCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default DropTarget(ItemTypes.CARD, foundationDropSpec, foundationCollect)(FoundationDisplay);
