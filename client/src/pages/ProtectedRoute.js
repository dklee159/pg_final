import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((store) => store.admin);
  if (!admin) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default ProtectedRoute;
