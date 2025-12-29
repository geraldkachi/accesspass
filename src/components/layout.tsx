import React from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import { useAuthStore } from '../store/authStore'

const Layout = () => {
const { isLoading } = useAuthStore();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="flex h-screen antialiased bg-[#E8E9EE]">
		<Sidebar />
		<div id="target" className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
			<Navbar />
			<div className="w-full flex justify-center flex-1 p-4">
				<main className="w-full space-y-4">
					<Outlet />
				</main>
			</div>
		</div>
	</div>
  )
}

export default Layout