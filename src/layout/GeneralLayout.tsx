import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

const GeneralLayout = () => (
  <>
    <Logo />
    <Outlet />
  </>
);

export default GeneralLayout;
