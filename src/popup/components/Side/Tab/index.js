import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { subString, handleImgError } from "../../../common/utils";

function Tab({ provided, item, isDragging, index, deleteTab }) {
  const handleDelete = (index, id) => {
    deleteTab(index, id);
  };

  return (
    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`item ${isDragging ? "" : "is-dragging"}`}>
      <div className="item__icon">
        <img onError={handleImgError} src={item.favIconUrl ? item.favIconUrl : "/images/default_icon.svg"} alt="website icon" />
      </div>
      <div className="item__content">
        <div className="item__title">{subString(item.title, 16)}</div>
      </div>
      <div className="item__action">
        <button type="button" onClick={() => handleDelete(index, item.id)}>
          <DeleteOutlined style={{ fontSize: "14px" }} />
        </button>
      </div>
    </div>
  );
}

export default Tab;
