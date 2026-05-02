import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const certSheen = keyframes`
  0% { transform: translate3d(-30%, -60%, 0) rotate(18deg); opacity: 0; }
  15% { opacity: 0.55; }
  55% { opacity: 0.55; }
  100% { transform: translate3d(130%, 60%, 0) rotate(18deg); opacity: 0; }
`;

const certFloat = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
`;

const certGlowShift = keyframes`
  0%, 100% { filter: saturate(115%) brightness(1); opacity: 0.22; }
  50% { filter: saturate(135%) brightness(1.08); opacity: 0.32; }
`;

const statusPulse = keyframes`
  0%, 100% { transform: scale(0.95); opacity: 0.75; }
  50% { transform: scale(1.2); opacity: 1; }
`;

export const HeroContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(900px 520px at 14% 35%, rgba(133, 76, 230, 0.22) 0%, transparent 60%),
      radial-gradient(900px 560px at 55% 88%, rgba(0, 194, 255, 0.18) 0%, transparent 62%),
      radial-gradient(860px 520px at 92% 40%, rgba(255, 122, 224, 0.14) 0%, transparent 58%),
      linear-gradient(180deg, rgba(14, 16, 34, 0.18), rgba(14, 16, 34, 0.0));
    animation: heroGradientShift 15s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(closest-side at 30% 30%, rgba(255,255,255,0.07), transparent 66%),
      radial-gradient(closest-side at 70% 70%, rgba(255,255,255,0.05), transparent 66%);
    mix-blend-mode: overlay;
    opacity: 0.28;
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-1px);
    background-position: 100% 100%;
    box-shadow:
      0 22px 78px rgba(0,0,0,0.48),
      0 0 46px rgba(133,76,230,0.14),
      0 0 42px rgba(0,194,255,0.10),
      inset 0 1px 0 rgba(255,255,255,0.12);
  }
  
  @keyframes heroGradientShift {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

export const HeroRightActions = styled.div`
  position: absolute;
  right: -6px;
  bottom: -64px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
  z-index: 30;

  @media (max-width: 960px) {
    position: static;
    margin-top: 18px;
    justify-content: center;
  }
`;

export const HeroLeftActions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const HeroDocButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.3px;
  white-space: nowrap;
  cursor: pointer;

  color: rgba(255, 255, 255, 0.90);
  background:
    radial-gradient(140% 170% at 18% 14%, rgba(192,132,252,0.14), transparent 58%),
    radial-gradient(140% 170% at 88% 86%, rgba(0,194,255,0.10), transparent 60%),
    linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)),
    rgba(12, 12, 28, 0.24);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 999px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.28), rgba(0,194,255,0.18), rgba(255,122,224,0.16));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.50;
  }

  &:hover {
    transform: translateY(-2px) scale(1.03);
    background:
      radial-gradient(140% 170% at 18% 14%, rgba(192,132,252,0.16), transparent 58%),
      radial-gradient(140% 170% at 88% 86%, rgba(0,194,255,0.12), transparent 60%),
      linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)),
      rgba(12, 12, 28, 0.28);
    border-color: rgba(0,194,255,0.24);
    box-shadow: 0 18px 46px rgba(0, 0, 0, 0.46), 0 0 30px rgba(0,194,255,0.12);
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 640px) {
    padding: 8px 12px;
    font-size: 11px;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 34px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 22px;
  }
`;
export const HeroLeftContainer = styled.div`
  width: 100%;
  flex: 1 1 0;
  min-width: 0;
  order: 1;
  max-width: 640px;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 720px;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroRightContainer = styled.div`
  width: auto;
  flex: 0 0 auto;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 16px;
  align-items: center;
  padding-top: 4px;
  @media (max-width: 960px) {
    order: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const HeroVisualWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -26px;
  @media (max-width: 960px) {
    margin-top: 0;
  }
`;

export const HeroDetailsCard = styled.div`
  width: 100%;
  max-width: 360px;
  margin-top: 12px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background:
    radial-gradient(140% 180% at 12% 10%, rgba(192,132,252,0.16), transparent 62%),
    radial-gradient(140% 180% at 92% 90%, rgba(0,194,255,0.12), transparent 62%),
    linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03)),
    rgba(10, 12, 26, 0.34);
  box-shadow: 0 22px 64px rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(14px);
  overflow: hidden;
