import { useState } from "react";
import MenuList from "./MenuList";
import MenuTask from "./MenuTask";
import UpComing from "./UpComing";
import Greeting from "./Greeting";
import { DataMenu } from "./DataMenu";




export default function Menu(){

    const[selectedMenu,setSelectedMenu] = useState();
    function handlePress(selectedMenu){
        setSelectedMenu(selectedMenu);
        console.log(selectedMenu)
    }

    return(
        <aside className="flex flex-row gap-[40px]">
        <div className="grid grid-rows-[repeat(2,80px)] justify-center items-center h-[700px] w-[450px]  bg-[#F4F4F4] ml-6 rounded-4xl p-6">
             <h1 style={{fontSize: '38px'}} className="font-bold text-[10px]">Menu</h1>
             <input className="bg-[#EBEBEB] h-10 w-80 rounded-4xl" type='search' placeholder="🔍 Search..."></input>
            <div className="grid grid-rows-[repeat(4,40px)] justify-self-start">
                <p className="font-bold">Task</p>
                <div className="flex flex-col gap-3">
                <MenuTask isSelected={selectedMenu === 'upcoming'} onPress={() => handlePress('upcoming')} icon1={"➤"} label1={" Upcoming"}/>
                <MenuTask icon2={"☰"} label2={" Today"}/>
                <MenuTask icon3={"🗓"} label3={" Calender"}/>
                <MenuTask icon4={"📝"} label4={" Sticky Wall"}/>
                </div>
            </div>
            <div className="grid grid-rows-[repeat(4,40px)] justify-self-start">
                <p className="font-bold">List</p>
                <div className="flex flex-col gap-3">
                <MenuList label1={"Work"}/>
                <MenuList label2={"Personal"}/>
                <MenuList label3={"Study"}/>
                <MenuList label4={"Add new list"}/>
                </div>
            </div>

            <p><a>Log Out</a></p>
        </div>

        <div div className="bg-[#F4F4F4] h-[700px] w-[980px] rounded-4xl">
        {!selectedMenu ? <Greeting /> : DataMenu[selectedMenu].component}
        </div>
        </aside>
    );
}