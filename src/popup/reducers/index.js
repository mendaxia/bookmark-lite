const BOARD_INIT = "BOARD_INIT";
const BOARD_REORDER_COLUMNS = "BOARD_REORDER_COLUMNS";
const BOARD_REORDER_ITEM = "BOARD_REORDER_ITEM";
const BOARD_DELETE_ITEM = "BOARD_DELETE_ITEM";
const BOARD_ADD_ITEM = "BOARD_ADD_ITEM";
const BOARD_MOVE_ITEM = "BOARD_MOVE_ITEM";
const BOARD_CHANGE_COLUMN = "BOARD_CHANGE_COLUMN";
const BOARD_CHANGE_THEME = "BOARD_CHANGE_THEME";
const BOARD_ADD_COLUMN = "BOARD_ADD_COLUMN";
const BOARD_DELETE_COLUMN = "BOARD_DELETE_COLUMN";

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_INIT:
      return {
        ...state,
      };
    case BOARD_REORDER_COLUMNS:
      return {
        ...state,
        columnOrder: action.payload,
      };
    case BOARD_CHANGE_COLUMN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case BOARD_REORDER_ITEM:
      const { column, items } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
    case BOARD_ADD_ITEM:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case BOARD_MOVE_ITEM:
      return {
        ...action.payload,
      };
    case BOARD_DELETE_ITEM:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case BOARD_CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case BOARD_ADD_COLUMN:
      return {
        ...state,
        columnOrder: action.payload.newColumnOrder,
        columns: action.payload.newColumns,
      };
    case BOARD_DELETE_COLUMN:
      return {
        ...state,
        columnOrder: action.payload.newColumnOrder,
        columns: action.payload.newColumns,
      };

    default:
      throw new Error();
  }
};

export default boardReducer;
