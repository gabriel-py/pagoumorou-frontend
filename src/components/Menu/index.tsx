import cn from 'classnames';
import styles from './styles.module.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { routes } from './routes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '@/store';
import { BACKEND_URL, DEFAULT_PROFILE_PHOTO } from '@/lib/constants';

interface IMenuProps {
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
    initialRoute?: string;
    className?: string;
}

const Menu = ({ className, showMenu, setShowMenu, initialRoute }: IMenuProps) => {
    const { user, profile } = useAppSelector((state) => state.user);
    const userEmail = user?.username
    const userName = `${user?.first_name} ${user?.last_name}`
    
    return (
        <aside className={cn(styles.aside, className, { [styles.hide]: !showMenu })}>
            <div className={styles.planInfo}>
                <span><a href='/plan'>PLANO STARTER</a></span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.profile}>
                <img
                    src={profile?.profile?.profile_photo ? `${BACKEND_URL}${profile?.profile?.profile_photo}` : `${DEFAULT_PROFILE_PHOTO}`}
                    width={60}
                    height={60}
                    className={styles.profileImage}
                />
                <div className={styles.profileInfo}>
                    <span className={styles.profileInfoName}>{userName}</span>
                    <span className={styles.profileInfoEmail}>{userEmail}</span>
                </div>
            </div>
            <div className={styles.routes}>
            {routes.map((route, index) => (
                <div 
                    className={cn(styles.route, { [styles.routeSelected]: initialRoute === route?.name })}
                    key={index}
                    role='button'
                    onClick={() => window.location.href = route?.redirect}
                >
                    {route.icon}
                    <span className={styles.routeLabel}>
                        <span className={styles.label}>{route.label}</span>
                        <span className={styles.sublabel}>{route?.sublabel}</span>
                    </span>
                </div>
            ))}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.routes}>
                <div 
                    className={cn(styles.route, { [styles.routeSelected]: initialRoute === 'settings' })}
                    role='button'
                    onClick={() => window.location.href = '/profile'}
                >
                    <MoreHorizIcon />
                    <span className={styles.routeLabel}>
                        <span className={styles.label}>Configurações</span>
                    </span>
                </div>
                <div className={cn(styles.route, { [styles.routeSelected]: initialRoute === 'help' })}>
                    <HelpOutlineIcon />
                    <span className={styles.routeLabel}>
                        <span className={styles.label}>Ajuda</span>
                    </span>
                </div>
            </div>
            <div className={styles.hideMenu} role="button" onClick={() => setShowMenu(!showMenu)}><IndeterminateCheckBoxIcon /> Ocultar menu</div>
        </aside>
    );
};

export default Menu;
