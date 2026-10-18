import { useLocation, useNavigate } from "react-router";

/**
 * Returns an onClick handler that returns to the previous page in history or
 * to a provided fallbackPath (defaults to "/").
 */
function useHandleBack(fallbackPath = "/") {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };
}

export default useHandleBack;
