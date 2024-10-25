import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedQuizRoute = ({ children }) => {
  const { player } = useSelector((store) => store.player);
  if (!player.team) {
    return <Navigate to="/denied" />;
  }
  return children;
};

export default ProtectedQuizRoute;
