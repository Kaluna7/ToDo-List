import Calender from "../Calender";
import Greeting from "../Greeting";
import StickyWall from "../StickyWall";
import NewTask from "../NewTask";
import UpComing from "../UpComing";

export const DataMenu = {
  upcoming: {
    component: <UpComing />,
  },
  greeting: {
    component: <Greeting />,
  },
  calender: {
    component: <Calender />,
  },
  stickywall: {
    component: <StickyWall />,
  },
  newtask: {
    component: <NewTask/>,
  },
};
