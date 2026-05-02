import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Snackbar from '../Snackbar';
import ContactAssistant from './ContactAssistant';
import { Bio } from '../../data/constants';
import { submitContact } from '../../utils/api';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  letter-spacing: -0.5px;

  background: linear-gradient(135deg, #ffffff 0%, #ff265e 38%, #b458ff 78%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: titleGradientFlow 5s ease infinite;
  filter: drop-shadow(0 0 18px rgba(255, 38, 94, 0.30));

  &::before,
  &::after {
    content: '';
    flex: 1;
    max-width: 80px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(255, 38, 94, 0.8), rgba(180, 88, 255, 0.75));
    flex-shrink: 0;
  }
  &::before {
    background: linear-gradient(270deg, transparent, rgba(255, 38, 94, 0.8), rgba(180, 88, 255, 0.75));
  }

  &:hover {
    animation: titleGradientFlow 2s ease infinite;
    filter: drop-shadow(0 0 30px rgba(255, 38, 94, 0.55));
  }

  @keyframes titleGradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
    gap: 12px;
    &::before, &::after { max-width: 48px; }
  }
`;

const Desc = styled.div`
    font-size: 16px;
    text-align: center;
    max-width: 720px;
    width: 100%;
    line-height: 1.65;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 14px;
    padding: 14px 18px;
    border-radius: 16px;
    border: 1px dashed rgba(255, 38, 94, 0.28);
    border-left: 6px solid rgba(255, 38, 94, 0.9);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02)),
      radial-gradient(120% 140% at 18% 20%, rgba(255, 38, 94, 0.14), transparent 60%),
      radial-gradient(120% 140% at 86% 88%, rgba(180, 88, 255, 0.12), transparent 62%),
      rgba(255, 38, 94, 0.03);
    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0));
      opacity: 0.22;
      pointer-events: none;
    }
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 14px;
        padding: 12px 14px;
    }
`;

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 28px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 640px) {
    padding: 0 12px;
    gap: 18px;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  will-change: transform, opacity;
  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

const ContactForm = styled(motion.form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(255, 38, 94, 0.20) 0%, transparent 52%),
    radial-gradient(ellipse at 100% 100%, rgba(180, 88, 255, 0.14) 0%, transparent 58%),
    rgba(6, 6, 10, 0.92);
  padding: 36px 32px 32px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow:
    0 24px 60px rgba(0,0,0,0.65),
    0 0 0 1px rgba(255, 38, 94, 0.30),
    0 0 48px rgba(255, 38, 94, 0.10),
    inset 0 1px 0 rgba(255,255,255,0.07);
  backdrop-filter: blur(14px) saturate(160%);
  gap: 14px;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  @media (max-width: 640px) {
    padding: 22px 18px 18px;
    border-radius: 18px;
    box-shadow:
      0 18px 44px rgba(0,0,0,0.55),
      0 0 0 1px rgba(255, 38, 94, 0.22),
      inset 0 1px 0 rgba(255,255,255,0.07);
  }

  /* Top shimmer line */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 38, 94, 0.85) 25%,
      rgba(180, 88, 255, 0.90) 50%,
      rgba(255, 122, 224, 0.75) 75%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmerLine 4s linear infinite;
  }

  /* Rotating ambient glow */
  &::before {
    content: '';
    position: absolute;
    top: -80%;
    left: -80%;
    width: 260%;
    height: 260%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(255, 38, 94, 0.07) 60deg,
      rgba(180, 88, 255, 0.07) 120deg,
      transparent 180deg,
      transparent 360deg
    );
    animation: rotateBorder 10s linear infinite;
    pointer-events: none;
  }

  @keyframes shimmerLine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes rotateBorder {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ContactTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.3px;

  span.emoji {
    font-size: 24px;
    filter: drop-shadow(0 0 10px rgba(255, 38, 94, 0.55));
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 38, 94, 0.55), rgba(180, 88, 255, 0.25), transparent);
    border-radius: 999px;
  }
`

