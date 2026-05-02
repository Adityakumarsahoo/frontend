import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../Snackbar';
import { register, login } from '../../utils/api';

const countryCodes = [
  { code: 'IN', name: 'India', dial_code: '+91', flag: '🇮🇳' },
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dial_code: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dial_code: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dial_code: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial_code: '+33', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', dial_code: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', dial_code: '+86', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', dial_code: '+55', flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', dial_code: '+7', flag: '🇷🇺' },
  { code: 'ZA', name: 'South Africa', dial_code: '+27', flag: '🇿🇦' },
  { code: 'AE', name: 'UAE', dial_code: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dial_code: '+966', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore', dial_code: '+65', flag: '🇸🇬' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  position: relative;
  z-index: 1;
  padding: 40px 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 0% 0%, rgba(133,76,230,0.2), transparent 55%),
              radial-gradient(circle at 120% 140%, rgba(0,194,255,0.22), transparent 60%),
              rgba(17, 17, 35, 0.92);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow:
    0 18px 40px rgba(0,0,0,0.55),
    0 0 0 1px rgba(133,76,230,0.4);
  gap: 24px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #854CE6, #00C2FF);
  }
  
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 22px 18px;
    border-radius: 16px;
  }

  @media (max-width: 420px) {
    padding: 18px 14px;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-left: 4px;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 14px;
  }
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.primary + 20};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 16px;
  margin-top: 10px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(133, 76, 230, 0.6);
    filter: brightness(1.1);
  }
`;

const PhoneContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CountrySelect = styled.select`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 12px;
  transition: all 0.3s ease;
  width: 110px;
  cursor: pointer;
  
  option {
    background-color: #171721;
    color: white;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.primary + 20};
  }
`;

const ToggleText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: right;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  span {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    margin-left: 5px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    span {
      text-decoration: underline;
    }
  }
`;

const Authentication = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    role: '',
    specialization: '',
    branch: '',
    course: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    
    try {
      if (isSignUp) {
        // Handle Registration
        if (formData.password !== formData.confirmPassword) {
          showSnackbar("Passwords do not match!", "error");
          return;
        }

        const res = await register(formData);
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        
        showSnackbar("Registration Successful! Welcome to the team.", "success");
        setTimeout(() => navigate('/user/dashboard'), 1500);
        
      } else {
        // Handle Login
        const res = await login({ email: formData.email, password: formData.password });
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        
        if (res.data.user.isAdmin) {
             localStorage.setItem('isAdmin', 'true');
             navigate('/admin/dashboard');
        } else {
             navigate('/user/dashboard');
        }
      }
    } catch (err) {
      showSnackbar(err.response?.data?.msg || "Something went wrong!", "error");
    }
  };

  return (
    <Container>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Wrapper>
        <AuthCard>
          <Title>{isSignUp ? 'Join the Team' : 'Welcome Back'}</Title>
          <Subtitle>
            {isSignUp 
              ? 'Create your account to join our team' 
              : 'Log in to access your dashboard'}
          </Subtitle>
          
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <InputContainer>
                    <Label>Full Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </InputContainer>

                  <InputContainer>
                    <Label>Mobile Number</Label>
                    <PhoneContainer>
                      <CountrySelect 
                        name="countryCode" 
                        value={formData.countryCode} 
                        onChange={handleChange}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.dial_code}>
                            {country.flag} {country.dial_code}
                          </option>
                        ))}
                      </CountrySelect>
                      <Input 
                        placeholder="98765 43210" 
                        type="tel"
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                        style={{ flex: 1 }}
                      />
                    </PhoneContainer>
                  </InputContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <InputContainer>
                    <Label>Role</Label>
                    <Input 
                      placeholder="Developer" 
                      name="role" 
                      value={formData.role}
                      onChange={handleChange}
                      required 
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label>Specialization</Label>
                    <Input 
                      placeholder="Frontend" 
                      name="specialization" 
                      value={formData.specialization}
                      onChange={handleChange}
                      required 
                    />
                  </InputContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <InputContainer>
                    <Label>Branch</Label>
                    <Input 
                      placeholder="CSE" 
                      name="branch" 
                      value={formData.branch}
                      onChange={handleChange}
                      required 
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label>Course</Label>
                    <Input 
                      placeholder="B.Tech" 
                      name="course" 
                      value={formData.course}
                      onChange={handleChange}
                      required 
                    />
                  </InputContainer>
                </div>

                <InputContainer>
                  <Label>Address</Label>
                  <Input 
                    placeholder="City, State, Country" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                </InputContainer>
              </>
            )}
            
            <InputContainer>
              <Label>Email Address</Label>
              <Input 
                placeholder="john@example.com" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </InputContainer>
            
            <div style={{ display: 'grid', gridTemplateColumns: isSignUp ? '1fr 1fr' : '1fr', gap: '20px' }}>
              <InputContainer>
                <Label>Password</Label>
                <Input 
                  placeholder="••••••••" 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </InputContainer>
              
              {isSignUp && (
                <InputContainer>
                  <Label>Confirm Password</Label>
                  <Input 
                    placeholder="••••••••" 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                </InputContainer>
              )}
            </div>
            
            <SubmitButton type="submit">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </SubmitButton>
          </Form>

          <ToggleText onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <span>{isSignUp ? 'Log In' : 'Sign Up'}</span>
          </ToggleText>
        </AuthCard>
      </Wrapper>
    </Container>
  );
};

export default Authentication;
