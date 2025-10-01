import React from 'react';

const CleanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M15 16.5c-.36 0-.71-.04-1.05-.11L12.5 18H6v-1.5l.95-.95c.57-.57.95-1.35.95-2.2V11c0-1.05.5-2.01 1.3-2.69l1.45-1.21-1.2-1.2L8.2 7.15c-.47-.47-1.12-.6-1.7-.45L4 8V6l2.5-1.5L4 3v2L2 7v2l2-1.5V18c0 1.1.9 2 2 2h7.5l1.45 1.45c.29.29.68.45 1.05.45.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM19 2l-4 4 4 4 4-4-4-4zm0 10l-2 2 2 2 2-2-2-2z"/>
    </svg>
);

export default CleanIcon;
