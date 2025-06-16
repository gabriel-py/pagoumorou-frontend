import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { checkLogin, login } from '@/store/services';
import { LoginPayload } from '@/services/api/login/types';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoadingLogin } = useAppSelector((state) => state.user);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(email != "" && password != "") {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
  }, [password, email]);

  const dispatchLogin = () => {
    const payload: LoginPayload = {
        username: email,
        password: password
    }

    dispatch(login(payload)).then((response: any) => {
        if(response?.payload?.response?.error){
          alert("Erro ao fazer login: " +response?.payload?.response?.error);
        }
    });
  }

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if(isLoggedIn){
      navigate(`/dashboard`);
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.screen}>
        <div className={styles.form}>
            <div className={styles.content}>
                <h1 className={styles.contentTitle}>
                    <img src='/logo.png' width='36px' height='36px' />
                    <span>CodMetrix</span>
                </h1>
                <h2 className={styles.contentSubtitle}>Olá! Como é bom ver você aqui.</h2>
                <div className={styles.formBox}>
                    <span className={styles.formBoxTitle}>Faça seu login e acesse sua conta.</span>
                    <div className={styles.inputArea}>
                        <span className={styles.label}>E-mail</span>
                        <input
                            type='email'
                            placeholder='Digite seu e-mail...'
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <span className={styles.label}>Senha</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Digite sua senha...'
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className={styles.forgotMyPassword}>Esqueci minha senha</span>
                        <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
                            {showPassword ? '👁️‍🗨️' : '👁️'}
                        </span>
                    </div>
                    <button 
                        type='button' 
                        className={styles.button} 
                        disabled={buttonDisabled || isLoadingLogin} 
                        onClick={dispatchLogin}
                    >
                        {isLoadingLogin ? 'Carregando...' : 'Entrar agora'}
                    </button>
                    <span className={styles.formBoxFooterText}>Ainda não tem uma conta? <a href="/register">Registre-se agora</a></span>
                </div>
            </div>
        </div>
        <div className={styles.banner}>
            <span className={styles.needHelpSpan}>Preciso de ajuda</span>
            <div className={styles.title}>
                <h1 className={styles.titleH1}><span className={styles.quote}>“</span>O melhor dashboard para Contra Entrega do mundo<span className={styles.quote}>”</span></h1>
                <span>- Criador do CodMetrix (mas eu juro que é verdade...)</span>
            </div>
        </div>
    </div>
  );
};

export default Login;
