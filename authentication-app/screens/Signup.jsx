import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/AuthContent';
import LoadingOverlay from '../components/LoadingOverlay';
import { useAuth } from '../hooks/useAuth';

import { createUser } from '../util/auth';

function SignupScreen() {
  const [isFetching, setIsFetching] = useState(false);
  const { authenticate } = useAuth();

  async function handleSignup({ email, password }) {
    setIsFetching(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert('Autehtication failed', 'Check your credentials.');
      setIsFetching(false);
    }
  }

  if (isFetching) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
}

export default SignupScreen;
