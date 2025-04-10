export default function UpComing(){
    return(
        <div className="flex flex-col">
        <h1 style={{fontSize:'45px'}} className="font-bold mb-6">Upcoming</h1>
        <div className="border w-[700px] h-[320px] rounded-4xl p-6">
            <h1 style={{fontSize:'32px'}} className="font-bold">Today</h1>
        </div>
        <div className="flex flex-row mt-[45px] gap-[40px]">
            <div className="border w-[330px] h-[260px] rounded-4xl p-6">
                <h1 style={{fontSize:'32px'}} className="font-bold">Tomorrow</h1>
            </div>
            <div className="border w-[330px] h-[260px] rounded-4xl p-6">
                <h1 style={{fontSize:'32px'}} className="font-bold">This Week</h1>
            </div>
        </div>
        </div>
    );
}