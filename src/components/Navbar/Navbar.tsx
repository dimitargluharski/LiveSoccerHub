import { NavLink } from 'react-router-dom';
// import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
// import { HiOutlinePlay } from "react-icons/hi";
// import { HiPresentationChartBar } from "react-icons/hi";
// import { HiAdjustments } from "react-icons/hi";
import { HiViewGrid } from "react-icons/hi";

export const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between bg-black h-full gap-2 p-2 max-w-sm">
      <div className='flex flex-col gap-4'>
        <NavLink to="/" className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-lime-400 rounded-md w-full' : 'text-gray-500'} flex justify-center items-center p-2`}>
          <HiViewGrid className='w-7 h-7' />
        </NavLink>

        <NavLink to="/scheduled" className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-lime-400 rounded-md w-full' : 'text-gray-500'} flex justify-center items-center p-2`}>
          <HiOutlineCalendar className='w-7 h-7' />
        </NavLink>

        {/* <NavLink to="/highlights" className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-lime-400 rounded-md' : 'text-gray-500'} flex justify-center items-center p-2`}>
          <HiOutlinePlay className='w-7 h-7' />
        </NavLink>

        <NavLink to="/statistics" className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-lime-400 rounded-md' : 'text-gray-500'} flex justify-center items-center p-2`}>
          <HiPresentationChartBar className='w-7 h-7' />
        </NavLink > */}
      </div>


      <div>
        {/* <NavLink to="/user-options" className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-lime-400 rounded-md' : 'text-gray-500'} flex justify-center items-center p-2`}>
          <HiAdjustments className='w-7 h-7' />
        </NavLink > */}
      </div>
    </nav>
  )
}