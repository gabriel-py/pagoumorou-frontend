import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { NewUserFormData } from '../..';
import { useForm, Controller } from 'react-hook-form';

interface ICreationFormProps {
  onNextStep: () => void;
  onPrevious: () => void;
  control: any;
}

const CreationForm = ({ onNextStep, onPrevious, control }: ICreationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputArea}>
          <span className={styles.label}>Nome completo *</span>
          <Controller
            name='name'
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type='text'
                  placeholder='Digite seu nome...'
                  className={styles.input}
                  {...field}
                />
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{ required: 'Nome é obrigatório' }}
          />
        </div>
        <div className={styles.inputArea}>
          <span className={styles.label}>E-mail *</span>
          <Controller
            name='email'
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type='email'
                  placeholder='Digite seu e-mail...'
                  className={styles.input}
                  {...field}
                />
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail inválido'
              }
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputArea}>
          <span className={styles.label}>Celular *</span>
          <Controller
            name='phone_number'
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type='text'
                  placeholder='21 9 9999-9999'
                  className={styles.input}
                  {...field}
                />
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{
              required: 'Telefone é obrigatório',
              pattern: {
                value: /^\d{8,15}$/,
                message: 'Formato de telefone inválido'
              }
            }}
          />
        </div>
        <div className={styles.inputArea}>
          <span className={styles.label}>Crie uma senha *</span>
          <Controller
            name='password'
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Digite uma senha...'
                  className={styles.input}
                  {...field}
                />
                <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </span>
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'Senha precisa ter pelo menos 8 caracteres'
              }
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <button type='button' className={styles.nextStepButton} onClick={onNextStep}>Próximo Passo</button>
      </div>
      <div className={styles.row}>
        <span className={styles.footerText}>
          Ao se cadastrar, você aceita e concorda com os <a href="">termos</a> e <a href="">políticas</a> de nosso site e plataforma.
        </span>
      </div>
    </div>
  );
};

export default CreationForm;
