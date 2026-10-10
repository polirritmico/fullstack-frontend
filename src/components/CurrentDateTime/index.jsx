import useCurrentDateTime from "./CurrentDateTime";

function CurrentDateTime() {
  const currentDateTime = useCurrentDateTime();

  return (
    <li className="nav-item ms-auto">
      <p className="mb-0 px-3 text-muted">{currentDateTime}</p>
    </li>
  );
}

export default CurrentDateTime;
