
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'About',
      links: ['Company Information', 'Contact Us', 'Careers', 'Press']
    },
    {
      title: 'Help',
      links: ['Account & Billing', 'Plans & Pricing', 'Supported Devices', 'Accessibility']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Preferences', 'Corporate Information']
    },
  ];

  const mobileFooterLinks = [
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
    'Contact Us',
    'Speed Test',
    'Legal Notices',
    'Only on Streamify'
  ];

  return (
    <footer className="w-full bg-background/60 text-white/70 py-10 px-4 md:px-12 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          <Facebook className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Instagram className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Youtube className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-4 gap-6 mb-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <Link to="#" className="inline-block px-4 py-2 border border-white/30 text-sm mb-4 hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
            <p className="text-sm">Service Code: 123-456-789</p>
          </div>
        </div>
        
        {/* Mobile Footer Accordion */}
        <div className="md:hidden mb-8">
          <Accordion type="single" collapsible className="w-full">
            {footerLinks.map((section) => (
              <AccordionItem key={section.title} value={section.title} className="border-white/20">
                <AccordionTrigger className="text-white/80 hover:text-white py-3">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 py-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link to="#" className="text-sm hover:text-white transition-colors">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Mobile Footer Links */}
        <div className="grid grid-cols-2 gap-3 md:hidden mb-8">
          {mobileFooterLinks.map((link) => (
            <Link key={link} to="#" className="text-sm hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="text-sm mt-8">
          <p>© {new Date().getFullYear()} Streamify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
