import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaUserLock, FaSearch, FaBell, FaPlus, FaTasks, FaUsers, FaChartLine, FaTrash, FaUserEdit, FaPen, FaCheckCircle, FaBullhorn, FaPaperPlane, FaCode, FaCloudDownloadAlt, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import { projects as defaultProjects, experiences as defaultExperiences, skills as defaultSkills, education as defaultEducation } from '../../data/constants';
import Snackbar from '../Snackbar';
import { 
    fetchUsers, fetchTasks, deleteTask, 
    fetchBio, updateBio, 
    fetchProjects, createProject, updateProject, deleteProject,
    fetchSkills, createSkill, updateSkill, deleteSkill,
    fetchExperience, createExperience, updateExperience, deleteExperience,
    fetchEducation, createEducation, updateEducation, deleteEducation,
    updateUser,
    fetchContacts, fetchAdminInboxMessages, createTask, createBroadcast, updateContact, deleteContact, markAdminInboxMessageSeen
} from '../../utils/api';

const bgShift = keyframes`
  0% { transform: translate3d(-2%, -1%, 0) scale(1); opacity: 0.9; }
  50% { transform: translate3d(2%, 1%, 0) scale(1.03); opacity: 1; }
  100% { transform: translate3d(-2%, -1%, 0) scale(1); opacity: 0.9; }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(120deg, #07070c 0%, #0b0b17 34%, #071425 66%, #07070c 100%);
  position: relative;
  z-index: 1;
  color: #fff;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(900px 520px at 14% 35%, rgba(133, 76, 230, 0.22) 0%, transparent 60%),
      radial-gradient(900px 560px at 55% 88%, rgba(0, 194, 255, 0.18) 0%, transparent 62%),
      radial-gradient(860px 520px at 92% 40%, rgba(255, 122, 224, 0.14) 0%, transparent 58%);
    filter: blur(12px);
    animation: ${bgShift} 14s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(closest-side at 30% 30%, rgba(255,255,255,0.06), transparent 66%),
      radial-gradient(closest-side at 70% 70%, rgba(255,255,255,0.05), transparent 66%);
    mix-blend-mode: overlay;
    opacity: 0.22;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding-bottom: 82px;
  }
`;

const SidebarContainer = styled.div`
  width: ${({ $collapsed }) => ($collapsed ? '92px' : '264px')};
  background:
    radial-gradient(120% 160% at 16% 12%, rgba(133, 76, 230, 0.16), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(0, 194, 255, 0.12), transparent 62%),
    rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 5;
  transition: width 240ms cubic-bezier(0.22, 1, 0.36, 1);
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 200ms ease, visibility 200ms ease;
  z-index: 9998;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileSidebarDrawer = styled.div`
  position: fixed;
  top: 12px;
  bottom: 12px;
  left: 12px;
  width: min(86vw, 320px);
  border-radius: 20px;
  padding: 16px 14px;
  background:
    radial-gradient(120% 160% at 16% 12%, rgba(133, 76, 230, 0.18), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(0, 194, 255, 0.14), transparent 62%),
    rgba(10, 12, 26, 0.78);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 28px 80px rgba(0,0,0,0.65);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-115%)')};
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 9999;
  overflow: hidden;
  @media (min-width: 769px) {
    display: none;
  }
`;

 

const Logo = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(255,255,255,0.92);
  letter-spacing: 1.8px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  span {
    color: #854ce6;
  }
`;

const SidebarToggle = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(133, 76, 230, 0.12);
    border-color: rgba(133, 76, 230, 0.30);
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-right: 2px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)')};
  background: ${({ active }) =>
    active
      ? 'linear-gradient(135deg, rgba(133, 76, 230, 0.95) 0%, rgba(0, 194, 255, 0.75) 100%)'
      : 'transparent'};
  border: 1px solid ${({ active }) => (active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)')};
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease, filter 200ms ease;
  text-align: left;
  width: 100%;
  outline: none;
  box-shadow: ${({ active }) => (active ? '0 18px 44px rgba(133, 76, 230, 0.16)' : 'none')};

  &:hover {
    transform: translateY(-1px);
    background: ${({ active }) =>
      active
        ? 'linear-gradient(135deg, rgba(133, 76, 230, 0.98) 0%, rgba(0, 194, 255, 0.80) 100%)'
        : 'rgba(255,255,255,0.06)'};
    border-color: ${({ active }) => (active ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)')};
    filter: saturate(115%);
  }
  &:active { transform: translateY(0px); }
`;

const MenuLabel = styled.span`
  font-weight: 800;
  letter-spacing: 0.2px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'inline')};
`;

const MenuIcon = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  svg { font-size: 16px; }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: transparent;
  position: relative;
  z-index: 1;
`;

const TopBar = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background: ${({ $scrolled }) =>
    $scrolled
      ? 'rgba(10, 12, 26, 0.66)'
      : 'rgba(10, 12, 26, 0.32)'};
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? '0 18px 48px rgba(0,0,0,0.45), 0 0 26px rgba(133, 76, 230, 0.10)'
      : 'none'};
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 14px;
  @media (max-width: 768px) {
    padding: 10px 14px;
    height: auto;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const TopBarInner = styled.div`
  width: 100%;
  max-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const OnlyMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(133, 76, 230, 0.10);
    border-color: rgba(133, 76, 230, 0.32);
    box-shadow: 0 16px 42px rgba(0,0,0,0.45), 0 0 24px rgba(133, 76, 230, 0.12);
  }
  &:active { transform: translateY(0px); }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  padding: 7px 10px;
  border-radius: 14px;
  flex: 0 1 520px;
  max-width: 520px;
  min-width: 220px;
  box-shadow: 0 18px 48px rgba(0,0,0,0.35);
  transition: border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
  input {
    background: transparent;
    border: none;
    color: #fff;
    margin-left: 10px;
    outline: none;
    width: 100%;
    font-size: 12.5px;
    letter-spacing: 0.2px;
    &::placeholder { color: rgba(255,255,255,0.55); }
  }
  &:focus-within {
    border-color: rgba(0, 194, 255, 0.35);
    background: rgba(0, 194, 255, 0.06);
    box-shadow: 0 20px 58px rgba(0,0,0,0.45), 0 0 24px rgba(0,194,255,0.10);
  }
  @media (max-width: 768px) {
    flex: 1;
    max-width: 100%;
    min-width: 0;
    input {
      width: 100%;
      min-width: 0;
    }
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #fff;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const BellButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(133, 76, 230, 0.10);
    border-color: rgba(133, 76, 230, 0.35);
    transform: translateY(-1px);
  }
`;

const BellBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff5252;
  color: white;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 7px;
  border-radius: 999px;
  border: 2px solid #121212;
`;

const BellDropdown = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  width: 420px;
  max-width: calc(100vw - 40px);
  background: rgba(18,18,18,0.92);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
  backdrop-filter: blur(12px);
  overflow: hidden;
  z-index: 50;
`;

const BellDropdownHeader = styled.div`
  padding: 14px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  h4 {
    margin: 0;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
  }
  span {
    color: #b1b1b1;
    font-size: 12px;
    font-weight: 700;
  }
`;

const BellDropdownList = styled.div`
  max-height: 440px;
  overflow-y: auto;
`;

const BellItem = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: rgba(133, 76, 230, 0.08);
  }
`;

const BellItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;

const BellItemTitle = styled.div`
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const BellDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffab00;
`;

const BellItemMeta = styled.div`
  color: #b1b1b1;
  font-size: 12px;
  text-align: right;
  min-width: 110px;
`;

const BellItemBody = styled.div`
  color: rgba(255,255,255,0.82);
  font-size: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BellItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

const DashboardContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 16px 14px;
  }
`;

const ContentInner = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const Banner = styled.div`
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.92) 0%, rgba(100, 46, 192, 0.92) 45%, rgba(0, 194, 255, 0.50) 100%);
  border-radius: 18px;
  padding: 18px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  box-shadow: 0 26px 74px rgba(0,0,0,0.55), 0 0 44px rgba(133, 76, 230, 0.18);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(10px) saturate(160%);
  -webkit-backdrop-filter: blur(10px) saturate(160%);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

const BannerText = styled.div`
  min-width: 240px;
  h1 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 6px;
  }
  p {
    color: rgba(255, 255, 255, 0.8);
  }
  @media (max-width: 768px) {
    h1 { font-size: 20px; }
    p { font-size: 13px; }
  }
`;

const BannerActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    > button {
      flex: 1 1 160px;
      justify-content: center;
    }
  }
`;

const CreateButton = styled.button`
  background: rgba(255,255,255,0.92);
  color: rgba(10, 12, 26, 0.92);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 9px 12px;
  border-radius: 14px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  font-size: 12.5px;
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 16px 40px rgba(0,0,0,0.28);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 54px rgba(0,0,0,0.38);
    filter: brightness(1.02);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  margin-top: -44px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 14px;
    gap: 14px;
  }
`;

const StatCard = styled.div`
  background:
    radial-gradient(120% 160% at 16% 12%, rgba(133, 76, 230, 0.14), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(0, 194, 255, 0.10), transparent 62%),
    rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 18px;
  padding: 18px 18px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.46);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, filter 220ms ease;
  min-height: 108px;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 194, 255, 0.18);
    box-shadow: 0 30px 78px rgba(0, 0, 0, 0.54), 0 0 26px rgba(0, 194, 255, 0.10);
    filter: saturate(115%);
  }

  @media (max-width: 768px) {
    padding: 16px 16px;
    min-height: 96px;
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 13px;
    color: #b1b1b1;
    margin-bottom: 6px;
  }
  h2 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 6px;
  }
  span {
    font-size: 11px;
    color: #00c853;
  }
