
import { FC } from 'react';
import { Bell, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center z-10">
      <div className="w-64 h-full flex items-center px-4 border-r border-gray-200">
        <div className="w-7 h-7 bg-primary rounded-full mr-2"></div>
        <div className="flex items-center font-medium">
          iLotusLand
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>
      
      <div className="flex-1 flex items-center px-4">
        <div className="flex space-x-6 h-14">
          <a href="#" className="flex items-center h-full border-b-2 border-primary text-primary font-medium px-1">
            Rocks
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            To-dos
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            Scorecard
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            Issues
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            Headlines
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            Past Meetings
          </a>
          <a href="#" className="flex items-center h-full hover:text-primary px-1">
            Vision
          </a>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="bg-primary text-white rounded-full px-3 py-1.5 text-sm flex items-center">
            <span className="mr-1">Start Meeting</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-full p-1.5 text-gray-600 hover:bg-gray-100">
            <Plus className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
            <img src="https://i.pravatar.cc/100" alt="User" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
