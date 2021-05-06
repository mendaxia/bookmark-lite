// @flow
import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Column from "../Column";
import "./style.scss";

const Board = ({ board, onChangeColumnInfo, onDeleteItem, onDeleteColumn }) => {
  return (
    <div className={`board ${board.theme}`}>
      <Droppable droppableId="all-droppables" direction="horizontal" type="column" isDropDisable={true}>
        {(provided) => {
          return (
            <div className="columns" {...provided.droppableProps} ref={provided.innerRef}>
              {board.columnOrder.map((columnId, index) => (
                <Column
                  onChangeColumnInfo={onChangeColumnInfo}
                  key={columnId}
                  onDeleteItem={onDeleteItem}
                  onDeleteColumn={onDeleteColumn}
                  column={board.columns[columnId]}
                  theme={board.theme}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Board;
