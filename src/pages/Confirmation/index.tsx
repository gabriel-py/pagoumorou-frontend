import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import styles from './styles.module.scss';
import RoomCard from '../Search/components/RoomCard';
import ProposalForm from '../Proposal/components/ProposalForm';


const Confirmation = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)

  return (
    <div className={styles.screen}>
      <RoomCard index={0} showSeeMoreBtn={false} />
      <div className={styles.confirmation}>
        <CheckIcon sx={{ fontSize: 64, color: 'green' }} />
        <span>Sua proposta foi enviada para o proprietário e em breve você receberá um retorno no seu e-mail.</span>
      </div>
      <div className={styles.proposalForm}>
        <h1>Sua proposta</h1>
        <ProposalForm allFieldsDisabled />
      </div>
    </div>
  );
};

export default Confirmation;
