import ProgressBar from '@/components/ProgressBar';
import styles from './styles.module.scss';
import AccountCreationOptions from './components/AccountCreationOptions';
import CreationForm from './components/CreationForm';
import ExperienceForm from './components/ExperienceForm';
import { useEffect, useState } from 'react';
import cn from "classnames";
import { useAppDispatch, useAppSelector } from '@/store';
import { useForm } from 'react-hook-form';
import { createUser } from '@/store/services';

interface Step {
  step: number;
  passo: number;
  pageTitle: string | React.ReactNode;
  subtitleBeforePasso: string;
  component: React.ReactNode;
  showLoginSuggestion: boolean;
  showFaq: boolean;
  showSelos: boolean;
}

export interface NewUserFormData {
  name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  incomeOption?: number;
  hasKnownUsByOption?: number;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const { userCreated } = useAppSelector((state) => state.user);
  const [currentStepID, setCurrentStepID] = useState(0);
  const [currentStep, setCurrentStep] = useState<Step>();

  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<NewUserFormData>({
    mode: 'onChange',
    defaultValues: {},
  });

  // console.log("erros ", errors)
  // console.log("isValid ", isValid)
  // const formValues = watch();
  // console.log(formValues)

  const maxPassos = 3;

  const onNextStep = () => {
    const next = currentStepID + 1;
    if(next > maxPassos){
      return;
    }
    setCurrentStepID(next);
  }

  const onPrevious = () => {
    const next = currentStepID - 1;
    if(next < 0){
      return;
    }
    setCurrentStepID(next);
  }

  const onSubmit = (data: NewUserFormData) => {
    dispatch(createUser(data)).then((response: any)=>{
      console.log(response?.payload);
    });
  };

  useEffect(() => {
    if(userCreated?.id){
      window.location.href = `/membership?id=${userCreated?.id}`
    }
  }, [userCreated]);

  const steps: Step[] = [
    {
      step: 0,
      passo: 1,
      pageTitle: 'Crie sua conta e comece agora seu Teste Grátis de 7 Dias',
      subtitleBeforePasso: 'Crie sua conta',
      component: <AccountCreationOptions onNextStep={onNextStep} onPrevious={onPrevious} />,
      showLoginSuggestion: true,
      showFaq: false,
      showSelos: false
    },
    {
      step: 1,
      passo: 1,
      pageTitle: 'Crie sua conta e comece agora seu Teste Grátis de 7 Dias',
      subtitleBeforePasso: 'Crie sua conta',
      component: (
        <CreationForm
          onNextStep={onNextStep}
          onPrevious={onPrevious}
          control={control}
        />
      ),
      showLoginSuggestion: true,
      showFaq: false,
      showSelos: false
    },
    {
      step: 2,
      passo: 2,
      pageTitle: 'Vamos personalizar sua experiência',
      subtitleBeforePasso: 'Responda as perguntinhas',
      component: (
        <ExperienceForm
          onNextStep={onNextStep}
          onPrevious={onPrevious}
          control={control}
          isValid={isValid}
        />
      ),
      showLoginSuggestion: false,
      showFaq: false,
      showSelos: false
    }
  ]

  useEffect(() => {
    const targetStep = steps?.find((step)=> step.step == currentStepID)
    if(targetStep){
      setCurrentStep(targetStep);
    }
  }, [currentStepID]);

  if(!currentStep){
    return;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.screen}>
        <h1 className={styles.pageTitle}>CodMetrix</h1>
        <div className={styles.screenContent}>
          <div
            className={cn(styles.contentBox, {
              [styles.contentBoxWithoutLoginSuggestion]: !currentStep?.showLoginSuggestion,
            })}
          >
            <div className={styles.contentBoxHeader}>
              <h2 className={styles.contentBoxHeaderTitle}>{currentStep?.pageTitle}</h2>
              <ProgressBar progress={currentStep?.passo / maxPassos * 100} />
              <span className={styles.createYourAccount}>{currentStep?.subtitleBeforePasso}: <span className={styles.createYourAccountStep}>Passo {currentStep?.passo} de {maxPassos}</span></span>
            </div>
            {currentStep?.component}
            {currentStep?.showLoginSuggestion &&
              <span className={styles.footerText}>Já tem uma conta? <a href="/login" className={styles.loginText}>Faça o Login</a></span>
            }
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
