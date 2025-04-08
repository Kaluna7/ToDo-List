import book from '../assets/book.jpg';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login")
  }


  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[150px] justify-items-center items-center">
        <img src={book} className="w-[650px] h-[700px] rounded-4xl ml-[20%]" />
        <section className="bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl ">
          <div className='grid grid-rows-[repeat(3,120px)] items-center justify-items-center  mt-[20%]'>
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
          <button style={{ backgroundColor: "#76DE37" }} className="px-4 py-2 rounded w-[310px]" onClick={goToLogin}>Get Started</button>
          <p>Already have an account? <a className='cursor-pointer'>Sign In</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
