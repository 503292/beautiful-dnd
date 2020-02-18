import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task/Task";

import styled from "styled-components";

const Container = styled.div`
  margin: 5px auto;
  border: 2px solid black;
  border-radius: 2px;
  width: 300px;
  height: 99vh;
  margin: 0

  display: flex;
  
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
`;

class Column extends Component {
  state = {};
  render() {
    const { tasksDraw, column } = this.props;
    // console.log(tasksDraw, "tasksDraw");
    // console.log(column, "column");
    return (
      <>
        <Container>
          <Title>{column.title}</Title>
          <Droppable droppableId={column.id}>
            {provided => {
              //   console.log("provided", provided);
              return (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  {tasksDraw.map((task, index) => (
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
