import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  position: relative;
  z-index: 1;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 32px 28px;
  border-radius: 22px;
  background:
    radial-gradient(circle at 0% 0%, rgba(133,76,230,0.22), transparent 55%),
    radial-gradient(circle at 120% 140%, rgba(0,194,255,0.24), transparent 60%),
    rgba(17, 17, 35, 0.96);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    0 20px 50px rgba(0,0,0,0.7),
    0 0 0 1px rgba(133,76,230,0.5);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(225deg, hsla(271,100%,70%,1) 0%, hsla(294,100%,70%,1) 35%, #00c2ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  padding: 10px 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary + '60'};
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 4px;
  border-radius: 999px;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 45%, #00c2ff 100%);
  box-shadow:
    0 16px 34px rgba(0,0,0,0.6),
    0 0 20px rgba(133,76,230,0.9);
  transform: translateZ(0);
  transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;
  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      0 20px 44px rgba(0,0,0,0.8),
      0 0 26px rgba(133,76,230,1);
    filter: brightness(1.03);
  }
`;

const ErrorText = styled.div`
  font-size: 13px;
  color: #ff6b6b;
  margin-top: 2px;
`;

const SuccessBox = styled.div`
  margin-top: 10px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(0, 194, 255, 0.08);
  border: 1px solid rgba(0, 194, 255, 0.4);
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedUser = import.meta.env.VITE_ADMIN_USERNAME || '';
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || '';
    if (username === expectedUser && password === expectedPass && expectedUser && expectedPass) {
      localStorage.setItem('isAdmin', 'true');
      setSuccess(true);
      setError('');
      navigate('/admin/dashboard');
    } else {
      setSuccess(false);
      setError('Invalid admin credentials.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Admin Panel</Title>
        <Subtitle>Secure access to your portfolio controls.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Admin Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              autoComplete="username"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Login</Button>
        </Form>
        {success && (
          <SuccessBox>
            Welcome, Admin. You are successfully logged in.
          </SuccessBox>
        )}
      </Card>
    </Container>
  );
};

export default Admin;
