import React from "react";
import { Button } from "antd";
import ThemeToggle from "./ThemeToggle";

import "./style.scss";

export default function TopMenu({ toggleTheme, addColumn }) {
  const handleAddColumn = () => {
    addColumn();
  };

  return (
    <div className="topMenu">
      <div className="topMenu__left">
        <Button type="primary" className="topMenu__btn" onClick={() => handleAddColumn()}>
          Add Column
        </Button>
      </div>

      <div className="topMenu__right">
        <ThemeToggle toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
