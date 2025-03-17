import { Github, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-300 py-4 px-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Social Links */}
        <div className="flex space-x-4 fixed bottom-5 right-5">
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Linkedin size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;