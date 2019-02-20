import React, { Component } from 'react';
import Card from 'Card';
import 'styles/stacks.scss';

class Foundation extends Component {
  render () {
    const className="foundation" + (this.props.stack.isEmpty() ? " foundation-empty" : "");
    const topCard = this.props.stack.peek();
    const draggable = this.props.draggable;
    return (
      <div className={ className }>
        { topCard !== undefined ? <Card key={ topCard.id } draggable={ draggable }
          { ...topCard } faceup={ true } /> : "" }
      </div>
    )
  }
}

export default Foundation;
