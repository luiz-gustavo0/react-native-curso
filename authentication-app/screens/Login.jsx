import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/AuthContent';
import LoadingOverlay from '../components/LoadingOverlay';
import { useAuth } from '../hooks/useAuth';
import { signin } from '../util/auth';

function LoginScreen() {
  const [isFetching, setIsFetching] = useState(false);
  const { authenticate } = useAuth();

  async function handleLogin({ email, password }) {
    try {
      setIsFetching(true);
      const token = await signin(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert('Autehtication failed', 'Check your credentials.');
      setIsFetching(false);
    }
  }

  if (isFetching) {
    return <LoadingOverlay message='Login user...' />;
  }
  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}

export default LoginScreen;
