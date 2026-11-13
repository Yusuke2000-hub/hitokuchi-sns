import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import useAuth from '../hooks/useAuth';

const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await axiosClient.post('/api/auth/logout', { refreshToken });
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h1">
          ログイン成功
        </Typography>
        <Typography variant="body1">ようこそ、@{username} さん</Typography>
        <Button variant="outlined" onClick={handleLogout} sx={{ alignSelf: 'flex-start' }}>
          ログアウト
        </Button>
      </Box>
    </Container>
  );
};

export default TimelinePage;