const ContactHint = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
  line-height: 1.5;
  opacity: 0.75;
  padding-left: 2px;
`;

/* Shared field wrapper with floating icon */
const FieldWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg, span.field-icon {
    position: absolute;
    left: 14px;
    font-size: 16px;
    opacity: 0.45;
    pointer-events: none;
    transition: opacity 200ms ease, color 200ms ease;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1;
  }

  &:focus-within svg,
  &:focus-within span.field-icon {
    opacity: 0.9;
    color: rgba(255, 38, 94, 0.95);
  }
`;

const ContactInput = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.10);
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 14px;
  padding: 13px 16px 13px 42px;
  transition: border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
  letter-spacing: 0.2px;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.55;
    font-size: 13px;
  }
  &:focus {
    border-color: rgba(255, 38, 94, 0.70);
    box-shadow:
      0 0 0 3px rgba(255, 38, 94, 0.14),
      0 0 22px rgba(180, 88, 255, 0.10);
    background: rgba(255, 38, 94, 0.06);
  }
`

const ContactInputMessage = styled.textarea`
  width: 100%;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.10);
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 14px;
  padding: 13px 16px 13px 42px;
  min-height: 110px;
  resize: vertical;
  transition: border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
  letter-spacing: 0.2px;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.55;
    font-size: 13px;
  }
  &:focus {
    border-color: rgba(255, 38, 94, 0.70);
    box-shadow:
      0 0 0 3px rgba(255, 38, 94, 0.14),
      0 0 22px rgba(180, 88, 255, 0.10);
    background: rgba(255, 38, 94, 0.06);
  }
`

const ContactButton = styled(motion.button)`
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, #ff265e 0%, #b458ff 58%, #ff7ae0 100%);
  background-size: 200% 200%;
  padding: 15px 16px;
  margin-top: 4px;
  border-radius: 14px;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  box-shadow:
    0 10px 34px rgba(255, 38, 94, 0.45),
    0 2px 8px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.2);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-position 400ms ease, box-shadow 220ms ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    transition: left 0.55s ease;
  }
  &:hover::before { left: 100%; }

  &:hover {
    background-position: 100% 0%;
    box-shadow:
      0 16px 44px rgba(255, 38, 94, 0.60),
      0 0 44px rgba(180, 88, 255, 0.22),
      inset 0 1px 0 rgba(255,255,255,0.25);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 6px 18px rgba(255, 38, 94, 0.40);
  }
`

const ContactSelect = styled.select`
  width: 100%;
  background: rgba(255,255,255,0.035)
    url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff265e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")
    no-repeat right 1rem center / 1em;
  border: 1px solid rgba(255,255,255,0.10);
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 14px;
  padding: 13px 40px 13px 42px;
  cursor: pointer;
  appearance: none;
  transition: border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;

  option {
    background-color: #12121f;
    color: ${({ theme }) => theme.text_primary};
    padding: 8px;
  }

  &:focus {
    border-color: rgba(255, 38, 94, 0.70);
    box-shadow:
      0 0 0 3px rgba(255, 38, 94, 0.14),
      0 0 22px rgba(180, 88, 255, 0.10);
    background-color: rgba(255, 38, 94, 0.06);
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ open }) => (open ? 1 : 0.5)});
  background: rgba(23, 23, 33, 0.95);
  border: 1px solid rgba(255, 38, 94, 0.55);
  box-shadow:
    0 0 60px rgba(255, 38, 94, 0.30),
    0 0 34px rgba(180, 88, 255, 0.18);
  padding: 60px;
  border-radius: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(20px);
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 38, 94, 1) 0%, rgba(180, 88, 255, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: white;
  box-shadow:
    0 0 34px rgba(255, 38, 94, 0.45),
    0 0 24px rgba(180, 88, 255, 0.25);
  animation: pulse 2s infinite;
  margin-bottom: 10px;

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 38, 94, 0.45); }
    70% { box-shadow: 0 0 0 30px rgba(255, 38, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 38, 94, 0); }
  }