`;

export const HeroDetailsInner = styled.div`
  padding: 14px 14px 12px;
`;

export const HeroDetailsTitle = styled.div`
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.2px;
  color: rgba(255, 255, 255, 0.78);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const HeroDetailsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  color: rgba(178, 255, 214, 0.95);
  background: rgba(0, 255, 153, 0.10);
  border: 1px solid rgba(0, 255, 153, 0.18);
  flex-shrink: 0;
  span {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: rgba(0, 255, 153, 0.9);
    box-shadow: 0 0 14px rgba(0, 255, 153, 0.55);
  }
`;

export const HeroDetailsGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

export const HeroDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.05);
`;

export const HeroDetailLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  svg {
    width: 14px;
    height: 14px;
    color: rgba(255, 255, 255, 0.78);
  }
`;

export const HeroDetailLabel = styled.div`
  font-size: 11px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.70);
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

export const HeroDetailValue = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.90);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;

export const HeroDetailsActions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const HeroMiniAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.90);
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.2px;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
  svg {
    width: 14px;
    height: 14px;
  }
  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 194, 255, 0.12);
    border-color: rgba(0, 194, 255, 0.26);
  }
`;

export const Img = styled.img.attrs({
  loading: 'eager',
  decoding: 'async',
  fetchPriority: 'high',
})`
  position: relative;
  width: 248px;
  height: 248px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
  object-fit: cover;
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(133, 76, 230, 0.5),
    0 0 40px rgba(133, 76, 230, 0.45),
    0 0 80px rgba(133, 76, 230, 0.2);
  background:
    radial-gradient(circle at 20% 0%, rgba(255,255,255,0.12), transparent 55%),
    radial-gradient(circle at 80% 120%, rgba(133,76,230,0.28), transparent 60%);
  transform: translateZ(0);
  transition: transform 260ms ease, box-shadow 260ms ease, filter 260ms ease, border-color 260ms ease;
  animation: imgFloat 6s ease-in-out infinite;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow:
      0 26px 60px rgba(0, 0, 0, 0.8),
      0 0 0 2px rgba(133, 76, 230, 0.9),
      0 0 55px rgba(133, 76, 230, 0.65),
      0 0 100px rgba(133, 76, 230, 0.3);
    filter: brightness(1.05);
    border-color: #00c2ff;
    animation-play-state: paused;
  }
  
  @keyframes imgFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 640px) {
    width: 210px;
    height: 210px;
  }
`;

export const HeroLogo = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 98px;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.white};
  background: radial-gradient(140% 140% at 30% 20%, #ff6b6b 0%, #ff3b30 40%, #d02113 100%);
  box-shadow: 0 20px 48px rgba(255,59,48,0.30), inset 0 -12px 24px rgba(0,0,0,0.35);
  position: relative;
  overflow: hidden;
  user-select: none;
  animation: logoBreath 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 32px;
    right: 32px;
    height: 18px;
    border-radius: 16px;
    background: linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.0));
    opacity: 0.7;
    filter: blur(1px);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgba(0,0,0,0.22), rgba(0,0,0,0));
    opacity: 0.6;
  }
  @media (max-width: 768px) {
    width: 230px;
    height: 230px;
    font-size: 84px;
  }
  @media (max-width: 640px) {
    width: 180px;
    height: 180px;
    font-size: 66px;
  }
  
  @keyframes logoBreath {
    0%, 100% { transform: translateZ(0) scale(1); box-shadow: 0 20px 48px rgba(255,59,48,0.30), inset 0 -12px 24px rgba(0,0,0,0.35); }
    50% { transform: translateZ(0) scale(1.02); box-shadow: 0 26px 58px rgba(255,59,48,0.36), inset 0 -14px 26px rgba(0,0,0,0.36); }
  }
`;

