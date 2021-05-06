import React, { useState, useEffect } from "react";
import { Popover, Menu } from "antd";
import Icon from "@ant-design/icons";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function SideMenu({ board, deleteAllTabs }) {
  const { SubMenu } = Menu;
  const DropdownSvg = () => (
    <svg viewBox="0 0 20 20" focusable="false" role="presentation">
      <g fill="currentColor">
        <path
          d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );

  const DropdownIcon = (props) => <Icon component={DropdownSvg} {...props} />;

  const [bordInfo, setBordInfo] = useState(board);

  useEffect(() => {
    setBordInfo(board);
  }, [board]);

  const menu = (
    <Menu>
      <SubMenu key="sub1" icon={<PlusOutlined />} title="Save all tabs">
        <Menu.ItemGroup title="">
          {bordInfo &&
            bordInfo.columnOrder.map((columnId) => (
              <Menu.Item key={columnId}>
                {board.columns[columnId].icon} {board.columns[columnId].title}
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item icon={<CloseCircleOutlined />} onClick={() => deleteAllTabs()}>
        Close all tabs
      </Menu.Item>
    </Menu>
  );

  return (
    <Popover placement="topLeft" content={menu} trigger="click">
      <button className="sider__icon">
        <DropdownIcon style={{ fontSize: "10px", fontWeight: "400" }} />
      </button>
    </Popover>
  );
}
