
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { education as defaultEducation } from '../../data/constants';
import { fetchEducation } from '../../utils/api';
import EducationCard from '../Cards/EducationCard';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    isolation: isolate;

    & > * {
        position: relative;
        z-index: 1;
    }

    &::before {
        content: '';
        position: absolute;
        left: -180px;
        top: 180px;
        width: 560px;
        height: 560px;
        border-radius: 999px;
        background:
          radial-gradient(circle at 35% 35%, rgba(133,76,230,0.55), rgba(133,76,230,0.0) 60%),
          radial-gradient(circle at 70% 75%, rgba(0,194,255,0.35), rgba(0,194,255,0.0) 62%),
          radial-gradient(circle at 55% 50%, rgba(255,122,224,0.22), rgba(255,122,224,0.0) 65%);
        filter: blur(36px);
        opacity: 0.55;
        z-index: 0;
        pointer-events: none;
        animation: floatBlob 10s ease-in-out infinite;
    }

    &::after {
        content: '';
        position: absolute;
        left: 40px;
        top: 420px;
        width: 320px;
        height: 320px;
        border-radius: 999px;
        background:
          conic-gradient(from 160deg, rgba(133,76,230,0.0), rgba(133,76,230,0.40), rgba(0,194,255,0.28), rgba(255,122,224,0.24), rgba(133,76,230,0.0));
        filter: blur(18px);
        opacity: 0.35;
        z-index: 0;
        pointer-events: none;
        animation: floatBlob2 13s ease-in-out infinite;
    }

    @media (max-width: 960px) {
        flex-direction: column;
    }

    @media (max-width: 960px) {
        &::before,
        &::after {
            opacity: 0.18;
            filter: blur(28px);
        }
    }

    @keyframes floatBlob {
        0% { transform: translate3d(0px, 0px, 0) scale(1); }
        50% { transform: translate3d(26px, -22px, 0) scale(1.04); }
        100% { transform: translate3d(-14px, 18px, 0) scale(0.98); }
    }
    @keyframes floatBlob2 {
        0% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
        50% { transform: translate3d(-18px, 16px, 0) rotate(22deg); }
        100% { transform: translate3d(14px, -12px, 0) rotate(-14deg); }
    }
`;

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

  background: linear-gradient(135deg, #ffffff 0%, #c084fc 40%, #60c8ff 80%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: titleGradientFlow 5s ease infinite;
  filter: drop-shadow(0 0 18px rgba(133,76,230,0.35));

  &::before,
  &::after {
    content: '';
    flex: 1;
    max-width: 80px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(133,76,230,0.7), rgba(0,194,255,0.7));
    flex-shrink: 0;
  }
  &::before {
    background: linear-gradient(270deg, transparent, rgba(133,76,230,0.7), rgba(0,194,255,0.7));
  }

  &:hover {
    animation: titleGradientFlow 2s ease infinite;
    filter: drop-shadow(0 0 28px rgba(133,76,230,0.6));
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
    border: 1px dashed ${({ theme }) => theme.primary + 28};
    border-left: 6px solid ${({ theme }) => theme.primary};
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03)),
      radial-gradient(120% 140% at 18% 20%, rgba(133, 76, 230, 0.10), transparent 60%),
      rgba(133, 76, 230, 0.03);
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

const Grid = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const Reveal = styled(motion.div)`
    display: flex;
    width: 100%;
`;



const Education = () => {
    const [education, setEducation] = useState(defaultEducation);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const loadEducation = async () => {
            try {
                const res = await fetchEducation();
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setEducation(res.data);
                }
            } catch (err) {
                if (import.meta.env.DEV) console.error(err);
            }
        }
        loadEducation();
    }, []);

    return (
        <Container id="education">
            <Wrapper>
                <Title
                    as={motion.div}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    Education
                </Title>
                <Desc
                    as={motion.div}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                >
                    Academic milestones, coursework highlights, and grades—presented in the same style as experience cards.
                </Desc>
                <Grid>
                    {education.map((edu, index) => (
                        <Reveal
                            key={edu.id ?? index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ type: 'spring', stiffness: 90, damping: 22, delay: (index % 2) * 0.12 }}
                            whileHover={{
                                y: -6, scale: 1.015,
                                transition: { duration: 0.25, ease: 'easeOut' }
                            }}
                        >
                            <EducationCard
                                education={edu}
                                index={index}
                                expanded={expandedIndex === index}
                                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            />
                        </Reveal>
                    ))}
                </Grid>
            </Wrapper>
        </Container>
    )
}

export default Education
