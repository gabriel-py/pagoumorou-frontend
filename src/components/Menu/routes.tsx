import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export const routes = [
    {
      name: "upload",
      label: 'Upload',
      icon: <UploadFileIcon />,
      redirect: '/upload'
    },
    {
      name: "dashboard",
      label: 'Dashboard',
      icon: <DashboardIcon />,
      redirect: '/dashboard'
    },
    {
      name: "reports",
      label: 'Relatórios',
      icon: <LeaderboardIcon />,
      redirect: ''
    },
    {
      name: "metas",
      label: 'Metas',
      sublabel: '(em desenvolvimento)',
      icon: <ImportantDevicesIcon />,
      redirect: ''
    },
    {
      name: "integracoes",
      label: 'Integrações',
      icon: <IntegrationInstructionsIcon />,
      redirect: ''
    },
];