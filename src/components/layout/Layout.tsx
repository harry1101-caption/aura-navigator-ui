
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
      <main className="">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
