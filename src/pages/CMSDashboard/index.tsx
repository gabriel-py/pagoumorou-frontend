import styles from './styles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from './components/Card';
import { formatMoney, getGreeting } from '@/utils/dashboard';
import DupleCard from './components/DupleCard';
import { getComponentsMetrics } from '@/store/services';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import SelectMultiple from '@/components/SelectMultiple';
import SingleInputDateRangePicker from '@/components/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import RevenueChart from '@/components/GraphicChart';

const CMSDashboard = () => {
  const dispatch = useAppDispatch();
  const { componentsMetrics } = useAppSelector((state) => state.user);
  const [products, setProducts] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const { user } = useAppSelector((state) => state.user);

  const handleDateRangeChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
    setDateRange(newDateRange);
  };

  const handleProductChange = (selectedProducts: string[]) => {
    setProducts(selectedProducts);
  };

  useEffect(() => {
    const formattedDateRange = dateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : null);
    
    const body: GetComponentsResponseBody = {
      products: products,
      dateRange: formattedDateRange
    }

    dispatch(getComponentsMetrics({ type: 'dropi-pro', body }));
  }, [dateRange, products]);

  const renderComponent = (item: Component) => {
    switch (item.type) {
      case 'card':
        return (
          <Card 
            key={item.id}
            title={item.metrics[0]?.display_name || ''}
            value={formatMoney(item.metrics[0]?.value || 0) + " €"}
            subValue={item.metrics[0]?.show_graph ? <RevenueChart /> : <></>}
            asCard
          />
        );
        
      case 'multi_vertical':
        return (
          <DupleCard asCard direction="vertical" key={item.id}>
            {item.metrics.map((metric, index) => (
              <Card
                key={`${item.id}-${index}`}
                title={metric.display_name || ''}
                value={metric.value || 0}
                subValue={metric.sub_value != null ? (
                  <span className={styles.subValue}>
                    {metric.sub_value?.toFixed(2)}%
                  </span>
                ) : undefined}
              />
            ))}
          </DupleCard>
        );
        
      case 'multi_horizontal':
        return (
          <DupleCard asCard direction="horizontal" key={item.id}>
            {item.metrics.map((metric, index) => (
              <Card 
                key={`${item.id}-${index}`}
                title={metric.display_name || ''}
                value={formatMoney(metric.value || 0)}
              />
            ))}
          </DupleCard>
        );

      default:
        return null;
    }
  };

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
          <SingleInputDateRangePicker onChange={handleDateRangeChange} />
          <SelectMultiple options={componentsMetrics?.products || []} label={'Produtos'} onChange={handleProductChange} />
        </div>
      </div>

      <div className={styles.content}>
        {componentsMetrics?.components?.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: item?.width ? `${item?.width}px` : 'auto'
            }}
          >
            {renderComponent(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSDashboard;
