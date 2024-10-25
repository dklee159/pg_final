import { Outlet } from 'react-router-dom';
import { BigSidebar, Navbar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
