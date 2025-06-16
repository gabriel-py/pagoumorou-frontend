import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import CommunicationType from './components/CommunicationType';
import styles from './styles.module.scss';
import InfoIcon from '@mui/icons-material/Info';
import { editProfile } from '@/store/services';
import { UserProfileUpdatePayload } from '@/services/api/edit-profile/types';
import { BACKEND_URL, DEFAULT_PROFILE_PHOTO } from '@/lib/constants';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    if (profile) {
      const userName = `${profile?.user?.first_name || ''} ${profile?.user?.last_name || ''}`;
      setFullName(userName);
      setEmail(profile?.user?.username || '');
      setPhoneNumber(profile?.profile?.phone_number || '');
      setProfileImage(profile?.profile?.profile_photo ? `${BACKEND_URL}${profile?.profile?.profile_photo}` : `${DEFAULT_PROFILE_PHOTO}`);
    }
  }, [profile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const payload: UserProfileUpdatePayload = {
      full_name: fullName,
      email: email,
      password: password,
      profile: {
        phone_number: phoneNumber,
        profile_photo: base64Image,
      },
    };
    
    dispatch(editProfile(payload)).then((response: any) => {
      if (response?.payload?.success) {
        alert("Dados atualizados com sucesso!");
        location.reload();
      } else {
        alert("Erro! Verifique os dados digitados.");
      }
    });
  };

  if (!profile) {
    return null;
  }

  return (
    <div className={styles.screen}>
      <h1 className={styles.pageTitle}>Meu Perfil</h1>
      <div className={styles.formBox}>
        <section className={styles.basicUserData}>
          <div className={styles.userPhoto}>
            <img
              src={profileImage}
              className={styles.profileImage}
              alt="Profile"
            />
            <span
              className={styles.editPhotoText}
              onClick={() => setFileInputVisible(true)}
            >
              EDITAR FOTO
            </span>
            {fileInputVisible && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            )}
          </div>
          <div className={styles.userInfos}>
            <div className={styles.inputs}>
              <div className={styles.row}>
                <div className={styles.inputArea}>
                  <span className={styles.inputLabel}>Nome completo</span>
                  <input
                    type="text"
                    className={styles.inputBorderBottom}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className={styles.inputArea}>
                  <span className={styles.inputLabel}>E-mail</span>
                  <input
                    type="text"
                    className={styles.inputBorderBottom}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputArea}>
                  <span className={styles.inputLabel}>Celular</span>
                  <input
                    type="text"
                    className={styles.inputBorderBottom}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className={styles.inputArea}>
                  <span className={styles.inputLabel}>Senha</span>
                  <input
                    type="password"
                    className={styles.inputBorderBottom}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.userTypeProfile}>
              <span>Perfil de Usuário</span>
              <div className={styles.profileTypes}>
                <label>
                  <input type="radio" name="option" value="option1" defaultChecked /> Administrador (tem acesso total a todas as funções)
                </label>
                <label>
                  <input type="radio" name="option" value="option2" /> Editor (use este perfil para seus colaboradores)
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.communicationSection}>
          <span>COMUNICAÇÃO</span>
          <div className={styles.communicationTypes}>
            <CommunicationType 
              title="Receber E-mail transacionais" 
              description="Exemplos: Avisos sobre sua conta, avisos de leads (caso configurado), etc."
              isMandatory
            />
            <CommunicationType 
              title="Receber SMS transacionais" 
              description="Exemplos: Avisos importantes sobre sua conta."
              isMandatory
            />
            <CommunicationType 
              title="Receber E-mail de marketing" 
              description="Exemplos: Novos layouts adicionados, atualizações de software, novos parceiros, etc." 
            />
          </div>
        </section>
        <section className={styles.communicationWarning}>
          <InfoIcon />
          <span className={styles.communicationWarningText}>
            <span>O recebimento de e-mails e SMS transacionais são obrigatórios de acordo com nossos </span>
            <span className={styles.useTerms}>termos de uso</span>.
          </span>
        </section>
        <section className={styles.saveSection}>
          <button 
            type="button" 
            className={styles.button} 
            style={{ marginTop: '16px' }}
            onClick={handleSave}
          >
            Salvar
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;
