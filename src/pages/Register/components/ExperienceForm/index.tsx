import styles from './styles.module.scss';
import { NewUserFormData } from '../..';
import { conheceuOptions, faturamentoOptions } from './mocks';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '@/store';

interface IExperienceFormProps {
  onNextStep: () => void;
  onPrevious: () => void;
  control: any;
  isValid: boolean;
}

const ExperienceForm = ({ onNextStep, onPrevious, control, isValid }: IExperienceFormProps) => {
  const { isLoading } = useAppSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputArea}>
          <span className={styles.label}>Quanto você já faturou com contra entrega? *</span>
          <Controller
            name='incomeOption'
            control={control}
            defaultValue={0}
            render={({ field, fieldState }) => (
              <>
                <select
                  className={styles.select}
                  {...field}
                >
                  <option value={0} disabled>Selecione uma opção</option>
                  {faturamentoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{
              required: 'Por favor, responda.',
              validate: value => value !== 0 || 'Selecione uma opção válida.'
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputArea}>
          <span className={styles.label}>Como você nos conheceu? *</span>
          <Controller
            name='hasKnownUsByOption'
            control={control}
            defaultValue={0}
            render={({ field, fieldState }) => (
              <>
                <select
                  className={styles.select}
                  {...field}
                >
                  <option value={0} disabled>Selecione uma opção</option>
                  {conheceuOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
              </>
            )}
            rules={{
              required: 'Por favor, responda.',
              validate: value => value !== 0 || 'Selecione uma opção válida.'
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <button type='submit' className={styles.nextStepButton} disabled={!isValid || isLoading}>{isLoading ? 'Carregando...' : 'Próximo Passo'}</button>
      </div>
      <div className={styles.row}>
        <span className={styles.footerText}>
          Ao se cadastrar, você aceita e concorda com os <a href="">termos</a> e <a href="">políticas</a> de nosso site e plataforma.
        </span>
      </div>
    </div>
  );
};

export default ExperienceForm;
