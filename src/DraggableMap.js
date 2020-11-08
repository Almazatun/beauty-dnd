import React from "react";
import { Draggable } from "react-beautiful-dnd";

export function DraggableMap({ columns, getItemStyle }) {
  let jsx = columns.map((item, index) => {
    return (
      <Draggable key={item.title} draggableId={item.title} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <span
              style={{
                alignSelf: "center",
                margin: "10px"
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                alignSelf: "center",
                margin: "10px",
                fontSize: "30px"
              }}
              {...provided.dragHandleProps}
            >
              {"🔛"}
            </span>
            <div></div>
          </div>
        )}
      </Draggable>
    );
  });

  return <>{jsx}</>;
}