export const LogoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const LogoName = styled.div`
  font-weight: 800;
  font-size: 28px;
  color: ${({ theme }) => theme.white};
  letter-spacing: 0.8px;
  text-transform: none;
  filter: drop-shadow(0 6px 18px rgba(255,59,48,0.25));
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const Title = styled.div`
  font-weight: 850;
  font-size: 38px;
  line-height: 1.18;
  margin-bottom: 14px;
  color: rgba(255,255,255,0.94);
  position: relative;

  padding: 12px 18px 11px;
  border-radius: 16px;
  background:
    radial-gradient(140% 170% at 10% 10%, rgba(192,132,252,0.22), transparent 58%),
    radial-gradient(140% 170% at 90% 85%, rgba(0,194,255,0.16), transparent 60%),
    linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03)),
    rgba(10, 12, 26, 0.44);
  background-size: 160% 160%;
  background-position: 0% 0%;
  border: 1px solid rgba(255,255,255,0.12);
  border-top: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  box-shadow:
    0 16px 52px rgba(0,0,0,0.40),
    inset 0 1px 0 rgba(255,255,255,0.12);
  transition: background-position 1200ms ease, box-shadow 260ms ease, transform 260ms ease;

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.35), rgba(0,194,255,0.22), rgba(255,122,224,0.20));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.65;
  }

  /* Soft purple glow behind top-left */
  &::before {
    content: '';
    position: absolute;
    top: -20px; left: -18px;
    width: 140px; height: 104px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(133,76,230,0.18) 0%, transparent 70%);
    filter: blur(20px);
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 960px) {
    text-align: center;
    padding: 14px 18px 12px;
  }
  @media (max-width: 640px) {
    font-size: 28px;
    padding: 10px 14px 9px;
    border-radius: 14px;
    margin-bottom: 8px;
  }
`;

export const TextLoop = styled.div`
  font-weight: 650;
  font-size: 26px;
  display: flex;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
  color: rgba(255,255,255,0.86);
  line-height: 52px;
  @media (max-width: 960px) {
    text-align: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 44px;
    margin-bottom: 14px;
  }
`;

export const Span = styled.span`
  display: inline-flex;
  align-items: baseline;
  font-weight: 800;
  letter-spacing: 0.2px;
  background: linear-gradient(90deg, rgba(192,132,252,1) 0%, rgba(0,194,255,1) 55%, rgba(255,122,224,1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  cursor: pointer;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.18));

  .Typewriter__cursor {
    color: ${({ theme }) => theme.primary};
    margin-left: 2px;
    font-weight: 700;
    opacity: 0.9;
    animation: cursorPulse 900ms ease-in-out infinite;
  }

  @keyframes cursorPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

export const Name = styled.span`
  display: block;
  font-weight: 900;
  font-size: 1.03em;
  margin-top: 2px;
  letter-spacing: -0.4px;
  cursor: pointer;

  background: linear-gradient(
    110deg,
    #c084fc 0%,
    #e9a8ff 35%,
    #67e8f9 75%,
    #c084fc 100%
  );
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nameShimmer 9s linear infinite;

  filter: drop-shadow(0 0 10px rgba(192,132,252,0.35))
          drop-shadow(0 6px 24px rgba(0,194,255,0.14));

  @keyframes nameShimmer {
    0%   { background-position: 0% 0%; }
    100% { background-position: 220% 0%; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SubTitle = styled.div`
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 20px;
  color: rgba(255,255,255,0.72);
  width: 100%;
  max-width: 600px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  border-left: 5px solid rgba(192,132,252,0.85);
  background:
    linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)),
    rgba(14, 16, 34, 0.30);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 14px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.28), rgba(0,194,255,0.18), rgba(255,122,224,0.16));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.55;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(120% 160% at 16% 10%, rgba(255,255,255,0.12), rgba(255,255,255,0) 60%);
    opacity: 0.35;
    pointer-events: none;
  }

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 13px;
    line-height: 22px;
    padding: 11px 12px;
  }
