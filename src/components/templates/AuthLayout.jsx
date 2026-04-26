import React from 'react';
import { Link } from 'react-router-dom';
import nextLogo from '../../assets/next-level-ic.svg';

const AuthLayout = ({ children, title, subtitle, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="flex min-h-screen items-stretch overflow-hidden bg-background">
      {/* Left Column: Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="inline-block text-2xl font-bold text-navy">
              <div className="flex items-center gap-2">
                <img src={nextLogo} alt="Kospintar" className="h-10 w-auto" />
                <span className="text-xl font-bold tracking-tight text-navy">Kospintar</span>
              </div>
            </Link>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>

          <div className="mt-8 text-center text-sm text-text-secondary">
            {footerText}{' '}
            <Link to={footerLink} className="font-semibold text-primary hover:text-brand-600">
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Branding/Illustration */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-navy">
          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#2DCC70 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
