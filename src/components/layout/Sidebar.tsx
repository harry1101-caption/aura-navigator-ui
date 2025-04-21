
import { FC } from 'react';
import { Search, ChevronDown, Plus, Video } from 'lucide-react';
import { Setting2 } from 'iconsax-react';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 pt-14 overflow-y-auto">
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="absolute right-3 top-2.5 text-xs text-gray-400">⌘ k</span>
        </div>
        
        <div className="space-y-1">
          <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
            <div className="mr-3 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
              </svg>
            </div>
            <span>Dashboard</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
            <div className="mr-3 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 11H20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span>Meetings</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
            <div className="mr-3 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span>Activity Timeline</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
            <div className="mr-3 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>More</span>
          </a>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-2" />
              <span>Official Teams (6)</span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="mt-2 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 rounded bg-red-300"></div>
              <span>Leadership Team</span>
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 rounded bg-blue-300"></div>
              <span>Product Team</span>
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 rounded bg-green-300"></div>
              <span>Sales Team</span>
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
              <div className="mr-3 text-gray-400">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-gray-400">Create Team</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-2" />
              <span>Private Teams (0)</span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="mt-2 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
              <div className="mr-3 text-gray-400">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-gray-400">Create Team</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full border-t border-gray-200">
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
          <Video className="w-5 h-5 mr-3 text-gray-500" />
          <span className="text-sm">Watch a video</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
          <Setting2 className="w-5 h-5 mr-3 text-gray-500" />
          <span className="text-sm">Settings</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
