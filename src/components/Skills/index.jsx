import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { skills as defaultSkills } from '../../data/constants'
import { FaCss3Alt, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaJsSquare } from 'react-icons/fa'
import { SiAdobexd, SiFigma, SiNetlify, SiPostman, SiVisualstudiocode, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiMysql, SiPostgresql, SiPython, SiSpringboot, SiReact, SiRedux, SiNextdotjs, SiBootstrap, SiMaterialui, SiGraphql, SiJava, SiKotlin, SiAndroidstudio } from 'react-icons/si'
import { fetchSkills } from '../../utils/api'
import LogoDark from '../../images/logo_dark.png'

const bgSpin = keyframes`
  0% { transform: translate3d(-50%, -50%, 0) rotate(0deg); opacity: 0.55; }
  50% { opacity: 0.85; }
  100% { transform: translate3d(-50%, -50%, 0) rotate(360deg); opacity: 0.55; }
`;

const corePulse = keyframes`
  0%, 100% { transform: translateX(-50%) scale(1); filter: brightness(1); }
  50% { transform: translateX(-50%) scale(1.05); filter: brightness(1.08); }
`;

const ringRotate = keyframes`
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(-50%) rotate(360deg); }
`;

const iconBob = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, calc(var(--amp, 10px) * -1), 0); }
`;

const dashFlow = keyframes`
  0% { stroke-dashoffset: 0; opacity: 0.55; }
  50% { opacity: 0.95; }
  100% { stroke-dashoffset: -90; opacity: 0.55; }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`

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
`

export const Title = styled.div`
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

  /* Gradient text */
  background: linear-gradient(135deg, #ffffff 0%, #c084fc 40%, #60c8ff 80%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: titleGradientFlow 5s ease infinite;
  filter: drop-shadow(0 0 18px rgba(133,76,230,0.35));

  /* Decorative side lines */
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

  /* Underline glow bar */
  span.title-underline {
    display: none;
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

export const Desc = styled.div`
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
        font-size: 14px;
        padding: 12px 14px;
    }
`;

const SkillsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  margin-top: 30px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SkillCard = styled(motion.div)`
  width: 100%;
  border-radius: 18px;
  padding: 22px 22px;
  display: flex;
  gap: 18px;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(133, 76, 230, 0.18) 0%, transparent 55%),
    radial-gradient(140% 140% at 100% 100%, rgba(0, 194, 255, 0.12) 0%, transparent 60%),
    rgba(10, 10, 26, 0.92);
  box-shadow:
    0 18px 52px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(133, 76, 230, 0.7), rgba(0, 194, 255, 0.8), transparent);
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: radial-gradient(closest-side, rgba(255, 255, 255, 0.10), transparent 70%);
    opacity: 0.25;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    padding: 18px 16px;
    gap: 14px;
  }
`;

const CardIconWrap = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.22), transparent 55%),
    linear-gradient(
      135deg,
      ${({ $a }) => $a || 'rgba(133, 76, 230, 0.55)'},
      ${({ $b }) => $b || 'rgba(0, 194, 255, 0.35)'}
    );
  box-shadow:
    0 14px 36px rgba(0, 0, 0, 0.55),
    0 0 0 2px rgba(255, 255, 255, 0.14) inset,
    0 0 34px rgba(133, 76, 230, 0.22);

  &::after {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
    opacity: 0.65;
  }

  > svg {
    width: 40px;
    height: 40px;
    color: ${({ $icon }) => $icon || 'rgba(255, 255, 255, 0.92)'};
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.25));
  }

  @media (max-width: 640px) {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    svg {
      width: 34px;
      height: 34px;
    }
  }
`;

const IconMosaic = styled.div`
  width: 62px;
  height: 62px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

const MosaicItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg || 'rgba(0,0,0,0.22)'};
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
  svg {
    width: 18px;
    height: 18px;
    color: ${({ $color }) => $color || 'rgba(255,255,255,0.9)'};
  }
`;

const FrontendLogo = () => (
  <IconMosaic aria-hidden="true">
    <MosaicItem $bg="rgba(97, 218, 251, 0.18)" $color="#61DAFB">
      <SiReact />
    </MosaicItem>
    <MosaicItem $bg="rgba(227, 79, 38, 0.18)" $color="#E34F26">
      <FaHtml5 />
    </MosaicItem>
    <MosaicItem $bg="rgba(21, 114, 182, 0.18)" $color="#1572B6">
      <FaCss3Alt />
    </MosaicItem>
    <MosaicItem $bg="rgba(247, 223, 30, 0.22)" $color="#111827">
      <FaJsSquare />
    </MosaicItem>
  </IconMosaic>
);

