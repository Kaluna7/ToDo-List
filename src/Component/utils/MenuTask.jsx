export default function MenuTask({
  label1,
  label2,
  label3,
  label4,
  icon1,
  icon2,
  icon3,
  icon4,
  onPress,
  isSelected,
}) {
  return (
    <>
      <ol>
        <li className="cursor-pointer">
          {icon1}
          <a
            className={isSelected ? "bg-gray-300 rounded-4xl p-1" : undefined}
            onClick={onPress}
          >
            {label1}
          </a>
        </li>
        <li className="cursor-pointer">
          {icon2}
          <a
            className={isSelected ? "bg-cyan-300 rounded-4xl p-1" : undefined}
            onClick={onPress}
          >
            {label2}
          </a>
        </li>
        <li className="cursor-pointer">
          {icon3}
          <a
            className={
              isSelected ? "bg-emerald-300 rounded-4xl p-1" : undefined
            }
            onClick={onPress}
          >
            {label3}
          </a>
        </li>
        <li className="cursor-pointer">
          {icon4}
          <a
            className={isSelected ? "bg-lime-300 rounded-4xl p-1" : undefined}
            onClick={onPress}
          >
            {label4}
          </a>
        </li>
      </ol>
    </>
  );
}
