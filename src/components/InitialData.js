const initialData = {
  tasks: {
    "id-1": { id: "id-1", content: "1take out the car1" },
    "id-2": { id: "id-2", content: "2take out the car2" },
    "id-3": { id: "id-3", content: "3take out the car3" },
    "id-4": { id: "id-4", content: "4take out the car4" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do do do",
      taskIds: ["id-1", "id-2", "id-3", "id-4"]
    }
  },
  columnOrder: ["column-1"]
};

export default initialData;
