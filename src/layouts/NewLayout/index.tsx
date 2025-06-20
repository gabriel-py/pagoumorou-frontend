import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const NewLayout = () => (
    <div className={styles.screen}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );

export default NewLayout;
