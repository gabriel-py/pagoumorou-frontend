import WcIcon from '@mui/icons-material/Wc';
import PlaceIcon from '@mui/icons-material/Place';
import styles from './styles.module.scss';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

interface IRoomCard {
  index: number;
}

const RoomCard = ({ index }: IRoomCard) => {
  console.log(index)
  const tags = ["WiFi", "Ar Condicionado", "Geladeira"]

  return (
    <div className={styles.container}>
      <div className={styles.rightSection}>
        <img src="https://photos.webquarto.com.br/property_ads/thumb/2021-05/47830_SxLBh4OQR9ruB8RV.jpg" alt='quarto' />
        <div className={styles.roomInfo}>
          <h1 className={styles.roomInfoName}>Pensão USP Leste</h1>
          <div className={styles.address}>
            <PlaceIcon />
            <span>Rua Apaura, 90, Vila Silvia, São Paulo, SP</span>
          </div>
          <div className={styles.genderAvailability}>
            <WcIcon />
            <span>Disponível apenas para homens</span>
          </div>
          <div className={styles.tagsArea}>
            {tags?.map((tag) => (
              <Tag label={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.leftSection}>
        <h1 className={styles.price}>R$ 1.200,00 / mês</h1>
        <Button label='Ver mais' className={styles.button} />
      </div>
    </div>
  )
};

export default RoomCard;