`;

export const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 95%;
  max-width: 220px;
  text-align: center;
  padding: 11px 0;
  color: #fff;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;

  background:
    radial-gradient(120% 180% at 18% 10%, rgba(255,255,255,0.22), rgba(255,255,255,0.0) 60%),
    linear-gradient(120deg, rgba(133,76,230,0.95) 0%, rgba(0,194,255,0.72) 55%, rgba(255,122,224,0.56) 100%);
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow:
    0 18px 52px rgba(0,0,0,0.38),
    0 0 0 1px rgba(255,255,255,0.06) inset;
  backdrop-filter: blur(10px) saturate(140%);
  transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: skewX(-18deg);
    transition: left 480ms ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 22px 66px rgba(0,0,0,0.46),
      0 0 0 1px rgba(0,194,255,0.18),
      0 0 42px rgba(133,76,230,0.22);
    filter: brightness(1.08);
    &::before { left: 130%; }
  }

  &:active { transform: translateY(-1px) scale(0.99); }

  @media (max-width: 640px) {
    padding: 10px 0;
    font-size: 13px;
    max-width: 190px;
    border-radius: 12px;
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: fit-content;
  padding: 12px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.18);
  }
  @media (max-width: 640px) {
    padding: 11px 12px;
    font-size: 12px;
  }
`;

export const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const StatsRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
  @media (max-width: 640px) {
    gap: 12px;
    margin-top: 18px;
    padding-top: 14px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  @media (max-width: 960px) {
    justify-content: center;
  }
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
`;

export const StatNumber = styled.div`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.2px;
  color: rgba(255, 255, 255, 0.92);
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.58);
  letter-spacing: 0.3px;
  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

export const HeroArt = styled.div`
  width: 100%;
  max-width: 520px;
  height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 960px) {
    height: 180px;
    justify-content: center;
    max-width: 620px;
  }
`;

export const Watermark = styled.div`
  font-size: 180px;
  font-weight: 900;
  letter-spacing: 10px;
  color: rgba(255, 255, 255, 0.06);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.14);
  text-stroke: 1px rgba(255, 255, 255, 0.14);
  user-select: none;
  line-height: 0.9;
  filter: drop-shadow(0 0 40px rgba(133, 76, 230, 0.12));
  @media (max-width: 960px) {
    font-size: 120px;
    letter-spacing: 8px;
  }
  @media (max-width: 640px) {
    font-size: 96px;
    letter-spacing: 6px;
  }
`;

export const HeadlineWrapper = styled.div`
  width: 100%;
  min-width: 0;
  margin-top: 26px;
  background:
    radial-gradient(140% 170% at 12% 10%, rgba(192,132,252,0.18), transparent 60%),
    radial-gradient(140% 170% at 92% 90%, rgba(0,194,255,0.12), transparent 62%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%),
    rgba(10, 12, 26, 0.36);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  padding: 8px 12px 11px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.40);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.30), rgba(0,194,255,0.22), rgba(255,122,224,0.18));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.55;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 55%),
      radial-gradient(closest-side at 22% 30%, rgba(255,255,255,0.10), rgba(255,255,255,0) 62%);
    opacity: 0.24;
    pointer-events: none;
  }

  &:hover {
    box-shadow:
      0 22px 70px rgba(0, 0, 0, 0.48),
      0 0 40px rgba(133,76,230,0.10),
      0 0 34px rgba(0,194,255,0.08);
  }
  
  @media (max-width: 960px) {
    margin-top: 18px;
  }
`;

export const HeadlineUnderline = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 7px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #854ce6, #00c2ff, #ff7ae0, #854ce6);
  background-size: 220% 100%;
  opacity: 0.85;
  filter: blur(0.1px);
  box-shadow: 0 0 14px rgba(133, 76, 230, 0.35), 0 0 18px rgba(0, 194, 255, 0.18);
  animation: headlineUnderlineMove 4.5s linear infinite;
  pointer-events: none;

  @keyframes headlineUnderlineMove {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: 640px) {
    left: 14px;
    right: 14px;
    bottom: 8px;
    height: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.65;
  }
