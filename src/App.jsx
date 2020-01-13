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

    const tasks = columns[source.droppableId].tasks;

    const taskIds = tasks.map(el => el.id);

    taskIds.splice(source.index, 1);
    taskIds.splice(destination.index, 0, draggableId);

    let tasks2 = Object.assign({}, columns["column-1"].tasks);

    let tmpTasksArr = [];

    for (let i = 0; i < taskIds.length; i++) {
      for (let j = 0; j < taskIds.length; j++) {
        if (taskIds[i] === tasks2[j].id) {
          tmpTasksArr.push(tasks2[j]);
        }
      }
    }

    this.setState({
      columns: {
        "column-1": { tasks: tmpTasksArr, id: "column-1", title: "today" }
      }
    });
  };

  render() {
    const { columns } = this.state;
    console.log(columns, "columns2");
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Column columns={columns} />
      </DragDropContext>
    );
  }
}

export default App;
