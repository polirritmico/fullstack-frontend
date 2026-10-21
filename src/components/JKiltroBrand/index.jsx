import { Link } from "react-router";

import JKiltroLogo from "@/components/JKiltroLogo";

function JKiltroBrand({
  targetUrl = "/",
  size = 60,
  showText = true,
  textStyle = null,
}) {
  return (
    <div className="d-flex px-0">
      <Link
        className="navbar-brand d-flex align-items-center text-decoration-none"
        to={targetUrl}
      >
        <JKiltroLogo
          size={size}
          showText={showText}
          textStyle={textStyle}
          withLink={false}
        />
      </Link>
    </div>
  );
}

export default JKiltroBrand;