`;

export const NewsTag = styled.div`
  background:
    radial-gradient(120% 180% at 16% 20%, rgba(255,255,255,0.16), rgba(255,255,255,0.0) 60%),
    linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)),
    rgba(12, 12, 28, 0.26);
  color: rgba(255,255,255,0.92);
  padding: 5px 10px 5px 9px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1.1px;
  white-space: nowrap;
  z-index: 2;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.30);
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,122,224,1), rgba(0,194,255,1));
    box-shadow: 0 0 16px rgba(255,122,224,0.22), 0 0 14px rgba(0,194,255,0.16);
  }
`;

export const NewsTicker = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 2;
  }
  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(8, 9, 20, 0.55), rgba(8, 9, 20, 0.0));
  }
  &::after {
    right: 0;
    background: linear-gradient(270deg, rgba(8, 9, 20, 0.55), rgba(8, 9, 20, 0.0));
  }
`;

export const NewsTickerTrack = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  white-space: nowrap;
  padding-left: 6px;
  will-change: transform;
  animation: tickerTrack 22s linear infinite;

  ${NewsTicker}:hover & {
    animation-play-state: paused;
  }

  @media (max-width: 640px) {
    animation-duration: 26s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(0);
  }

  @keyframes tickerTrack {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

export const HeadlineText = styled.span`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255,255,255,0.84);
  letter-spacing: 0.25px;
  
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

export const TickerDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(192,132,252,1), rgba(0,194,255,1));
  box-shadow: 0 0 14px rgba(0,194,255,0.20), 0 0 12px rgba(192,132,252,0.18);
  flex: 0 0 auto;
  animation: tickPulse 1.8s ease-in-out infinite;
  @keyframes tickPulse {
    0%, 100% { transform: scale(0.95); opacity: 0.75; }
    50% { transform: scale(1.18); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Floating Tech Badges around Hero Image
export const TechBadgeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

export const TechBadge = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.15) 0%, rgba(0, 194, 255, 0.1) 100%);
  border: 1px solid rgba(133, 76, 230, 0.3);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(133, 76, 230, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  pointer-events: auto;
  cursor: default;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ color }) => color || '#854ce6'};
    box-shadow: 0 0 10px ${({ color }) => color || '#854ce6'};
  }
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(133, 76, 230, 0.6);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(133, 76, 230, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

// Floating Particles
export const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: ${({ size }) => size || 4}px;
  height: ${({ size }) => size || 4}px;
  border-radius: 50%;
  background: ${({ color }) => color || 'rgba(133, 76, 230, 0.6)'};
  box-shadow: 0 0 ${({ glow }) => glow || 10}px ${({ color }) => color || 'rgba(133, 76, 230, 0.6)'};
  pointer-events: none;
`;

// Glow Ring around Image
export const GlowRing = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(45deg, #854ce6, #00c2ff, #ff7ae0, #854ce6) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.6;
  animation: rotateRing 10s linear infinite;
  
  @keyframes rotateRing {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    width: 270px;
    height: 270px;
  }
  
  @media (max-width: 640px) {
    width: 248px;
    height: 248px;
  }
`;

// Designer Label Badge
export const DesignerLabel = styled(motion.div)`
  position: absolute;
  bottom: -10px;
  right: -12px;
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(0, 194, 255, 0.2) 0%, rgba(133, 76, 230, 0.15) 100%);
  border: 1px solid rgba(0, 194, 255, 0.4);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 25px rgba(0, 194, 255, 0.3);
  z-index: 20;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(45deg, #00c2ff, #854ce6, #ff7ae0, #00c2ff);
    z-index: -1;
    opacity: 0.5;
    filter: blur(8px);
  }
`;

export const DesignerLabelText = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  letter-spacing: 1px;
  text-transform: uppercase;
  
  span {
    display: block;
    font-size: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    letter-spacing: 2px;
    margin-top: 2px;
  }
`;

// Enhanced Glow Ring with Pulse
export const PulsingGlowRing = styled(motion.div)`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 1px solid rgba(133, 76, 230, 0.3);
  opacity: 0.4;
  animation: pulseRing 3s ease-in-out infinite;
  
  @keyframes pulseRing {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.4;
      border-color: rgba(133, 76, 230, 0.3);
    }
    50% { 
      transform: scale(1.05); 
      opacity: 0.7;
      border-color: rgba(0, 194, 255, 0.5);
    }
  }
  
  @media (max-width: 768px) {
    width: 286px;
    height: 286px;
  }
  
  @media (max-width: 640px) {
    width: 262px;
    height: 262px;
  }
`;

// Second pulsing ring
export const PulsingGlowRing2 = styled(motion.div)`
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 122, 224, 0.2);
  opacity: 0.3;
  animation: pulseRing2 4s ease-in-out infinite;
  animation-delay: 1s;
  
  @keyframes pulseRing2 {
    0%, 100% { 
      transform: scale(1) rotate(0deg); 
      opacity: 0.3;
    }
    50% { 
      transform: scale(1.08) rotate(180deg); 
      opacity: 0.5;
    }
  }
  
  @media (max-width: 768px) {
    width: 302px;
    height: 302px;
  }
  
  @media (max-width: 640px) {
    width: 274px;
    height: 274px;
  }
`;

// Connection Lines between badges
export const ConnectionLine = styled(motion.svg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 360px;
  pointer-events: none;
  z-index: 5;
  
  line {
    stroke: url(#lineGradient);
    stroke-width: 1;
    opacity: 0.3;
    stroke-dasharray: 5, 5;
    animation: dash 20s linear infinite;
  }
  
  @keyframes dash {
    to {
      stroke-dashoffset: -100;
    }
  }
  
  @media (max-width: 768px) {
    width: 320px;
    height: 320px;
  }
  
  @media (max-width: 640px) {
    width: 296px;
    height: 296px;
  }
`;

// Orbiting Dot
export const OrbitingDot = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #854ce6, #00c2ff);
  box-shadow: 
    0 0 20px rgba(133, 76, 230, 0.8),
    0 0 40px rgba(0, 194, 255, 0.5),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 15;
`;

// Sparkle Effect
export const Sparkle = styled(motion.div)`
  position: absolute;
  width: ${({ size }) => size || 10}px;
  height: ${({ size }) => size || 10}px;
  z-index: 12;
  
  &::before {
    content: '✦';
    font-size: ${({ size }) => size || 10}px;
    color: ${({ color }) => color || '#ffffff'};
    text-shadow: 0 0 10px ${({ color }) => color || '#ffffff'};
  }
`;

// Web Designer Badge (additional badge)
export const WebDesignerBadge = styled(motion.div)`
  position: absolute;
  top: -30px;
  left: -12px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.25) 0%, rgba(255, 122, 224, 0.15) 100%);
  border: 1px solid rgba(133, 76, 230, 0.4);
  border-radius: 50px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 25px rgba(133, 76, 230, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ff7ae0;
    box-shadow: 0 0 12px #ff7ae0;
  }

  @media (max-width: 640px) {
    top: -26px;
    left: -8px;
    padding: 7px 12px;
  }
`;

export const WebDesignerText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  line-height: 1.2;
  
  span {
    display: block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

// Enhanced Tech Badge with Icon
export const TechBadgeEnhanced = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px;
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.2) 0%, rgba(0, 194, 255, 0.12) 50%, rgba(255, 122, 224, 0.08) 100%);
  border: 1px solid rgba(133, 76, 230, 0.35);
  border-radius: 50px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.35),
    0 0 25px rgba(133, 76, 230, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  font-size: 12px;
  font-weight: 650;
  color: ${({ theme }) => theme.text_primary};
  pointer-events: auto;
  cursor: default;
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ color }) => color || '#854ce6'};
    box-shadow: 
      0 0 15px ${({ color }) => color || '#854ce6'},
      0 0 30px ${({ color }) => color || '#854ce6'};
    animation: pulseDot 2s ease-in-out infinite;
  }
  
  @keyframes pulseDot {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
  
  &:hover {
    transform: scale(1.06) translateY(-2px);
    border-color: rgba(133, 76, 230, 0.7);
    box-shadow: 
      0 15px 50px rgba(0, 0, 0, 0.45),
      0 0 40px rgba(133, 76, 230, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, rgba(133, 76, 230, 0.3) 0%, rgba(0, 194, 255, 0.2) 50%, rgba(255, 122, 224, 0.12) 100%);
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 11px;
  }
`;

export const CertificationsWrap = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 18px auto 0;
  padding: 0 0;
  @media (max-width: 960px) {
    margin-top: 10px;
  }
`;

export const CertificationsCard = styled.div`
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  position: relative;
  background:
    radial-gradient(980px 520px at 16% 36%, rgba(0, 194, 255, 0.14) 0%, transparent 62%),
    radial-gradient(940px 520px at 86% 30%, rgba(133, 76, 230, 0.18) 0%, transparent 60%),
    radial-gradient(880px 520px at 92% 78%, rgba(255, 122, 224, 0.12) 0%, transparent 60%),
    rgba(10, 12, 26, 0.48);
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.58),
    0 0 44px rgba(133, 76, 230, 0.08),
    0 0 40px rgba(0, 194, 255, 0.06);
  overflow: hidden;
  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
  transform: translateZ(0);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 22px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.26), rgba(0,194,255,0.18), rgba(255,122,224,0.14));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.62;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -40%;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0));
    transform: translate3d(-30%, -60%, 0) rotate(18deg);
    opacity: 0;
    pointer-events: none;
    animation: ${certSheen} 7.5s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 194, 255, 0.16);
    box-shadow:
      0 30px 96px rgba(0, 0, 0, 0.62),
      0 0 42px rgba(133,76,230,0.12),
      0 0 36px rgba(0,194,255,0.10),
      inset 0 1px 0 rgba(255,255,255,0.10);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0.14;
    }
  }
`;

export const CertificationsInner = styled.div`
  padding: 16px 16px 0;
  @media (max-width: 640px) {
    padding: 14px 12px 0;
  }
`;

export const CertTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(120% 170% at 16% 16%, rgba(192,132,252,0.16), transparent 62%),
    radial-gradient(120% 170% at 88% 84%, rgba(0,194,255,0.12), transparent 62%),
    rgba(255, 255, 255, 0.065);
  backdrop-filter: blur(12px);
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.34);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(closest-side at 18% 28%, rgba(255,255,255,0.16), rgba(255,255,255,0) 60%),
      radial-gradient(closest-side at 86% 76%, rgba(255,255,255,0.10), rgba(255,255,255,0) 62%);
    opacity: 0.26;
    pointer-events: none;
    animation: ${certGlowShift} 6.5s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
  }
