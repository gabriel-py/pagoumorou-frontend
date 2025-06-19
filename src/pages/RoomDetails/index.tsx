import { useLocation } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import WcIcon from '@mui/icons-material/Wc';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './styles.module.scss';
import Tag from '@/components/Tag';
import Button from '@/components/Button';


const RoomDetails = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)

  const tags = ["WiFi", "Ar Condicionado", "Geladeira", "Mesa de Estudos", "Banheiro Individual", "Armário", "Cozinha"]

  return (
    <div className={styles.screen}>
      <div className={styles.images}>
        <div className={styles.mainImg}>
          <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
        </div>
        <div className={styles.otherImages}>
          <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
          <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
          <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
          <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.accomodationBasicInfo}>
            <h1>Pensão USP Leste</h1>
            <span><PlaceIcon /> Rua Apaura, 90, Vila Silvia, São Paulo, SP</span>
          </div>
          <div className={styles.aboutAccomodation}>
            <h1>Sobre a acomodação</h1>
            <span>Quarto mobiliado para locação em pensão tranquila e organizada, ideal para estudantes ou profissionais. A acomodação conta com cama, guarda-roupa, Wi-Fi e acesso a áreas comuns como cozinha e lavanderia. Ambiente limpo, seguro e com fácil acesso ao transporte público. Disponível para entrada imediata.</span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.tagArea}>
            {tags?.map((tag) => (
              <Tag label={tag} />
            ))}
          </div>
          <div className={styles.availability}>
            <h1>Disponibilidade</h1>
            <div className={styles.availabilityPrice}>
              <span><AttachMoneyIcon /> R$ 1.200,00 / mês</span>
            </div>
            <div className={styles.availabilityDate}>
              <span><EventAvailableIcon /> Disponível a partir de 05/07/2025</span>
            </div>
            <div className={styles.availabilityGender}>
              <span><WcIcon /> Aceita homens e mulheres</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button label="Enviar proposta" />
      </div>
    </div>
  );
};

export default RoomDetails;
