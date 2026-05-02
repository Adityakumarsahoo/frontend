import React from 'react'
import { Nav, NavCenter, NavMenuPill, NavLink, NavRouteLink, NavbarContainer, NavLogo, NavItems, GitHubButton, RegistrationButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink, MobileRouteLink, LogoContainer, LogoImg } from './NavbarStyledComponent'
// import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaGithub, FaUser, FaTools, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaRegNewspaper, FaUserLock, FaUserPlus } from 'react-icons/fa';
import LogoDark from '../../images/logo_dark.png';
import { Bio as DefaultBio } from '../../data/constants';
import { useTheme } from 'styled-components';
import { fetchBio } from '../../utils/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [bio, setBio] = React.useState(DefaultBio);
  const [logoOk, setLogoOk] = React.useState(true);
  const theme = useTheme()

  const mergeBio = (defaults, incoming) => {
    if (!incoming) return defaults;
    const merged = { ...defaults, ...incoming };
    for (const key of Object.keys(defaults)) {
      const dv = defaults[key];
      const iv = incoming[key];
      if (Array.isArray(dv)) {
        if (!Array.isArray(iv) || iv.length === 0) merged[key] = dv;
      } else if (typeof dv === 'string') {
        if (typeof iv !== 'string' || iv.trim() === '') merged[key] = dv;
      }
    }
    return merged;
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    
    const loadBio = async () => {
        try {
            const res = await fetchBio();
            if (res.data) {
              setBio(mergeBio(DefaultBio, res.data));
            }
        } catch (err) {
            if (import.meta.env.DEV) console.error(err);
        }
    }
    loadBio();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToHash = (hash) => {
    if (!hash || hash[0] !== '#') return;
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSectionLink = (hash) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToHash(hash);
  };

  return (
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        <NavLogo to='/'>
          <LogoContainer>
            {logoOk ? (
              <LogoImg src={LogoDark} alt="logo" onError={() => setLogoOk(false)} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.9)', fontWeight: 900, letterSpacing: 1 }}>
                AKS
              </div>
            )}
          </LogoContainer>
        </NavLogo>
        <NavCenter>
          <NavMenuPill>
            <NavItems>
              <NavLink href="#about" onClick={onSectionLink('#about')}><FaUser /> About</NavLink>
              <NavLink href="#skills" onClick={onSectionLink('#skills')}><FaTools /> Skills</NavLink>
              <NavLink href="#experience" onClick={onSectionLink('#experience')}><FaBriefcase /> Experience</NavLink>
              <NavLink href="#projects" onClick={onSectionLink('#projects')}><FaProjectDiagram /> Projects</NavLink>
              <NavLink href="#education" onClick={onSectionLink('#education')}><FaGraduationCap /> Education</NavLink>
              <NavRouteLink to="/blogs"><FaRegNewspaper /> Blog</NavRouteLink>
            </NavItems>
          </NavMenuPill>
        </NavCenter>
        <MobileIcon>
          <FaBars onClick={() => {
            setIsOpen(!isOpen)
          }} />
        </MobileIcon>
        <ButtonContainer>
          <GitHubButton href={bio.admin}><FaUserLock style={{ fontSize: '16px' }} /> Admin</GitHubButton>
          <RegistrationButton href={bio.registration}><FaUserPlus style={{ fontSize: '16px' }} /> Sign Up</RegistrationButton>
          <GitHubButton href={bio.github} target="_blank" style={{ padding: '0', width: '42px' }}>
            <FaGithub style={{ fontSize: '22px' }} />
          </GitHubButton>
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={onSectionLink('#about')}><FaUser /> About</MobileLink>
            <MobileLink href="#skills" onClick={onSectionLink('#skills')}><FaTools /> Skills</MobileLink>
            <MobileLink href="#experience" onClick={onSectionLink('#experience')}><FaBriefcase /> Experience</MobileLink>
            <MobileLink href="#projects" onClick={onSectionLink('#projects')}><FaProjectDiagram /> Projects</MobileLink>
            <MobileLink href="#education" onClick={onSectionLink('#education')}><FaGraduationCap /> Education</MobileLink>
            <MobileRouteLink to="/blogs" onClick={() => setIsOpen(false)}><FaRegNewspaper /> Blog</MobileRouteLink>
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content', gap: '8px'}} href={bio.admin}><FaUserLock /> Admin</GitHubButton>
            <RegistrationButton style={{padding: '10px 16px', width: 'max-content', gap: '8px'}} href={bio.registration}><FaUserPlus /> Sign Up</RegistrationButton>
            <GitHubButton style={{padding: '0', background: `${theme.primary}`, color: 'white', width: '42px', height: '42px'}} href={bio.github} target="_blank">
              <FaGithub style={{ fontSize: '22px' }} />
            </GitHubButton>
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar
