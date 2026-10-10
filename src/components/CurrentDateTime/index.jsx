import useCurrentDateTime from "./CurrentDateTime";

function CurrentDateTime() {
  const currentDateTime = useCurrentDateTime();

  return (
    <li class="nav-item ms-auto">
      <p class="mb-0 px-3 text-muted">{currentDateTime}</p>
    </li>
  );
}

export default CurrentDateTime;
