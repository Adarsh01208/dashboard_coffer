import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-rose-700 text-white text-center p-4 w-full fixed bottom-0">
            <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </footer>
    );
}

export default Footer;