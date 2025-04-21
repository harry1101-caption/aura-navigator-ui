
import { FC } from 'react';
import { Filter, ChevronDown, Plus } from 'lucide-react';

interface SubheaderProps {}

const Subheader: FC<SubheaderProps> = () => {
  return (
    <div className="fixed top-14 left-64 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-200 rounded px-3 py-1.5">
          <svg className="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 11H20" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="mr-1 text-sm font-medium">Q2 2023</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center justify-center bg-white border border-gray-200 rounded px-4 py-1.5 text-sm font-medium">
            <svg className="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="11" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="17" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="mr-1">List</span>
          </button>
          
          <button className="flex items-center justify-center bg-white border border-gray-200 rounded px-4 py-1.5 text-sm font-medium text-primary border-primary bg-orange-50">
            <svg className="w-5 h-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Timeline</span>
          </button>
        </div>
      </div>
      
      <div className="ml-auto flex items-center space-x-2">
        <button className="flex items-center justify-center bg-white border border-gray-200 rounded px-2 py-1.5 text-sm font-medium">
          <Filter className="w-4 h-4 mr-1" />
          <span className="mr-1">Filter</span>
        </button>
        
        <button className="flex items-center justify-center bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-primary border-primary">
          <Plus className="w-4 h-4 mr-1" />
          <span>Rock</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Subheader;
