import gsap from "gsap";
import { useEffect } from "react";

export default function Greeting() {
  useEffect(() => {
    gsap.fromTo(
      "#con",
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 1,
        opacity: 1,
        scale: 1,
      },
    );

    gsap.fromTo(
      "#love",
      {
        y: "-100%",
        opacity: 1,
        scale: 0,
      },
      {
        y: "0%",
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "bounce",
      },
    );
  }, []);

  return (
    <div div className="bg-[#F4F4F4] h-[700px] w-[980px] rounded-4xl">
      <div
        id="con"
        className="flex flex-col mt-[10%] justify-center items-center gap-[80px]"
      >
        <h1
          style={{ fontSize: "38px", fontFamily: "Lobster" }}
          className="font-bold"
        >
          Welcome to ToDoPy
        </h1>
        <p className="text-center w-[590px]">
          A to-do app is a simple, user-friendly digital tool designed to help
          individuals and teams organize tasks and manage their daily activities
          efficiently. Users can create, edit, and prioritize tasks, set
          deadlines or reminders, categorize items, and track their progress,
          all within an intuitive and accessible interface. These apps are
          essential for improving productivity, reducing stress, and ensuring
          that important responsibilities are not forgotten.
        </p>
      </div>
      <div className="justify-center items-center flex flex-col mt-[10%]">
        <p id="love" className="bg-pink-200 rounded-2xl p-5">
          Made With ❤️ By I Made Kaluna Gadyanga
        </p>
      </div>
    </div>
  );
}
