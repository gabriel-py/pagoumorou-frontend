import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import RoomCard from '../Search/components/RoomCard';
import ProposalForm from './components/ProposalForm';


const Proposal = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)

  return (
    <div className={styles.screen}>
      <RoomCard index={0} showSeeMoreBtn={false} />
      <div className={styles.proposalForm}>
        <h1>Preencha sua proposta</h1>
        <ProposalForm />
      </div>
    </div>
  );
};

export default Proposal;
