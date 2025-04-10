export default function MenuTask({label1,label2,label3,label4,icon1,icon2,icon3,icon4,onPress,isSelected}){
    return(
        <>
        <ol>
            <li className="cursor-pointer" >{icon1}<a className={isSelected ? 'text-yellow-950' : undefined} onClick={onPress}>{label1}</a></li>
            <li className="cursor-pointer" >{icon2}<a onClick={onPress}>{label2}</a></li>
            <li className="cursor-pointer" >{icon3}<a onClick={onPress}>{label3}</a></li>
            <li className="cursor-pointer" >{icon4}<a onClick={onPress}>{label4}</a></li>
        </ol>
        </>
    );
}