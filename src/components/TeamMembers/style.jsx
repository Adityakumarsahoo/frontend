import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-bottom: 80px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(133, 76, 230, 0.06) 0%, transparent 55%),
      radial-gradient(circle at 80% 70%, rgba(0, 194, 255, 0.05) 0%, transparent 55%);
    pointer-events: none;
    opacity: 0.9;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 0px 0px 0;
  gap: 12px;
`;

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

  @keyframes titleGradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
    gap: 12px;
    &::before,
    &::after {
      max-width: 48px;
    }
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03)),
    radial-gradient(120% 140% at 18% 20%, rgba(133, 76, 230, 0.14), transparent 60%),
    radial-gradient(120% 140% at 80% 70%, rgba(0, 194, 255, 0.10), transparent 55%),
    rgba(133, 76, 230, 0.03);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
    transform: translateX(-120%);
    animation: teamDescShine 4.5s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(90deg, rgba(133, 76, 230, 0.8), rgba(0, 194, 255, 0.7), rgba(192, 132, 252, 0.7));
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.35;
    filter: drop-shadow(0 0 14px rgba(133, 76, 230, 0.35));
    pointer-events: none;
  }

  @keyframes teamDescShine {
    0% { transform: translateX(-120%); opacity: 0; }
    10% { opacity: 0.25; }
    50% { opacity: 0.30; }
    90% { opacity: 0.25; }
    100% { transform: translateX(120%); opacity: 0; }
  }

  strong {
    background: linear-gradient(135deg, #ffffff 0%, #c084fc 35%, #60c8ff 70%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    filter: drop-shadow(0 0 18px rgba(133,76,230,0.35));
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 14px;
    padding: 12px 14px;
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 560px));
  gap: 18px;
  margin-top: 22px;
  padding: 0 18px;
  justify-content: center;
  justify-items: stretch;
`;

export const Card = styled.div`
  width: 100%;
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(133, 76, 230, 0.16), transparent 55%),
    radial-gradient(120% 140% at 100% 100%, rgba(0, 194, 255, 0.12), transparent 55%),
    rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    padding: 1px;
    background: linear-gradient(120deg, rgba(133, 76, 230, 0.75), rgba(0, 194, 255, 0.55), rgba(192, 132, 252, 0.55));
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.22;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    border-color: rgba(133, 76, 230, 0.55);
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
  }
`;

export const Avatar = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #854ce6, #00c2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 0 0 4px rgba(133, 76, 230, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    color: #fff;
    font-weight: 900;
    font-size: 20px;
  }
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Name = styled.div`
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.2px;
`;

export const Meta = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const RoleBadge = styled.div`
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(133, 76, 230, 0.50);
  color: #e8dcff;
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.18), rgba(0, 194, 255, 0.08));
  font-weight: 900;
  box-shadow: 0 10px 24px rgba(133, 76, 230, 0.15);
`;

export const MiniBadge = styled.div`
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.86);
  background: rgba(0, 0, 0, 0.18);
  font-weight: 800;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-left: auto;
`;

export const IconLink = styled.a`
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.86);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;

  &[data-disabled='true'] {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(133, 76, 230, 0.55);
    background: rgba(133, 76, 230, 0.12);
  }
`;
