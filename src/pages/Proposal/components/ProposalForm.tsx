import { useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import Button from '@/components/Button';

interface IProposalForm {
  className?: string;
  allFieldsDisabled?: boolean;
}

const ProposalForm = ({ className, allFieldsDisabled = false }: IProposalForm) => {
  const navigate = useNavigate();

  const handleSendProposal = () => {
    navigate(`/confirmation`);
  };

  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    gender: 'Masculino',
    email: '',
    moveDate: '',
    suggestedPrice: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    handleSendProposal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(styles.container, className)}
    >
        <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label>Nome completo</label>
                <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    disabled={allFieldsDisabled}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Data de Nascimento</label>
                <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    disabled={allFieldsDisabled}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Gênero</label>
                <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    disabled={allFieldsDisabled}
                >
                    <option value="Outro">Outro</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>CPF</label>
                <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                    disabled={allFieldsDisabled}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>E-mail</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={allFieldsDisabled}
                    required
                />
            </div>
        </div>

        <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label>Data de mudança desejada</label>
                <input
                    type="date"
                    value={formData.moveDate}
                    onChange={(e) => handleChange('moveDate', e.target.value)}
                    disabled={allFieldsDisabled}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Preço desejado</label>
                <input
                    type="text"
                    value={formData.suggestedPrice}
                    onChange={(e) => handleChange('suggestedPrice', e.target.value)}
                    disabled={allFieldsDisabled}
                />
            </div>
        </div>

        <div className={cn(styles.formRow, styles.messageRow)}>
            <div className={styles.formGroup}>
                <label>Mensagem</label>
                <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    disabled={allFieldsDisabled}
                />
            </div>
        </div>

        {!allFieldsDisabled &&
            <div className={styles.buttonRow}>
                <Button label="Enviar" type='submit' className={styles.submitButton} />
            </div>
        }
    </form>
  );
};

export default ProposalForm;
