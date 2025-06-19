import cn from 'classnames';
import styles from './styles.module.scss';

interface IButton {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ label, className, onClick, disabled, type = 'button' }: IButton) => (
  <button
    type={type}
    className={cn(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
