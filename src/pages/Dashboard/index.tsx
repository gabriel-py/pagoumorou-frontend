import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from './components/Card';
import { formatMoney, getGreeting } from '@/utils/dashboard';
import cn from 'classnames';
import DupleCard from './components/DupleCard';
import { getMetrics } from '@/store/services';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { control } = useForm<any>({
    mode: 'onChange',
    defaultValues: {},
  });
  const { metrics } = useAppSelector((state) => state.user);
  const [product, setProduct] = useState('');
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMetrics({ type: 'dropi-pro', product: product }));
  }, [product]);
  
  return (
    <div className={styles.screen}>
      <div className={styles.screenTop}>
        <h1 className={styles.title}>{getGreeting()}, {user?.first_name && user?.first_name != '' ? user?.first_name : "usuário"}.</h1>
        <div className={styles.addReportSection}>
          <span>Adicionar novo relatório</span>
          <AddCircleIcon />
        </div>
      </div>

      <div className={styles.filterBox}>
        <div className={styles.title}>
          <span>Resumo</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.filters}>
          <div className={styles.inputArea}>
            <span className={styles.label}>Período de visualização</span>
            <Controller
              name='period'
              control={control}
              defaultValue={0}
              render={({ field, fieldState }) => (
                <>
                  <select
                    className={styles.select}
                    {...field}
                  >
                    <option value={0} disabled>Selecione uma opção</option>
                    {/* {faturamentoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
                  </select>
                  {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
          <div className={styles.inputArea}>
            <span className={styles.label}>Produto</span>
            <Controller
              name='product'
              control={control}
              defaultValue={0}
              render={({ field, fieldState }) => (
                <>
                  <select
                    className={styles.select}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setProduct(e.target.value);
                    }}                
                  >
                    <option value={""}>Todos</option>
                    {metrics?.products?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <Card 
            title='Faturamento Líquido (apenas CONFIRMADOS)'
            value={`${formatMoney(metrics?.faturamento)}`}
            asCard
          />

          <DupleCard 
            asCard 
            direction='vertical'
          >
            <Card 
              title='Pedidos Totais'
              value={metrics?.total_pedidos ?? 0}
            />
            <Card 
              title='Pedidos Confirmados'
              value={metrics?.pedidos_confirmados ?? 0}
              subValue={<span className={styles.subValue}>{metrics?.taxa_confirmacao?.toFixed(2)}%</span>}
            />
          </DupleCard>

          <DupleCard 
            asCard 
            direction='vertical'
          >
            <Card 
              title='Pedidos com Devoluções'
              value={metrics?.pedidos_com_devolucoes ?? 0}
              subValue={<span className={styles.subValue}>{metrics?.taxa_de_devolucao?.toFixed(2)}%</span>}
            />
            <Card 
              title='Pedidos en Novedad'
              value={metrics?.pedidos_en_novedad ?? 0}
              subValue={<span className={styles.subValue}>{metrics?.taxa_de_novedades?.toFixed(2)}%</span>}
            />
          </DupleCard>

          <DupleCard 
            asCard 
            direction='vertical'
          >
            <Card 
              title='Pedidos em Transporte'
              value={metrics?.pedidos_transporte ?? 0}
            />
            <Card 
              title='Pedidos Entregues'
              value={metrics?.pedidos_entregues ?? 0}
              subValue={<span className={styles.subValue}>{metrics?.taxa_de_entrega?.toFixed(2)}%</span>}
            />
          </DupleCard>
        </div>

        <div className={styles.row}>
          <Card 
            title='Lucro'
            value={`${formatMoney(metrics?.lucro_liquido)}`}
            asCard
            className={cn(styles.fitContent, styles.lucroCard)}
          />
          <DupleCard 
            asCard 
            className={styles.fitContent}
            direction='horizontal'
          >
            <Card 
              title='Custo Envio'
              value={`${formatMoney(metrics?.custo_envio)}`}
            />
            <Card 
              title='Custo Anúncios'
              value={`${formatMoney(metrics?.custo_anuncios)}`}
            />
            <Card 
              title='Custo Devolução'
              value={`${formatMoney(metrics?.custo_devolucao)}`}
            />
          </DupleCard>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
