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

  const goToHome = () => {
    navigate("/home");
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/signup",{
        email,
        password,
      });
      alert(res.data.message);
    } catch {
      alert ("Signup failed!")
    }
  };

  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[150px] justify-items-center items-center">
        <img src={book} className="w-[650px] h-[700px] rounded-4xl ml-[20%]" />
        <section
          id="signin-card"
          className="bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl "
        >
          <div className="grid grid-rows-[repeat(6,70px)] items-center justify-self-start ml-[27%] mt-[20%]">
            <h1
              className="font-bold text-left"
              style={{ fontFamily: "Lobster" }}
            >
              Sign In
            </h1>
            <input
              type="email"
              className="border border-black rounded-lg w-[310px] h-[30px]"
              placeholder="kaluna@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="border border-black rounded-lg w-[310px] h-[30px]"
              placeholder="12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              style={{ backgroundColor: "#76DE37" }}
              className="px-4 py-2 rounded w-[310px]"
              onClick={goToHome}
            >
              Sign In
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-grow border-t border-black w-33"></div>
              <span className="text-black">or</span>
              <div className="flex-grow border-t border-black w-33"></div>
            </div>

            <div className="justify-self-center text-center">
              <div className="flex row-2 items-center justify-center gap-20">
                <button>Goggle</button>
                <button>Facebook</button>
              </div>
              <p className="mt-5">
                Don't have an account?{" "}
                <a className="cursor-pointer" onClick={goToSignUp}>
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
