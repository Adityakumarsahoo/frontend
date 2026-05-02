import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import HeroImage from '../../images/HeroImage.jpg';
import AdiPhoto from '../../images/adi photoo.png';

const AssistantFrame = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding-bottom: 20px;

  @media (max-width: 960px) {
    padding-bottom: 10px;
  }
`;

const PhotosRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 18px;
  }
`;

const PhotoWrapper = styled(motion.div)`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.5),
    0 0 46px rgba(255, 38, 94, 0.35);
  border: 4px solid rgba(255, 38, 94, 0.35);
  will-change: transform, opacity;

  @media (max-width: 960px) {
    width: 170px;
    height: 170px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border-width: 3px;
  }

  @media (max-width: 360px) {
    width: 132px;
    height: 132px;
  }
`;

const PhotoWrapper2 = styled(motion.div)`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.5),
    0 0 46px rgba(180, 88, 255, 0.38);
  border: 4px solid rgba(180, 88, 255, 0.38);
  will-change: transform, opacity;

  @media (max-width: 960px) {
    width: 170px;
    height: 170px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border-width: 3px;
  }

  @media (max-width: 360px) {
    width: 132px;
    height: 132px;
  }
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
`;

const PhotoImg2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

const Divider = styled(motion.div)`
  width: 2px;
  height: 200px;
  flex-shrink: 0;
  margin: 0 32px;
  border-radius: 999px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 38, 94, 0.85) 30%,
    rgba(180, 88, 255, 0.85) 70%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(255, 38, 94, 0.55), 0 0 24px rgba(180, 88, 255, 0.35);

  @media (max-width: 960px) {
    height: 140px;
    margin: 0 20px;
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 2px;
    margin: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 38, 94, 0.85) 30%,
      rgba(180, 88, 255, 0.85) 70%,
      transparent 100%
    );
  }
`;

/* Glows use left/top offset instead of transform — avoids framer-motion transform conflict */
const GlowLeft = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 38, 94, 0.22) 0%, transparent 70%);
  filter: blur(30px);
  left: calc(50% - 280px * 1.6);
  top: calc(50% - 140px);
  pointer-events: none;
  z-index: 1;
  will-change: opacity;

  @media (max-width: 960px) {
    width: 200px;
    height: 200px;
    left: calc(50% - 200px * 1.5);
    top: calc(50% - 100px);
  }

  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
    left: 50%;
    top: 10px;
    transform: translateX(-120%);
    opacity: 0.55;
  }
`;

const GlowRight = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(180, 88, 255, 0.22) 0%, transparent 70%);
  filter: blur(30px);
  left: calc(50% + 280px * 0.6);
  top: calc(50% - 140px);
  pointer-events: none;
  z-index: 1;
  will-change: opacity;

  @media (max-width: 960px) {
    width: 200px;
    height: 200px;
    left: calc(50% + 200px * 0.5);
    top: calc(50% - 100px);
  }

  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
    left: 50%;
    top: 150px;
    transform: translateX(20%);
    opacity: 0.55;
  }
`;

const InfoRow = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 32px;
  margin-top: 28px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 18px;
    margin-top: 20px;
  }
`;

const InfoCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InfoLabel = styled(motion.div)`
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 600;
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const Chip = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  background: rgba(255,255,255,0.06);
  border: 1px solid ${({ $color }) => $color || 'rgba(255, 38, 94, 0.30)'};
  color: ${({ $color }) => $color || 'rgba(255, 38, 94, 0.92)'};
  backdrop-filter: blur(8px);
  cursor: default;
  white-space: nowrap;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $color }) => $color || 'rgba(255, 38, 94, 0.92)'};
    flex-shrink: 0;
  }
`;

const ProjectChip = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(180, 88, 255, 0.30);
  color: rgba(233, 207, 255, 0.96);
  backdrop-filter: blur(8px);
  cursor: default;
  white-space: nowrap;
`;

// ── Animation Variants ──────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }
  })
};

const slideLeft = {
  hidden: { opacity: 0, x: -80, scale: 0.85, rotate: -6 },
  visible: {
    opacity: 1, x: 0, scale: 1, rotate: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 80, scale: 0.85, rotate: 6 },
  visible: {
    opacity: 1, x: 0, scale: 1, rotate: 0,
    transition: { duration: 0.8, delay: 0.15, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const dividerVariant = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1, opacity: 1,
    transition: { duration: 0.9, delay: 0.35, ease: 'easeOut' }
  }
};

const glowVariant = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.15, ease: 'easeOut' }
  })
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, delay: 0.6 + i * 0.07, ease: 'backOut' }
  })
};

const ContactAssistant = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  const skills = [
    { label: 'React',   color: 'rgba(255, 38, 94, 0.88)' },
    { label: 'Node.js', color: 'rgba(255, 38, 94, 0.88)' },
    { label: 'MongoDB', color: 'rgba(255, 38, 94, 0.88)' },
    { label: 'Express', color: 'rgba(255, 38, 94, 0.88)' },
    { label: 'Figma',   color: 'rgba(255, 122, 224, 0.88)' },
    { label: 'UI/UX',   color: 'rgba(180, 88, 255, 0.88)' },
  ];

  const projects = ['Quick Chat', 'AI Variant', 'Medical App', 'Portfolio'];

  return (
    <AssistantFrame ref={ref}>
      {/* Background glows - animate in when scrolled */}
      <GlowLeft
        variants={glowVariant}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={0}
      />
      <GlowRight
        variants={glowVariant}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={1}
      />

      <PhotosRow>
        {/* Left photo - slides in from left with rotation */}
        <PhotoWrapper
          variants={slideLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 0 60px rgba(0,194,255,0.6)',
            transition: { duration: 0.35, ease: 'easeOut' }
          }}
        >
          <PhotoImg src={HeroImage} alt="Aditya" />
        </PhotoWrapper>

        {/* Divider - grows from center */}
        <Divider
          variants={dividerVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ originY: 0.5 }}
        />

        {/* Right photo - slides in from right with rotation */}
        <PhotoWrapper2
          variants={slideRight}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 0 60px rgba(133,76,230,0.6)',
            transition: { duration: 0.35, ease: 'easeOut' }
          }}
        >
          <PhotoImg2 src={AdiPhoto} alt="Aditya Second" />
        </PhotoWrapper2>
      </PhotosRow>

      {/* Skills & Projects - fade up when in view */}
      <InfoRow
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={0}
      >
        {/* Skills */}
        <InfoCard
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          <InfoLabel
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1.5}
          >
            Skills
          </InfoLabel>
          <ChipsRow>
            {skills.map((s, i) => (
              <Chip
                key={s.label}
                $color={s.color}
                variants={chipVariant}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                whileHover={{ scale: 1.12, y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                {s.label}
              </Chip>
            ))}
          </ChipsRow>
        </InfoCard>

        {/* Projects */}
        <InfoCard
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
        >
          <InfoLabel
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2.5}
          >
            Projects
          </InfoLabel>
          <ChipsRow>
            {projects.map((p, i) => (
              <ProjectChip
                key={p}
                variants={chipVariant}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i + 6}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  background: 'rgba(133,76,230,0.18)',
                  borderColor: 'rgba(133,76,230,0.7)',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                ◆ {p}
              </ProjectChip>
            ))}
          </ChipsRow>
        </InfoCard>
      </InfoRow>
    </AssistantFrame>
  );
};

export default ContactAssistant;
