import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

// Repurposed to Apple Store Card tile
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  style = {},
}) => {
  const baseClasses = `apple-card ${hoverEffect ? 'apple-card-hover' : ''} ${className}`;
  
  return (
    <div 
      className={baseClasses} 
      onClick={onClick} 
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </div>
  );
};
export const AppleCard = GlassCard; // Export alias for semantic clarity
