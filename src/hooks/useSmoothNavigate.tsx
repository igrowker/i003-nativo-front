import { useNavigate, To } from "react-router-dom";

const useSmoothNavigate = () => {
  const navigate = useNavigate();

  const smoothNavigate = (route: To) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(route);
  };

  return smoothNavigate;
};

export default useSmoothNavigate;