const BackendLogo = () => (
  <IconMosaic aria-hidden="true">
    <MosaicItem $bg="rgba(51, 153, 51, 0.18)" $color="#7CFF7C">
      <SiNodedotjs />
    </MosaicItem>
    <MosaicItem $bg="rgba(255, 255, 255, 0.12)" $color="rgba(255,255,255,0.92)">
      <SiExpress />
    </MosaicItem>
    <MosaicItem $bg="rgba(71, 162, 72, 0.18)" $color="#47A248">
      <SiMongodb />
    </MosaicItem>
    <MosaicItem $bg="rgba(255, 202, 40, 0.16)" $color="#FFCA28">
      <SiFirebase />
    </MosaicItem>
  </IconMosaic>
);

const AndroidLogo = () => (
  <IconMosaic aria-hidden="true">
    <MosaicItem $bg="rgba(231, 111, 0, 0.16)" $color="#E76F00">
      <SiJava />
    </MosaicItem>
    <MosaicItem $bg="rgba(127, 82, 255, 0.16)" $color="#7F52FF">
      <SiKotlin />
    </MosaicItem>
    <MosaicItem $bg="rgba(0, 194, 255, 0.14)" $color="#00C2FF">
      <FaJsSquare />
    </MosaicItem>
    <MosaicItem $bg="rgba(61, 220, 132, 0.16)" $color="#3DDC84">
      <SiAndroidstudio />
    </MosaicItem>
  </IconMosaic>
);

const OthersLogo = () => (
  <IconMosaic aria-hidden="true">
    <MosaicItem $bg="rgba(240, 80, 50, 0.18)" $color="#F05032">
      <FaGitAlt />
    </MosaicItem>
    <MosaicItem $bg="rgba(255, 255, 255, 0.12)" $color="rgba(255,255,255,0.92)">
      <FaGithub />
    </MosaicItem>
    <MosaicItem $bg="rgba(36, 150, 237, 0.16)" $color="#2496ED">
      <FaDocker />
    </MosaicItem>
    <MosaicItem $bg="rgba(0, 122, 204, 0.16)" $color="#007ACC">
      <SiVisualstudiocode />
    </MosaicItem>
  </IconMosaic>
);

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 0.2px;
  line-height: 1.2;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const CardDesc = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.45;
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.86);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(8px);
  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 7px 10px;
    border-radius: 11px;
    font-size: 11px;
  }
`;

const LearnButton = styled.button`
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.86);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(133, 76, 230, 0.14);
    border-color: rgba(133, 76, 230, 0.35);
  }
`;

const Showcase = styled.div`
  width: 100%;
  margin-top: 22px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(1000px 440px at 40% 0%, rgba(133, 76, 230, 0.22) 0%, transparent 55%),
    radial-gradient(900px 420px at 80% 40%, rgba(0, 194, 255, 0.14) 0%, transparent 60%),
    linear-gradient(180deg, rgba(10, 10, 26, 0.55), rgba(10, 10, 26, 0.12));
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  position: relative;
  padding: 22px 18px 16px;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background:
      conic-gradient(
        from 90deg,
        rgba(133, 76, 230, 0.0),
        rgba(133, 76, 230, 0.18),
        rgba(0, 194, 255, 0.14),
        rgba(255, 122, 224, 0.10),
        rgba(133, 76, 230, 0.0)
      );
    filter: blur(18px);
    animation: ${bgSpin} 18s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
      opacity: 0.25;
    }
  }

  @media (max-width: 768px) {
    padding: 18px 14px 14px;
  }
`;

const ShowcaseText = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  line-height: 1.45;
  max-width: 760px;
  margin: 0 auto;
  span {
    color: rgba(192, 132, 252, 1);
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

const OrbitStage = styled.div`
  width: 100%;
  max-width: 920px;
  margin: 12px auto 0;
  position: relative;
  height: 260px;
  @media (max-width: 768px) {
    height: 230px;
  }
  @media (max-width: 480px) {
    height: 210px;
  }
