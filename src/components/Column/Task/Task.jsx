import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

const Container = styled.div`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 8px;
`;

class Task extends Component {
  state = {};
  render() {
    const { task, index } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>{task.content}</div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