`;

export const CertIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const CertAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 0 0 2px rgba(133, 76, 230, 0.18),
    0 0 0 4px rgba(0, 194, 255, 0.08),
    0 18px 48px rgba(0, 0, 0, 0.42);
  flex-shrink: 0;
`;

export const CertNameBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CertName = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CertMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 11px;
  font-weight: 700;
  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  svg {
    opacity: 0.9;
  }
`;

export const CertStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.2px;
  color: rgba(178, 255, 214, 0.95);
  background: rgba(0, 255, 153, 0.10);
  border: 1px solid rgba(0, 255, 153, 0.18);
  flex-shrink: 0;
  span {
    animation: ${statusPulse} 1.8s ease-in-out infinite;
  }
  @media (max-width: 520px) {
    display: none;
  }
`;

export const CertIntroText = styled.div`
  margin: 16px auto 0;
  max-width: 820px;
  text-align: center;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  line-height: 1.7;
  padding: 10px 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CertSectionTitle = styled.div`
  margin-top: 14px;
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.6px;
  color: rgba(255, 255, 255, 0.70);
`;

export const CertIconsRow = styled.div`
  margin: 12px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 14px;
  padding: 10px 8px 0;
`;

export const CertIconLink = styled.a`
  width: 66px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background:
    radial-gradient(120% 160% at 18% 16%, rgba(192,132,252,0.12), transparent 62%),
    radial-gradient(140% 180% at 88% 84%, rgba(0,194,255,0.10), transparent 60%),
    rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease, filter 220ms ease;
  animation: ${certFloat} 3.4s ease-in-out infinite;
  animation-delay: var(--d, 0s);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(192,132,252,0.22), rgba(0,194,255,0.18), rgba(255,122,224,0.14));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.50;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0.0), rgba(255,255,255,0.14), rgba(255,255,255,0.0));
    transform: translateX(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform 420ms ease, opacity 280ms ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.03);
    border-color: rgba(0, 194, 255, 0.22);
    background:
      radial-gradient(120% 160% at 18% 16%, rgba(192,132,252,0.14), transparent 62%),
      radial-gradient(140% 180% at 88% 84%, rgba(0,194,255,0.12), transparent 60%),
      rgba(0, 194, 255, 0.08);
    box-shadow:
      0 22px 58px rgba(0, 0, 0, 0.46),
      0 0 26px rgba(0,194,255,0.12),
      0 0 22px rgba(133,76,230,0.08);
    filter: saturate(125%) brightness(1.05);
    &::after {
      transform: translateX(120%);
      opacity: 0.55;
    }
  }
  @media (max-width: 520px) {
    width: 56px;
    height: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CertIconImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  opacity: 0.98;
  filter:
    drop-shadow(0 0 12px rgba(0, 194, 255, 0.18))
    drop-shadow(0 0 10px rgba(133, 76, 230, 0.18));
`;

export const CertIconFallback = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.92);
  background:
    radial-gradient(120% 160% at 18% 16%, rgba(192,132,252,0.28), transparent 62%),
    radial-gradient(140% 180% at 88% 84%, rgba(0,194,255,0.22), transparent 60%),
    rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 10px 24px rgba(0,0,0,0.34);
  text-transform: uppercase;
  user-select: none;
`;

export const CertActions = styled.div`
  margin: 14px auto 16px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 10px;
`;

export const CertAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.3px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.90);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 14px 34px rgba(0,0,0,0.36);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 194, 255, 0.12);
    border-color: rgba(0, 194, 255, 0.26);
    box-shadow: 0 18px 42px rgba(0,0,0,0.44), 0 0 24px rgba(0,194,255,0.10);
  }
