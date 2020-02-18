import React, { Component } from "react";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import "@atlaskit/css-reset";
import "./App.css";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

class App extends Component {
  state = {
    tasks: [
      { id: "id-1", content: "1take out the car1" },
      { id: "id-2", content: "2take out the car2" },
      { id: "id-3", content: "3take out the car3" },
      { id: "id-4", content: "4take out the car4" }
    ],
    columns: {
      "column-1": {
        id: "column-1",
        title: "today",
        tasksIds: ["id-1", "id-2", "id-3", "id-4"]
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        tasksIds: []
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        tasksIds: []
      }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
  };

  onDragStart = () => {
    document.body.style.color = "#F34D4D";
  };

  onDragUpdate = update => {
    const { destination } = update;
    const { tasks } = this.state;
    const opacity = destination
      ? destination.index / Object.keys(tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(135,180,89, ${opacity})`;
    document.body.style.transition = "background-color 0.9s ease";
  };

  onDragEnd = result => {
    document.body.style.color = "inherit";

    const { columns } = this.state;
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
    // console.log(column, "column");
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.tasksIds);
      // console.log(newTaskIds, "newTaskIds");

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        tasksIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(startColumn.tasksIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      tasksIds: startTaskIds
    };

    const finishTaskIds = Array.from(finishColumn.tasksIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinishColumn = {
      ...finishColumn,
      tasksIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
      }
    };
    this.setState(newState);
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Container>
          {columnOrder.map(columnId => {
            const column = columns[columnId];
            const tasksDraw = column.tasksIds.map(taskId =>
              tasks.find(el => el.id === taskId)
            );
            return (
              <Column key={column.id} tasksDraw={tasksDraw} column={column} />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default App;
