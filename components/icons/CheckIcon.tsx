import React from 'react';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M9 16.2l-3.5-3.5a.984.984 0 010-1.4.984.984 0 011.4 0L9 13.4l7.1-7.1a.984.984 0 011.4 0 .984.984 0 010 1.4L9 16.2z"/>
    </svg>
);

export default CheckIcon;
