const initialData = {
  tasks: {
    "id-1": { id: "id-1", content: "1 take out the card 1" },
    "id-2": { id: "id-2", content: "2 take out the card 2" },
    "id-3": { id: "id-3", content: "3 take out the card 3" },
    "id-4": { id: "id-4", content: "4 take out the card 4" }
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
