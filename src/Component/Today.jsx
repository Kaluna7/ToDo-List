export default function Today(){
    return(
        <div className="flex flex-col">
        <h1 className="mb-6">Today</h1>
        <div className="border w-[980px] h-[618px] rounded-4xl p-6">
            <div className="">
                <button style={{background:'#76DE37'}} className="">➕ Add new task</button>
                </div>
        </div>
        </div>
    );
}