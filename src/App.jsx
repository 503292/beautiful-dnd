import React, { Component } from "react";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
// , Droppable
import "@atlaskit/css-reset";
import "./App.css";
import initialData from "./components/InitialData";

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    // const { dragCard } = this.
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
    // dragCard(
    //   source.droppableId,
    //   destination.droppableId,
    //   source.index,
    //   destination.index,
    //   type
    // );
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
