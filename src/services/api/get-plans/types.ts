export interface Plan {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    currency: 'BRL' | 'USD';
    is_default: boolean;
    active: boolean;
}

export type PlanResponse = Plan[]
