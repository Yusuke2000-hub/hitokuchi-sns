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

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);

    if (password !== passwordConfirm) {
      setErrorMessages(['パスワードが一致しません']);
      return;
    }

    try {
      const { data } = await axiosClient.post<AuthResponse>('/api/auth/register', {
        username,
        email,
        password,
      });
      login(data);
      navigate('/');
    } catch (err: unknown) {
      const res = (err as { response?: { data?: ApiErrorResponse } }).response?.data;
      if (!res) {
        setErrorMessages(['登録に失敗しました']);
        return;
      }
      if (res.errors && res.errors.length > 0) {
        setErrorMessages(res.errors.map((fe) => fe.message));
      } else {
        setErrorMessages([res.message]);
      }
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
          新規登録
        </Typography>

        {errorMessages.length > 0 && (
          <Alert severity="error">
            {errorMessages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </Alert>
        )}

        <TextField
          label="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="パスワード（8文字以上）"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="パスワード確認"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          登録する
        </Button>

        <Typography variant="body2" align="center">
          すでにアカウントをお持ちの方は{' '}
          <Link component={RouterLink} to="/login">
            ログインはこちら
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
