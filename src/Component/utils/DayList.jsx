export default function DayList({ children, isSelected, onPress }) {
  return (
    <ol>
      <li>
        <a
          className={
            isSelected
              ? "bg-[#C6C6C6] rounded-lg pl-2 pr-2 justify-center cursor-pointer "
              : "bg-white rounded-lg pl-2 pr-2 justify-center cursor-pointer"
          }
          onClick={onPress}
        >
          {children}
        </a>
      </li>
    </ol>
  );
}
