import React, { useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const borderSpin = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const CardBorder = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  padding: ${({ $revealed }) => ($revealed ? '2px' : '0')};
  background: ${({ theme, $revealed }) =>
    $revealed
      ? `linear-gradient(
    135deg,
    rgba(133,76,230,0.55) 0%,
    rgba(0,194,255,0.45) 40%,
    rgba(255,122,224,0.45) 70%,
    rgba(133,76,230,0.55) 100%
  )`
      : theme.bg};
  background-size: ${({ $revealed }) => ($revealed ? '300% 300%' : '100% 100%')};
  animation: ${({ $revealed }) => ($revealed ? css`${borderSpin} 6s ease infinite` : 'none')};
  box-shadow: ${({ $revealed }) =>
    $revealed
      ? `0 0 0 1px rgba(133,76,230,0.18),
    0 20px 50px rgba(0,0,0,0.55),
    0 0 40px rgba(133,76,230,0.15)`
      : 'none'};
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.45s ease,
    box-shadow 0.5s ease;
`

const Card = styled.div`
  width: 100%;
  border-radius: ${({ $revealed }) => ($revealed ? '18px' : '20px')};
  background: ${({ theme, $revealed }) =>
    $revealed
      ? `radial-gradient(circle at 10% 10%, rgba(133,76,230,0.13), transparent 50%),
    radial-gradient(circle at 90% 90%, rgba(0,194,255,0.10), transparent 55%),
    rgba(10,10,26,0.97)`
      : theme.bg};
  backdrop-filter: ${({ $revealed }) => ($revealed ? 'saturate(140%) blur(14px)' : 'none')};
  -webkit-backdrop-filter: ${({ $revealed }) => ($revealed ? 'saturate(140%) blur(14px)' : 'none')};
  padding: 22px 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.45s ease,
    backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(133,76,230,0.7) 25%,
      rgba(0,194,255,0.8) 50%,
      rgba(255,122,224,0.7) 75%,
      transparent 100%
    );
    opacity: ${({ $revealed }) => ($revealed ? 0.8 : 0)};
    transition: opacity 0.45s ease;
  }

  @media only screen and (max-width: 768px) {
    padding: 16px 14px 14px;
    gap: 10px;
  }
`

const RankBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(225deg, #854ce6, #ff7ae0);
  padding: 3px 10px;
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(133, 76, 230, 0.4);
  text-transform: uppercase;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding-right: 58px;
`

const IconWrap = styled.div`
  min-width: 58px;
  width: 58px;
  height: 58px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(133, 76, 230, 0.25);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 45%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), transparent);
    pointer-events: none;
  }
`

const Image = styled.img.attrs({
  referrerPolicy: 'no-referrer',
  onError: (e) => {
    e.currentTarget.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  },
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

const School = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`

const Degree = styled.div`
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(90deg, #c084fc, #60c8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 'aa'};
  display: flex;
  align-items: center;
  gap: 5px;
  &::before {
    content: '🗓';
    font-size: 10px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(133, 76, 230, 0.3), rgba(0, 194, 255, 0.2), transparent);
  border-radius: 999px;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0.35)};
  transition: opacity 0.45s ease;
`

const GradeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const GradeLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(133, 76, 230, 0.9);
`

const GradeValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(133, 76, 230, 0.12);
  border: 1px solid rgba(133, 76, 230, 0.28);
`

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`

const ToggleButton = styled.button`
  appearance: none;
  border: 1px solid rgba(133, 76, 230, 0.45);
  background: linear-gradient(225deg, rgba(133, 76, 230, 0.22), rgba(255, 122, 224, 0.14));
  color: ${({ theme }) => theme.white};
  padding: 9px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(225deg, rgba(133, 76, 230, 0.36), rgba(255, 122, 224, 0.22));
    box-shadow: 0 8px 22px rgba(133, 76, 230, 0.25);
  }
`

const AnimatedDetails = styled(motion.div)`
  overflow: hidden;
`

const getOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
}

const EducationCard = ({ education, index = 0, expanded = false, onToggle }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.22, margin: '0px 0px -12% 0px', once: false })

  return (
    <div ref={ref}>
      <CardBorder $revealed={inView}>
        <Card $revealed={inView}>
          <RankBadge>{getOrdinal(index + 1)}</RankBadge>

          <Top>
            <IconWrap>
              <Image src={education.img} alt="" />
            </IconWrap>
            <Body>
              <School>{education.school}</School>
              <Degree>{education.degree}</Degree>
              <Date>{education.date}</Date>
            </Body>
          </Top>

          <Divider $revealed={inView} />

          <GradeRow>
            <GradeLabel>Grade</GradeLabel>
            <GradeValue>{education.grade}</GradeValue>
          </GradeRow>

          {education?.desc && (
            <>
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
                      <div style={{ whiteSpace: 'pre-wrap' }}>{education.desc}</div>
                    </AnimatedDetails>
                  </AnimatePresence>
                ) : (
                  <Span>{education.desc}</Span>
                )}
              </Description>
              <ActionsRow>
                <ToggleButton type="button" onClick={onToggle}>
                  {expanded ? '↑ Show Less' : '↓ Show More'}
                </ToggleButton>
              </ActionsRow>
            </>
          )}
        </Card>
      </CardBorder>
    </div>
  )
}

export default EducationCard
