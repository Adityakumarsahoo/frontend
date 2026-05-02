import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects as defaultProjects } from '../../data/constants';
import { fetchProjects } from '../../utils/api';


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  const [projects, setProjects] = useState(defaultProjects);
  const cardVariants = {
    hidden: (i) => ({ opacity: 0, y: 26, x: i % 2 === 0 ? -28 : 28 }),
    show: { opacity: 1, y: 0, x: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } },
  };

  useEffect(() => {
    const loadProjects = async () => {
        try {
            const res = await fetchProjects();
            if (Array.isArray(res.data) && res.data.length > 0) {
                setProjects(res.data);
            }
        } catch (err) {
            if (import.meta.env.DEV) console.error(err);
        }
    }
    loadProjects();
  }, []);

  return (
    <Container id="projects">
      <Wrapper>
        <Title
          as={motion.div}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Projects
        </Title>
        <Desc
          as={motion.div}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        >
          I have worked on a wide range of projects, including web and Android applications. Here are a few highlights.
        </Desc>
        <ToggleButtonGroup
          as={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
        >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer as={motion.div} layout>
          {toggle === 'all' && projects
            .map((project, index) => (
              <motion.div
                key={project.id ?? project._id ?? index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
              >
                <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
              </motion.div>
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project, index) => (
              <motion.div
                key={project.id ?? project._id ?? index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
              >
                <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
              </motion.div>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects
