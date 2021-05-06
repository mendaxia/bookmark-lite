/*global chrome*/
// @flow
import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Popover, Tooltip, Switch } from "antd";
import { MoreOutlined, RightOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";

import InlineEdit from "../InlineEdit";
import ItemList from "../ItemList";

import "./style.scss";

const Column = React.memo(function Column({ column, index, isDragging, onChangeColumnInfo, onDeleteItem, onDeleteColumn, theme = "light" }) {
  const [columnId] = useState(column.id);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [columnIcon, setColumnIcon] = useState(column.icon);
  const [columnIsCompact, setColumnIsCompact] = useState(column.isCompact);
  const onEmojiClick = (event, emojiObject) => {
    setColumnIcon(emojiObject.emoji);
  };

  const menu = (
    <div className="column__menu">
      <ul className="">
        <li className="column__menu__item" onClick={() => openAllItems()}>
          Open all tabs
        </li>
        <li className="column__menu__item">
          Compact Mode{" "}
          <Switch
            checked={columnIsCompact}
            size="small"
            onClick={() => {
              setColumnIsCompact(!columnIsCompact);
            }}
          ></Switch>
        </li>
        <li
          className="column__menu__item bg--delete"
          onClick={() => {
            onDeleteColumn(columnId);
          }}
        >
          Delete Column
        </li>
      </ul>
    </div>
  );

  const openAllItems = () => {
    column.items.map((item) => {
      try {
        chrome.tabs.create({ url: item.url });
      } catch (error) {
        console.log("something wrong with chrome.tabs.create api");
      }
    });
  };

  const handleDeleteItem = (index) => {
    onDeleteItem(columnId, index);
  };

  const renderColumnTitle = (provided) => {
    return (
      <div className="column__header" {...provided.dragHandleProps}>
        <div className="column__icon">
          <Popover trigger="click" content={<Picker disableSkinTonePicker={true} onEmojiClick={onEmojiClick} />}>
            {columnIcon}
          </Popover>
        </div>
        <div className="column__title">
          <InlineEdit text={columnTitle} onSetText={(text) => setColumnTitle(text)} />

          {column.items.length > 0 ? (
            <Tooltip title="open all" placement="bottom">
              <button onClick={() => openAllItems()}>
                {column.items.length} sites
                <RightOutlined />
              </button>
            </Tooltip>
          ) : (
            <button disabled>0 sites</button>
          )}
        </div>
        <div className="column__action">
          <Popover placement="bottomRight" content={menu} trigger="click">
            <button type="button">
              <MoreOutlined />
            </button>
          </Popover>
        </div>
      </div>
    );
  };

  useEffect(() => {
    onChangeColumnInfo(columnId, columnTitle, columnIcon, columnIsCompact);
  }, [columnId, columnTitle, columnIcon, columnIsCompact]);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`column ${snapshot.isDragging ? "is-dragging" : ""} ${theme} ${column.isCompact ? "compact" : ""}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {renderColumnTitle(provided)}
          <ItemList column={column} onDeleteItem={handleDeleteItem} index={index} />
        </div>
      )}
    </Draggable>
  );
});

export default Column;