`;

export const CertActionPrimary = styled(CertAction)`
  color: rgba(255, 255, 255, 0.94);
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.95) 0%, rgba(0, 194, 255, 0.90) 70%, rgba(255, 122, 224, 0.86) 100%);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 46px rgba(133,76,230,0.22), 0 0 26px rgba(0,194,255,0.14);
  &:hover {
    background: linear-gradient(135deg, rgba(133, 76, 230, 1) 0%, rgba(0, 194, 255, 0.95) 70%, rgba(255, 122, 224, 0.90) 100%);
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

export const CertBottomRow = styled.div`
  margin-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
  background:
    radial-gradient(900px 220px at 18% 30%, rgba(133, 76, 230, 0.10) 0%, transparent 60%),
    radial-gradient(900px 220px at 86% 70%, rgba(0, 194, 255, 0.08) 0%, transparent 62%),
    rgba(5, 6, 18, 0.44);
  padding: 14px 14px;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 640px) {
    padding: 12px 12px;
  }
`;

export const FeaturedExpCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background:
    radial-gradient(120% 160% at 18% 16%, rgba(192,132,252,0.10), transparent 62%),
    radial-gradient(140% 180% at 88% 84%, rgba(0,194,255,0.08), transparent 60%),
    rgba(255, 255, 255, 0.05);
  min-width: min(420px, 100%);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.42);
`;

export const FeaturedExpIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }
`;

export const FeaturedExpText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  div:first-child {
    font-size: 12px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.90);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div:last-child {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.60);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
