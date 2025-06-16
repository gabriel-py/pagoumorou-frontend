import cn from "classnames";
import styles from './styles.module.scss';

interface ITag {
  label: string;
  className?: string;
}

const Tag = ({ label, className }: ITag) => (
  <div className={cn(styles.container, className)}>
    <span className={styles.label}>{label}</span>
  </div>
);

export default Tag;
