import book from '../assets/book.jpg';

export default function LandingPage() {
  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[150px] justify-items-center items-center">
        <img src={book} className="w-[650px] h-[700px] rounded-4xl ml-[20%]" />
        <section className="grid grid-rows-3 items-center justify-items-center bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl ">
          <h1>ToDo Py</h1>
          <p>
            Stay Organized, Get Things Done: Your
            <br /> Ultimate To-Do List App.
            <br />
            A todo list app is a digital task management
            <br />
            prioritize their daily activities and
            <br />
            responsibilities.
          </p>
          <button style={{ backgroundColor: "#76DE37" }} className="px-4 py-2 rounded w-[350px]">Get Started</button>

        </section>
      </div>
    </div>
  );
}
