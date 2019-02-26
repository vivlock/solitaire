import React, { Component } from 'react';
import Card from 'Card';
import 'styles/stacks.scss';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class Foundation extends Component {
  render () {
    const className="foundation" + (this.props.stack.isEmpty() ? " foundation-empty" : "");
    const topCard = this.props.stack.peek();
    const { unicodeMode } = this.props;
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={ className }>
        { topCard !== undefined ?
          <Card key={ topCard.id } canDrag={ this.canDragCard.bind(this) }
            faceup={ true } unicodeMode={ unicodeMode }
            removeFromPreviousStack={ this.removeCard.bind(this) }
            { ...topCard }
          /> : "" }
      </div>
    )
  }
  removeCard(cardId) {
    console.log('removeCard foundation '+this.props.idx, cardId);
    this.props.removeCard(cardId, this.props.idx);
  }
  canDragCard(cardId) {
    return this.props.canDragCard(cardId, this.props.idx);
  }
}

const foundationDropSpec = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    card.removeFromPreviousStack(card.id);
    props.handleMoveOnto(card, props.idx);
  },
  canDrop(props, monitor) {
    return props.canMoveOnto(monitor.getItem(), props);
  }
}

function foundationCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default DropTarget(ItemTypes.CARD, foundationDropSpec, foundationCollect)(Foundation);
