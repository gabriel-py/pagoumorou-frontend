import { ReactNode } from 'react';
import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';

interface DupleCardProps {
  children: ReactNode;
  asCard?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const DupleCard = ({ children, asCard = false, direction = 'vertical', className }: DupleCardProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        styles.container,
        { [styles.card]: asCard },
        { [styles.horizontal]: direction === 'horizontal' },
        { [styles.vertical]: direction === 'vertical' },
        className
      )}
    >
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          <div className={styles.childWrapper}>
            {child}
          </div>
          {index < childrenArray.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DupleCard;
