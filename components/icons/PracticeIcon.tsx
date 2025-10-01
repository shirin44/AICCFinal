import React from 'react';

const PracticeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.5c1.38 0 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5s-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5zM12 18c-2.42 0-4.5-1.4-5.46-3.51L7.8 13.23c.51.52 1.16.89 1.88 1.09.43.12.87.18 1.32.18s.89-.06 1.32-.18c.72-.2 1.37-.57 1.88-1.09l1.26 1.26C16.5 16.6 14.42 18 12 18z"/>
  </svg>
);

export default PracticeIcon;