`;

const SuccessTitle = styled.h3`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(255, 38, 94, 0.35);
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 0;
  font-size: 18px;
  max-width: 300px;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 38, 94, 1) 0%, rgba(180, 88, 255, 1) 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 22px rgba(255, 38, 94, 0.28),
      0 0 26px rgba(180, 88, 255, 0.18);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  background: rgba(255,255,255,0.05);
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  
  a {
    color: rgba(255, 38, 94, 0.92);
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Contact = () => {

  //hooks
  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const [bioData, setBioData] = useState(Bio);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const storedBio = localStorage.getItem('portfolio_bio');
    if (storedBio) {
      setBioData(JSON.parse(storedBio));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const newSubmission = {
      user_type: formData.get('user_type'),
      from_email: formData.get('from_email'),
      from_name: formData.get('from_name'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    
    try {
        await submitContact(newSubmission);
        
        // Show success popup immediately
        setOpen(true);
        form.current.reset();

        emailjs.sendForm('service_tox7kqs', 'template_nv7k7mj', form.current, 'SybVGsYS52j2TfLbi')
        .then((result) => {
            // Success handling handled optimistically above
        }, (error) => {
            if (import.meta.env.DEV) console.error(error);
        });
    } catch (err) {
      showSnackbar("Failed to submit contact form", "error");
    }
  }

  return (
    <Container>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Wrapper>
        <Title
          as={motion.div}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >Contact</Title>
        <Desc
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >Feel free to reach out to me for any questions or opportunities!</Desc>
        
        <ContactInfo
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
        >
          {bioData.email && (
            <InfoItem>
              📧 <a href={`mailto:${bioData.email}`}>{bioData.email}</a>
            </InfoItem>
          )}
          {bioData.phone && (
            <InfoItem>
              📞 <a href={`tel:${bioData.phone}`}>{bioData.phone}</a>
            </InfoItem>
          )}
        </ContactInfo>

        <ContentLayout>
          <LeftSide
            as={motion.div}
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <ContactAssistant />
          </LeftSide>
          
          <RightSide>
            <ContactForm 
              ref={form} 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <ContactTitle><span className="emoji">🚀</span> Contact Me</ContactTitle>
              <ContactHint>Send a message and I'll reply as soon as possible.</ContactHint>

              {/* Who are you */}
              <FieldWrap>
                <span className="field-icon">👤</span>
                <ContactSelect name="user_type" required defaultValue="">
                  <option value="" disabled hidden>Who are you?</option>
                  <option value="Company">🏢 Company</option>
                  <option value="Personal">👤 Personal</option>
                  <option value="Business Man">💼 Business</option>
                </ContactSelect>
              </FieldWrap>

              {/* Email */}
              <FieldWrap>
                <span className="field-icon">📧</span>
                <ContactInput placeholder="Your Email" name="from_email" type="email" />
              </FieldWrap>

              {/* Name */}
              <FieldWrap>
                <span className="field-icon">✏️</span>
                <ContactInput placeholder="Your Name" name="from_name" />
              </FieldWrap>

              {/* Subject */}
              <FieldWrap>
                <span className="field-icon">💬</span>
                <ContactInput placeholder="Subject" name="subject" />
              </FieldWrap>

              {/* Message */}
              <FieldWrap style={{ alignItems: 'flex-start' }}>
                <span className="field-icon" style={{ top: '14px' }}>📝</span>
                <ContactInputMessage placeholder="Write your message here..." rows="4" name="message" />
              </FieldWrap>

              <ContactButton
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                ✦ Send Message
              </ContactButton>
            </ContactForm>
          </RightSide>
        </ContentLayout>

        <SuccessPopup open={open}>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessTitle>Send Successfully</SuccessTitle>
          <SuccessMessage>
            Thank you for reaching out. I will get back to you shortly!
          </SuccessMessage>
          <CloseButton onClick={() => setOpen(false)}>Close</CloseButton>
        </SuccessPopup>
      </Wrapper>
    </Container>
  )
}

export default Contact
