import React, { useState } from 'react';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import styles from './styles.module.scss';

interface ICommunicationTypeProps {
    title: string;
    description: string;
    isMandatory?: boolean;
}

const CommunicationType = ({ title, description, isMandatory = false }: ICommunicationTypeProps) => {
  const [isToggled, setIsToggled] = useState(isMandatory);

  const handleToggle = () => {
    if (!isMandatory) {
      setIsToggled(!isToggled);
    }
  };

  return (
    <div className={styles.communicationType} onClick={handleToggle}>
      <div className={styles.communicationTypeInfo}>
        <span className={styles.communicationTypeInfoTitle}>{title}</span>
        <span className={styles.communicationTypeInfoDescription}>{description}</span>
      </div>
      {isToggled ? <ToggleOnIcon style={{ color: 'green' }} /> : <ToggleOffIcon />}
    </div>
  );
};

export default CommunicationType;
