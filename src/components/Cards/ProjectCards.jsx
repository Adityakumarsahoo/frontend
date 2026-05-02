import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled.div`
    width: 330px;
    height: 490px;
    background: radial-gradient(circle at 0% 0%, rgba(133, 76, 230, 0.18), transparent 55%),
                radial-gradient(circle at 100% 120%, rgba(0, 194, 255, 0.25), transparent 60%),
                ${({ theme }) => theme.card};
    cursor: pointer;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
        0 18px 40px rgba(0,0,0,0.55),
        0 0 0 1px rgba(255,255,255,0.03);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transform: translateZ(0);
    transition: transform 260ms ease, box-shadow 260ms ease, filter 260ms ease;

    &::after{
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255,255,255,0.10), rgba(255,255,255,0));
        opacity: 0.22;
        pointer-events: none;
    }

    &::before{
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 20px;
        pointer-events: none;
        opacity: 0;
        background: linear-gradient(120deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.16) 45%, rgba(255,255,255,0) 70%);
        transform: translateX(-60%);
    }

    &:hover {
        transform: translateY(-10px) translateZ(0) scale(1.01);
        box-shadow:
            0 26px 55px rgba(0,0,0,0.75),
            0 0 0 1px rgba(133,76,230,0.65);
        filter: brightness(1.08);
    }
    &:hover::before{
        opacity: 0.65;
        animation: sheen 900ms ease forwards;
    }
    &:hover ${Button} {
        display: block;
    }

    @keyframes sheen {
        0% { transform: translateX(-60%); }
        100% { transform: translateX(60%); }
    }
`

const Image = styled.img.attrs({
    referrerPolicy: 'no-referrer',
    onError: (e) => {
        e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    }
})`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 14px;
    box-shadow: 0 10px 26px rgba(0,0,0,0.45);
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`
const Avatar = styled.img.attrs({
    referrerPolicy: 'no-referrer',
    onError: (e) => {
        e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    }
})`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 2px solid ${({ theme }) => theme.card};
    object-fit: cover;
    object-position: center;
`

const ProjectCards = ({project,setOpenModal}) => {
    return (
        <Card onClick={() => setOpenModal({state: true, project: project})}>
            <Image src={project.image}/>
            <Tags>
                {project.tags?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
            </Details>
            <Members>
                {project.member?.map((member, index) => (
                    <Avatar key={index} src={member.img}/>
                ))}
            </Members>
            {/* <Button>View Project</Button> */}
        </Card>
    )
}

export default ProjectCards
