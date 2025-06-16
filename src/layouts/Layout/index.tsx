import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const Layout = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.flags}>
        <img src='/brazil.png' width="50px" height="50px" />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
