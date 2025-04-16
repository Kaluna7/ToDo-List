export default function MenuList({ label1, label2, label3, label4 }) {
  return (
    <>
      <ol>
        <li className="cursor-pointer">
          <a>{label1}</a>
        </li>
        <li className="cursor-pointer">
          <a>{label2}</a>
        </li>
        <li className="cursor-pointer">
          <a>{label3}</a>
        </li>
        <li className="cursor-pointer">
          <a>{label4}</a>
        </li>
      </ol>
    </>
  );
}
