import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="flex min-h-screen items-stretch overflow-hidden bg-white dark:bg-boxdark">
      {/* Left Column: Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="inline-block text-2xl font-bold text-slate-900">
               <div className="flex items-center gap-2">
                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                   <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M8 17L8 13M12 17L12 9M16 17L16 5"
                       stroke="currentColor"
                       strokeWidth="2.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     />
                   </svg>
                 </div>
                 <span className="text-xl font-bold tracking-tight text-slate-900">Kospintar</span>
               </div>
            </Link>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            {footerText}{' '}
            <Link to={footerLink} className="font-semibold text-indigo-600 hover:text-indigo-500">
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Branding/Illustration */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-slate-900">
           {/* Decorative Grid Pattern */}
           <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
           />
           
           <div className="relative flex h-full flex-col items-center justify-center px-20">
              <div className="flex items-center gap-4 text-white">
                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600">
                   <svg
                     width="40"
                     height="40"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M8 17L8 13M12 17L12 9M16 17L16 5"
                       stroke="currentColor"
                       strokeWidth="2.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     />
                   </svg>
                 </div>
                 <h1 className="text-4xl font-bold tracking-tighter">TailAdmin</h1>
              </div>
              <p className="mt-6 text-center text-lg font-medium text-slate-300">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
