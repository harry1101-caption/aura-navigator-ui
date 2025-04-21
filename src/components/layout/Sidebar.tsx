
import { FC } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import { Category, Calendar, Timer, Video, Setting2 } from 'iconsax-react';
import { NavLink } from 'react-router-dom';

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

        <div className="space-y-0.25">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex items-center px-3 py-1 text-sm rounded-md ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`
            }
          >
            <div className="mr-3 text-gray-500">
              <Category size={20} variant="Bulk" className="w-5 h-5" />
            </div>
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/rocks" 
            className={({isActive}) => 
              `flex items-center px-3 py-1 text-sm rounded-md ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`
            }
          >
            <div className="mr-3 text-gray-500">
              <Calendar size={20} variant="Bulk" className="w-5 h-5" />
            </div>
            <span>Rocks</span>
          </NavLink>
          <NavLink 
            to="/meetings" 
            className={({isActive}) => 
              `flex items-center px-3 py-1 text-sm rounded-md ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`
            }
          >
            <div className="mr-3 text-gray-500">
              <Timer size={20} variant="Bulk" className="w-5 h-5" />
            </div>
            <span>Activity Timeline</span>
          </NavLink>
          <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100">
            <div className="mr-3 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>More</span>
          </a>
        </div>

        <div className="pt-2 pb-1">
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-2" />
              <span>Official Teams (6)</span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
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

        <div className="pt-1 pb-1">
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-2" />
              <span>Private Teams (0)</span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
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
          <span className="mr-3 text-gray-500">
            <Video size={20} variant="Bulk" className="w-5 h-5" />
          </span>
          <span className="text-sm">Watch a video</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
          <span className="mr-3 text-gray-500">
            <Setting2 size={20} variant="Bulk" className="w-5 h-5" />
          </span>
          <span className="text-sm">Settings</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
