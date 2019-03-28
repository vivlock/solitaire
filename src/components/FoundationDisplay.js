import React, { Component } from 'react';
import Card from 'containers/Card';
import 'styles/stacks.scss';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class FoundationDisplay extends Component {
  render () {
    const { connectDropTarget } = this.props;
    const cards = (this.props.cards === undefined ? [] : this.props.cards);
    const length = cards.length;
    const empty = length === 0;

    const className="foundation" + (empty ? " foundation-empty" : "");
    const topCard = cards[length - 1];

    return connectDropTarget(
      <div className={ className }>
        { !empty ?
          <Card key={ topCard.id }
            faceup={ true }
            canDrag={ this.canDragCard.bind(this) }
            stackId={ this.props.id }
            { ...topCard }
          /> : "" }
      </div>
    )
  }
  canDragCard(card) {
    return this.props.canDragCard(card, this.props.cards);
  }
}

const foundationDropSpec = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    props.handleMoveCard(props.dispatch, card, card.stackId, props.id);
  },
  canDrop(props, monitor) {
    return props.canMoveOnto(monitor.getItem(), props.cards);
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
