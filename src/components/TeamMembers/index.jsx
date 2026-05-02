import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFacebookF, FaFileAlt, FaGlobe } from 'react-icons/fa';
import {
  Container,
  Wrapper,
  Title,
  Desc,
  Grid,
  Card,
  Avatar,
  Info,
  Name,
  Meta,
  RoleBadge,
  MiniBadge,
  Actions,
  IconLink,
} from './style';
import { fetchTeamMembers } from '../../utils/api';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchTeamMembers();
        if (Array.isArray(res.data)) setMembers(res.data);
      } catch (err) {
        if (import.meta.env.DEV) console.error(err);
      }
    };

    load();
  }, []);

  return (
    <Container id="team">
      <Wrapper>
        <Title
          as={motion.div}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Team Members
        </Title>
        <Desc
          as={motion.div}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        >
          The squad is locked in — approved creators, real execution, zero excuses.
        </Desc>

        <Grid as={motion.div} layout>
          {members.map((m, index) => (
            <motion.div
              key={m._id ?? index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
            >
              <Card>
                <Avatar>
                  {m.avatar ? (
                    <img src={m.avatar} alt="avatar" />
                  ) : (
                    <span>{String(m.name || '?').charAt(0).toUpperCase()}</span>
                  )}
                </Avatar>
                <Info>
                  <Name title={m.name}>{m.name}</Name>
                  <Meta title={m.role || ''}>{m.role ? <RoleBadge>{m.role.toUpperCase()}</RoleBadge> : null}</Meta>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {m.branch ? <MiniBadge>{m.branch}</MiniBadge> : null}
                    {m.course ? <MiniBadge>{m.course}</MiniBadge> : null}
                    {m.specialization ? <MiniBadge>{m.specialization}</MiniBadge> : null}
                  </div>
                </Info>

                <Actions>
                  <IconLink
                    href={m.github || undefined}
                    target={m.github ? "_blank" : undefined}
                    rel={m.github ? "noreferrer" : undefined}
                    title={m.github ? "GitHub" : "GitHub (not provided)"}
                    data-disabled={m.github ? 'false' : 'true'}
                    aria-disabled={m.github ? 'false' : 'true'}
                  >
                    <FaGithub />
                  </IconLink>
                  <IconLink
                    href={m.facebook || undefined}
                    target={m.facebook ? "_blank" : undefined}
                    rel={m.facebook ? "noreferrer" : undefined}
                    title={m.facebook ? "Facebook" : "Facebook (not provided)"}
                    data-disabled={m.facebook ? 'false' : 'true'}
                    aria-disabled={m.facebook ? 'false' : 'true'}
                  >
                    <FaFacebookF />
                  </IconLink>
                  <IconLink
                    href={m.resume || undefined}
                    target={m.resume ? "_blank" : undefined}
                    rel={m.resume ? "noreferrer" : undefined}
                    title={m.resume ? "Resume" : "Resume (not provided)"}
                    data-disabled={m.resume ? 'false' : 'true'}
                    aria-disabled={m.resume ? 'false' : 'true'}
                  >
                    <FaFileAlt />
                  </IconLink>
                  <IconLink
                    href={m.portfolio || undefined}
                    target={m.portfolio ? "_blank" : undefined}
                    rel={m.portfolio ? "noreferrer" : undefined}
                    title={m.portfolio ? "Portfolio" : "Portfolio (not provided)"}
                    data-disabled={m.portfolio ? 'false' : 'true'}
                    aria-disabled={m.portfolio ? 'false' : 'true'}
                  >
                    <FaGlobe />
                  </IconLink>
                </Actions>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default TeamMembers;
