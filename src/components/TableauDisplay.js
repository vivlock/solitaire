import React, { Component } from 'react';
import Card from 'containers/Card'
import 'styles/stacks.scss'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from 'helpers/constants'

class TableauDisplay extends Component {
  render () {
    const { display, unicodeMode, connectDropTarget } = this.props;
    const cards = (this.props.cards === undefined ? [] : this.props.cards);
    const empty = cards.length === 0;

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
        cards.map((card, index) => (
          <Card key={ card.id } faceup={ true }
            style={{ [posType]: `${offset * index}px` }}
            canDrag={ this.canDragCard.bind(this) }
            stackId={ this.props.id }
            handleDoubleClick={ () => this.handleDoubleClick(card) }
            { ...card } />
        ))
      }
      </div>
    );
  }

  //TODO: this doesn't work yet dang
  handleDoubleClick (card) {
    console.log('double click card');
    const { stacksById, foundations, dispatch } = this.props;
    this.props.handleDoubleClickCard({
      dispatch, card, foundations, stacksById,
      fromStackId: this.props.id
    });
  }

  canDragCard(card) {
    return this.props.canDragCard(card, this.props.cards);
  }
}

const tableauDropSpec = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    props.handleMoveCard(props.dispatch, card, card.stackId, props.id);

  },
  canDrop(props, monitor) {
    return props.canMoveOnto(monitor.getItem(), props.cards);
  }
}

function tableauCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default DropTarget(ItemTypes.CARD, tableauDropSpec, tableauCollect)(TableauDisplay);
