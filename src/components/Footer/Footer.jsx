import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white">IndieGamie</h2>
                        <p>Connecting game developers worldwide.</p>
                        <div className="flex space-x-4">
                            <SocialIcon Icon={Github} href="https://github.com/ganeshdole" />
                            <SocialIcon Icon={Twitter} href="https://x.com/indieGamies" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink href="/about" text="About Us" />
                            <FooterLink href="/games" text="Games" />
                            <FooterLink href="/developers" text="Developers" />
                            <FooterLink href="/contact" text="Contact" />
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Newsletter</h3>
                        <p>Stay updated with the latest in indie game development.</p>
                        <form className="flex mt-4 flex-col lg:flex-row gap-1 lg:gap-0">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-2 rounded-lg lg:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 w-full "
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 rounded-lg hover:bg-indigo-700 text-white px-4 py-2 lg:rounded-r-lg transition-colors duration-300 "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500">&copy; 2024 IndieGamie. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, text }) => (
    <li>
        <Link to={href} className="hover:text-white transition-colors duration-300">
            {text}
        </Link>
    </li>
);

const SocialIcon = ({ Icon, href }) => (
    <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors duration-300"
    >
        <Icon size={24} />
    </Link>
);

export default Footer;
