export default function LogOut({show , onClose}){

if (!show) return null;
    return(
        <div className="">
            <h1>Are You Sure?</h1>
            <div className="flex">
                <button type="submit">LogOut</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}