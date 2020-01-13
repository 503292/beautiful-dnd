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
    // console.log(taskIds, "spl111");
    taskIds.splice(destination.index, 0, draggableId);
    // console.log(taskIds, "spl222");

    let tasks2 = Object.assign({}, columns["column-1"].tasks);
    console.log(tasks2, "tasks2");

    let tmpTasksArr = [];

    for (let i = 0; i < taskIds.length; i++) {
      for (let j = 0; j < taskIds.length; j++) {
        if (taskIds[i] === tasks2[j].id) {
          tmpTasksArr.push(tasks2[j]);
        }
      }
    }
    // console.log(tmpTasksArr);

    // console.log(tasks, "tasks");

    //TO DO
    this.setState({
      columns: {
        "column-1": { tasks: tmpTasksArr }
      }
    });

    // const newColumn = {
    //  ...tasks: tmpTasksArr
    // };
    // console.log(newColumn, "newColumn");
    // // console.log(newColumn, "newColumn.id");
    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...columns,
    //     [newColumn.id]: newColumn
    //   }
    // };

    // console.log(newState, "newState");

    // this.setState(newState);
  };

  render() {
    const { columns } = this.state;
    console.log(columns, "columns2");
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {/* {console.log(columns)} */}
        {/* {columnOrder.map(columnId => {
          const column = columns[columnId];
          console.log(column);
          const tasksArr = column.taskIds.map(taskId => tasks[taskId]);
          console.log(tasksArr);
          return <Column key={column.id} column={column} tasks={tasksArr} />;
        })} */}

        <Column columns={columns} />
      </DragDropContext>
    );
  }
}

export default App;