`;

const StatIcon = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.24) 0%, rgba(0, 194, 255, 0.18) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.92);
  font-size: 20px;
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 14px 34px rgba(0,0,0,0.32);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: rgba(255,255,255,0.94);
  margin-bottom: 12px;
  letter-spacing: -0.2px;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const TableContainer = styled.div`
  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 24px 70px rgba(0,0,0,0.45);
  @media (max-width: 768px) {
    padding: 14px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 16px;
    color: #b1b1b1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    white-space: nowrap;
  }
  
  td {
    padding: 16px;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  tr:last-child td {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    min-width: 900px;
  }
`;

const CompactTableContainer = styled(TableContainer)`
  overflow-x: hidden;
`;

const CompactTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th {
    text-align: left;
    padding: 12px 14px;
    color: #b1b1b1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td {
    padding: 12px 14px;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  background: ${({ bg }) => bg || '#333'};
  color: ${({ color }) => color || '#fff'};
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MobileCard = styled.div`
  background:
    radial-gradient(120% 160% at 16% 12%, rgba(133, 76, 230, 0.12), transparent 60%),
    radial-gradient(140% 180% at 86% 86%, rgba(0, 194, 255, 0.10), transparent 62%),
    rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 24px 62px rgba(0,0,0,0.45);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
`;

const MobileCardTitle = styled.div`
  color: rgba(255,255,255,0.95);
  font-weight: 900;
  font-size: 14px;
  letter-spacing: -0.1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileCardSub = styled.div`
  color: rgba(255,255,255,0.62);
  font-weight: 700;
  font-size: 12px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileCardRows = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
`;

const MobileRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`;

const MobileRowLabel = styled.div`
  color: rgba(255,255,255,0.55);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

const MobileRowValue = styled.div`
  color: rgba(255,255,255,0.86);
  font-size: 12px;
  font-weight: 800;
  text-align: right;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  background: #1c1c2e;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid rgba(133, 76, 230, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: calc(100vh - 120px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 768px) {
    padding: 18px;
    border-radius: 14px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #fff;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #b1b1b1;
  font-size: 24px;
  cursor: pointer;
  &:hover { color: #fff; }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: #b1b1b1;
  font-size: 14px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  outline: none;
  &:focus { border-color: #854ce6; }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  outline: none;
  &:focus { border-color: #854ce6; }
  option { background: #1c1c2e; }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  outline: none;
  min-height: 100px;
  resize: vertical;
  &:focus { border-color: #854ce6; }
`;

const ActionButton = styled.button`
  background: #854ce6;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
  &:hover { background: #7b45d6; }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#854ce6' : '#b1b1b1')};
  border-bottom: 2px solid ${({ active }) => (active ? '#854ce6' : 'transparent')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  transition: all 0.3s ease;
  &:hover {
    color: #fff;
  }
`;

const SkillCard = styled.div`
  width: 100%;
  background: #1c1c2e;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  border-radius: 16px;
  padding: 18px 36px;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 42px rgba(0,0,0,0.35);
    border: 1px solid #854ce6;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255,255,255,0.05);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.1);
    border-color: #854ce6;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = React.useState('Dashboard');
  const [activeProfileTab, setActiveProfileTab] = React.useState('Bio');
  const profileImageInputRef = React.useRef(null);
  const userAvatarInputRef = React.useRef(null);
  
  // Data States
  const [users, setUsers] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [experience, setExperience] = React.useState([]);
  const [education, setEducation] = React.useState([]);
  const [stats, setStats] = React.useState({ users: 0, tasks: 0, completed: 0, projects: 0 });
  
    // Modals
    const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
    const [isBroadcastModalOpen, setIsBroadcastModalOpen] = React.useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = React.useState(false);
    const [isExpModalOpen, setIsExpModalOpen] = React.useState(false);
    const [isEduModalOpen, setIsEduModalOpen] = React.useState(false);
    const [isUserDetailModalOpen, setIsUserDetailModalOpen] = React.useState(false);
  
    // Forms
  const [taskForm, setTaskForm] = React.useState({ title: '', description: '', assignedTo: '', priority: 'medium', dueDate: '' });
  const [broadcastForm, setBroadcastForm] = React.useState({ title: '', message: '', type: 'info', targetUser: '' });
  const [adminProfile, setAdminProfile] = React.useState({ name: '', roles: [], description: '', email: '', phone: '', image: '', github: '', resume: '', linkedin: '', twitter: '', insta: '', facebook: '' });
  const [projectForm, setProjectForm] = React.useState({ title: '', description: '', image: '', tags: [], category: '', github: '', webapp: '', member: [] });
  const [skillForm, setSkillForm] = React.useState({ title: '', skills: [] }); // Category + Skills
  const [skillItemForm, setSkillItemForm] = React.useState({ name: '', image: '' }); // Single skill item
  const [expForm, setExpForm] = React.useState({ role: '', company: '', date: '', desc: '', skills: [], doc: '', img: '' });
  const [eduForm, setEduForm] = React.useState({ school: '', degree: '', date: '', grade: '', desc: '', img: '' });

  const [editingSkillId, setEditingSkillId] = React.useState(null);
  const [editingExpId, setEditingExpId] = React.useState(null);
  const [editingEduId, setEditingEduId] = React.useState(null);
  const [editingProjectId, setEditingProjectId] = React.useState(null);

  const [deleteConfirmation, setDeleteConfirmation] = React.useState({ open: false, type: '', id: '' });
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [isContactDetailModalOpen, setIsContactDetailModalOpen] = React.useState(false);

  const [adminInbox, setAdminInbox] = React.useState([]);
  const [isBellOpen, setIsBellOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [topbarScrolled, setTopbarScrolled] = React.useState(false);
  const contentRef = React.useRef(null);
  
  // Snackbar
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const allowed = localStorage.getItem('isAdmin') === 'true';
    if (!allowed) navigate('/admin', { replace: true });
    loadData();
  }, [navigate]);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w > 768) setMobileSidebarOpen(false);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [currentView]);

  const loadData = async () => {
    try {
        const [usersRes, tasksRes, bioRes, projectsRes, skillsRes, expRes, eduRes, contactsRes, inboxRes] = await Promise.all([
            fetchUsers(),
            fetchTasks(),
            fetchBio(),
            fetchProjects(),
            fetchSkills(),
            fetchExperience(),
            fetchEducation(),
            fetchContacts(),
            fetchAdminInboxMessages()
        ]);

        setUsers(usersRes.data);
        setTasks(tasksRes.data);
        if(bioRes.data) setAdminProfile(bioRes.data);
        setContacts(Array.isArray(contactsRes.data) ? contactsRes.data : []);
        setAdminInbox(Array.isArray(inboxRes.data) ? inboxRes.data : []);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
        setExperience(expRes.data);
        setEducation(eduRes.data);

        // Calculate Stats
        const totalTasks = tasksRes.data.length;
        const completedTasks = tasksRes.data.filter(t => t.status === 'completed').length;
        setStats({
            users: usersRes.data.length,
            tasks: totalTasks,
            completed: completedTasks,
            projects: projectsRes.data.length
        });
    } catch (err) {
        if (import.meta.env.DEV) console.error(err);
        setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
    }
  };

  const handleConfirmDelete = async () => {
      const { type, id } = deleteConfirmation;
      try {
          if (type === 'project') await deleteProject(id);
          if (type === 'skill') await deleteSkill(id);
          if (type === 'experience') await deleteExperience(id);
          if (type === 'education') await deleteEducation(id);
          if (type === 'task') await deleteTask(id);
          
          setSnackbar({ open: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`, severity: 'success' });
          loadData();
      } catch (err) {
          setSnackbar({ open: true, message: `Failed to delete ${type}`, severity: 'error' });
      } finally {
          setDeleteConfirmation({ open: false, type: '', id: '' });
      }
  };

  const handleCreateTask = async () => {
    try {
        const payload = { ...taskForm, assignedTo: taskForm.assignedTo || null }; // null = unassigned/all? No, let's enforce user or handle broadcast separately. 
        // For now, let's say assignedTo is required for specific task, or if empty -> maybe a pool? 
        // Let's assume assignedTo is required for direct task assignment.
        if(!payload.assignedTo) {
            setSnackbar({ open: true, message: 'Please select a user', severity: 'warning' });
            return;
        }
        await createTask(payload);
        setSnackbar({ open: true, message: 'Task assigned successfully', severity: 'success' });
        setIsTaskModalOpen(false);
        loadData();
    } catch (err) {
        setSnackbar({ open: true, message: 'Failed to assign task', severity: 'error' });
    }
  };

  const handleSendBroadcast = async () => {
    try {
        const payload = { ...broadcastForm, targetUser: broadcastForm.targetUser || null };
        await createBroadcast(payload);
        setSnackbar({ open: true, message: 'Broadcast sent successfully', severity: 'success' });
        setIsBroadcastModalOpen(false);
    } catch (err) {
        setSnackbar({ open: true, message: 'Failed to send broadcast', severity: 'error' });
    }
  };

  const handleAdminProfileUpdate = async () => {
      try {
          await updateBio(adminProfile);
          setSnackbar({ open: true, message: 'Admin profile updated', severity: 'success' });
          setIsEditProfileOpen(false);
          loadData();
      } catch (err) {
          setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
      }
  };

  const handleSaveProject = async () => {
      try {
          if (editingProjectId) {
              await updateProject(editingProjectId, projectForm);
              setSnackbar({ open: true, message: 'Project updated successfully', severity: 'success' });
          } else {
              await createProject(projectForm);
              setSnackbar({ open: true, message: 'Project created successfully', severity: 'success' });
          }
          setIsProjectModalOpen(false);
          setEditingProjectId(null);
          setProjectForm({ title: '', description: '', image: '', tags: [], category: '', github: '', webapp: '', member: [] });
          loadData();
      } catch (err) {
          setSnackbar({ open: true, message: 'Failed to save project', severity: 'error' });
      }
  };

  const handleEditProject = (project) => {
      setProjectForm({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags,
          category: project.category,
          github: project.github,
          webapp: project.webapp,
          member: project.member
      });
      setEditingProjectId(project._id);
      setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id) => setDeleteConfirmation({ open: true, type: 'project', id });
  const handleDeleteSkill = (id) => setDeleteConfirmation({ open: true, type: 'skill', id });
  const handleDeleteExp = (id) => setDeleteConfirmation({ open: true, type: 'experience', id });
  const handleDeleteEdu = (id) => setDeleteConfirmation({ open: true, type: 'education', id });
  const handleDeleteTask = (id) => setDeleteConfirmation({ open: true, type: 'task', id });

  const handleSeedSkills = async () => {
      try {
          if(window.confirm('This will load default skills from constants.js. Continue?')) {
            for (const skillCat of defaultSkills) {
                await createSkill(skillCat);
            }
            setSnackbar({ open: true, message: 'Default skills loaded', severity: 'success' });
            loadData();
          }
      } catch (err) {
          setSnackbar({ open: true, message: 'Failed to load skills', severity: 'error' });
      }
  };

  const handleSeedExperience = async () => {
      try {
          if (window.confirm('This will load default experience items from constants.js. Continue?')) {
              for (const exp of defaultExperiences) {
                  await createExperience(exp);
              }
              setSnackbar({ open: true, message: 'Default experience loaded', severity: 'success' });
              loadData();
          }
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to load experience', severity: 'error' });
      }
  };

  const handleSeedEducation = async () => {
      try {
          if (window.confirm('This will load default education items from constants.js. Continue?')) {
              for (const edu of defaultEducation) {
                  await createEducation(edu);
              }
              setSnackbar({ open: true, message: 'Default education loaded', severity: 'success' });
              loadData();
          }
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to load education', severity: 'error' });
      }
  };

  const handleSeedProjects = async () => {
      try {
          if (window.confirm('This will load default projects from constants.js. Continue?')) {
              for (const project of defaultProjects) {
                  await createProject(project);
              }
              setSnackbar({ open: true, message: 'Default projects loaded', severity: 'success' });
              loadData();
          }
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to load projects', severity: 'error' });
      }
  };

  const handleSaveSkill = async () => {
      try {
          if (editingSkillId) {
              await updateSkill(editingSkillId, skillForm);
              setSnackbar({ open: true, message: 'Skill updated successfully', severity: 'success' });
          } else {
              await createSkill(skillForm);
              setSnackbar({ open: true, message: 'Skill created successfully', severity: 'success' });
          }
          setIsSkillModalOpen(false);
          setEditingSkillId(null);
          setSkillForm({ title: '', skills: [] });
          loadData();
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to save skill', severity: 'error' });
      }
  };

  const handleSaveExperience = async () => {
      try {
          const payload = {
              ...expForm,
              skills: Array.isArray(expForm.skills) ? expForm.skills : expForm.skills.split(',').map(s => s.trim())
          };
          
          if (editingExpId) {
              await updateExperience(editingExpId, payload);
              setSnackbar({ open: true, message: 'Experience updated successfully', severity: 'success' });
          } else {
              await createExperience(payload);
              setSnackbar({ open: true, message: 'Experience created successfully', severity: 'success' });
          }
          setIsExpModalOpen(false);
          setEditingExpId(null);
          setExpForm({ role: '', company: '', date: '', desc: '', skills: [], doc: '', img: '' });
          loadData();
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to save experience', severity: 'error' });
      }
  };

  const handleSaveEducation = async () => {
      try {
          if (editingEduId) {
              await updateEducation(editingEduId, eduForm);
              setSnackbar({ open: true, message: 'Education updated successfully', severity: 'success' });
          } else {
              await createEducation(eduForm);
              setSnackbar({ open: true, message: 'Education created successfully', severity: 'success' });
          }
          setIsEduModalOpen(false);
          setEditingEduId(null);
          setEduForm({ school: '', degree: '', date: '', grade: '', desc: '', img: '' });
          loadData();
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to save education', severity: 'error' });
      }
  };

  const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsUserDetailModalOpen(true);
    };

  const handleSaveSelectedUser = async () => {
      try {
          if (!selectedUser?._id) return;
          const res = await updateUser(selectedUser._id, {
              name: selectedUser.name,
              role: selectedUser.role,
              status: selectedUser.status,
              phone: selectedUser.phone,
              specialization: selectedUser.specialization,
              branch: selectedUser.branch,
              course: selectedUser.course,
              address: selectedUser.address,
              avatar: selectedUser.avatar,
          });
          if (res?.data) setSelectedUser({ ...selectedUser, ...res.data });
          setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
          loadData();
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
      }
  };

  const handleApproveRejectSelectedUser = async (nextStatus) => {
      try {
          if (!selectedUser?._id) return;
          const res = await updateUser(selectedUser._id, { status: nextStatus });
          if (res?.data) setSelectedUser({ ...selectedUser, ...res.data });
          setSnackbar({ open: true, message: `User ${nextStatus}`, severity: 'success' });
          loadData();
      } catch (err) {
          if (import.meta.env.DEV) console.error(err);
          setSnackbar({ open: true, message: 'Failed to update user status', severity: 'error' });
      }
  };

    const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return (
          <>
            <Banner>
              <BannerText>
                <h1>Admin Dashboard</h1>
                <p>Manage users, tasks, and system broadcasts.</p>
              </BannerText>
              <BannerActions>
                <CreateButton onClick={() => setIsBroadcastModalOpen(true)}>
                    <FaBullhorn /> Broadcast
                </CreateButton>
                <CreateButton onClick={() => setIsTaskModalOpen(true)}>
                    <FaPlus /> Assign Task
                </CreateButton>
              </BannerActions>
            </Banner>

            <StatsGrid>
              <StatCard onClick={() => setCurrentView('Teams')} style={{ cursor: 'pointer' }}>
                <StatInfo>
                  <h3>Total Users</h3>
                  <h2>{stats.users}</h2>
                  <span>Active Members</span>
                </StatInfo>
                <StatIcon><FaUsers /></StatIcon>
              </StatCard>
              <StatCard onClick={() => setCurrentView('Tasks')} style={{ cursor: 'pointer' }}>
                <StatInfo>
                  <h3>Total Tasks</h3>
                  <h2>{stats.tasks}</h2>
                  <span>Assigned</span>
                </StatInfo>
                <StatIcon><FaTasks /></StatIcon>
              </StatCard>
              <StatCard onClick={() => setCurrentView('Tasks')} style={{ cursor: 'pointer' }}>
                <StatInfo>
                  <h3>Completed</h3>
                  <h2>{stats.completed}</h2>
                  <span style={{ color: '#00c853' }}>Tasks Done</span>
                </StatInfo>
                <StatIcon><FaCheckCircle /></StatIcon>
              </StatCard>
              <StatCard onClick={() => setCurrentView('Tasks')} style={{ cursor: 'pointer' }}>
                <StatInfo>
                  <h3>Completion Rate</h3>
                  <h2>{stats.tasks ? Math.round((stats.completed / stats.tasks) * 100) : 0}%</h2>
                  <span>Productivity</span>
                </StatInfo>
                <StatIcon><FaChartLine /></StatIcon>
              </StatCard>
            </StatsGrid>

            <SectionGrid>
                <div>
                    <SectionTitle>Recent Users</SectionTitle>
                    <DesktopOnly>
                      <CompactTableContainer>
                          <CompactTable>
                              <colgroup>
                                <col style={{ width: '48%' }} />
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '30%' }} />
                              </colgroup>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Role</th>
                                      <th>Tasks</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {users.slice(0, 5).map(user => (
                                      <tr key={user._id}>
                                          <td>{user.name}</td>
                                          <td>{user.role}</td>
                                          <td>
                                              <Badge bg={user.tasks?.pending > 0 ? '#ffab00' : '#00c853'}>
                                                  {user.tasks?.completed}/{user.tasks?.total} Done
                                              </Badge>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </CompactTable>
                      </CompactTableContainer>
                    </DesktopOnly>
                    <MobileOnly>
                      <MobileCards>
                        {users.slice(0, 5).map((user) => (
                          <MobileCard key={user._id} onClick={() => handleViewUser(user)} style={{ cursor: 'pointer' }}>
                            <MobileCardTitle>{user.name}</MobileCardTitle>
                            <MobileCardSub>{user.role || 'Member'}</MobileCardSub>
                            <MobileCardRows>
                              <MobileRow>
                                <MobileRowLabel>Tasks</MobileRowLabel>
                                <MobileRowValue>
                                  <Badge bg={user.tasks?.pending > 0 ? 'rgba(255,171,0,0.18)' : 'rgba(0,200,83,0.16)'} color={user.tasks?.pending > 0 ? '#ffab00' : '#00c853'}>
                                    {user.tasks?.completed}/{user.tasks?.total} Done
                                  </Badge>
                                </MobileRowValue>
                              </MobileRow>
                            </MobileCardRows>
                          </MobileCard>
                        ))}
                      </MobileCards>
                    </MobileOnly>
                </div>
                <div>
                    <SectionTitle>Recent Tasks</SectionTitle>
                    <DesktopOnly>
                      <CompactTableContainer>
                          <CompactTable>
                              <colgroup>
                                <col style={{ width: '44%' }} />
                                <col style={{ width: '33%' }} />
                                <col style={{ width: '23%' }} />
                              </colgroup>
                              <thead>
                                  <tr>
                                      <th>Task</th>
                                      <th>Assigned To</th>
                                      <th>Status</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {tasks.slice(0, 5).map(task => (
                                      <tr key={task._id}>
                                          <td>{task.title}</td>
                                          <td>{task.assignedTo?.name || 'Unassigned'}</td>
                                          <td>
                                              <Badge bg={task.status === 'completed' ? '#00c853' : task.status === 'in_progress' ? '#2979ff' : '#ffab00'}>
                                                  {task.status}
                                              </Badge>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </CompactTable>
                      </CompactTableContainer>
                    </DesktopOnly>
                    <MobileOnly>
                      <MobileCards>
                        {tasks.slice(0, 5).map((task) => (
                          <MobileCard key={task._id}>
                            <MobileCardTitle>{task.title}</MobileCardTitle>
                            <MobileCardSub>{task.assignedTo?.name || 'Unassigned'}</MobileCardSub>
                            <MobileCardRows>
                              <MobileRow>
                                <MobileRowLabel>Status</MobileRowLabel>
                                <MobileRowValue>
                                  <Badge bg={task.status === 'completed' ? 'rgba(0,200,83,0.16)' : task.status === 'in_progress' ? 'rgba(41,121,255,0.18)' : 'rgba(255,171,0,0.18)'} color={task.status === 'completed' ? '#00c853' : task.status === 'in_progress' ? '#7bb6ff' : '#ffab00'}>
                                    {task.status}
                                  </Badge>
                                </MobileRowValue>
                              </MobileRow>
                            </MobileCardRows>
                          </MobileCard>
                        ))}
                      </MobileCards>
                    </MobileOnly>
                </div>
            </SectionGrid>

            <div style={{ marginTop: '20px' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                    <SectionTitle>Team Members</SectionTitle>
                    <div style={{color:'#b1b1b1', fontSize:'13px'}}>
                        Approved: {users.filter(u => u.status === 'approved').length} | Pending: {users.filter(u => u.status === 'pending').length}
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px'}}>
                    {users.filter(u => u.status === 'approved').slice(0, 8).map((u) => (
                        <div
                            key={u._id}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '14px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onClick={() => handleViewUser(u)}
                        >
                            <div style={{
                                width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden',
                                background: 'linear-gradient(135deg, #854ce6, #00c2ff)',
                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800
                            }}>
                                {u.avatar ? (
                                    <img src={u.avatar} alt="avatar" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                                ) : (
                                    u.name?.charAt(0)?.toUpperCase()
                                )}
                            </div>
                            <div style={{flex: 1, minWidth: 0}}>
                                <div style={{color:'#fff', fontWeight: 800, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{u.name}</div>
                                <div style={{color:'#b1b1b1', fontSize:'12px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{u.email}</div>
                                <div style={{marginTop:'8px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
                                    <Badge bg="rgba(133, 76, 230, 0.12)" color="#c9b7ff">{(u.role || 'member').toUpperCase()}</Badge>
                                    <Badge bg="rgba(0, 200, 83, 0.12)" color="#00c853">APPROVED</Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </>
        );
      case 'Teams': // Users
        return (
            <div>
                <div style={{display:'flex', justifyContent:'space-between', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
                    <SectionTitle>User Management</SectionTitle>
                    <CreateButton onClick={() => setIsBroadcastModalOpen(true)}><FaPaperPlane /> Message User</CreateButton>
                </div>
                <DesktopOnly>
                  <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Contact</th>
                                <th>Security</th>
                                <th>Details</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Tasks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                    <td>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%', 
                                                background: 'linear-gradient(135deg, #854ce6, #642ec0)',
                                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 'bold', fontSize: '16px'
                                            }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{fontWeight: '600', color: '#fff'}}>{user.name}</div>
                                                <div style={{fontSize: '12px', color: '#b1b1b1'}}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{color: '#b1b1b1', fontSize: '13px'}}>{user.phone || 'N/A'}</div>
                                    </td>
                                    <td>
                                        <div style={{
                                            background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '6px', 
                                            fontFamily: 'monospace', color: '#ff6b6b', fontSize: '12px', 
                                            maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            cursor: 'pointer', border: '1px solid rgba(255, 82, 82, 0.2)'
                                        }} title={user.password} onClick={() => navigator.clipboard.writeText(user.password)}>
                                            {user.password.substring(0, 15)}...
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer'}} onClick={() => handleViewUser(user)}>
                                            {user.branch && <Badge bg="rgba(133, 76, 230, 0.1)" color="#b1b1b1" style={{fontSize: '10px', width: 'fit-content'}}>{user.branch}</Badge>}
                                            {user.course && <span style={{fontSize: '11px', color: '#b1b1b1'}}>{user.course}</span>}
                                            {user.address && <span style={{fontSize: '11px', color: '#757575', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={user.address}>{user.address}</span>}
                                            <div style={{fontSize: '10px', color: '#854ce6', fontWeight: 'bold'}}>View Full Profile {'>'}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg={user.role === 'admin' ? 'rgba(255, 82, 82, 0.1)' : 'rgba(0, 200, 83, 0.1)'} 
                                               color={user.role === 'admin' ? '#ff5252' : '#00c853'}>
                                            {user.role.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge
                                            bg={user.status === 'approved' ? 'rgba(0, 200, 83, 0.12)' : user.status === 'rejected' ? 'rgba(255, 82, 82, 0.12)' : 'rgba(255, 171, 0, 0.12)'}
                                            color={user.status === 'approved' ? '#00c853' : user.status === 'rejected' ? '#ff5252' : '#ffab00'}
                                        >
                                            {(user.status || 'pending').toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                            <div style={{flex:1, height:'6px', background:'rgba(255,255,255,0.1)', borderRadius:'3px', minWidth:'60px'}}>
                                                <div style={{
                                                    width: `${user.tasks?.total ? (user.tasks.completed/user.tasks.total)*100 : 0}%`, 
                                                    height:'100%', background: user.tasks?.total === user.tasks?.completed && user.tasks?.total > 0 ? '#00c853' : '#2979ff', borderRadius:'3px'
                                                }}/>
                                            </div>
                                            <span style={{fontSize: '11px', color: '#b1b1b1'}}>{user.tasks?.completed}/{user.tasks?.total}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => {
                                                setTaskForm({ ...taskForm, assignedTo: user._id });
                                                setIsTaskModalOpen(true);
                                            }}
                                            style={{
                                                background:'rgba(133, 76, 230, 0.1)', border:'1px solid #854ce6', color:'#854ce6', 
                                                borderRadius:'6px', padding:'6px 12px', cursor:'pointer', fontSize: '12px', fontWeight: '600',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => { e.target.style.background = '#854ce6'; e.target.style.color = '#fff'; }}
                                            onMouseOut={(e) => { e.target.style.background = 'rgba(133, 76, 230, 0.1)'; e.target.style.color = '#854ce6'; }}
                                        >
                                            Assign Task
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                  </TableContainer>
                </DesktopOnly>

                <MobileOnly>
                  <MobileCards>
                    {users.map((user) => (
                      <MobileCard key={user._id} onClick={() => handleViewUser(user)} style={{ cursor: 'pointer' }}>
                        <MobileCardTitle>{user.name}</MobileCardTitle>
                        <MobileCardSub>{user.email}</MobileCardSub>
                        <MobileCardRows>
                          <MobileRow>
                            <MobileRowLabel>Role</MobileRowLabel>
                            <MobileRowValue>
                              <Badge bg={user.role === 'admin' ? 'rgba(255, 82, 82, 0.14)' : 'rgba(0, 200, 83, 0.12)'} color={user.role === 'admin' ? '#ff5252' : '#00c853'}>
                                {(user.role || 'member').toUpperCase()}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Status</MobileRowLabel>
                            <MobileRowValue>
                              <Badge
                                bg={user.status === 'approved' ? 'rgba(0, 200, 83, 0.12)' : user.status === 'rejected' ? 'rgba(255, 82, 82, 0.12)' : 'rgba(255, 171, 0, 0.12)'}
                                color={user.status === 'approved' ? '#00c853' : user.status === 'rejected' ? '#ff5252' : '#ffab00'}
                              >
                                {(user.status || 'pending').toUpperCase()}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Tasks</MobileRowLabel>
                            <MobileRowValue>
                              <Badge bg="rgba(255,255,255,0.06)" color="rgba(255,255,255,0.9)">
                                {user.tasks?.completed}/{user.tasks?.total}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                        </MobileCardRows>
                      </MobileCard>
                    ))}
                  </MobileCards>
                </MobileOnly>
            </div>
        );

      case 'Contacts':
        return (
            <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                    <SectionTitle>Contact Messages</SectionTitle>
                    <div style={{color:'#b1b1b1', fontSize:'13px'}}>
                        Total: {contacts.length} | Unseen: {contacts.filter(c => !c.seen).length}
                    </div>
                </div>

                <DesktopOnly>
                  <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>From</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c) => (
                                <tr key={c._id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                    <td>
                                        <Badge bg={c.seen ? 'rgba(0, 200, 83, 0.12)' : 'rgba(255, 171, 0, 0.12)'} color={c.seen ? '#00c853' : '#ffab00'}>
                                            {c.seen ? 'Seen' : 'New'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                                            <div style={{color:'#fff', fontWeight: 700}}>{c.from_name || 'Unknown'}</div>
                                            <div style={{color:'#b1b1b1', fontSize:'12px'}}>{c.from_email || '-'}</div>
                                            {c.user_type && (
                                                <div style={{fontSize:'11px', color:'#854ce6', fontWeight:'bold'}}>{c.user_type}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{color:'#fff'}}>{c.subject || '-'}</td>
                                    <td>
                                        <div style={{color:'#b1b1b1', fontSize:'13px', maxWidth:'420px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}} title={c.message}>
                                            {c.message}
                                        </div>
                                    </td>
                                    <td style={{color:'#b1b1b1', fontSize:'13px'}}>
                                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}
                                    </td>
                                    <td>
                                        <div style={{display:'flex', gap:'10px', justifyContent:'flex-end', alignItems:'center', flexWrap:'wrap'}}>
                                            <button
                                                onClick={async () => {
                                                    setSelectedContact(c);
                                                    setIsContactDetailModalOpen(true);
                                                    try {
                                                        if (!c.seen) {
                                                            await updateContact(c._id, { seen: true });
                                                            loadData();
                                                        }
                                                    } catch (err) {
                                                        if (import.meta.env.DEV) console.error(err);
                                                    }
                                                }}
                                                style={{background:'rgba(133, 76, 230, 0.10)', border:'1px solid rgba(133, 76, 230, 0.35)', color:'#c9b7ff', borderRadius:'8px', padding:'8px 10px', cursor:'pointer'}}
                                            >
                                                See more
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await updateContact(c._id, { seen: !c.seen });
                                                        setSnackbar({ open: true, message: c.seen ? 'Marked as new' : 'Marked as seen', severity: 'success' });
                                                        loadData();
                                                    } catch (err) {
                                                        if (import.meta.env.DEV) console.error(err);
                                                        setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
                                                    }
                                                }}
                                                style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', borderRadius:'8px', padding:'8px 10px', cursor:'pointer'}}
                                            >
                                                {c.seen ? 'Unsee' : 'Seen'}
                                            </button>

                                            <a
                                                href={`mailto:${c.from_email || ''}?subject=${encodeURIComponent('Re: ' + (c.subject || 'Message'))}&body=${encodeURIComponent(`Hi ${c.from_name || ''},\n\n\n---\nYour message:\n${c.message || ''}\n`)}`}
                                                style={{textDecoration:'none'}}
                                                onClick={async () => {
                                                    try {
                                                        if (!c.seen) {
                                                            await updateContact(c._id, { seen: true });
                                                            loadData();
                                                        }
                                                    } catch (err) {
                                                        if (import.meta.env.DEV) console.error(err);
                                                    }
                                                }}
                                            >
                                                <button
                                                    style={{background:'rgba(133, 76, 230, 0.15)', border:'1px solid rgba(133, 76, 230, 0.5)', color:'#c9b7ff', borderRadius:'8px', padding:'8px 10px', cursor:'pointer'}}
                                                >
                                                    Reply
                                                </button>
                                            </a>

                                            <FaTrash
                                                style={{color:'#ff5252', cursor:'pointer'}}
                                                onClick={async () => {
                                                    try {
                                                        if (!window.confirm('Delete this message?')) return;
                                                        await deleteContact(c._id);
                                                        setSnackbar({ open: true, message: 'Message deleted', severity: 'success' });
                                                        loadData();
                                                    } catch (err) {
                                                        if (import.meta.env.DEV) console.error(err);
                                                        setSnackbar({ open: true, message: 'Failed to delete message', severity: 'error' });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                  </TableContainer>
                </DesktopOnly>

                <MobileOnly>
                  <MobileCards>
                    {contacts.map((c) => (
                      <MobileCard
                        key={c._id}
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                          setSelectedContact(c);
                          setIsContactDetailModalOpen(true);
                          try {
                            if (!c.seen) {
                              await updateContact(c._id, { seen: true });
                              loadData();
                            }
                          } catch (err) {
                            if (import.meta.env.DEV) console.error(err);
                          }
                        }}
                      >
                        <MobileCardTitle>{c.subject || 'Message'}</MobileCardTitle>
                        <MobileCardSub>{c.from_name || 'Unknown'}{c.from_email ? ` · ${c.from_email}` : ''}</MobileCardSub>
                        <MobileCardRows>
                          <MobileRow>
                            <MobileRowLabel>Status</MobileRowLabel>
                            <MobileRowValue>
                              <Badge bg={c.seen ? 'rgba(0, 200, 83, 0.12)' : 'rgba(255, 171, 0, 0.12)'} color={c.seen ? '#00c853' : '#ffab00'}>
                                {c.seen ? 'Seen' : 'New'}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Date</MobileRowLabel>
                            <MobileRowValue>{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Message</MobileRowLabel>
                            <MobileRowValue title={c.message || ''}>{c.message || '-'}</MobileRowValue>
                          </MobileRow>
                        </MobileCardRows>
                        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedContact(c);
                              setIsContactDetailModalOpen(true);
                            }}
                            style={{ background: 'rgba(133, 76, 230, 0.12)', border: '1px solid rgba(133, 76, 230, 0.35)', color: '#c9b7ff', borderRadius: 12, padding: '10px 12px', cursor: 'pointer', fontWeight: 900, flex: 1 }}
                          >
                            See more
                          </button>
                          <a
                            href={`mailto:${c.from_email || ''}?subject=${encodeURIComponent('Re: ' + (c.subject || 'Message'))}&body=${encodeURIComponent(`Hi ${c.from_name || ''},\n\n\n---\nYour message:\n${c.message || ''}\n`)}`}
                            style={{ textDecoration: 'none', flex: 1 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                if (!c.seen) {
                                  await updateContact(c._id, { seen: true });
                                  loadData();
                                }
                              } catch (err) {
                                if (import.meta.env.DEV) console.error(err);
                              }
                            }}
                          >
                            <button
                              type="button"
                              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 12, padding: '10px 12px', cursor: 'pointer', fontWeight: 900 }}
                            >
                              Reply
                            </button>
                          </a>
                        </div>
                      </MobileCard>
                    ))}
                  </MobileCards>
                </MobileOnly>
            </div>
        );
      case 'Tasks':
        return (
            <div>
                <div style={{display:'flex', justifyContent:'space-between', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
                    <SectionTitle>Task Management</SectionTitle>
                    <CreateButton onClick={() => setIsTaskModalOpen(true)}><FaPlus /> New Task</CreateButton>
                </div>
                <DesktopOnly>
                  <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Task Title</th>
                                <th>Assigned To</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task._id}>
                                    <td>
                                        <div style={{fontWeight:'bold'}}>{task.title}</div>
                                        <div style={{fontSize:'12px', color:'#b1b1b1'}}>{task.description}</div>
                                    </td>
                                    <td>{task.assignedTo?.name || 'Unassigned'}</td>
                                    <td>
                                        <Badge bg={task.priority === 'high' ? 'rgba(255, 82, 82, 0.2)' : task.priority === 'medium' ? 'rgba(255, 171, 0, 0.2)' : 'rgba(68, 138, 255, 0.2)'} 
                                               color={task.priority === 'high' ? '#ff5252' : task.priority === 'medium' ? '#ffab00' : '#448aff'}>
                                            {task.priority}
                                        </Badge>
                                    </td>
                                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                                    <td>
                                        <Badge bg={task.status === 'completed' ? '#00c853' : task.status === 'in_progress' ? '#2979ff' : '#757575'}>
                                            {task.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <FaTrash style={{color:'#ff5252', cursor:'pointer'}} onClick={() => handleDeleteTask(task._id)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                  </TableContainer>
                </DesktopOnly>

                <MobileOnly>
                  <MobileCards>
                    {tasks.map((task) => (
                      <MobileCard key={task._id}>
                        <MobileCardTitle>{task.title}</MobileCardTitle>
                        <MobileCardSub>{task.assignedTo?.name || 'Unassigned'}</MobileCardSub>
                        <MobileCardRows>
                          <MobileRow>
                            <MobileRowLabel>Priority</MobileRowLabel>
                            <MobileRowValue>
                              <Badge
                                bg={task.priority === 'high' ? 'rgba(255, 82, 82, 0.14)' : task.priority === 'medium' ? 'rgba(255, 171, 0, 0.14)' : 'rgba(68, 138, 255, 0.14)'}
                                color={task.priority === 'high' ? '#ff5252' : task.priority === 'medium' ? '#ffab00' : '#7bb6ff'}
                              >
                                {task.priority}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Due</MobileRowLabel>
                            <MobileRowValue>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</MobileRowValue>
                          </MobileRow>
                          <MobileRow>
                            <MobileRowLabel>Status</MobileRowLabel>
                            <MobileRowValue>
                              <Badge bg={task.status === 'completed' ? 'rgba(0,200,83,0.16)' : task.status === 'in_progress' ? 'rgba(41,121,255,0.18)' : 'rgba(255,255,255,0.08)'} color={task.status === 'completed' ? '#00c853' : task.status === 'in_progress' ? '#7bb6ff' : 'rgba(255,255,255,0.82)'}>
                                {task.status}
                              </Badge>
                            </MobileRowValue>
                          </MobileRow>
                        </MobileCardRows>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task._id)}
                            style={{ background: 'rgba(255, 82, 82, 0.12)', border: '1px solid rgba(255, 82, 82, 0.30)', color: '#ff8a80', borderRadius: 12, padding: '10px 12px', cursor: 'pointer', fontWeight: 900 }}
                          >
                            Delete
                          </button>
                        </div>
                      </MobileCard>
                    ))}
                  </MobileCards>
                </MobileOnly>
            </div>
        );
      case 'Projects':
        return (
            <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                    <SectionTitle>Project Management</SectionTitle>
                    <div style={{display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'flex-end'}}>
                        {projects.length === 0 && (
                            <CreateButton onClick={handleSeedProjects} style={{background: '#2979ff'}}>
                                <FaCloudDownloadAlt /> Load Default Projects
                            </CreateButton>
                        )}
                        <CreateButton onClick={() => setIsProjectModalOpen(true)}><FaPlus /> Add Project</CreateButton>
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px'}}>
                    {projects.map(project => (
                        <div key={project._id} style={{background:'#1c1c2e', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)'}}>
                            <img src={project.image} alt={project.title} style={{width:'100%', height:'180px', objectFit:'cover'}} />
                            <div style={{padding:'20px'}}>
                                <h3 style={{color:'#fff', margin:'0 0 10px 0'}}>{project.title}</h3>
                                <div style={{display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'10px'}}>
                                    {project.tags.map(tag => <Badge key={tag} bg="rgba(133, 76, 230, 0.1)" color="#854ce6">{tag}</Badge>)}
                                </div>
                                <p style={{color:'#b1b1b1', fontSize:'14px', height:'60px', overflow:'hidden'}}>{project.description}</p>
                                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'10px', gap: '10px'}}>
                                    <FaPen style={{color:'#00c853', cursor:'pointer'}} onClick={() => handleEditProject(project)}/>
                                    <FaTrash style={{color:'#ff5252', cursor:'pointer'}} onClick={() => handleDeleteProject(project._id)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'Profile':
        return (
          <div>
             <SectionTitle>Content Management</SectionTitle>
             <TabContainer>
                <Tab active={activeProfileTab === 'Bio'} onClick={() => setActiveProfileTab('Bio')}>Bio</Tab>
                <Tab active={activeProfileTab === 'Skills'} onClick={() => setActiveProfileTab('Skills')}>Skills</Tab>
                <Tab active={activeProfileTab === 'Experience'} onClick={() => setActiveProfileTab('Experience')}>Experience</Tab>
                <Tab active={activeProfileTab === 'Education'} onClick={() => setActiveProfileTab('Education')}>Education</Tab>
             </TabContainer>

             {activeProfileTab === 'Bio' && (
                <div style={{maxWidth: '600px'}}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input value={adminProfile.name} onChange={e => setAdminProfile({...adminProfile, name: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Roles (comma separated)</Label>
                        <Input value={Array.isArray(adminProfile.roles) ? adminProfile.roles.join(', ') : adminProfile.roles} onChange={e => setAdminProfile({...adminProfile, roles: e.target.value.split(',').map(r=>r.trim())})} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <TextArea value={adminProfile.description} onChange={e => setAdminProfile({...adminProfile, description: e.target.value})} />
                    </FormGroup>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                        <FormGroup><Label>Email</Label><Input value={adminProfile.email} onChange={e => setAdminProfile({...adminProfile, email: e.target.value})} placeholder="your@email.com" /></FormGroup>
                        <FormGroup><Label>Phone</Label><Input value={adminProfile.phone} onChange={e => setAdminProfile({...adminProfile, phone: e.target.value})} placeholder="+91 8018389108" /></FormGroup>
                    </div>
                    <FormGroup>
                        <Label>Profile Image URL</Label>
                        <Input value={adminProfile.image} onChange={e => setAdminProfile({...adminProfile, image: e.target.value})} placeholder="https://..." />
                    </FormGroup>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', marginTop:'-6px', marginBottom:'12px', flexWrap:'wrap'}}>
                        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                            <div style={{width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', color:'#b1b1b1', fontWeight:'bold'}}>
                                {adminProfile.image ? (
                                    <img src={adminProfile.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    (adminProfile.name ? adminProfile.name.charAt(0) : 'A')
                                )}
                            </div>
                            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                                <div style={{color:'#fff', fontWeight: 600, fontSize:'13px'}}>Profile Picture</div>
                                <div style={{color:'#b1b1b1', fontSize:'12px'}}>Upload from device or paste a URL above</div>
                            </div>
                        </div>

                        <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                            <CreateButton
                                type="button"
                                onClick={() => profileImageInputRef.current?.click()}
                                style={{background: 'rgba(133, 76, 230, 0.15)', borderColor: 'rgba(133, 76, 230, 0.45)'}}
                            >
                                <FaPlus /> Upload
                            </CreateButton>
                            <CreateButton
                                type="button"
                                onClick={() => setAdminProfile({ ...adminProfile, image: '' })}
                                style={{background: 'rgba(255, 82, 82, 0.12)', borderColor: 'rgba(255, 82, 82, 0.35)', color: '#ff6b6b'}}
                            >
                                <FaTrash /> Remove
                            </CreateButton>
                        </div>

                        <input
                            ref={profileImageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setAdminProfile({ ...adminProfile, image: String(reader.result || '') });
                                };
                                reader.readAsDataURL(file);
                                e.target.value = '';
                            }}
                        />
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                        <FormGroup><Label>Github</Label><Input value={adminProfile.github} onChange={e => setAdminProfile({...adminProfile, github: e.target.value})} /></FormGroup>
                        <FormGroup><Label>Resume</Label><Input value={adminProfile.resume} onChange={e => setAdminProfile({...adminProfile, resume: e.target.value})} /></FormGroup>
                        <FormGroup><Label>LinkedIn</Label><Input value={adminProfile.linkedin} onChange={e => setAdminProfile({...adminProfile, linkedin: e.target.value})} /></FormGroup>
                        <FormGroup><Label>Twitter</Label><Input value={adminProfile.twitter} onChange={e => setAdminProfile({...adminProfile, twitter: e.target.value})} /></FormGroup>
                        <FormGroup><Label>Insta</Label><Input value={adminProfile.insta} onChange={e => setAdminProfile({...adminProfile, insta: e.target.value})} /></FormGroup>
                        <FormGroup><Label>Facebook</Label><Input value={adminProfile.facebook} onChange={e => setAdminProfile({...adminProfile, facebook: e.target.value})} /></FormGroup>
                    </div>
                    <ActionButton onClick={handleAdminProfileUpdate}>Save Bio</ActionButton>
                </div>
             )}

             {activeProfileTab === 'Skills' && (
                <div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                        <CreateButton onClick={() => { setSkillForm({title: '', skills: []}); setEditingSkillId(null); setIsSkillModalOpen(true); }}>
                            <FaPlus /> Add Skill Category
                        </CreateButton>
                        {skills.length === 0 && (
                            <CreateButton onClick={handleSeedSkills} style={{background: '#2979ff'}}>
                                <FaCloudDownloadAlt /> Load Default Skills
                            </CreateButton>
                        )}
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px'}}>
                        {skills.map(skill => (
                            <SkillCard key={skill._id}>
                                <div style={{display:'flex', justifyContent:'center', marginBottom:'15px', position:'relative'}}>
                                    <h3 style={{margin:0, color:'#fff', fontSize:'24px', fontWeight:'600'}}>{skill.title}</h3>
                                    <div style={{position:'absolute', right:0, top:0, display:'flex', gap:'10px'}}>
                                        <FaPen style={{color:'#00c853', cursor:'pointer'}} onClick={() => { setSkillForm(skill); setEditingSkillId(skill._id); setIsSkillModalOpen(true); }} />
                                        <FaTrash style={{color:'#ff5252', cursor:'pointer'}} onClick={() => handleDeleteSkill(skill._id)} />
                                    </div>
                                </div>
                                <SkillList>
                                    {skill.skills.map((item, idx) => (
                                        <SkillItem key={idx}>
                                            <SkillImage src={item.image} alt={item.name} />
                                            {item.name}
                                        </SkillItem>
                                    ))}
                                </SkillList>
                            </SkillCard>
                        ))}
                    </div>
                </div>
             )}

             {activeProfileTab === 'Experience' && (
                <div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', gap:'10px', flexWrap:'wrap'}}>
                        <CreateButton onClick={() => { setExpForm({role: '', company: '', date: '', desc: '', skills: [], doc: '', img: ''}); setEditingExpId(null); setIsExpModalOpen(true); }}>
                            <FaPlus /> Add Experience
                        </CreateButton>
                        {experience.length === 0 && (
                            <CreateButton onClick={handleSeedExperience} style={{background: '#2979ff'}}>
                                <FaCloudDownloadAlt /> Load Default Experience
                            </CreateButton>
                        )}
                    </div>
                    <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'15px'}}>
                        {experience.map(exp => (
                            <div key={exp._id} style={{background:'#1c1c2e', padding:'20px', borderRadius:'16px', display:'flex', gap:'20px', border:'1px solid rgba(255,255,255,0.1)'}}>
                                <img src={exp.img} alt={exp.company} style={{width:'50px', height:'50px', borderRadius:'8px', objectFit:'cover'}} />
                                <div style={{flex:1}}>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <h3 style={{margin:0, color:'#fff'}}>{exp.role}</h3>
                                        <div style={{display:'flex', gap:'10px'}}>
                                            <FaPen style={{color:'#00c853', cursor:'pointer'}} onClick={() => { setExpForm(exp); setEditingExpId(exp._id); setIsExpModalOpen(true); }} />
                                            <FaTrash style={{color:'#ff5252', cursor:'pointer'}} onClick={() => handleDeleteExp(exp._id)} />
                                        </div>
                                    </div>
                                    <div style={{color:'#854ce6', fontWeight:'bold', fontSize:'14px'}}>{exp.company}</div>
                                    <div style={{color:'#b1b1b1', fontSize:'12px', marginBottom:'10px'}}>{exp.date}</div>
                                    <p style={{color:'#b1b1b1', fontSize:'14px'}}>{exp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {activeProfileTab === 'Education' && (
                <div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', gap:'10px', flexWrap:'wrap'}}>
                        <CreateButton onClick={() => { setEduForm({school: '', degree: '', date: '', grade: '', desc: '', img: ''}); setEditingEduId(null); setIsEduModalOpen(true); }}>
                            <FaPlus /> Add Education
                        </CreateButton>
                        {education.length === 0 && (
                            <CreateButton onClick={handleSeedEducation} style={{background: '#2979ff'}}>
                                <FaCloudDownloadAlt /> Load Default Education
                            </CreateButton>
                        )}
                    </div>
                    <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'15px'}}>
                        {education.map(edu => (
                            <div key={edu._id} style={{background:'#1c1c2e', padding:'20px', borderRadius:'16px', display:'flex', gap:'20px', border:'1px solid rgba(255,255,255,0.1)'}}>
                                <img src={edu.img} alt={edu.school} style={{width:'50px', height:'50px', borderRadius:'8px', objectFit:'cover'}} />
                                <div style={{flex:1}}>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <h3 style={{margin:0, color:'#fff'}}>{edu.school}</h3>
                                        <div style={{display:'flex', gap:'10px'}}>
                                            <FaPen style={{color:'#00c853', cursor:'pointer'}} onClick={() => { setEduForm(edu); setEditingEduId(edu._id); setIsEduModalOpen(true); }} />
                                            <FaTrash style={{color:'#ff5252', cursor:'pointer'}} onClick={() => handleDeleteEdu(edu._id)} />
                                        </div>
                                    </div>
                                    <div style={{color:'#b1b1b1', fontSize:'14px'}}>{edu.degree}</div>
                                    <div style={{color:'#b1b1b1', fontSize:'12px', marginBottom:'10px'}}>{edu.date} | {edu.grade}</div>
                                    <p style={{color:'#b1b1b1', fontSize:'14px'}}>{edu.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Page>
      <Snackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})} />
      
      <MobileSidebarOverlay $open={mobileSidebarOpen} onClick={() => setMobileSidebarOpen(false)} />
      <MobileSidebarDrawer $open={mobileSidebarOpen}>
        <Logo>
          ADMIN
          <SidebarToggle type="button" onClick={() => setMobileSidebarOpen(false)} aria-label="Close menu">×</SidebarToggle>
        </Logo>
        <Menu>
          <MenuItem type="button" active={currentView === 'Dashboard'} onClick={() => setCurrentView('Dashboard')}>
            <MenuIcon><FaHome /></MenuIcon>
            <MenuLabel $hidden={false}>Dashboard</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Teams'} onClick={() => setCurrentView('Teams')}>
            <MenuIcon><FaUsers /></MenuIcon>
            <MenuLabel $hidden={false}>Users & Teams</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Tasks'} onClick={() => setCurrentView('Tasks')}>
            <MenuIcon><FaTasks /></MenuIcon>
            <MenuLabel $hidden={false}>Task Manager</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Contacts'} onClick={() => setCurrentView('Contacts')}>
            <MenuIcon><FaEnvelope /></MenuIcon>
            <MenuLabel $hidden={false}>Contact Messages</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Projects'} onClick={() => setCurrentView('Projects')}>
            <MenuIcon><FaCode /></MenuIcon>
            <MenuLabel $hidden={false}>Projects</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Profile'} onClick={() => setCurrentView('Profile')}>
            <MenuIcon><FaUserEdit /></MenuIcon>
            <MenuLabel $hidden={false}>Edit Profile</MenuLabel>
          </MenuItem>
          <MenuItem
            type="button"
            onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }}
            style={{ marginTop: 'auto', color: 'rgba(255, 107, 107, 0.95)' }}
          >
            <MenuIcon><FaUserLock /></MenuIcon>
            <MenuLabel $hidden={false}>Logout</MenuLabel>
          </MenuItem>
        </Menu>
      </MobileSidebarDrawer>

      <SidebarContainer $collapsed={sidebarCollapsed}>
        <Logo>
          {sidebarCollapsed ? 'AD' : 'ADMIN'}
          <SidebarToggle type="button" onClick={() => setSidebarCollapsed((v) => !v)} aria-label="Toggle sidebar">
            {sidebarCollapsed ? '›' : '‹'}
          </SidebarToggle>
        </Logo>
        <Menu>
          <MenuItem type="button" active={currentView === 'Dashboard'} onClick={() => setCurrentView('Dashboard')}>
            <MenuIcon><FaHome /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Dashboard</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Teams'} onClick={() => setCurrentView('Teams')}>
            <MenuIcon><FaUsers /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Users & Teams</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Tasks'} onClick={() => setCurrentView('Tasks')}>
            <MenuIcon><FaTasks /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Task Manager</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Contacts'} onClick={() => setCurrentView('Contacts')}>
            <MenuIcon><FaEnvelope /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Contact Messages</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Projects'} onClick={() => setCurrentView('Projects')}>
            <MenuIcon><FaCode /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Projects</MenuLabel>
          </MenuItem>
          <MenuItem type="button" active={currentView === 'Profile'} onClick={() => setCurrentView('Profile')}>
            <MenuIcon><FaUserEdit /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Edit Profile</MenuLabel>
          </MenuItem>
          <MenuItem
            type="button"
            onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }}
            style={{ marginTop: 'auto', color: 'rgba(255, 107, 107, 0.95)' }}
          >
            <MenuIcon><FaUserLock /></MenuIcon>
            <MenuLabel $hidden={sidebarCollapsed}>Logout</MenuLabel>
          </MenuItem>
        </Menu>
      </SidebarContainer>

      <MainContent>
        <TopBar $scrolled={topbarScrolled}>
          <TopBarInner>
            <TopBarLeft>
              <OnlyMobile>
                <IconButton type="button" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
                  <FaBars />
                </IconButton>
              </OnlyMobile>
              <SearchBar><FaSearch color="rgba(255,255,255,0.55)" /><input type="text" placeholder="Search..." /></SearchBar>
            </TopBarLeft>
            <ProfileSection>
              <div style={{ position: 'relative' }}>
              {(() => {
                const unread = adminInbox.filter(m => !m.seenByAdmin).length;
                return (
                  <>
                    <BellButton type="button" onClick={() => setIsBellOpen(!isBellOpen)} aria-label="Notifications">
                      <FaBell />
                      {unread > 0 ? <BellBadge>{unread}</BellBadge> : null}
                    </BellButton>

                    {isBellOpen && (
                      <BellDropdown>
                        <BellDropdownHeader>
                          <div>
                            <h4>Inbox</h4>
                            <span>{unread} unread</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsBellOpen(false)}
                            style={{ background: 'transparent', border: 'none', color: '#b1b1b1', cursor: 'pointer', fontSize: 18, fontWeight: 900 }}
                          >
                            ×
                          </button>
                        </BellDropdownHeader>
                        <BellDropdownList>
                          {adminInbox.length === 0 ? (
                            <div style={{ padding: 14, color: '#b1b1b1', fontSize: 13 }}>No messages yet.</div>
                          ) : (
                            adminInbox.map((m) => {
                              const from = m.fromUser;
                              const fromName = from?.name || 'User';
                              const fromEmail = from?.email || '';
                              const title = (m.title && String(m.title).trim()) ? m.title : 'Message';
                              return (
                                <BellItem
                                  key={m._id}
                                  onClick={async () => {
                                    try {
                                      if (!m.seenByAdmin) {
                                        await markAdminInboxMessageSeen(m._id);
                                        loadData();
                                      }
                                    } catch (err) {
                                      if (import.meta.env.DEV) console.error(err);
                                    }
                                  }}
                                >
                                  <BellItemTop>
                                    <div>
                                      <BellItemTitle>
                                        {!m.seenByAdmin ? <BellDot /> : null}
                                        {fromName}
                                        <span style={{ color: '#854ce6', fontWeight: 800 }}>|</span>
                                        <span style={{ color: '#b1b1b1', fontWeight: 800, fontSize: 12 }}>{title}</span>
                                      </BellItemTitle>
                                      <div style={{ color: '#b1b1b1', fontSize: 12, marginTop: 2 }}>{fromEmail}</div>
                                    </div>
                                    <BellItemMeta>
                                      {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
                                    </BellItemMeta>
                                  </BellItemTop>
                                  <BellItemBody>{m.message}</BellItemBody>
                                  <BellItemActions>
                                    <button
                                      type="button"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                          if (!m.seenByAdmin) {
                                            await markAdminInboxMessageSeen(m._id);
                                            loadData();
                                          }
                                        } catch (err) {
                                          if (import.meta.env.DEV) console.error(err);
                                        }
                                      }}
                                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontWeight: 800, fontSize: 12 }}
                                    >
                                      Seen
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const uid = from?._id;
                                        if (uid) {
                                          setBroadcastForm({ title: `Re: ${title}`, message: '', type: 'info', targetUser: uid });
                                          setIsBroadcastModalOpen(true);
                                          setIsBellOpen(false);
                                        }
                                      }}
                                      style={{ background: 'rgba(133, 76, 230, 0.15)', border: '1px solid rgba(133, 76, 230, 0.5)', color: '#c9b7ff', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontWeight: 900, fontSize: 12 }}
                                    >
                                      Reply
                                    </button>
                                  </BellItemActions>
                                </BellItem>
                              );
                            })
                          )}
                        </BellDropdownList>
                      </BellDropdown>
                    )}
                  </>
                );
              })()}
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#854ce6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', overflow: 'hidden' }}>
                {adminProfile.image ? (
                    <img src={adminProfile.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    (adminProfile.name ? adminProfile.name.charAt(0) : 'A')
                )}
              </div>
            </ProfileSection>
          </TopBarInner>
        </TopBar>
        <DashboardContent
          ref={contentRef}
          onScroll={(e) => setTopbarScrolled(e.currentTarget.scrollTop > 6)}
        >
          <ContentInner>{renderContent()}</ContentInner>
        </DashboardContent>
      </MainContent>

      {/* Task Modal */}
      <ModalOverlay open={isTaskModalOpen}>
        <ModalContent>
            <ModalHeader><h3>Assign New Task</h3><CloseButton onClick={() => setIsTaskModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Task Title</Label>
                <Input value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} placeholder="Enter task title" />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <TextArea value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} placeholder="Task details..." />
            </FormGroup>
            <FormGroup>
                <Label>Assign To</Label>
                <Select value={taskForm.assignedTo} onChange={e => setTaskForm({...taskForm, assignedTo: e.target.value})}>
                    <option value="">Select User</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                </Select>
            </FormGroup>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                <FormGroup>
                    <Label>Priority</Label>
                    <Select value={taskForm.priority} onChange={e => setTaskForm({...taskForm, priority: e.target.value})}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Due Date</Label>
                    <Input type="date" value={taskForm.dueDate} onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})} />
                </FormGroup>
            </div>
            <ActionButton onClick={handleCreateTask}>Assign Task</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Contact Detail Modal */}
      <ModalOverlay open={isContactDetailModalOpen}>
        <ModalContent style={{maxWidth: '720px'}}>
            <ModalHeader>
                <h3>Message Details</h3>
                <CloseButton onClick={() => { setIsContactDetailModalOpen(false); setSelectedContact(null); }}>×</CloseButton>
            </ModalHeader>
            {selectedContact && (
                <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:'12px', flexWrap:'wrap'}}>
                        <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                            <div style={{color:'#fff', fontSize:'18px', fontWeight: 900}}>{selectedContact.from_name || 'Unknown'}</div>
                            <div style={{color:'#b1b1b1'}}>{selectedContact.from_email || '-'}</div>
                            {selectedContact.user_type && (
                                <div style={{color:'#854ce6', fontWeight: 800, fontSize:'12px'}}>{selectedContact.user_type}</div>
                            )}
                        </div>
                        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center', justifyContent:'flex-end'}}>
                            <Badge bg={selectedContact.seen ? 'rgba(0, 200, 83, 0.12)' : 'rgba(255, 171, 0, 0.12)'} color={selectedContact.seen ? '#00c853' : '#ffab00'}>
                                {selectedContact.seen ? 'Seen' : 'New'}
                            </Badge>
                            <div style={{color:'#b1b1b1', fontSize:'13px'}}>
                                {selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : '-'}
                            </div>
                        </div>
                    </div>

                    <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px'}}>
                        <div style={{color:'#b1b1b1', fontSize:'12px', fontWeight: 900}}>SUBJECT</div>
                        <div style={{color:'#fff', marginTop:'6px'}}>{selectedContact.subject || '-'}</div>
                    </div>

                    <div style={{background:'rgba(0,0,0,0.22)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px'}}>
                        <div style={{color:'#b1b1b1', fontSize:'12px', fontWeight: 900}}>MESSAGE</div>
                        <div style={{color:'#fff', marginTop:'10px', whiteSpace:'pre-wrap', lineHeight: 1.6}}>{selectedContact.message || '-'}</div>
                    </div>

                    <div style={{display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'flex-end'}}>
                        <a
                            href={`mailto:${selectedContact.from_email || ''}?subject=${encodeURIComponent('Re: ' + (selectedContact.subject || 'Message'))}&body=${encodeURIComponent(`Hi ${selectedContact.from_name || ''},\n\n\n---\nYour message:\n${selectedContact.message || ''}\n`)}`}
                            style={{textDecoration:'none'}}
                        >
                            <ActionButton style={{background: '#854ce6'}}>Reply (Open Email)</ActionButton>
                        </a>
                        <ActionButton
                            onClick={async () => {
                                try {
                                    if (!selectedContact?._id) return;
                                    if (!window.confirm('Delete this message?')) return;
                                    await deleteContact(selectedContact._id);
                                    setSnackbar({ open: true, message: 'Message deleted', severity: 'success' });
                                    setIsContactDetailModalOpen(false);
                                    setSelectedContact(null);
                                    loadData();
                                } catch (err) {
                                    if (import.meta.env.DEV) console.error(err);
                                    setSnackbar({ open: true, message: 'Failed to delete message', severity: 'error' });
                                }
                            }}
                            style={{background: 'rgba(255, 82, 82, 0.15)', border: '1px solid rgba(255, 82, 82, 0.35)', color: '#ff6b6b'}}
                        >
                            Delete
                        </ActionButton>
                    </div>
                </div>
            )}
        </ModalContent>
      </ModalOverlay>

      {/* Broadcast Modal */}
      <ModalOverlay open={isBroadcastModalOpen}>
        <ModalContent>
            <ModalHeader><h3>Send Broadcast / Message</h3><CloseButton onClick={() => setIsBroadcastModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Target Audience</Label>
                <Select value={broadcastForm.targetUser} onChange={e => setBroadcastForm({...broadcastForm, targetUser: e.target.value})}>
                    <option value="">All Users (Broadcast)</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label>Title / Subject</Label>
                <Input value={broadcastForm.title} onChange={e => setBroadcastForm({...broadcastForm, title: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Message</Label>
                <TextArea value={broadcastForm.message} onChange={e => setBroadcastForm({...broadcastForm, message: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Type</Label>
                <Select value={broadcastForm.type} onChange={e => setBroadcastForm({...broadcastForm, type: e.target.value})}>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                </Select>
            </FormGroup>
            <ActionButton onClick={handleSendBroadcast} style={{background: '#00c853'}}>Send Message</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Edit Profile Modal (Bio) */}
      <ModalOverlay open={isEditProfileOpen}>
        <ModalContent style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <ModalHeader><h3>Edit Portfolio Bio</h3><CloseButton onClick={() => setIsEditProfileOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Name</Label>
                <Input value={adminProfile.name} onChange={e => setAdminProfile({...adminProfile, name: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Roles (comma separated)</Label>
                <Input value={Array.isArray(adminProfile.roles) ? adminProfile.roles.join(', ') : adminProfile.roles} onChange={e => setAdminProfile({...adminProfile, roles: e.target.value.split(',').map(r=>r.trim())})} />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <TextArea value={adminProfile.description} onChange={e => setAdminProfile({...adminProfile, description: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Github URL</Label>
                <Input value={adminProfile.github} onChange={e => setAdminProfile({...adminProfile, github: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Resume URL</Label>
                <Input value={adminProfile.resume} onChange={e => setAdminProfile({...adminProfile, resume: e.target.value})} />
            </FormGroup>
            <ActionButton onClick={handleAdminProfileUpdate}>Save Changes</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Project Modal */}
      <ModalOverlay open={isProjectModalOpen}>
        <ModalContent style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <ModalHeader><h3>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3><CloseButton onClick={() => setIsProjectModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Title</Label>
                <Input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <TextArea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Image URL</Label>
                <Input value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Tags (comma separated)</Label>
                <Input value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value.split(',').map(t=>t.trim())})} />
            </FormGroup>
            <FormGroup>
                <Label>Github URL</Label>
                <Input value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label>Live URL</Label>
                <Input value={projectForm.webapp} onChange={e => setProjectForm({...projectForm, webapp: e.target.value})} />
            </FormGroup>
            <ActionButton onClick={handleSaveProject}>{editingProjectId ? 'Update Project' : 'Create Project'}</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Skill Modal */}
      <ModalOverlay open={isSkillModalOpen}>
        <ModalContent style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <ModalHeader><h3>{editingSkillId ? 'Edit Skill Category' : 'Add Skill Category'}</h3><CloseButton onClick={() => setIsSkillModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Category Title</Label>
                <Input value={skillForm.title} onChange={e => setSkillForm({...skillForm, title: e.target.value})} placeholder="e.g. Frontend, Backend" />
            </FormGroup>
            <Label>Skills List</Label>
            <div style={{marginBottom:'15px', border:'1px solid rgba(255,255,255,0.1)', padding:'10px', borderRadius:'8px'}}>
                <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                    <Input placeholder="Skill Name" value={skillItemForm.name} onChange={e => setSkillItemForm({...skillItemForm, name: e.target.value})} />
                    <Input placeholder="Image URL" value={skillItemForm.image} onChange={e => setSkillItemForm({...skillItemForm, image: e.target.value})} />
                    <button onClick={() => {
                        if(skillItemForm.name && skillItemForm.image) {
                            setSkillForm({...skillForm, skills: [...skillForm.skills, skillItemForm]});
                            setSkillItemForm({name: '', image: ''});
                        }
                    }} style={{background:'#00c853', border:'none', borderRadius:'8px', color:'#fff', cursor:'pointer', padding:'0 15px'}}><FaPlus /></button>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
                    {skillForm.skills.map((s, i) => (
                        <Badge key={i} bg="rgba(255,255,255,0.1)">
                            {s.name} <FaTrash style={{marginLeft:'5px', cursor:'pointer', color:'#ff5252'}} onClick={() => {
                                const newSkills = [...skillForm.skills];
                                newSkills.splice(i, 1);
                                setSkillForm({...skillForm, skills: newSkills});
                            }}/>
                        </Badge>
                    ))}
                </div>
            </div>
            <ActionButton onClick={handleSaveSkill}>Save Category</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Experience Modal */}
      <ModalOverlay open={isExpModalOpen}>
        <ModalContent style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <ModalHeader><h3>{editingExpId ? 'Edit Experience' : 'Add Experience'}</h3><CloseButton onClick={() => setIsExpModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>Role</Label>
                <Input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} placeholder="e.g. Full Stack Development Intern" />
            </FormGroup>
            <FormGroup>
                <Label>Company</Label>
                <Input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} placeholder="e.g. ExcelR" />
            </FormGroup>
            <FormGroup>
                <Label>Date</Label>
                <Input value={expForm.date} onChange={e => setExpForm({...expForm, date: e.target.value})} placeholder="e.g. Aug 2025 - Nov 2025" />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <TextArea value={expForm.desc} onChange={e => setExpForm({...expForm, desc: e.target.value})} placeholder="What you did, tech used, impact..." />
            </FormGroup>
            <FormGroup>
                <Label>Image URL</Label>
                <Input value={expForm.img} onChange={e => setExpForm({...expForm, img: e.target.value})} placeholder="Company logo image URL" />
            </FormGroup>
            <FormGroup>
                <Label>Certificate / Document URL</Label>
                <Input value={expForm.doc} onChange={e => setExpForm({...expForm, doc: e.target.value})} placeholder="Google Drive / certificate link (optional)" />
            </FormGroup>
            <FormGroup>
                <Label>Skills (comma separated)</Label>
                <Input value={Array.isArray(expForm.skills) ? expForm.skills.join(',') : expForm.skills} onChange={e => setExpForm({...expForm, skills: e.target.value.split(',')})} placeholder="e.g. React, Node.js, MongoDB" />
            </FormGroup>
            <ActionButton onClick={handleSaveExperience}>Save Experience</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Education Modal */}
      <ModalOverlay open={isEduModalOpen}>
        <ModalContent style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <ModalHeader><h3>{editingEduId ? 'Edit Education' : 'Add Education'}</h3><CloseButton onClick={() => setIsEduModalOpen(false)}>×</CloseButton></ModalHeader>
            <FormGroup>
                <Label>School</Label>
                <Input value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} placeholder="e.g. Nalanda Institute of Technology" />
            </FormGroup>
            <FormGroup>
                <Label>Degree</Label>
                <Input value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} placeholder="e.g. B.Tech in Computer Science" />
            </FormGroup>
            <FormGroup>
                <Label>Date</Label>
                <Input value={eduForm.date} onChange={e => setEduForm({...eduForm, date: e.target.value})} placeholder="e.g. Oct 2021 - Sep 2025" />
            </FormGroup>
            <FormGroup>
                <Label>Grade</Label>
                <Input value={eduForm.grade} onChange={e => setEduForm({...eduForm, grade: e.target.value})} placeholder="e.g. 8.71 CGPA" />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <TextArea value={eduForm.desc} onChange={e => setEduForm({...eduForm, desc: e.target.value})} placeholder="Short summary about coursework/activities..." />
            </FormGroup>
            <FormGroup>
                <Label>Image URL</Label>
                <Input value={eduForm.img} onChange={e => setEduForm({...eduForm, img: e.target.value})} placeholder="School logo image URL" />
            </FormGroup>
            <ActionButton onClick={handleSaveEducation}>Save Education</ActionButton>
        </ModalContent>
      </ModalOverlay>

      {/* Delete Confirmation Modal */}
      <ModalOverlay open={deleteConfirmation.open}>
        <ModalContent style={{
            maxWidth: '400px', 
            textAlign: 'center', 
            background: '#1c1c2e', 
            border: '1px solid rgba(255, 82, 82, 0.3)',
            boxShadow: '0 0 20px rgba(255, 82, 82, 0.1)'
        }}>
            <div style={{
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'rgba(255, 82, 82, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px'
            }}>
                <FaExclamationTriangle size={30} color="#ff5252" />
            </div>
            <h3 style={{color: '#fff', fontSize: '20px', marginBottom: '10px'}}>Confirm Deletion</h3>
            <p style={{color: '#b1b1b1', marginBottom: '25px', lineHeight: '1.5'}}>
                Are you sure you want to delete this {deleteConfirmation.type}? <br/>
                This action cannot be undone.
            </p>
            <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                <button 
                    onClick={() => setDeleteConfirmation({ open: false, type: '', id: '' })} 
                    style={{
                        background: 'transparent', 
                        border: '1px solid #b1b1b1', 
                        color: '#b1b1b1', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.borderColor = '#fff'}
                    onMouseOut={(e) => e.target.style.borderColor = '#b1b1b1'}
                >
                    Cancel
                </button>
                <button 
                    onClick={handleConfirmDelete} 
                    style={{
                        background: '#ff5252', 
                        border: 'none', 
                        color: '#fff', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: '0 4px 10px rgba(255, 82, 82, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    Delete Permanently
                </button>
            </div>
        </ModalContent>
      </ModalOverlay>

      {/* User Detail Modal */}
      <ModalOverlay open={isUserDetailModalOpen}>
        <ModalContent style={{maxWidth: '600px'}}>
            <ModalHeader>
                <h3>User Profile</h3>
                <CloseButton onClick={() => setIsUserDetailModalOpen(false)}>×</CloseButton>
            </ModalHeader>
            {selectedUser && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                        <div style={{
                            width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #854ce6, #00c2ff)',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '32px', fontWeight: 'bold', overflow: 'hidden'
                        }}>
                            {selectedUser.avatar ? (
                                <img src={selectedUser.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                selectedUser.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div style={{flex: 1, minWidth: 0}}>
                            <h2 style={{margin: '0 0 5px 0', color: '#fff'}}>{selectedUser.name}</h2>
                            <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
                                <Badge bg={selectedUser.role === 'admin' ? '#ff5252' : '#00c853'}>{selectedUser.role.toUpperCase()}</Badge>
                                <Badge
                                    bg={selectedUser.status === 'approved' ? 'rgba(0, 200, 83, 0.12)' : selectedUser.status === 'rejected' ? 'rgba(255, 82, 82, 0.12)' : 'rgba(255, 171, 0, 0.12)'}
                                    color={selectedUser.status === 'approved' ? '#00c853' : selectedUser.status === 'rejected' ? '#ff5252' : '#ffab00'}
                                >
                                    {(selectedUser.status || 'pending').toUpperCase()}
                                </Badge>
                            </div>
                            <div style={{marginTop:'12px', display:'flex', gap:'10px', flexWrap:'wrap'}}>
                                <button
                                    onClick={() => handleApproveRejectSelectedUser('approved')}
                                    disabled={selectedUser.status === 'approved'}
                                    style={{
                                        background: selectedUser.status === 'approved' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 200, 83, 0.15)',
                                        border: '1px solid rgba(0, 200, 83, 0.35)',
                                        color: selectedUser.status === 'approved' ? '#b1b1b1' : '#00c853',
                                        borderRadius:'10px',
                                        padding:'8px 12px',
                                        cursor: selectedUser.status === 'approved' ? 'not-allowed' : 'pointer',
                                        fontWeight: 800,
                                        fontSize: '12px'
                                    }}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApproveRejectSelectedUser('rejected')}
                                    disabled={selectedUser.status === 'rejected'}
                                    style={{
                                        background: selectedUser.status === 'rejected' ? 'rgba(255,255,255,0.06)' : 'rgba(255, 82, 82, 0.12)',
                                        border: '1px solid rgba(255, 82, 82, 0.35)',
                                        color: selectedUser.status === 'rejected' ? '#b1b1b1' : '#ff6b6b',
                                        borderRadius:'10px',
                                        padding:'8px 12px',
                                        cursor: selectedUser.status === 'rejected' ? 'not-allowed' : 'pointer',
                                        fontWeight: 800,
                                        fontSize: '12px'
                                    }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap'}}>
                        <div style={{color:'#b1b1b1', fontSize:'13px'}}>Profile Photo (Admin can change)</div>
                        <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                            <CreateButton
                                type="button"
                                onClick={() => userAvatarInputRef.current?.click()}
                                style={{background: 'rgba(133, 76, 230, 0.15)', borderColor: 'rgba(133, 76, 230, 0.45)'}}
                            >
                                <FaPlus /> Upload
                            </CreateButton>
                            <CreateButton
                                type="button"
                                onClick={() => setSelectedUser({ ...selectedUser, avatar: '' })}
                                style={{background: 'rgba(255, 82, 82, 0.12)', borderColor: 'rgba(255, 82, 82, 0.35)', color: '#ff6b6b'}}
                            >
                                <FaTrash /> Remove
                            </CreateButton>
                        </div>
                        <input
                            ref={userAvatarInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setSelectedUser({ ...selectedUser, avatar: String(reader.result || '') });
                                };
                                reader.readAsDataURL(file);
                                e.target.value = '';
                            }}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <FormGroup>
                            <Label>Email</Label>
                            <div style={{color: '#fff', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>{selectedUser.email}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone</Label>
                            <div style={{color: '#fff', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>{selectedUser.phone || 'N/A'}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password (Decrypted View)</Label>
                            <div style={{
                                color: '#ff6b6b', padding: '10px', background: 'rgba(255, 82, 82, 0.1)', 
                                borderRadius: '8px', fontFamily: 'monospace', border: '1px solid rgba(255, 82, 82, 0.2)',
                                wordBreak: 'break-all'
                            }}>
                                {selectedUser.password}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Task Status</Label>
                            <div style={{color: '#fff', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>
                                {selectedUser.tasks?.completed || 0} / {selectedUser.tasks?.total || 0} Completed
                            </div>
                        </FormGroup>
                    </div>

                    <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px'}}>
                        <h4 style={{color: '#b1b1b1', marginBottom: '15px'}}>Academic & Personal Details</h4>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                            <div><Label>Branch</Label><div style={{color: '#fff'}}>{selectedUser.branch || '-'}</div></div>
                            <div><Label>Course</Label><div style={{color: '#fff'}}>{selectedUser.course || '-'}</div></div>
                            <div><Label>Specialization</Label><div style={{color: '#fff'}}>{selectedUser.specialization || '-'}</div></div>
                            <div><Label>Address</Label><div style={{color: '#fff'}}>{selectedUser.address || '-'}</div></div>
                        </div>
                    </div>

                    <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
                        <ActionButton onClick={handleSaveSelectedUser} style={{background: '#00c853'}}>Save User</ActionButton>
                        <ActionButton onClick={() => {
                        setTaskForm({ ...taskForm, assignedTo: selectedUser._id });
                        setIsUserDetailModalOpen(false);
                        setIsTaskModalOpen(true);
                        }}>
                            Assign New Task
                        </ActionButton>
                    </div>
                </div>
            )}
        </ModalContent>
      </ModalOverlay>

    </Page>
  );
};

export default AdminDashboard;
