import StickyWallPaper from "./utils/StickyWallPaper";
import AddStickyNote from "./NewNote/AddStickyNote";
import { useState } from "react";

export default function StickyWall() {
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Sticky Wall</h1>
        <button
          style={{ background: "#76DE37" }}
          className="h-15 shadow-lg"
          onClick={() => {
            setShowAddNote(true);
          }}
        >
          New Sticky Wall
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6">
        <div className="">
          <AddStickyNote
            show={showAddNote}
            onClose={() => {
              setShowAddNote(false);
            }}
          />
          <StickyWallPaper></StickyWallPaper>
        </div>
      </div>
    </div>
  );
}
