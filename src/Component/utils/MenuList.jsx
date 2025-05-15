export default function MenuList({ label1, label2, label3, label4, onPress }) {
  return (
    <>
      <ol>
        <li className="cursor-pointer">
          <a onClick={onPress}>{label1}</a>
        </li>
        <li className="cursor-pointer">
          <a onClick={onPress}>{label2}</a>
        </li>
        <li className="cursor-pointer">
          <a onClick={onPress}>{label3}</a>
        </li>
        <li className="cursor-pointer">
          <a onClick={onPress}>{label4}</a>
        </li>
      </ol>
    </>
  );
}
