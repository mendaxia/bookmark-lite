import React from "react";
import { Popover } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { subString, handleImgError } from "../../common/utils";

import "./style.scss";

function Item({ provided, item, isDragging, isCompact, index, onDeleteItem }) {
  const { title, url, favIconUrl } = item;
  const popover = <div className="item__popover">{title}</div>;

  const handleDelete = (index) => {
    onDeleteItem(index);
  };

  return (
    <Popover placement="right" title={null} content={popover}>
      <div className={`item ${isDragging ? "is-dragging" : ""}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <div className="item__icon">
          <img onError={handleImgError} src={favIconUrl ? favIconUrl : "/images/default_icon.svg"} alt="website icon" />
        </div>
        <div className="item__content">
          <div className="item__title">
            <a href={url} target="blank">
              {isCompact ? subString(title, 40) : subString(title, 32)}
            </a>
          </div>
          <div className="item__url">
            <a href={url} target="blank">
              {subString(url, 30)}
            </a>
          </div>
        </div>
        <div className="item__action">
          <button type="button" onClick={() => handleDelete(index)}>
            <DeleteOutlined className="item__delete" />
          </button>
        </div>
      </div>
    </Popover>
  );
}

export default Item;
