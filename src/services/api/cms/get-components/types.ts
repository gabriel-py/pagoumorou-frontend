interface Metric {
    type: string;
    display_name: string;
    description: string;
    visible: boolean;
    show_graph: boolean;
    value: number | null;
    sub_value: number | null;
}
  
interface Component {
    id: number;
    name: string;
    type: string;
    description: string;
    order: number;
    width: number;
    metrics: Metric[];
}

type GetComponentsResponse = {
    components: Component[];
    products: string[];
}

interface GetComponentsResponseBody {
    products: string[];
    dateRange: (string | null)[];
}