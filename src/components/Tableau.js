import React, { Component } from 'react';
import Card from 'components/Card'
import 'styles/stacks.scss'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class Tableau extends Component {
  render () {
    const { stack, display, unicodeMode, connectDropTarget } = this.props;
    const empty = stack.isEmpty();

    const className="tableau tableau-" +
      (display ? display : 'vertical') +
      (empty ? " tableau-empty" : "");

    const posType = (display === 'horizontal') ? 'left' : 'top';

    let offset;
    if(unicodeMode) {
      offset = (display === 'horizontal' ? 16 : 26);
    }
    else {
      offset = (display === 'horizontal') ? 20 : 30;
    }

    // TODO: faceup should be set on the card by the controller, not hard coded

    return connectDropTarget(
      <div className={className}>
      {
        stack.cards.map((card, index) => (
          <Card key={ card.id } faceup={ true } canDrag={ this.canDragCard.bind(this) }
            style={{ [posType]: `${offset * index}px` }} unicodeMode={ unicodeMode }
            removeFromPreviousStack={ this.removeCard.bind(this) }
            { ...card } />
        ))
      }
      </div>
    );
  }

  removeCard(cardId) {
    this.props.removeCard(cardId, this.props.idx);
  }

  canDragCard(card) {
    return this.props.canDragCard(card, this.props.idx);
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
