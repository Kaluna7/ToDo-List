import book from '../assets/book.jpg';

export default function LandingPage(){
    return(
        <body className="bg-[#C4C4C4]">
        <div className="grid grid-cols-2 justify-items-center items-center">
            <img src={book} className='w-[650px] h-[700px]  rounded-4xl ml-[20%]' />
            <section className='flex items-center justify-items-center '>
                <h1>hello</h1>
            </section>
        </div>
        </body>
    );
}

