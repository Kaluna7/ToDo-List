import StickyWallPaper from "./utils/StickyWallPaper";

export default function StickyWall() {
  return(
  <div className="flex flex-col">
    <div className="flex flex-row space-x-140">
 <h1 className="mb-6">Sticky Wall</h1>
        <button style={{background : "#76DE37" , hover : "black"}} className="h-15 shadow-lg">New Sticky Wall</button>
    </div>
        <div className="border w-[980px] h-[618px] rounded-4xl p-6">
          <div className="">
            <StickyWallPaper></StickyWallPaper>
          </div>
        </div>
      </div>
  );
}