`;

const OrbitIcons = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 680px;
  z-index: 3;
  @media (max-width: 640px) {
    top: 34px;
    gap: 7px;
  }
`;

const OrbitIcon = styled(motion.div)`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  animation: ${iconBob} 3.8s ease-in-out infinite;
  animation-delay: var(--d, 0s);
  will-change: transform;
  svg {
    width: 15px;
    height: 15px;
    color: ${({ $color }) => $color || 'rgba(255,255,255,0.92)'};
  }
  &:hover {
    transform: translate3d(0, -5px, 0) scale(1.05);
    box-shadow: 0 22px 56px rgba(0, 0, 0, 0.45);
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  @media (max-width: 640px) {
    width: 26px;
    height: 26px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ConnectorSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
  path {
    stroke-dasharray: 10 16;
    animation: ${dashFlow} 3.9s linear infinite;
    animation-delay: var(--d, 0s);
  }
  @media (prefers-reduced-motion: reduce) {
    path {
      animation: none;
      opacity: 0.55;
    }
  }
`;

const Core = styled.div`
  position: absolute;
  left: 50%;
  bottom: 38px;
  transform: translateX(-50%);
  width: 92px;
  height: 92px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.18), transparent 55%),
    radial-gradient(circle at 70% 80%, rgba(0, 194, 255, 0.18), transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(133, 76, 230, 0.22), transparent 62%),
    rgba(90, 44, 180, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 32px 90px rgba(133, 76, 230, 0.35),
    0 0 70px rgba(0, 194, 255, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: ${corePulse} 3.2s ease-in-out infinite;
  will-change: transform, filter;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  @media (max-width: 640px) {
    width: 86px;
    height: 86px;
  }
`;

const CoreLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter:
    drop-shadow(0 0 14px rgba(133, 76, 230, 0.75))
    drop-shadow(0 0 18px rgba(0, 194, 255, 0.30));
  opacity: 0.98;
  user-select: none;
  -webkit-user-drag: none;
  @media (max-width: 640px) {
    width: 46px;
    height: 46px;
  }
`;

const OrbitRings = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  width: min(920px, 100%);
  height: 150px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
`;

const RingRotator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  animation: ${ringRotate} 22s linear infinite;
  transform-origin: center;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const RingsSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const orbitItems = [
  { icon: SiFigma, color: '#F24E1E' },
  { icon: SiReact, color: '#61DAFB' },
  { icon: FaCss3Alt, color: '#1572B6' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiRedux, color: '#764ABC' },
  { icon: FaJsSquare, color: '#F7DF1E' },
  { icon: FaHtml5, color: '#E34F26' },
  { icon: SiAdobexd, color: '#FF61F6' },
  { icon: SiExpress, color: 'rgba(255,255,255,0.95)' },
  { icon: FaDocker, color: '#2496ED' },
  { icon: SiMongodb, color: '#47A248' },
];

const SkillImage = styled.img.attrs({
  referrerPolicy: 'no-referrer',
  loading: 'lazy',
  decoding: 'async',
})`
  width: 24px;
  height: 24px;
`

