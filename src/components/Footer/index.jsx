import React from 'react';
import styled, { keyframes } from 'styled-components';
import FooterBg from '../../images/footer.png';

const sweep = keyframes`
  0% { transform: translateX(-35%); opacity: 0; }
  15% { opacity: 1; }
  55% { opacity: 1; }
  100% { transform: translateX(35%); opacity: 0; }
`;

const floatGlow = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  padding: 0 0 18px;
`;

const FooterSection = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(900px 340px at 14% 35%, rgba(255, 38, 94, 0.14) 0%, transparent 60%),
    radial-gradient(900px 340px at 86% 38%, rgba(157, 0, 56, 0.14) 0%, transparent 62%),
    linear-gradient(90deg, #050508 0%, #0b0609 32%, #24000c 68%, #050508 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.55), rgba(133, 76, 230, 0.55), transparent);
    opacity: 0.9;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -60%;
    left: 50%;
    width: 140%;
    height: 220%;
    transform: translateX(-50%);
    background:
      radial-gradient(closest-side, rgba(255, 255, 255, 0.08) 0%, transparent 70%),
      radial-gradient(closest-side, rgba(0, 194, 255, 0.08) 0%, transparent 72%),
      radial-gradient(closest-side, rgba(133, 76, 230, 0.08) 0%, transparent 72%);
    filter: blur(2px);
    opacity: 0.55;
    animation: ${floatGlow} 6s ease-in-out infinite;
    pointer-events: none;
  }
  
  @media (max-width: 640px) {
    background:
      radial-gradient(700px 280px at 10% 35%, rgba(255, 38, 94, 0.12) 0%, transparent 60%),
      radial-gradient(700px 280px at 92% 35%, rgba(157, 0, 56, 0.12) 0%, transparent 60%),
      linear-gradient(90deg, #050508 0%, #0b0609 32%, #24000c 68%, #050508 100%);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 18px 0;
  position: relative;
  @media (max-width: 640px) {
    padding: 14px 12px 0;
  }
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavPill = styled.div`
  display: inline-flex;
  border-radius: 999px;
  padding: 10px 16px;
  position: relative;
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(10, 12, 18, 0.44), rgba(10, 12, 18, 0.44)) padding-box,
    linear-gradient(90deg, rgba(255, 38, 94, 0.42), rgba(157, 0, 56, 0.34), rgba(255, 122, 224, 0.18)) border-box;
  backdrop-filter: blur(12px);
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(0, 194, 255, 0.05) inset;
  overflow: hidden;
  max-width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.28) 45%, transparent 75%);
    transform: translateX(-35%);
    opacity: 0;
    animation: ${sweep} 4.8s ease-in-out infinite;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    border-radius: 18px;
    padding: 10px 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 820px;
  display: flex;
  flex-direction: row;
  gap: 22px;
  justify-content: center;
  @media (max-width: 640px) {
    max-width: 100%;
    gap: 14px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    text-align: center;
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.86);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.3px;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  text-shadow: 0 10px 26px rgba(0, 0, 0, 0.55);
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, rgba(0, 194, 255, 0.9), rgba(133, 76, 230, 0.9));
    border-radius: 999px;
    transition: width 0.25s ease;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
  
  &:focus-visible {
    outline: none;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, 1);
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 0.2px;
  }
`;

const FooterImage = styled.img`
  width: 100%;
  max-width: 1280px;
  height: auto;
  display: block;
  margin-top: 14px;
  filter: drop-shadow(0 16px 38px rgba(0, 0, 0, 0.35));
  border-radius: 18px;
  @media (max-width: 640px) {
    margin-top: 12px;
    border-radius: 14px;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 1px;
  margin: 14px 18px 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
  @media (max-width: 640px) {
    margin: 12px 12px 0;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
  padding: 14px 18px 0;
  width: 100%;
  position: relative;
  @media (max-width: 640px) {
    padding: 12px 12px 0;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterInner>
          <TopBar>
            <NavPill>
              <Nav>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#education">Education</NavLink>
                <NavLink href="/blogs">Blog</NavLink>
              </Nav>
            </NavPill>
          </TopBar>
          <FooterImage src={FooterBg} alt="Footer" />
        </FooterInner>
      </FooterSection>
      <Divider />
      <Copyright>
        &copy; {new Date().getFullYear()}. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
