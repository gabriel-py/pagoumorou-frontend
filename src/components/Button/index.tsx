import cn from 'classnames';
import styles from './styles.module.scss';

interface IButton {
  label: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, className, onClick }: IButton) => (
  <button
    type='button'
    className={cn(styles.button, className)}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
