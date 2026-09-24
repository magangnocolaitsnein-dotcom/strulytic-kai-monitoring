import React from 'react';

interface BentoCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  noPadding = false
}) => {
  return (
    <div
      className={`bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col overflow-hidden ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E2E8F0]/80 bg-[#FAFCFF]">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#475569] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 ml-3">{action}</div>}
        </div>
      )}
      <div className={`flex-1 ${noPadding ? '' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
};
