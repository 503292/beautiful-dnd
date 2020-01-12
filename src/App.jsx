import React, { Component } from "react";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";
import "./App.css";
import initialData from "./components/InitialData";

class App extends Component {
  state = initialData;

  onDragStart = () => {
    document.body.style.transition = "background-color 0.2s ease";
    // document.body.style.color = "yellow";
  };

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(222, 222, 222, ${opacity})`;
  };

  onDragEnd = result => {
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

    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
    // document.body.style.color = "black";
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const tasksArr = column.taskIds.map(taskId => tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasksArr} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
