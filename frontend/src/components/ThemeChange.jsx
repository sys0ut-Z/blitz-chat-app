import React from 'react'
import { useThemeStore } from '../store/themeStore'
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeChange = () => {
  const {theme, setTheme} = useThemeStore();

  return (
    <div className='rounded-full'>
      {
        theme === "light" ? (
          <MdOutlineDarkMode className='text-xl cursor-pointer' onClick={() => setTheme("dark")} />
        ) : (
          <MdOutlineLightMode className='text-xl cursor-pointer' onClick={() => setTheme("light")} />
        )
      }
    </div>
  )
}

export default ThemeChange