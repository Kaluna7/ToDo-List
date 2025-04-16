export default function UpComing() {
  return (
    <div className="flex flex-col">
      <h1 style={{ fontSize: "45px" }} className="font-bold mb-6">
        Upcoming
      </h1>
      <div className="border-2 w-[980px] h-[320px] rounded-4xl p-6">
        <div className="flex flex-col gap-3">
          <h1 style={{ fontSize: "32px" }} className="font-bold">
            Today
          </h1>
          <a className="cursor-pointer border border-black p-1.5 rounded-lg">
            ➕ Add new task
          </a>
        </div>
      </div>
      <div className="flex flex-row mt-[45px] gap-[40px]">
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ fontSize: "32px" }} className="font-bold">
              Tomorrow
            </h1>
            <a className="cursor-pointer border border-black p-1.5 rounded-lg">
              ➕ Add new task
            </a>
          </div>
        </div>
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ fontSize: "32px" }} className="font-bold">
              This Week
            </h1>
            <a className="cursor-pointer border border-black p-1.5 rounded-lg">
              ➕ Add new task
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
