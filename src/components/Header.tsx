import React from 'react';
import { Zap, Wallet, LogOut } from 'lucide-react';
import type { UserProfile } from '../utils/mockData';

interface HeaderProps {
  activeRole: 'landing' | 'student' | 'employer';
  setActiveRole: (role: 'landing' | 'student' | 'employer') => void;
  studentProfile: UserProfile;
  employerProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  studentProfile,
  employerProfile,
  activeTab,
  setActiveTab,
}) => {
  const currentProfile = activeRole === 'student' ? studentProfile : employerProfile;

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      {/* 1. Global Navigation Bar (Apple Style: true black, 44px height, micro nav links) */}
      <nav style={{
        background: 'var(--colors-surface-black)',
        color: '#f5f5f7',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        fontSize: '12px',
        fontWeight: 400,
        letterSpacing: '-0.12px',
        borderBottom: '1px solid #333333'
      }}>
        {/* Apple Logo Placeholder / CodeSprint branding */}
        <div 
          onClick={() => setActiveRole('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Zap size={14} color="#2997ff" />
          <span style={{ fontWeight: 600, color: '#ffffff' }}>CodeSprint</span>
        </div>

        {/* Right nav: quick entry */}
        <div>
          {activeRole === 'landing' ? (
            <button 
              onClick={() => {
                setActiveRole('student');
                setActiveTab('explore');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2997ff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Sign In
            </button>
          ) : (
            <button 
              onClick={() => setActiveRole('landing')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#86868b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Exit Portal</span>
              <LogOut size={12} />
            </button>
          )}
        </div>
      </nav>

      {/* 2. Sub-Navigation Bar (Apple Style: Frosted parchment, 52px height, active task/buy button) */}
      {activeRole !== 'landing' && (
        <div style={{
          background: 'rgba(245, 245, 247, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          borderBottom: '1px solid var(--colors-hairline)',
        }}>
          {/* Section title (Apple tagline style) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--colors-ink)',
              letterSpacing: '-0.2px'
            }}>
              {activeRole === 'student' ? 'Student Workspace' : 'Employer Console'}
            </span>

            {/* Navigation links inside subnav */}
            <div style={{ display: 'flex', gap: '16px', marginLeft: '24px' }}>
              {activeRole === 'student' ? (
                <>
                  <span 
                    onClick={() => setActiveTab('explore')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'explore' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'explore' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    Find Tasks
                  </span>
                  <span 
                    onClick={() => setActiveTab('sprints')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'sprints' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'sprints' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    My Sprints
                  </span>
                  <span 
                    onClick={() => setActiveTab('history')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'history' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'history' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    Earnings Ledger
                  </span>
                </>
              ) : (
                <>
                  <span 
                    onClick={() => setActiveTab('manage')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'manage' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'manage' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    My Posts
                  </span>
                  <span 
                    onClick={() => setActiveTab('post')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'post' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'post' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    Post Task
                  </span>
                  <span 
                    onClick={() => setActiveTab('history')}
                    style={{ 
                      fontSize: '14px', 
                      color: activeTab === 'history' ? 'var(--colors-primary)' : '#515154',
                      fontWeight: activeTab === 'history' ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    Escrow Vault
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right section: Wallet, Switcher, Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Wallet status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--colors-ink)'
            }}>
              <Wallet size={14} color="var(--colors-primary)" />
              <span>${currentProfile.balance.toFixed(2)}</span>
            </div>

            {/* Role switcher capsule button */}
            <div style={{
              background: '#e8e8ed',
              borderRadius: '9999px',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <button
                onClick={() => {
                  setActiveRole('student');
                  setActiveTab('explore');
                }}
                style={{
                  background: activeRole === 'student' ? '#ffffff' : 'transparent',
                  border: 'none',
                  color: activeRole === 'student' ? 'var(--colors-ink)' : '#86868b',
                  boxShadow: activeRole === 'student' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setActiveRole('employer');
                  setActiveTab('manage');
                }}
                style={{
                  background: activeRole === 'employer' ? '#ffffff' : 'transparent',
                  border: 'none',
                  color: activeRole === 'employer' ? 'var(--colors-ink)' : '#86868b',
                  boxShadow: activeRole === 'employer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Employer
              </button>
            </div>

            {/* Profile badge details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={currentProfile.avatar} 
                alt={currentProfile.name}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--colors-hairline)'
                }}
              />
              <span className="hidden-mobile" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--colors-ink)' }}>
                {currentProfile.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
