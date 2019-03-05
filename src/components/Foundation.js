import React, { Component } from 'react';
import Card from 'components/Card';
import 'styles/stacks.scss';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class Foundation extends Component {
  render () {
    const { unicodeMode, connectDropTarget } = this.props;
    const className="foundation" + (this.props.stack.isEmpty() ? " foundation-empty" : "");
    const topCard = this.props.stack.peek();

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
    this.props.removeCard(cardId, this.props.idx);
  }
  canDragCard(card) {
    return this.props.canDragCard(card, this.props.idx);
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
