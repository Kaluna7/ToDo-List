import { useEffect } from 'react';
import book from '../assets/book.jpg';
import gsap from 'gsap';


export default function SignUp() {

  useEffect(() =>{
    gsap.fromTo('#signup-card',{
      rotateY : '-100',
      opacity: 0
    },
  {
    duration: 2,
    rotateY : 0,
    opacity: 1
  })
  },[]);

  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[150px] justify-items-center items-center">
        <img src={book} className="w-[650px] h-[700px] rounded-4xl ml-[20%]" />
        <section id='signup-card' className="bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl ">
        <div className="grid items-center justify-center mt-[14%] ml-[2%]">
  <h1 className="font-bold text-left text-2xl mb-4" style={{fontFamily: 'Lobster'}}>Sign Up</h1>

  <form method='POST' className="grid gap-4">
    <input
      type="text"
      className="border border-black rounded-lg w-[310px] h-[40px] px-2"
      placeholder="First Name"
    />
    <input
      type="text"
      className="border border-black rounded-lg w-[310px] h-[40px] px-2"
      placeholder="Last Name"
    />
    <input
      type="email"
      className="border border-black rounded-lg w-[310px] h-[40px] px-2"
      placeholder="Email"
    />
    <input
      type="password"
      className="border border-black rounded-lg w-[310px] h-[40px] px-2"
      placeholder="Password"
    />
    <button
      type="submit"
      style={{ backgroundColor: "#76DE37" }}
      className="px-4 py-2 rounded w-[310px] font-semibold"
    >
      Sign Up
    </button>
  </form>

  <div className="flex items-center gap-4 my-6 w-[310px]">
    <div className="flex-grow border-t border-black"></div>
    <span className="text-black">or</span>
    <div className="flex-grow border-t border-black"></div>
  </div>

  <div className="text-center">
    <div className="flex items-center justify-center gap-10 mb-4">
      <button className="border px-4 py-1 rounded">Google</button>
      <button className="border px-4 py-1 rounded">Facebook</button>
    </div>
    <p>
      Already have an account?{" "}
      <a className="cursor-pointer text-blue-600 hover:underline">Log in</a>
    </p>
  </div>
</div>

        </section>
      </div>
    </div>
  );
}
