import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-rose-700 text-white text-center p-4 w-full  bottom-0">
            <p>© {new Date().getFullYear()} BlackCoffer. All rights reserved.</p>
        </footer>
    );
}

export default Footer;