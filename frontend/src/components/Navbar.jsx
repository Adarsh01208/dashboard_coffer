import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="bg-slate-50 dark:bg-white-900 text-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <img
                        src="https://blackcoffer.com/wp-content/uploads/2023/10/Black-720x172-4.png"
                        className="h-8"
                        alt="BlackCoffer Logo"
                    />
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar