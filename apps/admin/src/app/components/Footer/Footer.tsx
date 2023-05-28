import React from 'react';
import { Footer as FooterShared } from '@pizza-app/ui-shared';
const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'Pricing', link: '' },
      { label: 'Support', link: '' },
      { label: 'Forums', link: '' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Email newsletter', link: '' },
      { label: 'Follow on twitter', link: '' },
      { label: 'Follow on Linkedin', link: '' },
    ],
  },
];

const Footer = () => {
  return <FooterShared data={footerLinks} />;
};

export default Footer;
