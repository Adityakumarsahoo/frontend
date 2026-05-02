import React, { useMemo, useState, useEffect } from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { CertAction, CertActionPrimary, CertActions, CertAvatar, CertBottomRow, CertIconFallback, CertIconImg, CertIconLink, CertIconsRow, CertIdentity, CertIntroText, CertMeta, CertName, CertNameBlock, CertSectionTitle, CertStatus, CertTopBar, CertificationsCard, CertificationsInner, FeaturedExpCard, FeaturedExpIcon, FeaturedExpText, HeadlineText, HeadlineUnderline, HeadlineWrapper, HeroBg, HeroContainer, HeroDocButton, HeroInnerContainer, HeroLeftActions, HeroLeftContainer, HeroRightContainer, HeroVisualWrap, Img, Name, NewsTag, NewsTicker, NewsTickerTrack, Span, SubTitle, TextLoop, TickerDot, TechBadgeContainer, FloatingParticle, GlowRing, DesignerLabel, DesignerLabelText, PulsingGlowRing, PulsingGlowRing2, ConnectionLine, Sparkle, WebDesignerBadge, WebDesignerText, TechBadgeEnhanced, Title, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGithub, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import { Bio as DefaultBio, experiences as DefaultExperiences } from '../../data/constants';
import { fetchBio, fetchExperience } from '../../utils/api';

const HeroSection = () => {
    const [bio, setBio] = useState(DefaultBio);
    const [experiences, setExperiences] = useState(DefaultExperiences);
    const [brokenCertLogos, setBrokenCertLogos] = useState({});

    const getCertInitials = (text) => {
        const safe = String(text || '').trim();
        if (!safe) return 'CT';
        const parts = safe.split(/\s+/).filter(Boolean);
        const letters = parts.slice(0, 3).map((p) => p[0]).join('');
        return (letters || safe.slice(0, 2)).toUpperCase();
    };

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

    useEffect(() => {
        const loadBio = async () => {
            try {
                const [bioRes, expRes] = await Promise.allSettled([fetchBio(), fetchExperience()]);
                if (bioRes.status === 'fulfilled' && bioRes.value?.data) {
                    setBio(mergeBio(DefaultBio, bioRes.value.data));
                }
                if (expRes.status === 'fulfilled' && Array.isArray(expRes.value?.data) && expRes.value.data.length > 0) {
                    setExperiences(expRes.value.data);
                }
        } catch (err) {
                if (import.meta.env.DEV) console.error(err);
            }
        }
        loadBio();
    }, []);

    const certificationItems = useMemo(() => {
        const list = Array.isArray(experiences) ? experiences : [];
        return list
            .filter((e) => {
                const hasSkills = Array.isArray(e?.skills) && e.skills.length > 0;
                return Boolean(e?.doc || e?.doc2) || !hasSkills;
            })
            .slice(0, 6);
    }, [experiences]);

    const featuredExperience = useMemo(() => {
        const list = Array.isArray(experiences) ? experiences : [];
        return list.find((e) => Array.isArray(e?.skills) && e.skills.length > 0) || null;
    }, [experiences]);

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title>Hi, I am <br /> <Name>{bio.name}</Name></Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: bio.roles,
                                        autoStart: true,
                                        loop: true,
                                        delay: 65,
                                        deleteSpeed: 35,
                                        cursor: '|',
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{bio.description}</SubTitle>
                        <ResumeButton href={bio.resume} target="_blank">Check Resume</ResumeButton>

                        {(bio.experienceLetter || bio.lorCertificate) && (
                            <HeroLeftActions>
                                {bio.experienceLetter && (
                                    <HeroDocButton href={bio.experienceLetter} target="_blank" rel="noreferrer">
                                        Experience Letter
                                    </HeroDocButton>
                                )}
                                {bio.lorCertificate && (
                                    <HeroDocButton href={bio.lorCertificate} target="_blank" rel="noreferrer">
                                        LOR Certificate
                                    </HeroDocButton>
                                )}
                            </HeroLeftActions>
                        )}

                        <HeadlineWrapper>
                            <NewsTag>HIRING</NewsTag>
                            <NewsTicker>
                                <NewsTickerTrack>
                                    <HeadlineText>
                                        Now I am Hiring Best Frontend Developer and Backend Developer and i am also hiring best and proficient programmer.
                                    </HeadlineText>
                                    <TickerDot />
                                    <HeadlineText aria-hidden="true">
                                        Now I am Hiring Best Frontend Developer and Backend Developer and i am also hiring best and proficient programmer.
                                    </HeadlineText>
                                </NewsTickerTrack>
                            </NewsTicker>
                            <HeadlineUnderline />
                        </HeadlineWrapper>

                        <div style={{ width: '100%', marginTop: 14 }}>
                            <CertificationsCard
                                as={motion.div}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                            >
                                <CertificationsInner>
                                    <CertTopBar>
                                        <CertIdentity>
                                            <CertAvatar src={bio.image || HeroImg} alt="Profile" loading="lazy" />
                                            <CertNameBlock>
                                                <CertName title={bio?.name}>{bio?.name}</CertName>
                                                <CertMeta>
                                                    <span><FaBriefcase aria-hidden="true" /> Software Engineer</span>
                                                    <span><FaMapMarkerAlt aria-hidden="true" /> Everywhere</span>
                                                </CertMeta>
                                            </CertNameBlock>
                                        </CertIdentity>
                                        <CertStatus>
                                            <span style={{ width: 7, height: 7, borderRadius: 999, background: 'rgba(0,255,153,0.9)', boxShadow: '0 0 14px rgba(0,255,153,0.55)' }} />
                                            Available
                                        </CertStatus>
                                    </CertTopBar>

                                    <CertIntroText>{bio?.description}</CertIntroText>
                                    <CertSectionTitle>CERTIFICATIONS</CertSectionTitle>

                                    <CertIconsRow>
                                        {certificationItems.map((c, i) => {
                                            const href = c?.doc || c?.doc2 || c?.link || '#';
                                            const isLink = href && href !== '#';
                                            const key = c?._id || `${c?.role || 'cert'}-${c?.company || ''}-${i}`;
                                            const broken = Boolean(brokenCertLogos[key]);
                                            const initials = getCertInitials(c?.company || c?.role);
                                            return (
                                                <CertIconLink
                                                    key={key}
                                                    as={motion.a}
                                                    href={isLink ? href : undefined}
                                                    target={isLink ? '_blank' : undefined}
                                                    rel={isLink ? 'noreferrer' : undefined}
                                                    aria-label={c?.role || 'Certification'}
                                                    style={{ '--d': `${i * 0.12}s`, pointerEvents: isLink ? 'auto' : 'none', opacity: isLink ? 1 : 0.75 }}
                                                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ duration: 0.45, ease: 'easeOut', delay: 0.28 + i * 0.05 }}
                                                >
                                                    {!broken && c?.img ? (
                                                        <CertIconImg
                                                            src={c.img}
                                                            alt={c?.company || c?.role || 'cert'}
                                                            loading="lazy"
                                                            onError={() => setBrokenCertLogos((prev) => ({ ...prev, [key]: true }))}
                                                        />
                                                    ) : (
                                                        <CertIconFallback>{initials}</CertIconFallback>
                                                    )}
                                                </CertIconLink>
                                            );
                                        })}
                                    </CertIconsRow>

                                    <CertActions>
                                        {bio?.linkedin ? (
                                            <CertActionPrimary href={bio.linkedin} target="_blank" rel="noreferrer">
                                                <FaLinkedinIn aria-hidden="true" />
                                                See on LinkedIn
                                            </CertActionPrimary>
                                        ) : null}
                                        {bio?.github ? (
                                            <CertAction href={bio.github} target="_blank" rel="noreferrer">
                                                <FaGithub aria-hidden="true" />
                                                Github
                                            </CertAction>
                                        ) : null}
                                    </CertActions>
                                </CertificationsInner>

                                <CertBottomRow>
                                    {featuredExperience ? (
                                        <FeaturedExpCard>
                                            <FeaturedExpIcon>{featuredExperience?.img ? <img src={featuredExperience.img} alt="" /> : null}</FeaturedExpIcon>
                                            <FeaturedExpText>
                                                <div title={featuredExperience?.role || ''}>{featuredExperience?.role || 'Experience'}</div>
                                                <div title={`${featuredExperience?.company || ''}${featuredExperience?.date ? ` · ${featuredExperience.date}` : ''}`}>
                                                    {featuredExperience?.company}{featuredExperience?.date ? ` · ${featuredExperience.date}` : ''}
                                                </div>
                                            </FeaturedExpText>
                                        </FeaturedExpCard>
                                    ) : null}
                                </CertBottomRow>
                            </CertificationsCard>
                        </div>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <HeroVisualWrap>
                            <GlowRing />
                            <PulsingGlowRing />
                            <PulsingGlowRing2 />
                            
                            <ConnectionLine viewBox="0 0 400 400">
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#854ce6" stopOpacity="0.5" />
                                        <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#ff7ae0" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>
                                <line x1="80" y1="80" x2="200" y2="200" />
                                <line x1="320" y1="80" x2="200" y2="200" />
                                <line x1="60" y1="200" x2="200" y2="200" />
                                <line x1="340" y1="200" x2="200" y2="200" />
                                <line x1="80" y1="320" x2="200" y2="200" />
                                <line x1="320" y1="320" x2="200" y2="200" />
                            </ConnectionLine>
                            
                            <FloatingParticle
                                size={8}
                                color="rgba(133, 76, 230, 0.9)"
                                glow={20}
                                style={{ top: '-40px', left: '15%' }}
                                animate={{
                                    y: [0, -25, 0],
                                    x: [0, 10, 0],
                                    opacity: [0.4, 1, 0.4],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                }}
                            />
                            <FloatingParticle
                                size={5}
                                color="rgba(0, 194, 255, 0.9)"
                                glow={15}
                                style={{ top: '15%', right: '-30px' }}
                                animate={{
                                    y: [0, 20, 0],
                                    x: [0, 15, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            />
                            <FloatingParticle
                                size={6}
                                color="rgba(255, 122, 224, 0.9)"
                                glow={18}
                                style={{ bottom: '35%', left: '-35px' }}
                                animate={{
                                    y: [0, -18, 0],
                                    x: [0, -12, 0],
                                    opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            />
                            <FloatingParticle
                                size={4}
                                color="rgba(133, 76, 230, 0.7)"
                                glow={12}
                                style={{ bottom: '5%', right: '15%' }}
                                animate={{
                                    y: [0, 15, 0],
                                    opacity: [0.3, 0.9, 0.3],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 1.5,
                                }}
                            />
                            <FloatingParticle
                                size={3}
                                color="rgba(255, 255, 255, 0.8)"
                                glow={10}
                                style={{ top: '50%', left: '-40px' }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.2, 0.7, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 0.8,
                                }}
                            />
                            
                            <Sparkle
                                size={12}
                                color="#ffffff"
                                style={{ top: '-20px', right: '30%' }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                }}
                            />
                            <Sparkle
                                size={8}
                                color="#00c2ff"
                                style={{ bottom: '20%', left: '5%' }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.2, 0.5],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            />
                            <Sparkle
                                size={10}
                                color="#ff7ae0"
                                style={{ top: '30%', right: '5%' }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                    rotate: [0, -180, -360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            />
                            
                            <Img src={bio.image || HeroImg} alt="hero-image" />
                            
                            <WebDesignerBadge
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [-1, 2, -1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: "easeInOut",
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <WebDesignerText>
                                    WEB
                                    <span>DESIGNER</span>
                                </WebDesignerText>
                            </WebDesignerBadge>
                            
                            <TechBadgeContainer>
                                <TechBadgeEnhanced
                                    color="#61DAFB"
                                    style={{ top: '-8px', left: '-60px' }}
                                    animate={{ y: [0, -10, 0], rotate: [-2, 3, -2] }}
                                    transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut" }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    React
                                </TechBadgeEnhanced>
                                
                                <TechBadgeEnhanced
                                    color="#339933"
                                    style={{ top: '22px', right: '-78px' }}
                                    animate={{ y: [0, 8, 0], rotate: [2, -3, 2] }}
                                    transition={{ duration: 3.5, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut", delay: 0.3 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Node.js
                                </TechBadgeEnhanced>
                                
                                <TechBadgeEnhanced
                                    color="#ffffff"
                                    style={{ top: '50%', left: '-86px' }}
                                    animate={{ y: [0, -8, 0], rotate: [-1, 4, -1] }}
                                    transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut", delay: 0.6 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Express.js
                                </TechBadgeEnhanced>
                                
                                <TechBadgeEnhanced
                                    color="#47A248"
                                    style={{ top: '45%', right: '-70px' }}
                                    animate={{ y: [0, 10, 0], rotate: [3, -2, 3] }}
                                    transition={{ duration: 4.2, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut", delay: 0.9 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    MongoDB
                                </TechBadgeEnhanced>
                                
                                <TechBadgeEnhanced
                                    color="#F24E1E"
                                    style={{ bottom: '20%', left: '-70px' }}
                                    animate={{ y: [0, -8, 0], rotate: [-3, 2, -3] }}
                                    transition={{ duration: 3.8, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut", delay: 1.2 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Figma
                                </TechBadgeEnhanced>
                                
                                <TechBadgeEnhanced
                                    color="#854ce6"
                                    style={{ bottom: '10%', right: '-52px' }}
                                    animate={{ y: [0, 6, 0], rotate: [2, -4, 2] }}
                                    transition={{ duration: 4.5, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut", delay: 1.5 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    UI/UX
                                </TechBadgeEnhanced>
                            </TechBadgeContainer>
                            
                            <DesignerLabel
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <DesignerLabelText>
                                    UI/UX
                                    <span>DESIGNER</span>
                                </DesignerLabelText>
                            </DesignerLabel>
                        </HeroVisualWrap>
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    )
}

export default HeroSection
