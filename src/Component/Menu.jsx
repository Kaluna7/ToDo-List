import { useState } from "react";
import MenuList from "./utils/MenuList";
import MenuTask from "./utils/MenuTask";
import Greeting from "./Greeting";
import { DataMenu } from "./Data/DataMenu";
import LandingPage from "../Page/LandingPage";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState();
  function handlePress(selectedMenu) {
    setSelectedMenu(selectedMenu);
    console.log(selectedMenu);
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="flex flex-row gap-[40px]">
      <div className="grid grid-rows-[80px] justify-left items-center h-[700px] w-[450px]  bg-[#F4F4F4] ml-6 rounded-4xl p-6">
        <h1 style={{ fontSize: "38px" }} className="font-bold text-[10px]">
          Menu
        </h1>

        <div className="grid grid-rows-[repeat(4,40px)] justify-self-start">
          <p className="font-bold">Task</p>
          <div className="flex flex-col gap-3">
            <MenuTask
              isSelected={selectedMenu === "upcoming"}
              onPress={() => handlePress("upcoming")}
              icon1={"➤ "}
              label1={"Upcoming"}
            />
            <MenuTask
              isSelected={selectedMenu === "newtask"}
              onPress={() => handlePress("newtask")}
              icon2={"☰ "}
              label2={"New Task"}
            />
            <MenuTask
              isSelected={selectedMenu === "calender"}
              onPress={() => handlePress("calender")}
              icon3={"🗓 "}
              label3={"Calender"}
            />
            <MenuTask
              isSelected={selectedMenu === "stickywall"}
              onPress={() => handlePress("stickywall")}
              icon4={"📝 "}
              label4={"Sticky Wall"}
            />
          </div>
        </div>
        <div className="grid grid-rows-[repeat(4,40px)] justify-self-start">
          <p className="font-bold">List</p>
          <div className="flex flex-col gap-3">
            <MenuList
              onPress={() => handlePress("work")}
              isSelected={selectedMenu === "work"}
              label1={"Work"}
            />
            <MenuList
              onPress={() => handlePress("personal")}
              isSelected={selectedMenu === "personal"}
              label2={"Personal"}
            />
            <MenuList
              onPress={() => handlePress("study")}
              isSelected={selectedMenu === "study"}
              label3={"Study"}
            />
          </div>
        </div>

        <p>
          <a className="cursor-pointer" onClick={handleLogout}>
            🚪Log Out
          </a>
        </p>
      </div>

      {!selectedMenu ? <Greeting /> : DataMenu[selectedMenu].component}
    </aside>
  );
}
