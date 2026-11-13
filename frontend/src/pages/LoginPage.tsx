import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { type FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import useAuth from '../hooks/useAuth';
import type { ApiErrorResponse, AuthResponse } from '../types/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const { data } = await axiosClient.post<AuthResponse>('/api/auth/login', {
        email,
        password,
      });
      login(data);
      navigate('/');
    } catch (err: unknown) {
      const res = (err as { response?: { data?: ApiErrorResponse } }).response?.data;
      setErrorMessage(res?.message ?? 'ログインに失敗しました');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" component="h1" align="center">
          Hitokuchi
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          ログイン
        </Button>

        <Typography variant="body2" align="center">
          アカウントをお持ちでない方は{' '}
          <Link component={RouterLink} to="/register">
            新規登録はこちら
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
