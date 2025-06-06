import Calender from "../Calender";
import Greeting from "../Greeting";
import NewTask from "../NewTask";
import UpComing from "../UpComing";
import Study from "../Study";
import Work from "../Work";
import Personal from "../Personal";

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
  newtask: {
    component: <NewTask />,
  },
  study: {
    component: <Study />,
  },
  personal: {
    component: <Personal />,
  },
  work: {
    component: <Work />,
  },
};
