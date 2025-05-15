import { useNavigate } from "react-router-dom";
import book from "../assets/book.jpg";
import { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  const [email ,setEmail] = useState();
  const [password ,setPassword] = useState();

  const goToSignUp = () => {
    navigate("/signup");
  };


  useEffect(() => {
    gsap.fromTo(
      "#signin-card",
      {
        rotateY: "100",
        opacity: 0,
      },
      {
        duration: 2,
        rotateY: 0,
        opacity: 1,
      },
    );
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      }, {
        withCredentials: true
      });
  
      console.log(response.data);
      localStorage.setItem("email", response.data.email); 
  
      alert('Login Successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };
  
  

  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
  <div className="grid grid-cols-2 gap-24 items-center">
    <img src={book} className="w-[650px] h-[700px] rounded-4xl" />

    <section
      id="signin-card"
      className="bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl flex flex-col items-center justify-center"
    >
      <div className="w-[310px]">
        <h1
          className="font-bold text-left text-4xl mb-10"
          style={{ fontFamily: "Lobster" }}
        >
          Sign In
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            className="border border-black rounded-lg w-full h-10 px-3"
            placeholder="kaluna@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-black rounded-lg w-full h-10 px-3"
            placeholder="12345"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{ backgroundColor: "#76DE37" }}
            className="px-4 py-2 rounded w-full text-white font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-black"></div>
          <span className="mx-4 text-black">or</span>
          <div className="flex-grow border-t border-black"></div>
        </div>

        <div className="text-center space-y-4">
          <p className="mt-5">
            Don't have an account?{" "}
            <a className="cursor-pointer text-blue-600 underline" onClick={goToSignUp}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
</div>

  );
}
