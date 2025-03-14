import React from 'react'
export default function Button({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
    return (
        <button
            className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden"
            onClick={onClick}
        >
            <span
                className="block rounded-full bg-white px-4 py-2 text-sm font-medium group-hover:bg-transparent"
            >
                {children}
            </span>
        </button>
    )
}