import { Routes, Route } from 'react-router-dom';
import Page404 from './components/Page404';
import AdminPanelPage from './components/AdminPanelPage';
import GeneralLayout from './layout/GeneralLayout';
import Login from './components/Login';
import Loader from './common/Loader/loader';
import { useEffect, useState } from 'react';
import useAuthTokenEffect from './useAuthTokenEffect';
import { checkTokenAndLogoutIfExpired } from './services/accounts/account-services';
import LogoAdmin from './components/LogoAdmin';
import AdminLayout from './layout/AdminLayout';
import UserList from './components/user/UserList';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
// import EditUser from './components/user/EditUser';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useAuthTokenEffect();
  checkTokenAndLogoutIfExpired();

  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Route>



        <Route path="/admin" element={<><LogoAdmin /><AdminLayout /></>}>
          <Route path="/admin/*" element={<Page404 />} />
          <Route path="admin-panel-page" element={<AdminPanelPage />} />
          <Route path="user/user-list" element={<UserList />} />
          <Route path="user/add-user" element={<AddUser />}></Route>
          <Route path="user/edit-user/:Id" element={<EditUser />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
