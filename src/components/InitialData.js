const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "1take out the car1" },
    "task-2": { id: "task-2", content: "2take out the car2" },
    "task-3": { id: "task-3", content: "3take out the car3" },
    "task-4": { id: "task-4", content: "4take out the car4" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do do do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    }
  },
  columnOrder: ["column-1"]
};

export default initialData;
