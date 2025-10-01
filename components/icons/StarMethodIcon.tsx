import React from 'react';

type IconType = 'situation' | 'task' | 'action' | 'result';

interface StarMethodIconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

const icons: Record<IconType, React.ReactNode> = {
  situation: (
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  ),
  task: (
     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  ),
  action: (
    <path d="M9.8 8.9L7 11.7V18h2v-6l1.8-2.1 1.1 1.5-1.2 3.8 1.9 1.3 2.1-7.6-3.2-1.3zM13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
  ),
  result: (
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  ),
};

const StarMethodIcon: React.FC<StarMethodIconProps> = ({ type, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" {...props}>
    {icons[type]}
  </svg>
);

export default StarMethodIcon;
