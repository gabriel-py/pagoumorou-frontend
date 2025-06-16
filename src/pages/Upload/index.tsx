import styles from './styles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '@/store';
import { getGreeting } from '@/utils/dashboard';

const Upload = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className={styles.screen}>
      <div className={styles.screenTop}>
        <h1 className={styles.title}>{getGreeting()}, {user?.first_name && user?.first_name != '' ? user?.first_name : "usuário"}.</h1>
        <div className={styles.addReportSection}>
          <AddCircleIcon />
          <span>Adicionar novo relatório</span>
        </div>
      </div>
      <div className={styles.screenContent}>
        <h1>Faça upload do seu relatório</h1>
        <h2>COMO EXPORTAR DO DROPI/ROCKETFY? <span className={styles.clickHere}>CLIQUE AQUI!</span></h2>
        <button type='button' className={styles.button}>FAZER UPLOAD</button>
      </div>
    </div>
  );
};

export default Upload;
