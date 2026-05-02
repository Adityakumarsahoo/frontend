import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Animated shimmer for gradient border ── */
const borderSpin = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

/* ── Outer wrapper that provides the gradient border ── */
const CardBorder = styled.div`
  position: relative;
  width: 100%;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(133,76,230,0.55) 0%,
    rgba(0,194,255,0.45) 40%,
    rgba(255,122,224,0.45) 70%,
    rgba(133,76,230,0.55) 100%
  );
  background-size: 300% 300%;
  animation: ${css`${borderSpin} 6s ease infinite`};
  box-shadow:
    0 0 0 1px rgba(133,76,230,0.18),
    0 16px 42px rgba(0,0,0,0.52),
    0 0 34px rgba(133,76,230,0.14);
`

const Card = styled.div`
  width: 100%;
  border-radius: 18px;
  background:
    radial-gradient(circle at 10% 10%, rgba(133,76,230,0.13), transparent 50%),
    radial-gradient(circle at 90% 90%, rgba(0,194,255,0.10), transparent 55%),
    rgba(10,10,26,0.97);
  padding: 18px 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;

  /* Top shimmer line */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(133,76,230,0.7) 25%,
      rgba(0,194,255,0.8) 50%,
      rgba(255,122,224,0.7) 75%,
      transparent 100%
    );
    opacity: 0.8;
  }

  @media only screen and (max-width: 768px) {
    padding: 14px 12px 12px;
    gap: 9px;
  }
`

/* ── Rank badge (top-right corner) ── */
const RankBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: rgba(255,255,255,0.9);
  background: linear-gradient(225deg, #854CE6, #FF7AE0);
  padding: 3px 8px;
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(133,76,230,0.4);
  text-transform: uppercase;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-right: 52px; /* room for badge */
`

const IconWrap = styled.div`
  min-width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow:
    0 8px 22px rgba(0,0,0,0.3),
    0 0 0 2px rgba(133,76,230,0.25);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  /* glass gloss */
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 45%;
    background: linear-gradient(180deg, rgba(255,255,255,0.75), transparent);
    pointer-events: none;
  }
`

const Image = styled.img.attrs({
  referrerPolicy: 'no-referrer',
  loading: 'lazy',
  decoding: 'async',
  onError: (e) => {
    e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  }
})`
  width: 72%;
  height: 72%;
  object-fit: contain;
  border-radius: 6px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`

const Role = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  @media only screen and (max-width: 768px) { font-size: 14px; }
`

const Company = styled.div`
  font-size: 12px;
  font-weight: 600;
  background: linear-gradient(90deg, #c084fc, #60c8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media only screen and (max-width: 768px) { font-size: 11px; }
`

const Date = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 'aa'};
  display: flex;
  align-items: center;
  gap: 5px;
  &::before {
    content: '';
  }
  @media only screen and (max-width: 768px) { font-size: 10px; }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(133,76,230,0.3), rgba(0,194,255,0.2), transparent);
  border-radius: 999px;
`

const Description = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  @media only screen and (max-width: 768px) { font-size: 12px; }
`

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

/* ── Skill chips ── */
const SkillsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SkillsLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(133,76,230,0.9);
`

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Chip = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(133,76,230,0.16);
  border: 1px solid rgba(133,76,230,0.35);
  transition: background 200ms ease, border-color 200ms ease;
  &:hover {
    background: rgba(133,76,230,0.30);
    border-color: rgba(133,76,230,0.65);
  }
`

const MoreChip = styled(Chip)`
  background: rgba(0,194,255,0.12);
  border-color: rgba(0,194,255,0.3);
  color: rgba(0,194,255,0.9);
  &:hover {
    background: rgba(0,194,255,0.22);
    border-color: rgba(0,194,255,0.55);
  }
`

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`

const ToggleButton = styled.button`
  appearance: none;
  border: 1px solid rgba(133,76,230,0.45);
  background: linear-gradient(225deg, rgba(133,76,230,0.22), rgba(255,122,224,0.14));
  color: ${({ theme }) => theme.white};
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(225deg, rgba(133,76,230,0.36), rgba(255,122,224,0.22));
    box-shadow: 0 8px 22px rgba(133,76,230,0.25);
  }
`

const CertButton = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  background: linear-gradient(225deg, #854CE6, #60c8ff);
  text-decoration: none;
  cursor: pointer;
  transition: filter 200ms ease, transform 200ms ease;
  &:hover { filter: brightness(1.1); transform: translateY(-1px); }
`

const AnimatedDetails = styled(motion.div)`
  overflow: hidden;
`

/* ── ordinal helper ── */
const getOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
}

const ExperienceCard = ({ experience, index = 0, expanded = false, onToggle }) => {
  const skillsToShow = expanded ? experience?.skills : experience?.skills?.slice(0, 6)
  const extraCount = (experience?.skills?.length ?? 0) - 6

  return (
    <CardBorder>
      <Card>
        <RankBadge>{getOrdinal(index + 1)}</RankBadge>

        <Top>
          {experience?.doc ? (
            <a href={experience.doc} target="new" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
              <IconWrap><Image src={experience.img} /></IconWrap>
            </a>
          ) : (
            <IconWrap><Image src={experience.img} /></IconWrap>
          )}
          <Body>
            <Role>{experience.role}</Role>
            <Company>{experience.company}</Company>
            <Date>{experience.date}</Date>
          </Body>
        </Top>

        <Divider />

        {experience?.desc && (
          <Description>
            {expanded ? (
              <AnimatePresence initial={false}>
                <AnimatedDetails
                  key="expanded-desc"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>{experience.desc}</div>
                </AnimatedDetails>
              </AnimatePresence>
            ) : (
              <Span>{experience.desc}</Span>
            )}
          </Description>
        )}

        {skillsToShow?.length > 0 && (
          <SkillsSection>
            <SkillsLabel>Skills</SkillsLabel>
            <ChipRow>
              {skillsToShow.map((skill, i) => (
                <Chip key={i}>{skill}</Chip>
              ))}
              {!expanded && extraCount > 0 && (
                <MoreChip>+{extraCount} more</MoreChip>
              )}
            </ChipRow>
          </SkillsSection>
        )}

        <ActionsRow>
          <ToggleButton type="button" onClick={onToggle}>
            {expanded ? '↑ Show Less' : '↓ Show More'}
          </ToggleButton>
          {expanded && (experience?.doc || experience?.doc2) && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {experience.doc && (
                <CertButton href={experience.doc} target="new">🏅 Certificate</CertButton>
              )}
              {experience.doc2 && (
                <CertButton href={experience.doc2} target="new">🏅 Certificate 2</CertButton>
              )}
            </div>
          )}
        </ActionsRow>
      </Card>
    </CardBorder>
  )
}

export default ExperienceCard
