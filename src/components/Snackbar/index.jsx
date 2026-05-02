import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
`;

const SnackbarContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 30px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 320px;
  max-width: 450px;
  padding: 16px 20px;
  background: rgba(18, 18, 30, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid ${({ type }) => 
    type === 'success' ? '#00c853' : 
    type === 'error' ? '#ff6b6b' : 
    type === 'warning' ? '#ffab00' : '#854ce6'};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${({ isClosing }) => isClosing ? css`${fadeOut} 0.3s ease-in forwards` : css`${slideIn} 0.3s ease-out forwards`};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ type }) => 
    type === 'success' ? '#00c853' : 
    type === 'error' ? '#ff6b6b' : 
    type === 'warning' ? '#ffab00' : '#854ce6'};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Message = styled.div`
  font-size: 14px;
  color: #b1b1b1;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 4px;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Snackbar = ({ open, message, severity = 'info', onClose, autoHideDuration = 4000 }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      if (onClose) onClose();
    }, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsClosing(false);
      
      if (autoHideDuration) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [open, autoHideDuration, handleClose]);

  if (!shouldRender) return null;

  const getIcon = () => {
    switch (severity) {
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaExclamationCircle />;
      case 'warning': return <FaExclamationCircle />;
      default: return <FaInfoCircle />;
    }
  };

  const getTitle = () => {
    switch (severity) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      default: return 'Information';
    }
  };

  return (
    <SnackbarContainer type={severity} isClosing={isClosing}>
      <IconWrapper type={severity}>
        {getIcon()}
      </IconWrapper>
      <Content>
        <Title>{getTitle()}</Title>
        <Message>{message}</Message>
      </Content>
      <CloseButton onClick={handleClose}>
        <FaTimes />
      </CloseButton>
    </SnackbarContainer>
  );
};

export default Snackbar;
