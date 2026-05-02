import { ThemeProvider } from "styled-components";
import { Suspense, lazy, useEffect, useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
// import About from "./components/About";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import Authentication from "./components/Authentication";
import UserDashboard from "./components/UserDashboard";
import styled, { keyframes } from "styled-components";

const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const TeamMembers = lazy(() => import("./components/TeamMembers"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Blog = lazy(() => import("./components/Blog"));
const ProjectDetails = lazy(() => import("./components/ProjectDetails"));

const move = keyframes`
  0% { transform: translateY(0) translateX(0) scale(1); }
  50% { transform: translateY(-20px) translateX(20px) scale(1.1); }
  100% { transform: translateY(0) translateX(0) scale(1); }
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  @media (max-width: 640px) {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Blob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: ${move} 10s infinite alternate;
  @media (max-width: 1024px) {
    width: 420px;
    height: 420px;
    filter: blur(76px);
    opacity: 0.28;
  }
  @media (max-width: 768px) {
    width: 340px;
    height: 340px;
    filter: blur(70px);
    opacity: 0.24;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Blob1 = styled(Blob)`
  top: -100px;
  left: -100px;
  background: ${({ theme }) => theme.primary};
`;

const Blob2 = styled(Blob)`
  top: 40%;
  right: -100px;
  background: ${({ theme }) => theme.primary};
  animation-duration: 15s;
`;

const Blob3 = styled(Blob)`
  bottom: -100px;
  left: 20%;
  background: #00c2ff;
  animation-duration: 12s;
`;

const Body = styled.div`
  background: linear-gradient(90deg, #050508 0%, #0b0609 32%, #24000c 68%, #050508 100%);
  width: 100%;
  overflow-x: hidden;
  position: relative;
`

const Wrapper = styled.div`
  background:
    radial-gradient(900px 520px at 12% 18%, rgba(255, 38, 94, 0.14) 0%, transparent 60%),
    radial-gradient(900px 560px at 86% 86%, rgba(157, 0, 56, 0.12) 0%, transparent 62%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`
const NavbarWrapper = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin/dashboard') || location.pathname.startsWith('/user/dashboard');
  return isDashboard ? null : <Navbar />;
};

const Reveal = ({ children, delay = 0 }) => (
  <div data-animate="reveal" style={{ '--reveal-delay': `${delay}ms` }}>
    {children}
  </div>
);

const ScrollRevealManager = () => {
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-animate="reveal"]'));
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
};

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <NavbarWrapper />
        <ScrollRevealManager />
        <Body>
          <BackgroundAnimation>
            <Blob1 />
            <Blob2 />
            <Blob3 />
          </BackgroundAnimation>
          <Routes>
            <Route
              path="/admin"
              element={<Admin />}
            />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/registration"
              element={<Authentication />}
            />
            <Route
              path="/blogs"
              element={
                <>
                  <Reveal delay={0}><Suspense fallback={null}><Blog /></Suspense></Reveal>
                  <Reveal delay={60}><Suspense fallback={null}><Footer /></Suspense></Reveal>
                </>
              }
            />
            <Route
              path="/user/dashboard"
              element={<UserDashboard />}
            />
            <Route
              path="/"
              element={
                <>
                  <Reveal delay={0}><HeroSection /></Reveal>
                  <Wrapper>
                    <Reveal delay={60}><Suspense fallback={null}><Skills /></Suspense></Reveal>
                    <Reveal delay={120}><Suspense fallback={null}><Experience /></Suspense></Reveal>
                  </Wrapper>
                  <Reveal delay={80}><Suspense fallback={null}><Projects openModal={openModal} setOpenModal={setOpenModal} /></Suspense></Reveal>
                  <Reveal delay={100}><Suspense fallback={null}><TeamMembers /></Suspense></Reveal>
                  <Wrapper>
                    <Reveal delay={60}><Suspense fallback={null}><Education /></Suspense></Reveal>
                    <Reveal delay={90}><Suspense fallback={null}><Contact /></Suspense></Reveal>
                  </Wrapper>
                  <Reveal delay={60}><Suspense fallback={null}><Footer /></Suspense></Reveal>
                  {openModal.state &&
                    <Suspense fallback={null}>
                      <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                    </Suspense>
                  }
                </>
              }
            />
          </Routes>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
