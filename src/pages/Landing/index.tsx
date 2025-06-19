import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import SearchFrame from '../Search/components/SearchFrame';


const Landing = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)

  return (
    <div className={styles.screen}>
        <div className={styles.banner}>
            <img src="https://socialbauru.com.br/wp-content/uploads/2024/05/republica-mista-home.jpg" alt="banner" />
            <div className={styles.frame}>
                <SearchFrame />
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.howItWorks}>
                <h1>Encontre agora mesmo sua acomodação aqui no Pagou Morou. Faça já sua pesquisa!</h1>
                <span>Como funcionamos:</span>
                <div className={styles.stepsCards}>
                    <div className={styles.card}>
                        <span>1. Faça sua pesquisa</span>
                    </div>
                    <div className={styles.card}>
                        <span>2. Escolha sua acomodação</span>
                    </div>
                    <div className={styles.card}>
                        <span>3. Envie sua proposta</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Landing;
