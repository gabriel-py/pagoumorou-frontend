interface DropiProMetrics {
    total_pedidos: number;
    pedidos_confirmados: number;
    taxa_confirmacao: number;
    pedidos_com_devolucoes: number;
    taxa_de_devolucao: number;
    pedidos_en_novedad: number;
    taxa_de_novedades: number;
    faturamento: number;
    pedidos_entregues: number;
    taxa_de_entrega: number;
    pedidos_transporte: number;
    lucro_liquido: number;
    custo_envio: number;
    custo_anuncios: number;
    custo_devolucao: number;
    products: string[];
}