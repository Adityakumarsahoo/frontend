import styled from 'styled-components';

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
    
    /* Subtle animated background */
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 30% 40%, rgba(133, 76, 230, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, rgba(0, 194, 255, 0.04) 0%, transparent 50%);
        animation: projectBgPulse 12s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes projectBgPulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
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
    padding: 10px 0px 100px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
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
        margin-top: 12px;
        font-size: 14px;
        padding: 12px 14px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

export const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary + 20};
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`
export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
    margin-top: 20px;
    
    /* Grid layout for better responsiveness */
    @media (min-width: 1200px) {
        max-width: 1400px;
    }
`;

// Enhanced Project Card Styles
export const ProjectCard = styled.div`
    width: 100%;
    max-width: 380px;
    background: ${({ theme }) => theme.card};
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    
    /* Glassmorphic top border */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(133, 76, 230, 0.6), rgba(0, 194, 255, 0.6), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(133, 76, 230, 0.3),
                    0 0 60px rgba(0, 194, 255, 0.2);
        border-color: rgba(133, 76, 230, 0.3);
        
        &::before {
            opacity: 1;
        }
        
        .project-image {
            transform: scale(1.05);
        }
    }
    
    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const ProjectImage = styled.div`
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, rgba(133, 76, 230, 0.1), rgba(0, 194, 255, 0.1));
    
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.4) 100%);
        pointer-events: none;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &.project-image {
        /* Used for hover state */
    }
`;

export const ProjectContent = styled.div`
    padding: 24px;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 24px;
        right: 24px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
`;

export const ProjectTitle = styled.h3`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 12px;
    line-height: 1.3;
    
    background: linear-gradient(135deg, #ffffff 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

export const ProjectDescription = styled.p`
    font-size: 15px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.6;
    margin-bottom: 16px;
`;

export const ProjectTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
`;

export const ProjectTag = styled.span`
    padding: 6px 14px;
    background: linear-gradient(135deg, rgba(133, 76, 230, 0.15), rgba(0, 194, 255, 0.1));
    border: 1px solid rgba(133, 76, 230, 0.3);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    backdrop-filter: blur(8px);
    transition: all 0.2s ease;
    
    &:hover {
        background: linear-gradient(135deg, rgba(133, 76, 230, 0.25), rgba(0, 194, 255, 0.2));
        border-color: rgba(133, 76, 230, 0.5);
        transform: translateY(-2px);
    }
`;

export const ProjectButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(133, 76, 230, 0.8), rgba(0, 194, 255, 0.7));
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: ${({ theme }) => theme.white};
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(133, 76, 230, 0.4);
        background: linear-gradient(135deg, rgba(133, 76, 230, 1), rgba(0, 194, 255, 0.9));
    }
`;
