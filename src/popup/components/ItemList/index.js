import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Item from "../Item";

import "./style.scss";

const ItemList = React.memo(function ItemList({ column, index, onDeleteItem }) {
  return (
    <Droppable droppableId={column.id} type="item" direction="vertical">
      {(provided, snapshot) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
            {column.items.map((item, index) => (
              <Draggable draggableId={`${item.id}`} index={index} key={`${item.id}`}>
                {(provided, snapshot) => (
                  <Item
                    isCompact={column.isCompact}
                    isDragging={snapshot.isDragging}
                    onDeleteItem={onDeleteItem}
                    provided={provided}
                    item={item}
                    index={index}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
});

export default ItemList;
