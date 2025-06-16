import styles from './styles.module.scss';
import cn from 'classnames';

interface ICardProps {
    title: string;
    value: number | string;
    subValue?: number | string | JSX.Element;
    asCard?: boolean;
    className?: string;
}

const Card = ({ title, value, subValue, asCard = false, className }: ICardProps) => {
  return (
    <div className={cn(styles.container, {[styles.card]: asCard}, className )}>
        <div className={styles.title}>{title}</div>
        <div className={styles.values}>
            <div className={styles.value}>{value}</div>
            {subValue && <div className={styles.subValue}>{subValue}</div>}
        </div>
    </div>
  );
};

export default Card;
