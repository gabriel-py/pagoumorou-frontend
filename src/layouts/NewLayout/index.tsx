import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const NewLayout = () => (
    <div className={styles.screen}>
      <Outlet />
    </div>
  );

export default NewLayout;
