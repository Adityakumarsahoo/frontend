import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.div`
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
    background: ${({ theme, scrolled }) =>
      scrolled
        ? 'linear-gradient(180deg, rgba(25,25,36,0.85) 0%, rgba(25,25,36,0.7) 100%)'
        : theme.bg};
    border-bottom: ${({ scrolled }) =>
      scrolled ? '1px solid rgba(133,76,230,0.2)' : '1px solid transparent'};
    backdrop-filter: ${({ scrolled }) => (scrolled ? 'saturate(180%) blur(20px)' : 'none')};
    -webkit-backdrop-filter: ${({ scrolled }) => (scrolled ? 'saturate(180%) blur(20px)' : 'none')};
    box-shadow: ${({ scrolled }) =>
      scrolled ? '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(133,76,230,0.1)' : 'none'};
    transition: height 0.28s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.28s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      -webkit-backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Animated gradient border on scroll */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}, #00c2ff, ${({ theme }) => theme.primary}, transparent);
        opacity: ${({ scrolled }) => scrolled ? 1 : 0};
        transition: opacity 0.3s ease;
    }
    
    @media (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  z-index: 1;
  width: 100%;
  padding: 0 18px;
  max-width: 1280px;
`;

export const NavLogo = styled(LinkR)`
    width: auto;
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
      padding: 0 0px;
  }
`;
export const Span = styled.div`
    padding: 0 4px;
    font-weight: bold;
    font-size: 18px;
`;
export const NavItems = styled.ul`
    width: auto;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 26px;
    padding: 0;
    list-style: none;

    @media screen and (max-width: 768px) {
      display: none;
    }
`;

export const NavCenter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  @media screen and (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const NavMenuPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  background:
    radial-gradient(120% 160% at 18% 10%, rgba(255, 38, 94, 0.10), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(133, 76, 230, 0.10), transparent 62%),
    rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  box-shadow: 0 14px 44px rgba(0,0,0,0.40);
  max-width: 760px;
  width: fit-content;

  @media screen and (max-width: 980px) {
    height: 42px;
    padding: 0 14px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Glow effect */
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 8px;
        background: radial-gradient(circle at center, rgba(133,76,230,0.15), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    :hover { 
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        
        &::before {
            opacity: 1;
        }
    }

    svg {
      font-size: 14px;
      opacity: 0.85;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
    :hover svg {
      opacity: 1;
      transform: translateY(-1px);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, ${({ theme }) => theme.primary}, #A77BFF, #00C2FF);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(133,76,230,0.5);
    }
    :hover::after { transform: scaleX(1); }

    &.active::after {
      transform: scaleX(1);
    }
`;

export const NavRouteLink = styled(LinkR)`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 8px;
        background: radial-gradient(circle at center, rgba(0,194,255,0.14), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    &:hover { 
        color: #00c2ff;
        transform: translateY(-2px);
        
        &::before {
            opacity: 1;
        }
    }

    svg {
      font-size: 14px;
      opacity: 0.85;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
    &:hover svg {
      opacity: 1;
      transform: translateY(-1px);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #00c2ff, #A77BFF, ${({ theme }) => theme.primary});
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(0,194,255,0.35);
    }
    &:hover::after { transform: scaleX(1); }
`;


export const GitHubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  white-space: nowrap;
  height: 42px;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  line-height: 1;
  transition: all 0.3s ease-in-out;
  background: transparent;

  svg {
    flex: 0 0 auto;
  }
  
  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    box-shadow: 0 0 20px rgba(133, 76, 230, 0.5);
    transform: translateY(-2px);
  }
  
  @media screen and (max-width: 768px) { 
    font-size: 14px;
    padding: 0 16px;
  }
`;

export const RegistrationButton = styled.a`
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  white-space: nowrap;
  height: 42px;
  border-radius: 20px;
  padding: 0 24px;
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  line-height: 1;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  border: none;

  svg {
    flex: 0 0 auto;
  }
  
  :hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(133, 76, 230, 0.6);
    filter: brightness(1.1);
  }
  
  @media screen and (max-width: 768px) { 
    font-size: 14px;
    padding: 0 20px;
  }
`;

export const ButtonContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;


export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 72px;
    right: 0;
    width: calc(100% - 24px);
    margin: 0 12px;
    padding: 14px 18px 18px 18px;
    background: rgba(25,25,36,0.55);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px) saturate(160%);
    transition: all 0.6s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    border-radius: 18px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};

`

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
  height: 100%;
`

export const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;

  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export  const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 16px;
    opacity: 0.9;
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileRouteLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  svg {
    font-size: 16px;
    opacity: 0.9;
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;
export const LogoMark = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(120% 120% at 20% 10%, #ff6b6b 0%, #ff3b30 40%, #d02113 100%);
  box-shadow: 0 8px 22px rgba(255, 59, 48, 0.35), inset 0 -4px 10px rgba(0,0,0,0.25);
  position: relative;
  user-select: none;
  transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 10px;
    box-shadow: inset 0 6px 14px rgba(255,255,255,0.12), inset 0 -8px 16px rgba(0,0,0,0.25);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 10px;
    right: 10px;
    height: 8px;
    border-radius: 10px;
    background: linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.0));
    filter: blur(1px);
    opacity: 0.65;
    pointer-events: none;
  }
  &:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: 0 12px 28px rgba(255,59,48,0.45), inset 0 -4px 10px rgba(0,0,0,0.25); }
`;

export const LogoContainer = styled.div`
  width: 60px;
  height: 48px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 220ms ease, filter 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  background:
    radial-gradient(140% 180% at 16% 12%, rgba(192,132,252,0.16), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(0,194,255,0.10), transparent 62%),
    rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 46px rgba(0,0,0,0.40);
  &:hover { transform: translateY(-1px); filter: brightness(1.05); border-color: rgba(0,194,255,0.22); box-shadow: 0 20px 60px rgba(0,0,0,0.48), 0 0 18px rgba(0,194,255,0.12); }
  @media (max-width: 640px) { width: 54px; height: 44px; }
`;

export const LogoImg = styled.img.attrs({
  loading: 'eager',
  decoding: 'async',
})`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  display: block;
  filter:
    drop-shadow(0 10px 22px rgba(0,0,0,0.45))
    drop-shadow(0 0 14px rgba(0,194,255,0.12))
    drop-shadow(0 0 12px rgba(133,76,230,0.10));
`;

export const Glyph = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 26px;
  height: 26px;
  opacity: 0.95;
  animation: glyphPulse 3800ms ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-22deg);
    width: 22px;
    height: 6px;
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.65));
    box-shadow: 0 2px 6px rgba(255,255,255,0.28);
  }
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    box-shadow: 0 4px 10px rgba(255,255,255,0.22);
  }
  
  @keyframes glyphPulse {
    0%, 100% { opacity: 0.95; }
    50% { opacity: 0.8; }
  }
`;
