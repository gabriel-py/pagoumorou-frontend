import styles from './styles.module.scss';

interface IProgressBar {
    progress: number;
}

const ProgressBar = ({ progress }: IProgressBar) => (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
       />
    </div>
  );

export default ProgressBar;
