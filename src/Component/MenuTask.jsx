export default function MenuTask({label1,label2,label3,label4,icon1,icon2,icon3,icon4}){
    return(
        <>
        <ol>
            <li className="cursor-pointer" >{icon1}<a>{label1}</a></li>
            <li className="cursor-pointer" >{icon2}<a>{label2}</a></li>
            <li className="cursor-pointer" >{icon3}<a>{label3}</a></li>
            <li className="cursor-pointer" >{icon4}<a>{label4}</a></li>
        </ol>
        </>
    );
}