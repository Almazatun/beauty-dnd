import React, { useState } from "react";
import "./styles.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DraggableMap } from "./DraggableMap";

export default function App() {
  const items = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" }
  ];
  const items2 = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" }
  ];

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#36d160" : "lightgrey",
    display: "flex",
    padding: "10px",
    overflow: "auto",
    height: "300px",
    borderRadius: "10px",
    width: "700px",
    margin: "auto"
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: "0 5px",
    width: "100px",
    display: "flex",
    flexDirection: "column",
    // change background colour if dragging
    background: isDragging ? "pink" : "orange",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const [state, setState] = useState([
    { title: "Column 1", items: items },
    { title: "Column 2", items: items2 },
    { title: "Column 3", items: [] },
    { title: "Column 4", items: [] },
    { title: "Column 5", items: [] },
    { title: "Column 6", items: [] }
  ]);

  ////////////////////////////////////////////
  function onDragEnd(result, columns, setColumns) {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;

    const column = columns.map((el) => el);
    const [removed] = column.splice(source.index, 1);
    column.splice(destination.index, 0, removed);

    setColumns(column);
  }

  return (
    <div className="App">
      <h1 className="title">{"Beautiful DND 🧡💙💜"} </h1>
      <h3> Moving columns</h3>
      <div className="container">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, state, setState)}
        >
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <DraggableMap columns={state} getItemStyle={getItemStyle} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
