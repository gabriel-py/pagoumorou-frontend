import cn from 'classnames';
import styles from './styles.module.scss';

interface IButton {
  label: string;
  className?: string;
}

const Button = ({ label, className }: IButton) => (
  <button
    type='button'
    className={cn(styles.button, className)}
  >
    {label}
  </button>
);

export default Button;
