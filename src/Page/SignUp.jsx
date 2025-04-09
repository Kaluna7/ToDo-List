import book from '../assets/book.jpg';

export default function SignUp() {
  return (
    <div className="bg-[#C4C4C4] min-h-screen min-w-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[150px] justify-items-center items-center">
        <img src={book} className="w-[650px] h-[700px] rounded-4xl ml-[20%]" />
        <section className="bg-[#FFF9F9] w-[650px] h-[700px] rounded-4xl ">
          <div className='grid grid-rows-[repeat(6,70px)] items-center justify-self-start ml-[27%] mt-[20%]'>
              <h1 className='font-bold text-left'>Sign Up</h1>
          <input type='text' className='border border-black rounded-lg w-[310px] h-[30px]' value={"kaluna@gmail.com"}></input>
          <input type='text' className='border border-black rounded-lg w-[310px] h-[30px]' value={"12345"}></input>
          <input type='text' className='border border-black rounded-lg w-[310px] h-[30px]' value={"kaluna@gmail.com"}></input>
          <input type='text' className='border border-black rounded-lg w-[310px] h-[30px]' value={"12345"}></input>
          <button style={{ backgroundColor: "#76DE37" }} className="px-4 py-2 rounded w-[310px]">Sign Up</button>

          <div className="flex items-center gap-4">
            <div className="flex-grow border-t border-black w-33"></div>
              <span className="text-black">or</span>
           <div className="flex-grow border-t border-black w-33"></div>
          </div>
          
          <div className='justify-self-center text-center'>
          <div className='flex row-2 items-center justify-center gap-20'>
            <button>Goggle</button>
            <button>Facebook</button>
          </div>
          <p className='mt-5'>Don't have an account? <a className='cursor-pointer'>Sign up</a></p>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}
