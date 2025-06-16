import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Controller, useForm } from 'react-hook-form';
import { StartMembershipPayload } from '@/services/api/start-membership/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPlans, startMembership } from '@/store/services';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

interface IPaymentFormData {
    userId: number;
}

export interface PaymentFormData {
  card_number?: string;
  card_expiration?: string;
  card_cvc?: string;
  card_holder?: string;
}

const PaymentForm = ({ userId }: IPaymentFormData) => {
    const dispatch = useAppDispatch();
    const { plans } = useAppSelector((state) => state.user);
    const [isPaymentInfoExpanded, setIsPaymentInfoExpanded] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { handleSubmit, control: formControl } = useForm<PaymentFormData>({
        mode: 'onChange',
        defaultValues: {},
    });

    useEffect(() => {
        dispatch(getPlans());
    }, []);

    const onSubmit = async (data: PaymentFormData) => {
        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
            console.error('Card number element not found');
            return;
        }

        const { token, error } = await stripe.createToken(cardNumberElement, {
            name: data.card_holder,
        });

        if (error) {
            console.error(error);
            return;
        }

        const payload: StartMembershipPayload = {
            user_id: userId,
            token: token.id,
        };

        dispatch(startMembership(payload)).then((response: any) => {
            console.log(response?.payload);
            if(response?.payload?.success){
                window.location.href = `/login`
            }
        });
    };

    const defaultPlan = plans?.find((plan) => plan.is_default);

    return (
        <div className={styles.container}>
            <div className={styles.defaultPlanInfo} onClick={() => setIsPaymentInfoExpanded(!isPaymentInfoExpanded)}>
                <div className={styles.cardHeader}>
                    <div className={styles.defaultPlanInfoFirstColumn}>
                        <span className={styles.planoLabel}>Plano</span>
                        <span className={styles.planoValue}>{defaultPlan?.name}</span>
                        <span className={styles.planoDescription}>{!isPaymentInfoExpanded && <>{defaultPlan?.currency} {defaultPlan?.price} cobrado mensalmente após o teste grátis</>}</span>
                    </div>
                    <div className={styles.defaultPlanInfoSecondColumn}>
                        <span className={styles.totalDevido}>
                            <span className={styles.totalDevidoLabel}>$0 total devido hoje</span>
                            <span className={styles.expandIcon}>
                                {!isPaymentInfoExpanded && <ExpandMoreIcon onClick={() => setIsPaymentInfoExpanded(true)} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                                {isPaymentInfoExpanded && <ExpandLessIcon onClick={() => setIsPaymentInfoExpanded(false)} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                            </span>
                        </span>
                    </div>
                </div>
                {isPaymentInfoExpanded &&
                    <div className={styles.cardCollapsedContent}>
                        <div className={styles.divider}></div>
                        <div className={styles.summary}>
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryItemLine}>
                                    <span>Plano Mensal</span>
                                    <span className={styles.summaryItemLineValue}>{defaultPlan?.currency} {defaultPlan?.price}</span>
                                </div>
                                <div className={styles.summaryItemLine}>
                                    <span className={styles.summaryItemLineObservation}>Troque para o plano Anual e economize $ 21,60.</span>
                                </div>
                            </div>
                            <div className={styles.summaryItem} style={{ marginTop: "8px" }}>
                                <div className={styles.summaryItemLine}>
                                    <span>Devido após o Teste Grátis</span>
                                    <span className={styles.summaryItemLineValue}>{defaultPlan?.currency} {defaultPlan?.price}</span>
                                </div>
                            </div>
                            <div className={styles.summaryItem} style={{ marginTop: "16px", fontWeight: "bold" }}>
                                <div className={styles.summaryItemLine}>
                                    <span>Total Devido Agora</span>
                                    <span className={styles.summaryItemLineValue}>$0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.paymentFormSection}>
                <span className={styles.sectionTitle}>Adicione uma forma de pagamento para começar</span>
                <div className={styles.paymentFormBox}>
                    <span className={styles.paymentFormBoxPaymentOption}>
                        <input
                            type="radio"
                            id="credit-card"
                            name="payment-method"
                            className={styles.customRadio}
                            checked
                        />
                        <div className={styles.paymentFormBoxPaymentOptionLabel}>
                            <CreditCardIcon />
                            <span className={styles.paymentFormBoxPaymentOptionText}>Adicionar novo cartão de crédito (powered by Stripe)</span>
                        </div>
                    </span>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputArea}>
                            <span className={styles.label}>Número do cartão *</span>
                            <div className={styles.input}>
                                <CardNumberElement />
                            </div>

                        </div>
                        <div className={styles.row}>
                            <div className={styles.inputArea}>
                                <span className={styles.label}>Data de vencimento *</span>
                                <div className={styles.input}>
                                    <CardExpiryElement />
                                </div>
                            </div>
                            <div className={styles.inputArea}>
                                <span className={styles.label}>CVC *</span>
                                <div className={styles.input}>
                                    <CardCvcElement />
                                </div>
                            </div>
                        </div>
                        <div className={styles.inputArea}>
                            <span className={styles.label}>Nome no cartão *</span>
                            <Controller
                                name='card_holder'
                                defaultValue=""
                                control={formControl}
                                render={({ field, fieldState }) => (
                                <>
                                    <input
                                        type='text'
                                        placeholder='Titular do cartão'
                                        className={styles.input}
                                        {...field}
                                    />
                                    {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                                </>
                                )}
                                rules={{
                                    required: 'Titular do cartão é obrigatório'
                                }}
                            />
                        </div>
                        <div className={styles.submitSection}>
                            <button type='submit' className={styles.nextStepButton} style={{ marginTop: "12px" }}>Começar Teste Grátis</button>
                            <span className={styles.submitSectionObservation}>Pagamento Seguro com Criptografia AES-256-bit</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
