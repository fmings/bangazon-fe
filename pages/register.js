import React from 'react';
import { useRouter } from 'next/router';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
  }

  return (
    <div className="container register">
      <RegisterForm />
    </div>
  );
}
