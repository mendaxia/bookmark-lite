/*global chrome*/
import React, { useState, useEffect, useReducer } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Layout } from "antd";

import boardReducer from "./reducers";
import { getEmoji } from "./common/utils";

import Board from "./components/Board";
import Side from "./components/Side";
import TopMenu from "./components/TopMenu";
import initalData, { sampleTabs } from "./hooks/initialData";

import "./popup.scss";

function Popup() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [state, setState] = useState({ tabs: sampleTabs });

  const [board, dispatchBoard] = useReducer(boardReducer, initalData, (initial) => JSON.parse(localStorage.getItem("board")) || initial);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));

    try {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        setState({ tabs: tabs });
      });
    } catch (error) {
      console.log("something wrong with chrome.tabs.query api. " + error);
    }
  }, [board]);

  const reorderList = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Add column
  const addColumn = () => {
    const newColumnId = "column-" + board.columnOrder.length;
    const newColumnOrder = board.columnOrder;
    newColumnOrder.push(newColumnId);

    const newColumns = {
      ...board.columns,
      [newColumnId]: { id: newColumnId, icon: getEmoji(), title: newColumnId, items: [], isCompact: false },
    };

    dispatchBoard({
      type: "BOARD_ADD_COLUMN",
      payload: { newColumnOrder, newColumns },
    });
  };

  // Delete column
  const deleteColumn = (id) => {
    const newColumnOrder = board.columnOrder;
    newColumnOrder.splice(newColumnOrder.indexOf(id), 1);

    const newColumns = board.columns;
    delete newColumns[id];

    dispatchBoard({
      type: "BOARD_DELETE_COLUMN",
      payload: { newColumnOrder, newColumns },
    });
  };

  // Delete single tab in sider
  const deleteTab = (index, id) => {
    const newTabs = state.tabs;
    if (index) newTabs.splice(index, 1);

    try {
      chrome.tabs.remove(id, () => {
        setState({
          tabs: newTabs,
        });
      });
    } catch (error) {
      console.log("something wrong with chrome.tabs.remove api " + error);
    }
  };

  // Delete all tabs in sider
  const deleteAllTabs = () => {
    if (state.tabs.length > 0) {
      state.tabs.map((tab, index) => {
        try {
          deleteTab(index, tab.id);
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  // Drag event
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      const columnOrder = reorderList(board.columnOrder, result.source.index, result.destination.index);
      dispatchBoard({
        type: "BOARD_REORDER_COLUMNS",
        payload: columnOrder,
      });
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = board.columns[result.source.droppableId];
      const items = reorderList(column.items, result.source.index, result.destination.index);

      dispatchBoard({
        type: "BOARD_REORDER_ITEM",
        payload: { column, items },
      });
      return;
    }

    if (result.source.droppableId === "side-droppables") {
      const destinationColumn = board.columns[result.destination.droppableId];
      const item = state.tabs[result.source.index];

      // remove item from tabs
      const newTabs = state.tabs;
      newTabs.splice(result.source.index, 1);

      try {
        chrome.tabs.remove(item.id, () => {
          setState({
            tabs: [...newTabs],
          });
        });
      } catch (error) {
        console.log("something wrong with chrome.tabs.remove api " + error);
      }

      // insert into destination column
      const newDestinationColumn = {
        ...destinationColumn,
        items: [...destinationColumn.items],
      };
      newDestinationColumn.items.splice(result.destination.index, 0, item);

      dispatchBoard({
        type: "BOARD_ADD_ITEM",
        payload: newDestinationColumn,
      });

      return;
    }

    // moving between lists
    const sourceColumn = board.columns[result.source.droppableId];
    const destinationColumn = board.columns[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, item);

    const newState = {
      ...board,
      columns: {
        ...board.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    dispatchBoard({
      type: "BOARD_MOVE_ITEM",
      payload: newState,
    });
  };

  // Change icon, title, compact mode
  const changeColumnInfo = (columnId, newTitle, newIcon, isCompact) => {
    const newColumn = board.columns[columnId];
    newColumn.title = newTitle;
    newColumn.icon = newIcon;
    newColumn.isCompact = isCompact;
    dispatchBoard({
      type: "BOARD_CHANGE_COLUMN",
      payload: newColumn,
    });
  };

  // Delete item in column
  const deleteItem = (columnId, itemIndex) => {
    const newColumn = board.columns[columnId];
    newColumn.items.splice(itemIndex, 1);
    dispatchBoard({
      type: "BOARD_DELETE_ITEM",
      payload: newColumn,
    });
  };

  // Toggle light or dark theme
  const toggleTheme = (theme) => {
    dispatchBoard({
      type: "BOARD_CHANGE_THEME",
      payload: theme,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout className={`app ${board.theme}`}>
        <Sider
          theme={"light"}
          width={270}
          collapsedWidth={80}
          trigger={null}
          collapsible
          collapsed={collapsed}
          onMouseEnter={() => setCollapsed(!collapsed)}
          onMouseLeave={() => setCollapsed(!collapsed)}
          className={`sider ${collapsed ? "collapsed" : ""} ${board.theme}`}
        >
          <Side tabs={state.tabs} deleteTab={deleteTab} deleteAllTabs={deleteAllTabs} board={board} />
        </Sider>
        <Layout className={`content ${board.theme}`}>
          <Header className={`header ${board.theme}`}>
            <TopMenu toggleTheme={toggleTheme} addColumn={addColumn} />
          </Header>
          <Content className="board">
            <Board board={board} onChangeColumnInfo={changeColumnInfo} onDeleteItem={deleteItem} onDeleteColumn={deleteColumn} />
          </Content>
        </Layout>
      </Layout>
    </DragDropContext>
  );
}

export default Popup;
