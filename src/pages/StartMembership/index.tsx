import ProgressBar from '@/components/ProgressBar';
import styles from './styles.module.scss';
import cn from "classnames";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentForm from './components/PaymentForm';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PcHYX2KFP9KjcUdGP0XnYptYO5JL4J1BQ0Y06QE2d8dWeSnT1IO2qBW8amTpgcScxfyUeaXmCvs8VMuavNAiu8f00NzpL3li7');

const StartMembership = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = parseInt(queryParams.get('id') || '', 10);
  if(!userId) return;

  return (
      <div className={styles.screen}>
        <h1 className={styles.pageTitle}>CodMetrix</h1>
        <div className={styles.screenContent}>
          <div className={cn(styles.contentBox)}>
            <div className={styles.contentBoxHeader}>
              <h2 className={styles.contentBoxHeaderTitle}><span>Comece agora seu <br></br> teste grátis de 7 dias</span></h2>
              <ProgressBar progress={100} />
              <span className={styles.createYourAccount}>Crie sua conta: <span className={styles.createYourAccountStep}>Passo 3 de 3</span></span>
            </div>
            <Elements stripe={stripePromise}>
              <PaymentForm userId={userId} />
            </Elements>
          </div>
          <div className={styles.faq}>
            <h1 className={styles.faqTitle}>Perguntas Frequentes</h1>
            <div className={styles.questions}>
              <div className={styles.question}>
                <h2>Eu sou iniciante, a plataforma me atenderia?</h2>
                <span>Claro! Principalmente quando estamos começando é bom saber o que está funcionando ou não. E somente com uma dashboard inteligente você conseguiria fazer isso.</span>
              </div>
              <div className={styles.question}>
                <h2>Quais plataformas e países funcionam?</h2>
                <span>
                  Atendemos as duas maiores plataformas do mercado: Dropi e Rocketfy. <br></br><br></br>
                  Dropi: Colômbia, Chile, México, Espanha (Dropi Pro)<br></br>
                  Rocketfy: Colômbia
                </span>
              </div>
              <div className={styles.question}>
                <h2>Posso cancelar quando eu quiser?</h2>
                <span>Claro. Tudo que você precisa é apenas alguns cliques dentro da aba de configurações na sua conta. Pronto. Sem ressentimentos.</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.selos}>
          <div className={styles.selo}>
            <CheckCircleIcon style={{ color: "green", fontSize: "64px" }}/>
            <div className={styles.seloContent}>
              <div className={styles.seloContentTitle}>100% Garantia Incondicional</div>
              <div className={styles.seloContentDescription}>7 dias de garantia</div>
            </div>
          </div>
          <div className={styles.selo}>
            <CheckCircleIcon style={{ color: "green", fontSize: "64px" }}/>
            <div className={styles.seloContent}>
              <div className={styles.seloContentTitle}>Pagamento Seguro SSL</div>
              <div className={styles.seloContentDescription}>Com criptografia AES-256</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StartMembership;
