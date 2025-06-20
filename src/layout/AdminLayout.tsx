import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthReducerActionType, IAuthReducerState } from "../store/accounts/AuthReducer";
import { refreshToken } from "../services/accounts/account-services";



const AdminLayout = () => {
  const { isAuth, user } = useSelector((redux: any) => redux.auth as IAuthReducerState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = isAuth && user?.Roles === "Administrator";

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await refreshToken();
        if (!isAuth) navigate("/");
        if (isAuth) {
          if (user?.Roles != "Administrator") {
            navigate("/404")
          }
        }
      } catch {
        localStorage.removeItem("token");
        dispatch({
          type: AuthReducerActionType.LOGOUT_USER,
        });
        navigate("/");
      }
      finally {
        setLoading(true);
      }
    }
    handleAuth();
  }, [isAuth, user, navigate, dispatch]);

  return (
    loading ? (
      <>
        {isAdmin && <Outlet />}
      </>
    ) : (
      <>
      </>
    )
  );
};

export default AdminLayout;
