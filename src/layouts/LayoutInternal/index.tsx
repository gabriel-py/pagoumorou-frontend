import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import Menu from '@/components/Menu';

type RouteMapping = {
  [key: string]: string;
};

const LayoutInternal = () => {
  const [showMenu, setShowMenu] = useState(true);
  const location = useLocation();
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { isLoggedIn, isLoadingCheckLogin, user } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(checkLogin());
  //   dispatch(getProfile());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     navigate(`/login`);
  //   }
  // }, [isLoggedIn, navigate]);

  const routeMapping: RouteMapping = {
    '/profile': 'settings',
    '/dashboard': 'dashboard',
    '/plan': 'settings',
    '/upload': 'upload'
  };

  const getInitialRoute = () => routeMapping[location.pathname as keyof RouteMapping] || 'settings';

  return (
    <div className={styles.screen}>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        className={showMenu ? styles.menu : styles.menuClosed}
        initialRoute={getInitialRoute()}
      />
      <div className={`${styles.page} ${!showMenu ? styles.fullWidth : ''}`}>
        <div className={styles.header}>
          {!showMenu && (
            <div className={styles.menuIcon} role="button" onClick={() => setShowMenu(!showMenu)}>
              <MenuIcon />
            </div>
          )}
          <div className={styles.pageTitle}>CodMetrix</div>
          <div className={styles.headerExtra}>
            <img src='/brazil.png' width="40px" height="40px" alt="Brasil" />
            <NotificationsIcon />
          </div>
        </div>
        <div className={`${styles.content} ${showMenu ? styles.menuOpen : ''}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutInternal;
