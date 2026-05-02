import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';
import { fetchBlogs } from '../../utils/api';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 30px;
    width: 100%;
    margin-top: 40px;
    padding: 0 20px;
`;

const Card = styled.div`
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid ${({ theme }) => theme.primary};
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary + 99};
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const BlogTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const BlogDesc = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
`;

const Tag = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 15};
    padding: 4px 8px;
    border-radius: 4px;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.card};
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    border-radius: 20px;
    overflow-y: auto;
    position: relative;
    border: 1px solid ${({ theme }) => theme.primary + 50};
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.primary};
        border-radius: 3px;
    }
`;

const ModalImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`;

const ModalBody = styled.div`
    padding: 30px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.primary};
    }
`;

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const res = await fetchBlogs();
                if (res.data.length > 0) {
                    setBlogs(res.data);
                } else {
                    // Fallback Dummy Data if no blogs exist
                    setBlogs([
                        {
                            _id: 1,
                            title: "Getting Started with React and Three.js",
                            date: "10/12/2025",
                            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
                            content: "React Three Fiber is a powerful library that allows you to render 3D graphics in React applications. In this guide, we'll explore how to set up a basic scene...",
                            tags: ["React", "Three.js", "3D"]
                        },
                        {
                            _id: 2,
                            title: "The Future of Web Development with AI",
                            date: "15/01/2026",
                            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
                            content: "Artificial Intelligence is revolutionizing how we write code. From GitHub Copilot to ChatGPT, developers are becoming more productive than ever...",
                            tags: ["AI", "Web Dev", "Future"]
                        }
                    ]);
                }
            } catch (err) {
                if (import.meta.env.DEV) console.error(err);
            }
        }
        loadBlogs();
    }, []);

    return (
        <Container id="blog">
            <Wrapper>
                <Title>Blog</Title>
                <Desc>
                    My thoughts, tutorials, and updates on technology and development.
                </Desc>

                <CardContainer>
                    {blogs.map((blog) => (
                        <Card key={blog._id} onClick={() => setSelectedBlog(blog)}>
                            <Image src={blog.image} alt={blog.title} />
                            <Content>
                                <Meta>
                                    <MetaItem><FaCalendarAlt /> {blog.date}</MetaItem>
                                </Meta>
                                <BlogTitle>{blog.title}</BlogTitle>
                                <BlogDesc>{blog.content}</BlogDesc>
                                <Tags>
                                    {blog.tags?.map((tag, index) => (
                                        <Tag key={index}><FaTag size={10} /> {tag}</Tag>
                                    ))}
                                </Tags>
                            </Content>
                        </Card>
                    ))}
                </CardContainer>
            </Wrapper>

            <Modal open={!!selectedBlog} onClick={() => setSelectedBlog(null)}>
                <ModalContent onClick={e => e.stopPropagation()}>
                    {selectedBlog && (
                        <>
                            <CloseButton onClick={() => setSelectedBlog(null)}>×</CloseButton>
                            <ModalImage src={selectedBlog.image} alt={selectedBlog.title} />
                            <ModalBody>
                                <Meta style={{ marginBottom: '10px' }}>
                                    <MetaItem><FaCalendarAlt /> {selectedBlog.date}</MetaItem>
                                    <Tags>
                                        {selectedBlog.tags?.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </Tags>
                                </Meta>
                                <Title style={{ textAlign: 'left', marginTop: '0', fontSize: '32px' }}>{selectedBlog.title}</Title>
                                <p style={{ color: '#b1b1b1', lineHeight: '1.8', fontSize: '18px', marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                                    {selectedBlog.content}
                                </p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default Blog;
