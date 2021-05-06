import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Tab from "./Tab";
import SideMenu from "./SideMenu";
import "./style.scss";

const Side = React.memo(function Side({ tabs, deleteTab, deleteAllTabs, board }) {
  return (
    <>
      <div className="sider__header">
        <SideMenu board={board} deleteAllTabs={deleteAllTabs} />
        <div className="sider__text">
          <span>{tabs.length > 0 ? tabs.length : ""}</span> active tabs
        </div>
      </div>
      <div className="sider__content">
        <Droppable droppableId="side-droppables" direction="vertical" type="item" isDropDisabled={true}>
          {(provided) => {
            return (
              <div className="tabs" {...provided.droppableProps} ref={provided.innerRef}>
                {tabs.map((tab, index) => (
                  <Draggable draggableId={`${tab.id}`} index={index} key={tab.id}>
                    {(provided) => <Tab provided={provided} item={tab} index={index} deleteTab={deleteTab} />}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </>
  );
});

export default Side;
