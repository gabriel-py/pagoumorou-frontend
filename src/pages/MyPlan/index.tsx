import styles from './styles.module.scss';
import SquareIcon from '@mui/icons-material/Square';

const MyPlan = () => {
  return (
    <div className={styles.screen}>
      <h1 className={styles.pageTitle}>Meu Plano</h1>
      <div className={styles.content}>
        <div className={styles.planInfo}>
          <span className={styles.planName}>Plano Starter</span>
          <div className={styles.planStatus}>
            <span>STATUS: </span>
            <span className={styles.status}>Ativo</span>
          </div>
          <span className={styles.descriptionText}>DESCRIÇÃO: </span>
          <ul>
            <li><SquareIcon /> 10 páginas</li>
            <li><SquareIcon /> 10.000 visitantes</li>
            <li><SquareIcon /> 1000 conversões e leads <span className={styles.subli}>(592 visitas esse mês)</span></li>
            <li><SquareIcon /> 1 domínio</li>
            <li><SquareIcon /> 1 projeto</li>
            <li><SquareIcon /> Suporte por e-mail</li>
            <li><SquareIcon /> +Todas as funções</li>
          </ul>
          <div className={styles.buttonsSection}>
            <button type='button' className={styles.button}>EDITAR MEU PLANO</button>
            <div role='button' className={styles.cancelPlanButton}>CANCELAR PLANO</div>
          </div>
        </div>
        <div className={styles.paymentInfo}>
          <span className={styles.paymentInfoTitle}>Informações de Pagamento</span>
          <div className={styles.content}>
            <div className={styles.infoGroup}>
              <span>PERIODICIDADE: </span>
              <span className={styles.value}>Mensal</span>
            </div>
            <div className={styles.infoGroup}>
              <span>FORMA DE PAGAMENTO: </span>
              <span className={styles.value}>Cartão de Crédito</span>
            </div>
            <div className={styles.infoGroup}>
              <span>VALIDADE DO PLANO: </span>
              <span className={styles.value}>20/04/2022</span>
            </div>
          </div>
          <div className={styles.buttonSection}>
            <button type='button' className={styles.button}>EDITAR FORMA DE PAGAMENTO</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.paymentHistory}>
          <span className={styles.paymentHistoryTitle}>Histórico de pagamentos</span>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>DATA</th>
                <th>DATA DE PAG.</th>
                <th>MÉTODO DE PAG.</th>
                <th>STATUS</th>
                <th>VALOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20/03/2022</td>
                <td>20/03/2022</td>
                <td>Cartão de crédito</td>
                <td className={styles.paid}>Pago</td>
                <td className={styles.paid}>R$ 99,00</td>
              </tr>
              <tr>
                <td>20/03/2022</td>
                <td></td>
                <td>Cartão de crédito</td>
                <td className={styles.waitingPayment}>Aguardando pagamento</td>
                <td className={styles.waitingPayment}>R$ 99,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
