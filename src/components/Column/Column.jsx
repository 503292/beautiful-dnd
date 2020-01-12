import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task/Task";

import styled from "styled-components";

const Container = styled.div`
  margin: 5px;
  border: 2px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

class Column extends Component {
  state = {};
  render() {
    const { columns } = this.props;
    // console.log(columns["column-1"].id);
    return (
      <>
        <Container>
          <Title>{columns.title}</Title>

          <Droppable droppableId={columns["column-1"].id}>
            {provided => {
              //   console.log("provided", provided);
              return (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  {columns["column-1"].tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              );
            }}
          </Droppable>
        </Container>
      </>
    );
  }
}

export default Column;
