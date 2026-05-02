import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUser, FaCog, FaSignOutAlt, FaBell, FaSearch, 
  FaChartBar, FaProjectDiagram, FaEnvelope, FaDownload, 
  FaRocket, FaShieldAlt, FaSync, FaTrash, FaCheckCircle, 
  FaExclamationTriangle, FaPen, FaSave, FaTimes, FaGraduationCap,
  FaCamera, FaSpinner, FaGithub, FaExternalLinkAlt
} from 'react-icons/fa';
import Snackbar from '../Snackbar';
import { fetchProjects, fetchBroadcasts, fetchTasks, updateTask, updateUser, sendUserMessageToAdmin } from '../../utils/api';

// --- Styled Components ---

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f4f7fe;
  color: #2b3674;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #e0e5f2;
  transition: all 0.3s ease;
  z-index: 10;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    padding: 15px;
    height: 70px;
    border-bottom: 1px solid #e0e5f2;
    border-right: none;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 900;
  color: #2B3674;
  margin-bottom: 40px;

  .brandRow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .brandIcon {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(67, 24, 255, 0.18), rgba(134, 140, 255, 0.14));
    border: 1px solid rgba(67, 24, 255, 0.18);
    color: #4318FF;
    box-shadow: 0 10px 26px rgba(67, 24, 255, 0.12);
  }

  .subTitle {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #6B7A99;
    padding-left: 4px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 0;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#6B7A99')};
  background: ${({ active }) => (active ? '#4318FF' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? '#4318FF' : '#F4F7FE')};
    color: ${({ active }) => (active ? '#fff' : '#4318FF')};
  }

  svg {
    font-size: 20px;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #f4f7fe;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 70px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

const WelcomeText = styled.div`
  h1 {
    font-size: 34px;
    font-weight: 700;
    color: #2B3674;
    margin: 0;
  }
  p {
    color: #6B7A99;
    margin-top: 5px;
    font-size: 16px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #F4F7FE;
  border-radius: 49px;
  padding: 8px 16px;
  gap: 10px;
  flex: 1;
  
  input {
    border: none;
    background: transparent;
    outline: none;
    color: #2B3674;
    font-size: 14px;
    width: 100%;
    min-width: 120px;

    &::placeholder {
      color: #6B7A99;
    }
  }
`;

const IconButton = styled.div`
  color: #6B7A99;
  cursor: pointer;
  font-size: 20px;
  transition: color 0.2s;
  position: relative;

  &:hover {
    color: #4318FF;
  }
  
  ${({ badgeCount }) => (badgeCount && badgeCount > 0) && `
    &::after {
      content: '${badgeCount}';
      position: absolute;
      top: -8px;
      right: -10px;
      min-width: 18px;
      height: 18px;
      padding: 0 6px;
      background: #FF5630;
      border-radius: 999px;
      border: 2px solid #fff;
      color: #fff;
      font-size: 11px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  `}
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  width: 380px;
  max-width: calc(100vw - 40px);
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #E0E5F2;
  border-radius: 18px;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.16);
  overflow: hidden;
  z-index: 50;

  @media (max-width: 480px) {
    right: -10px;
    width: calc(100vw - 20px);
  }
`;

const NotificationHeader = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E0E5F2;
  h4 { margin: 0; color: #2B3674; font-size: 14px; font-weight: 900; }
  button { background: transparent; border: none; cursor: pointer; font-size: 18px; color: #A3AED0; font-weight: 900; }
`;

const NotificationSectionTitle = styled.div`
  padding: 10px 16px;
  color: #A3AED0;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 0.6px;
`;

const NotificationList = styled.div`
  max-height: 420px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #F4F7FE;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NotificationTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #2B3674;
  font-weight: 900;
  font-size: 13px;
`;

const NotificationBody = styled.div`
  color: #707EAE;
  font-size: 12px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #868CFF 0%, #4318FF 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Banner = styled.div`
  background: linear-gradient(90deg, #4318FF 0%, #868CFF 100%);
  border-radius: 20px;
  padding: 30px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-height: 150px;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const BannerContent = styled.div`
  z-index: 1;
  h2 {
    font-size: 24px;
    margin: 0 0 10px 0;
  }
  p {
    margin: 0;
    opacity: 0.8;
    max-width: 400px;
    color: #6B7A99;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconBox = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ color }) => color || '#F4F7FE'};
  color: ${({ iconColor }) => iconColor || '#4318FF'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 14px;
    color: #6B7A99;
  }
  
  h3 {
    font-size: 24px;
    color: #2B3674;
    margin: 5px 0 0 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #2B3674;
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 20px 50px rgba(112, 144, 176, 0.2);
  }
`;

const ActionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  div {
    display: flex;
    flex-direction: column;
    h4 {
      margin: 0;
      color: #2B3674;
      font-size: 16px;
    }
    span {
      font-size: 12px;
      color: #6B7A99;
    }
  }
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${({ active }) => (active ? '#4318FF' : '#E0E5F2')};
  border-radius: 20px;
  position: relative;
  transition: background 0.3s;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ active }) => (active ? '22px' : '2px')};
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.3s;
  }
`;

const ChartCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 300px;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  padding-top: 20px;
  gap: 10px;
`;

const Bar = styled.div`
  width: 100%;
  max-width: 30px;
  background: ${({ active }) => (active ? '#4318FF' : '#E0E5F2')};
  border-radius: 10px;
  height: ${({ height }) => height};
  position: relative;
  transition: height 0.5s ease;
  cursor: pointer;

  &:hover {
    background: #868CFF;
    
    &::after {
      content: '${({ value }) => value}';
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      background: #2B3674;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
`;

const BarLabel = styled.span`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #6B7A99;
`;

const ProfilePreview = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  position: relative;
`;

const LargeAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #868CFF 0%, #4318FF 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  border: 4px solid #fff;
  box-shadow: 0px 10px 20px rgba(67, 24, 255, 0.2);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #6B7A99;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #4318FF;
    color: #fff;
  }
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F4F7FE;
  
  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #6B7A99;
    font-size: 14px;
  }
  span:last-child {
    color: #2B3674;
    font-weight: 600;
    font-size: 14px;
  }
`;

const ProgressCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CircularProgress = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(#4318FF ${({ percent }) => percent}%, #F4F7FE 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::after {
    content: '${({ percent }) => percent}%';
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #2B3674;
  }
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #2B3674;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: #6B7A99;
  cursor: pointer;
  
  &:hover {
    color: #FF5630;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #2B3674;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #E0E5F2;
    border-radius: 10px;
    outline: none;
    color: #2B3674;
    
    &:focus {
      border-color: #4318FF;
    }
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #F4F7FE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  overflow: hidden;
  border: 2px dashed #4318FF;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    font-size: 30px;
    color: #6B7A99;
  }
  
  &:hover svg {
    color: #4318FF;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #4318FF;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #3311CC;
  }
`;

const ContentPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  color: #6B7A99;
  text-align: center;
  
  h3 {
    margin-top: 20px;
    color: #2B3674;
  }
  
  svg {
    font-size: 60px;
    color: #4318FF;
    opacity: 0.5;
  }
`;

// --- New Styled Components for Content ---
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 10px 30px rgba(112, 144, 176, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 20px 40px rgba(112, 144, 176, 0.2);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
`;

const Tag = styled.span`
  background: rgba(67, 24, 255, 0.1);
  color: #4318FF;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  background: ${({ bg }) => bg || '#333'};
  color: ${({ color }) => color || '#fff'};
`;

const MessageCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0px 5px 15px rgba(112, 144, 176, 0.08);
  border-left: 4px solid ${({ type }) => 
    type === 'warning' ? '#FFB547' : 
    type === 'success' ? '#00C853' : 
    '#4318FF'};
`;

const SpinningIcon = styled.div`
  animation: spin 1s linear infinite;
  font-size: 40px;
  color: #4318FF;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// --- Main Component ---

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // Data State
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyForm, setReplyForm] = useState({ title: '', message: '' });

  // Toggles State
  const [toggles, setToggles] = useState({
    profile: true,
    security: true,
    downloads: false,
    cache: false
  });

  // User Data State
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {
    name: 'Aditya Kumar',
    role: 'Frontend Developer',
    email: 'toadityakumarsahoo@gmail.com',
    phone: '+91 8018389108',
    address: 'Bhubaneswar, India',
    education: 'B.Tech CSE',
    specialization: 'React & UI/UX',
    avatar: null,
    github: '',
    facebook: '',
    resume: '',
    portfolio: ''
  });

  const [editData, setEditData] = useState(user);

  const fetchData = useCallback(async () => {
    try {
      const [projectsRes, broadcastsRes, tasksRes] = await Promise.all([
        fetchProjects(),
        fetchBroadcasts(),
        fetchTasks()
      ]);
      setProjects(projectsRes.data);
      const userId = user?._id || user?.id;
      const filteredBroadcasts = Array.isArray(broadcastsRes.data)
        ? broadcastsRes.data.filter((b) => {
            const target = b?.targetUser;
            const targetId = typeof target === 'string' ? target : target?._id;
            return !targetId || (userId && targetId === userId);
          })
        : [];
      setBroadcasts(filteredBroadcasts);
      // Filter tasks for current user if backend returns all (it returns all currently)
      // Ideally backend should filter, but let's filter here for now
      const myTasks = Array.isArray(tasksRes.data)
        ? tasksRes.data.filter(t => {
            const assigned = t?.assignedTo;
            const assignedId = typeof assigned === 'string' ? assigned : assigned?._id;
            return userId && assignedId === userId;
          })
        : [];
      setTasks(myTasks);
      setLoading(false);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  }, [user?._id, user?.id]);

  const getSeenBroadcastKey = () => {
    const userId = user?._id || user?.id;
    return `seenBroadcastIds_${userId || 'guest'}`;
  };

  const getSeenBroadcastIds = () => {
    try {
      const raw = localStorage.getItem(getSeenBroadcastKey());
      const arr = JSON.parse(raw || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const markAllBroadcastsSeen = () => {
    const ids = broadcasts.map(b => b?._id).filter(Boolean);
    localStorage.setItem(getSeenBroadcastKey(), JSON.stringify(ids));
  };

  useEffect(() => {
    // Sync state if localStorage changes elsewhere
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) setUser(storedUser);

    // Initial Fetch
    fetchData();

    // Polling for real-time updates (every 5 seconds)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/registration');
  };

  const handleSaveProfile = async () => {
    try {
      const userId = editData?._id || editData?.id;
      if (userId) {
        const res = await updateUser(userId, {
          name: editData.name,
          role: editData.role,
          phone: editData.phone,
          address: editData.address,
          avatar: editData.avatar,
          github: editData.github,
          facebook: editData.facebook,
          resume: editData.resume,
          portfolio: editData.portfolio,
        });
        const updated = res?.data ? { ...editData, ...res.data } : editData;
        setUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      } else {
        setUser(editData);
        localStorage.setItem('currentUser', JSON.stringify(editData));
      }

      setIsEditOpen(false);
      setSnackbarMessage('Profile updated successfully!');
      setOpenSnackbar(true);
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      setSnackbarMessage('Failed to update profile');
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    
    // Simulate action
    if (!toggles[key]) {
        let msg = '';
        switch(key) {
            case 'profile': msg = 'Auto-update enabled'; break;
            case 'security': msg = 'Security scan active'; break;
            case 'downloads': msg = 'Downloads resumed'; break;
            case 'cache': msg = 'Cache auto-clear enabled'; break;
            default: msg = 'Setting updated';
        }
        setSnackbarMessage(msg);
        setOpenSnackbar(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: String(reader.result || '') });
      };
      reader.readAsDataURL(file);
    }
    if (e?.target) e.target.value = '';
  };

  // Render Content based on Active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
        const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
        return (
          <DashboardGrid>
            <LeftColumn>
              <Banner>
                <BannerContent>
                  <h2>Check out the latest updates!</h2>
                  <p>
                    You have {projects.length} projects and {totalTasks} tasks.
                  </p>
                </BannerContent>
                <div style={{ fontSize: '100px', opacity: 0.2 }}>
                  <FaRocket />
                </div>
              </Banner>

              <SectionTitle>Overview Statistics</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <IconBox color="#F4F7FE" iconColor="#4318FF">
                    <FaChartBar />
                  </IconBox>
                  <StatInfo>
                    <span>Messages</span>
                    <h3>{broadcasts.length}</h3>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <IconBox color="#FFF7EC" iconColor="#FFB547">
                    <FaProjectDiagram />
                  </IconBox>
                  <StatInfo>
                    <span>Projects</span>
                    <h3>{projects.length}</h3>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <IconBox color="#F0FDF4" iconColor="#22C55E">
                    <FaCheckCircle />
                  </IconBox>
                  <StatInfo>
                    <span>Completed</span>
                    <h3>{completedTasks}</h3>
                  </StatInfo>
                </StatCard>
                <StatCard>
                  <IconBox color="#FEF2F2" iconColor="#EF4444">
                    <FaExclamationTriangle />
                  </IconBox>
                  <StatInfo>
                    <span>Pending Tasks</span>
                    <h3>{pendingTasks}</h3>
                  </StatInfo>
                </StatCard>
              </StatsGrid>

              <SectionTitle>Activity & Functions</SectionTitle>
              <ActionGrid>
                <ActionCard onClick={() => handleToggle('profile')}>
                  <ActionContent>
                    <IconBox color="#EEF2FF" iconColor="#4318FF"><FaSync /></IconBox>
                    <div>
                      <h4>Update Profile</h4>
                      <span>Keep data fresh</span>
                    </div>
                  </ActionContent>
                  <ToggleSwitch active={toggles.profile} />
                </ActionCard>
                
                <ActionCard onClick={() => handleToggle('security')}>
                  <ActionContent>
                    <IconBox color="#FFF7ED" iconColor="#FF9F43"><FaShieldAlt /></IconBox>
                    <div>
                      <h4>Security Scan</h4>
                      <span>Account safe</span>
                    </div>
                  </ActionContent>
                  <ToggleSwitch active={toggles.security} />
                </ActionCard>
                
                <ActionCard onClick={() => handleToggle('downloads')}>
                  <ActionContent>
                    <IconBox color="#F0FDF4" iconColor="#00C853"><FaDownload /></IconBox>
                    <div>
                      <h4>Projects</h4>
                      <span>{projects.length} items</span>
                    </div>
                  </ActionContent>
                  <ToggleSwitch active={toggles.downloads} />
                </ActionCard>
                
                <ActionCard onClick={() => handleToggle('cache')}>
                  <ActionContent>
                    <IconBox color="#FEF2F2" iconColor="#FF5630"><FaTrash /></IconBox>
                    <div>
                      <h4>Tasks</h4>
                      <span>{totalTasks} items</span>
                    </div>
                  </ActionContent>
                  <ToggleSwitch active={toggles.cache} />
                </ActionCard>
              </ActionGrid>
            </LeftColumn>

            <RightColumn>
              <ProfilePreview>
                <EditButton onClick={() => { setEditData(user); setIsEditOpen(true); }}><FaPen size={12} /></EditButton>
                <LargeAvatar>
                  {user.avatar ? <img src={user.avatar} alt="Profile" /> : user.name.charAt(0)}
                </LargeAvatar>
                <h3 style={{ margin: '0 0 5px 0', color: '#2B3674' }}>{user.name}</h3>
                <span style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '20px' }}>{user.role}</span>
                
                <InfoRow>
                  <span>Email</span>
                  <span>{user.email}</span>
                </InfoRow>
                <InfoRow>
                  <span>Phone</span>
                  <span>{user.phone}</span>
                </InfoRow>
                <InfoRow>
                  <span>Location</span>
                  <span>{user.address}</span>
                </InfoRow>
              </ProfilePreview>

              <ChartCard>
                <SectionTitle>
                  Weekly Summary 
                  <div style={{ padding: '5px 10px', background: '#F4F7FE', borderRadius: '10px', fontSize: '12px', color: '#A3AED0' }}>
                    Live
                  </div>
                </SectionTitle>
                <BarChart>
                  <Bar height={`${completionRate}%`} value={completionRate} active={true}><BarLabel>Done</BarLabel></Bar>
                  <Bar height={`${totalTasks ? Math.round((pendingTasks / totalTasks) * 100) : 0}%`} value={totalTasks ? Math.round((pendingTasks / totalTasks) * 100) : 0} active={false}><BarLabel>Pending</BarLabel></Bar>
                  <Bar height={`${broadcasts.length ? 100 : 20}%`} value={broadcasts.length ? 100 : 20} active={false}><BarLabel>Msg</BarLabel></Bar>
                </BarChart>
              </ChartCard>

              <ProgressCard>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <IconBox color="#EEF2FF" iconColor="#4318FF"><FaGraduationCap /></IconBox>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ margin: 0, color: '#2B3674' }}>Task Completion</h4>
                    <span style={{ fontSize: '12px', color: '#A3AED0' }}>{completedTasks} / {totalTasks} completed</span>
                  </div>
                </div>
                <CircularProgress percent={completionRate} />
              </ProgressCard>

            </RightColumn>
          </DashboardGrid>
        );
      }
      
      case 'projects': {
        const q = String(searchQuery || '').trim().toLowerCase();
        const filteredProjects = q
          ? projects.filter((p) => {
              const hay = [p.title, p.description, p.category, ...(p.tags || [])]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
              return hay.includes(q);
            })
          : projects;
        return (
          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <SectionTitle style={{ margin: 0 }}>Assigned Projects</SectionTitle>
                <span style={{ color: '#A3AED0', fontSize: '14px' }}>{filteredProjects.length} Active</span>
             </div>
             
             {loading ? (
                <ContentPlaceholder>
                   <SpinningIcon><FaSpinner /></SpinningIcon>
                   <p>Loading projects...</p>
                </ContentPlaceholder>
             ) : filteredProjects.length > 0 ? (
                <GridContainer>
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project._id}>
                      <ProjectImage src={project.image} alt={project.title} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#2B3674' }}>{project.title}</h4>
                          <span style={{ fontSize: '12px', color: '#A3AED0' }}>{new Date(project.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: '#707EAE', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tags?.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
                      </div>
                      <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '10px' }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2B3674', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '14px' }}>
                                <FaGithub /> Code
                            </a>
                        )}
                        {project.webapp && (
                            <a href={project.webapp} target="_blank" rel="noopener noreferrer" style={{ color: '#4318FF', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        )}
                      </div>
                    </ProjectCard>
                  ))}
                </GridContainer>
             ) : (
                <ContentPlaceholder>
                    <FaProjectDiagram />
                    <h3>No matching projects</h3>
                    <p>Try a different search keyword.</p>
                </ContentPlaceholder>
             )}
          </div>
        );
      }
      
      case 'tasks':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <SectionTitle style={{ margin: 0 }}>My Tasks</SectionTitle>
                <span style={{ color: '#A3AED0', fontSize: '14px' }}>{tasks.filter(t => t.status !== 'completed').length} Pending</span>
            </div>

            {loading ? (
                <ContentPlaceholder>
                   <SpinningIcon><FaSpinner /></SpinningIcon>
                   <p>Loading tasks...</p>
                </ContentPlaceholder>
            ) : tasks.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                    {tasks.map(task => (
                        <div key={task._id} style={{
                            background:'#fff', borderRadius:'16px', padding:'20px', 
                            boxShadow:'0px 5px 15px rgba(112, 144, 176, 0.08)',
                            display:'flex', justifyContent:'space-between', alignItems:'center',
                            borderLeft: `4px solid ${task.priority === 'high' ? '#ff5252' : task.priority === 'medium' ? '#ffab00' : '#448aff'}`
                        }}>
                            <div>
                                <h4 style={{margin:'0 0 5px 0', color:'#2B3674', textDecoration: task.status === 'completed' ? 'line-through' : 'none'}}>{task.title}</h4>
                                <p style={{margin:0, color:'#A3AED0', fontSize:'14px'}}>{task.description}</p>
                                <div style={{marginTop:'10px', display:'flex', gap:'10px'}}>
                                    <Badge bg={task.priority === 'high' ? 'rgba(255, 82, 82, 0.1)' : task.priority === 'medium' ? 'rgba(255, 171, 0, 0.1)' : 'rgba(68, 138, 255, 0.1)'} 
                                           color={task.priority === 'high' ? '#ff5252' : task.priority === 'medium' ? '#ffab00' : '#448aff'}>
                                        {task.priority.toUpperCase()}
                                    </Badge>
                                    {task.dueDate && <span style={{fontSize:'12px', color:'#A3AED0'}}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                                </div>
                            </div>
                            <div>
                                {task.status !== 'completed' ? (
                                    <button onClick={async () => {
                                        try {
                                            await updateTask(task._id, { status: 'completed' });
                                            fetchData();
                                            setSnackbarMessage('Task completed! Great job!');
                                            setOpenSnackbar(true);
                                        } catch(e) { if (import.meta.env.DEV) console.error(e); }
                                    }} style={{
                                        background:'#00C853', color:'#fff', border:'none', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontWeight:'600'
                                    }}>
                                        Mark Done
                                    </button>
                                ) : (
                                    <Badge bg="#E8F5E9" color="#00C853"><FaCheckCircle /> Completed</Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ContentPlaceholder>
                    <FaCheckCircle />
                    <h3>All Caught Up!</h3>
                    <p>You have no pending tasks. Enjoy your day!</p>
                </ContentPlaceholder>
            )}
          </div>
        );

      case 'messages':
        return (
          <div>
            <SectionTitle>Admin Broadcasts & Messages</SectionTitle>

            <div style={{ maxWidth: '800px', marginBottom: '18px', position: 'relative', zIndex: 2 }}>
                <div style={{ fontWeight: 800, color: '#2B3674', marginBottom: '10px' }}>Send message to Admin</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        value={replyForm.title}
                        onChange={(e) => setReplyForm({ ...replyForm, title: e.target.value })}
                        placeholder="Title (optional)"
                        style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: '1px solid #E0E5F2',
                            background: '#fff',
                            color: '#2b3674',
                            outline: 'none',
                            fontSize: '14px',
                            pointerEvents: 'auto'
                        }}
                    />
                    <textarea
                        value={replyForm.message}
                        onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                        placeholder="Write your message to admin..."
                        rows={4}
                        style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: '1px solid #E0E5F2',
                            background: '#fff',
                            color: '#2b3674',
                            outline: 'none',
                            fontSize: '14px',
                            resize: 'vertical',
                            pointerEvents: 'auto'
                        }}
                    />
                    <button
                        onClick={async () => {
                            try {
                                if (!replyForm.message.trim()) {
                                    setSnackbarMessage('Please type a message');
                                    setOpenSnackbar(true);
                                    return;
                                }
                                const userId = user?._id || user?.id;
                                if (!userId) {
                                    setSnackbarMessage('User not found. Please login again.');
                                    setOpenSnackbar(true);
                                    return;
                                }
                                await sendUserMessageToAdmin({
                                    fromUser: userId,
                                    title: replyForm.title,
                                    message: replyForm.message,
                                });
                                setReplyForm({ title: '', message: '' });
                                setSnackbarMessage('Message sent to admin');
                                setOpenSnackbar(true);
                            } catch (err) {
                                if (import.meta.env.DEV) console.error(err);
                                setSnackbarMessage('Failed to send message');
                                setOpenSnackbar(true);
                            }
                        }}
                        style={{
                            padding: '12px 16px',
                            borderRadius: '14px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #4318FF, #9b5cff)',
                            color: 'white',
                            fontWeight: 800,
                            cursor: 'pointer',
                            width: 'fit-content'
                        }}
                    >
                        Send to Admin
                    </button>
                </div>
            </div>
            
            {loading ? (
                <ContentPlaceholder>
                   <SpinningIcon><FaSpinner /></SpinningIcon>
                   <p>Checking for messages...</p>
                </ContentPlaceholder>
            ) : broadcasts.length > 0 ? (
                <div style={{ maxWidth: '800px' }}>
                    {broadcasts.map((msg) => (
                        <MessageCard key={msg._id} type={msg.type}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h4 style={{ margin: 0, color: '#2B3674' }}>{msg.title}</h4>
                                <span style={{ fontSize: '12px', color: '#A3AED0' }}>{new Date(msg.createdAt).toLocaleString()}</span>
                            </div>
                            <p style={{ margin: 0, color: '#707EAE', lineHeight: '1.5' }}>{msg.message}</p>
                        </MessageCard>
                    ))}
                </div>
            ) : (
                <ContentPlaceholder>
                    <FaEnvelope />
                    <h3>No Messages</h3>
                    <p>You're all caught up! No new announcements from the admin.</p>
                </ContentPlaceholder>
            )}
          </div>
        );
      
      case 'settings':
        return (
          <ContentPlaceholder>
            <FaCog />
            <h3>Settings</h3>
            <p>Manage your account preferences here.</p>
          </ContentPlaceholder>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <Snackbar 
        open={openSnackbar} 
        message={snackbarMessage} 
        severity="success" 
        onClose={() => setOpenSnackbar(false)} 
      />
      
      {/* Sidebar */}
      <Sidebar>
        <div>
          <LogoArea>
            <div className="brandRow">
              <span className="brandIcon"><FaRocket /></span>
              <span>ADITYA'S</span>
            </div>
            <div className="subTitle">USER DASHBOARD</div>
          </LogoArea>
          <NavList>
            <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
              <FaHome /> <span>Dashboard</span>
            </NavItem>
            <NavItem active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>
              <FaProjectDiagram /> <span>Projects</span>
            </NavItem>
            <NavItem active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')}>
              <FaCheckCircle /> <span>Tasks</span>
            </NavItem>
            <NavItem active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
              <FaEnvelope /> <span>Messages</span>
            </NavItem>
            <NavItem active={activeTab === 'profile'} onClick={() => { setEditData(user); setIsEditOpen(true); }}>
              <FaUser /> <span>Profile</span>
            </NavItem>
          </NavList>
        </div>
        
        <NavList>
           <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
             <FaCog /> <span>Settings</span>
           </NavItem>
           <NavItem onClick={handleLogout} style={{ color: '#FF5630' }}>
             <FaSignOutAlt /> <span>Logout</span>
           </NavItem>
        </NavList>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Header>
          <WelcomeText>
            <p>Hi {user.name},</p>
            <h1>Welcome to your Dashboard!</h1>
          </WelcomeText>
          
          <HeaderActions>
            <SearchBar>
              <FaSearch color="#4318FF" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>
            {(() => {
              const seenIds = getSeenBroadcastIds();
              const unreadMessages = broadcasts.filter(b => b?._id && !seenIds.includes(b._id));
              const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;
              const notifCount = unreadMessages.length + pendingTasksCount;
              return (
                <div style={{ position: 'relative' }}>
                  <IconButton badgeCount={notifCount} onClick={() => {
                      const next = !isNotifOpen;
                      setIsNotifOpen(next);
                      if (next) markAllBroadcastsSeen();
                  }}>
              <FaBell />
                  </IconButton>

                  {isNotifOpen && (
                    <NotificationDropdown>
                      <NotificationHeader>
                        <h4>Notifications</h4>
                        <button type="button" onClick={() => setIsNotifOpen(false)}>×</button>
                      </NotificationHeader>
                      <NotificationList>
                        <NotificationSectionTitle>NEW TASKS</NotificationSectionTitle>
                        {pendingTasksCount === 0 ? (
                          <NotificationItem>
                            <NotificationBody>No pending tasks.</NotificationBody>
                          </NotificationItem>
                        ) : (
                          tasks.filter(t => t.status !== 'completed').slice(0, 5).map((t) => (
                            <NotificationItem key={t._id}>
                              <NotificationTitle>
                                <span>{t.title}</span>
                                <span style={{ color: '#A3AED0', fontSize: 11 }}>{t.priority?.toUpperCase?.() || ''}</span>
                              </NotificationTitle>
                              <NotificationBody>{t.description}</NotificationBody>
                            </NotificationItem>
                          ))
                        )}

                        <NotificationSectionTitle>NEW MESSAGES</NotificationSectionTitle>
                        {unreadMessages.length === 0 ? (
                          <NotificationItem>
                            <NotificationBody>No new admin messages.</NotificationBody>
                          </NotificationItem>
                        ) : (
                          unreadMessages.slice(0, 5).map((m) => (
                            <NotificationItem key={m._id}>
                              <NotificationTitle>
                                <span>{m.title}</span>
                                <span style={{ color: '#A3AED0', fontSize: 11 }}>{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ''}</span>
                              </NotificationTitle>
                              <NotificationBody>{m.message}</NotificationBody>
                            </NotificationItem>
                          ))
                        )}
                      </NotificationList>
                    </NotificationDropdown>
                  )}
                </div>
              );
            })()}
            <IconButton onClick={() => { setEditData(user); setIsEditOpen(true); }}>
              <FaUser />
            </IconButton>
            <UserAvatar onClick={() => { setEditData(user); setIsEditOpen(true); }}>
              {user.avatar ? <img src={user.avatar} alt="Profile" /> : user.name.charAt(0)}
            </UserAvatar>
          </HeaderActions>
        </Header>

        {renderContent()}
        
      </MainContent>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <ModalOverlay onClick={() => setIsEditOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Edit Profile</h2>
              <CloseButton onClick={() => setIsEditOpen(false)}><FaTimes /></CloseButton>
            </ModalHeader>
            
            <ImageUploadContainer>
                <ImagePreview onClick={() => document.getElementById('profile-upload').click()}>
                    {editData.avatar ? (
                        <img src={editData.avatar} alt="Preview" />
                    ) : (
                        <FaCamera />
                    )}
                </ImagePreview>
                <HiddenInput 
                    id="profile-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />
                <label style={{color: '#4318FF', cursor: 'pointer', fontWeight: '500'}} htmlFor="profile-upload">
                    Change Profile Photo
                </label>
            </ImageUploadContainer>

            <FormGroup>
              <label>Full Name</label>
              <input name="name" value={editData.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Role</label>
              <input name="role" value={editData.role} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Phone</label>
              <input name="phone" value={editData.phone} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Address</label>
              <input name="address" value={editData.address} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>GitHub</label>
              <input name="github" value={editData.github || ''} onChange={handleChange} placeholder="https://github.com/username" />
            </FormGroup>
            <FormGroup>
              <label>Facebook</label>
              <input name="facebook" value={editData.facebook || ''} onChange={handleChange} placeholder="https://facebook.com/..." />
            </FormGroup>
            <FormGroup>
              <label>Resume URL</label>
              <input name="resume" value={editData.resume || ''} onChange={handleChange} placeholder="Google Drive / PDF link" />
            </FormGroup>
            <FormGroup>
              <label>Portfolio URL</label>
              <input name="portfolio" value={editData.portfolio || ''} onChange={handleChange} placeholder="https://your-portfolio.com" />
            </FormGroup>
            
            <SaveButton onClick={handleSaveProfile}><FaSave /> Save Changes</SaveButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default UserDashboard;
