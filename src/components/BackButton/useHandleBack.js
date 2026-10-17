import { useNavigate } from "react-router";

/**
 * Returns an onClick handler that returns to the previous page in history or
 * to a provided fallbackPath (defaults to "/").
 */
function useHandleBack(fallbackPath = "/") {
  const navigate = useNavigate();

  return () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };
}

export default useHandleBack;
