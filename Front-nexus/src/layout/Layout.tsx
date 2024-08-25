import React, { ReactNode } from 'react';
import { TransitionProvider } from '@/contexts/TransitionContext';
import Header from '@/components/Shared/Navbar';
import TransitionComponent from '@/components/Shared/Transition';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <TransitionProvider>
        <div className="content-container">
          <TransitionComponent>{children}</TransitionComponent>
        </div>
      </TransitionProvider>
    </div>
  );
};

export default Layout;
