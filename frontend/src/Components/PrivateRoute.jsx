import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  return currentUser ? <Outlet /> : <Navigate to='/sing-in' />;
}
