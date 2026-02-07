import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <AppSidebar />
      <div className="ml-[72px] lg:ml-[240px] transition-all duration-300">
        <TopBar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
