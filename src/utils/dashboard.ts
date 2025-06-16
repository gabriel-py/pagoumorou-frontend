export const formatMoney = (value?: number | string, isMinus = false) => {
    const formattedMoney = parseFloat(value ? value.toString() : "0").toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return `${isMinus ? '-' : ''} ${formattedMoney}`;
}

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Bom dia';
  if (currentHour < 18) return 'Boa tarde';
  return 'Boa noite';
};