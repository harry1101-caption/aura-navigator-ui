
import { FC, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Subheader from './Subheader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <Subheader />
      <main className="pt-28 pl-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