const SkillIcon = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color || 'rgba(255, 255, 255, 0.88)'};
  svg {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

const SkillFallback = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.2px;
  color: rgba(255,255,255,0.92);
  background:
    radial-gradient(120% 160% at 18% 20%, rgba(192,132,252,0.40), rgba(192,132,252,0.0) 55%),
    radial-gradient(120% 160% at 86% 84%, rgba(0,194,255,0.30), rgba(0,194,255,0.0) 60%),
    rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 0 18px rgba(133,76,230,0.12), 0 0 16px rgba(0,194,255,0.08);
`;

const iconBySkillName = {
  'React Js': SiReact,
  'ReactJS': SiReact,
  'Redux': SiRedux,
  'Next Js': SiNextdotjs,
  'Bootstrap': SiBootstrap,
  'Material UI': SiMaterialui,
  'Git': FaGitAlt,
  'GitHub': FaGithub,
  'Docker': FaDocker,
  'Netlify': SiNetlify,
  'VS Code': SiVisualstudiocode,
  'Postman': SiPostman,
  'Adobe XD': SiAdobexd,
  'Figma': SiFigma,
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': FaJsSquare,
  'Node Js': SiNodedotjs,
  'NodeJs': SiNodedotjs,
  'Express Js': SiExpress,
  'Express.js': SiExpress,
  'MongoDB': SiMongodb,
  'Firebase': SiFirebase,
  'MySQL': SiMysql,
  'Postgresql': SiPostgresql,
  'Python': SiPython,
  'Spring Boot': SiSpringboot,
  'Graph Ql': SiGraphql,
  'Java': SiJava,
  'Kotlin': SiKotlin,
  'Android Studio': SiAndroidstudio,
};

const colorBySkillName = {
  'React Js': '#61DAFB',
  'ReactJS': '#61DAFB',
  'Redux': '#764ABC',
  'Next Js': '#ffffff',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'JavaScript': '#F7DF1E',
  'Bootstrap': '#7952B3',
  'Material UI': '#007FFF',
  'Node Js': '#339933',
  'NodeJs': '#339933',
  'Express Js': '#ffffff',
  'Express.js': '#ffffff',
  'MongoDB': '#47A248',
  'Firebase': '#FFCA28',
  'MySQL': '#4479A1',
  'Postgresql': '#4169E1',
  'Python': '#3776AB',
  'Spring Boot': '#6DB33F',
  'Graph Ql': '#E10098',
  'Java': '#E76F00',
  'Kotlin': '#7F52FF',
  'Android Studio': '#3DDC84',
  'Git': '#F05032',
  'GitHub': '#ffffff',
  'Docker': '#2496ED',
  'Netlify': '#00C7B7',
  'VS Code': '#007ACC',
  'Postman': '#FF6C37',
  'Adobe XD': '#FF61F6',
  'Figma': '#F24E1E',
};

const SkillLogo = ({ name, image }) => {
  const [imgOk, setImgOk] = useState(true);
  const Icon = iconBySkillName[name];
  const iconColor = colorBySkillName[name];
  if (Icon) {
    return (
      <SkillIcon aria-hidden="true" $color={iconColor}>
        <Icon />
      </SkillIcon>
    );
  }
  const initials = String(name || '?')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '?';

  if (!image || !imgOk) return <SkillFallback aria-hidden="true">{initials}</SkillFallback>;
  return <SkillImage src={image} alt={name} onError={() => setImgOk(false)} />;
};

const categoryMeta = {
  Frontend: {
    icon: SiReact,
    desc: 'UI, state, styling, and frontend frameworks for modern web apps.',
    a: 'rgba(97, 218, 251, 0.55)',
    b: 'rgba(133, 76, 230, 0.42)',
    iconColor: '#61DAFB',
  },
  Backend: {
    icon: SiNodedotjs,
    desc: 'APIs, databases, auth, and server-side logic for scalable systems.',
    a: 'rgba(51, 153, 51, 0.55)',
    b: 'rgba(0, 194, 255, 0.34)',
    iconColor: '#A7F3A1',
  },
  Android: {
    icon: SiAndroidstudio,
    desc: 'Android development tools and languages for mobile experiences.',
    a: 'rgba(61, 220, 132, 0.52)',
    b: 'rgba(0, 194, 255, 0.28)',
    iconColor: '#3DDC84',
  },
  Others: {
    icon: FaGithub,
    desc: 'Tools that improve workflow, deployment, and productivity.',
    a: 'rgba(255, 255, 255, 0.22)',
    b: 'rgba(133, 76, 230, 0.46)',
    iconColor: '#ffffff',
  },
};

const Skills = () => {
  const [skills, setSkills] = useState(defaultSkills);
  const [expandedTitle, setExpandedTitle] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
        try {
            const res = await fetchSkills();
            if (Array.isArray(res.data) && res.data.length > 0) {
                setSkills(res.data);
            }
        } catch (err) {
            if (import.meta.env.DEV) console.error(err);
        }
    }
    loadSkills();
  }, []);

  return (
    <Container id="skills">
      <Wrapper>
        <Title as={motion.div} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.35, ease: 'easeOut' }}>Skills</Title>
        <Desc as={motion.div} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}>Here are some of the skills I’ve been working with over the past two years.</Desc>
        <SkillsGrid>
          {skills.map((skill, index) => {
            const meta = categoryMeta[skill.title] || {};
            const Icon = meta.icon || SiReact;
            const isExpanded = expandedTitle === skill.title;
            const items = Array.isArray(skill.skills) ? skill.skills : [];
            const visible = isExpanded ? items : items.slice(0, 7);
            const hiddenCount = items.length - visible.length;

            return (
              <SkillCard
                key={skill.title || index}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 85, damping: 18, delay: index * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <CardIconWrap $a={meta.a} $b={meta.b} $icon={meta.iconColor}>
                  {skill.title === 'Frontend' ? <FrontendLogo /> : null}
                  {skill.title === 'Backend' ? <BackendLogo /> : null}
                  {skill.title === 'Android' ? <AndroidLogo /> : null}
                  {skill.title === 'Others' ? <OthersLogo /> : null}
                  {!['Frontend', 'Backend', 'Android', 'Others'].includes(skill.title) ? (
                    <Icon aria-hidden="true" />
                  ) : null}
                </CardIconWrap>
                <CardBody>
                  <CardTitle>{skill.title}</CardTitle>
                  <CardDesc>{meta.desc || 'Core tools and technologies I use regularly.'}</CardDesc>
                  <ChipRow>
                    {visible.map((item) => (
                      <Chip key={item.name}>
                        <SkillLogo name={item.name} image={item.image} />
                        {item.name}
                      </Chip>
                    ))}
                    {!isExpanded && hiddenCount > 0 ? (
                      <Chip>+{hiddenCount} more</Chip>
                    ) : null}
                  </ChipRow>
                  <div style={{ marginTop: 6, display: 'flex' }}>
                    <LearnButton
                      type="button"
                      onClick={() => setExpandedTitle(isExpanded ? null : skill.title)}
                    >
                      {isExpanded ? 'SHOW LESS' : 'LEARN MORE'}
                    </LearnButton>
                  </div>
                </CardBody>
              </SkillCard>
            );
          })}
        </SkillsGrid>
        <Showcase
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ShowcaseText>
            I&apos;m currently looking to join a <span>cross-functional</span> team
            <br />
            that values improving people&apos;s lives through accessible design
          </ShowcaseText>
          <OrbitStage>
            <OrbitIcons>
              {orbitItems.map((it, idx) => {
                const Ico = it.icon;
                return (
                  <OrbitIcon
                    key={idx}
                    $color={it.color}
                    style={{ '--d': `${idx * 0.12}s`, '--amp': `${6 + (idx % 4) * 1.5}px` }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.03 }}
                  >
                    <Ico aria-hidden="true" />
                  </OrbitIcon>
                );
              })}
            </OrbitIcons>
            <ConnectorSvg viewBox="0 0 920 280" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(192,132,252,0.65)" />
                  <stop offset="0.55" stopColor="rgba(0,194,255,0.35)" />
                  <stop offset="1" stopColor="rgba(133,76,230,0)" />
                </linearGradient>
              </defs>
              {Array.from({ length: 9 }).map((_, i) => {
                const x = 170 + i * 64;
                return (
                  <path
                    key={i}
                    d={`M ${x} 98 C ${x} 150, 430 170, 460 196`}
                    stroke="url(#lineGrad)"
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.9"
                    style={{ '--d': `${i * 0.18}s` }}
                  />
                );
              })}
            </ConnectorSvg>
            <Core>
              <CoreLogo src={LogoDark} alt="Logo" />
            </Core>
            <OrbitRings>
              <RingRotator>
                <RingsSvg viewBox="0 0 920 160" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(133,76,230,0)" />
                      <stop offset="0.2" stopColor="rgba(133,76,230,0.65)" />
                      <stop offset="0.55" stopColor="rgba(0,194,255,0.45)" />
                      <stop offset="0.85" stopColor="rgba(255,122,224,0.35)" />
                      <stop offset="1" stopColor="rgba(255,122,224,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M 60 126 C 240 60, 680 60, 860 126" stroke="url(#ring)" strokeWidth="1.1" fill="none" />
                  <path d="M 120 140 C 280 82, 640 82, 800 140" stroke="url(#ring)" strokeWidth="0.85" fill="none" opacity="0.8" />
                  <path d="M 170 152 C 320 104, 600 104, 750 152" stroke="url(#ring)" strokeWidth="0.65" fill="none" opacity="0.7" />
                </RingsSvg>
              </RingRotator>
            </OrbitRings>
          </OrbitStage>
        </Showcase>
      </Wrapper>
    </Container>
  )
}

export default Skills
