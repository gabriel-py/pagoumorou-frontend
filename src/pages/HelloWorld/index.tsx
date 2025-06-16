import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/store';
import { getItem } from '@/utils/storage';
import { SESSION_KEY } from '@/services/api/fetch';
import { BACKEND_URL } from '@/lib/constants';
import { getGreeting } from '@/utils/dashboard';

const HelloWorld = () => {
  const [planilhaType, setPlanilhaType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAppSelector((state) => state.user);

  const handlePlanilhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlanilhaType(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Arquivo selecionado:', file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file_type', planilhaType);
      formData.append('file', selectedFile);
      const session = getItem(SESSION_KEY);

      const response = await fetch(`${BACKEND_URL}/api/spreadsheet/process-file/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Session': session.session
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar arquivo.');
      }

      console.log('Arquivo enviado com sucesso.');
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{getGreeting()}, {user?.first_name && user?.first_name != '' ? user?.first_name : "usuário"}. Qual tipo de planilha deseja enviar?</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radioGroup}>
          <div>
            <input
              type="radio"
              id="dropi"
              name="planilhaType"
              value="dropi"
              checked={planilhaType === 'dropi'}
              onChange={handlePlanilhaChange}
            />
            <label htmlFor="dropi">Dropi</label>
          </div>

          <div>
            <input
              type="radio"
              id="dropi_pro"
              name="planilhaType"
              value="dropi_pro"
              checked={planilhaType === 'dropi_pro'}
              onChange={handlePlanilhaChange}
            />
            <label htmlFor="dropi_pro">Dropi Pro</label>
          </div>

          <div>
            <input
              type="radio"
              id="rockety"
              name="planilhaType"
              value="rockety"
              checked={planilhaType === 'rockety'}
              onChange={handlePlanilhaChange}
            />
            <label htmlFor="rockety">Rockety</label>
          </div>
        </div>

        <div className={styles.fileInput}>
          <label htmlFor="fileInput">Planilha:</label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
            accept=".xlsx, .xls, .csv"
          />
        </div>

        <button type="submit" className={styles.btn}>Enviar</button>
      </form>
    </div>
  );
};

export default HelloWorld;
