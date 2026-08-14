import React from 'react';
import { useLocation } from 'react-router-dom';

// Lightweight, purely presentational floating background elements.
export default function PageAnimations() {
  const { pathname } = useLocation();

  // Determine which elements to show per-page (simple and subtle)
  const showHeroExtras = pathname === '/';
  const showTrackingExtras = pathname.startsWith('/tracking') || pathname.includes('tracking');
  const showRegisterExtras = pathname === '/complaint/new';
  const showFeatureExtras = pathname.startsWith('/features');

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none">
      <div className="absolute inset-0 overflow-hidden">
        {/* soft gradient blobs */}
        <div className={`floating-blob left-6 top-10 hidden lg:block ${showHeroExtras ? 'opacity-80' : 'opacity-40'}`} />
        <div className={`floating-blob right-10 bottom-20 hidden lg:block ${showHeroExtras ? 'opacity-70' : 'opacity-30'}`} />

        {/* small subtle dots */}
        <div className="floating-dot left-1/4 top-1/3" />
        <div className="floating-dot left-3/4 top-1/4 delay-200" />
        <div className="floating-dot left-2/3 top-3/4 delay-400" />

        {/* page-specific icons */}
        {showRegisterExtras && (
          <svg className="floating-icon top-1/3 left-10" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
            <path d="M7 8H13" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
          </svg>
        )}

        {showTrackingExtras && (
          <svg className="floating-icon right-20 top-10" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.25" opacity="0.9" />
            <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.25" opacity="0.9" />
          </svg>
        )}

        {showFeatureExtras && (
          <svg className="floating-icon left-14 bottom-28" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L19 8V16L12 22L5 16V8L12 2Z" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
          </svg>
        )}

        {/* subtle horizontal floats */}
        <div className="float-h left-8 top-1/5" />
        <div className="float-h right-8 top-2/5 delay-300" />
      </div>
    </div>
  );
}
