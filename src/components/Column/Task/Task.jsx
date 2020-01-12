import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

const Container = styled.div`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgrey" : "white")};
  color: ${props => (props.isDragging ? "white" : "black")};
`;

class Task extends Component {
  state = {};

  onClick = e => {
    console.dir(e.currentTarget);
    e.currentTarget.style.textDecoration = "line-through";
  };

  render() {
    const { task, index } = this.props;
    // console.log(task.id);
    // console.log(index);

    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={this.onClick}
          >
            <div>{task.content}</div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
