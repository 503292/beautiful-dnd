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
    // console.log(result, "result");
    const { columns } = this.state;
    const { destination, source, draggableId } = result;
    // console.log("source.droppableId", source);

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // const column = columns[source.droppableId].tasks;
    const tasks = columns[source.droppableId].tasks;
    // console.log("tasks", tasks);

    // console.log("column", column);
    const taskIds = tasks.map(el => el.id);

    // console.log("taskIds", taskIds);

    // console.log("Array.from(taskIds)", Array.from(taskIds));

    // const newTaskIds = Array.from(column.taskIds);
    // const newTaskIds = Array.from(taskIds);
    taskIds.splice(source.index, 1);
    // console.log(taskIds, "spl111");
    taskIds.splice(destination.index, 0, draggableId);
    // console.log(taskIds, "spl222");

    //TO DO
    const newColumn = {
      // ...column,
      taskIds: taskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
  };

  render() {
    const { columns } = this.state;
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
