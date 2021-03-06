import React from 'react';

export const EnvelopeFillIcon = ({ width = 18, height = 18 }) => (
    <svg
        tabIndex={-1}
        focusable="false"
        className="svg-icon icon-envelope"
        width={width}
        height={height}
        viewBox="0 0 64 64"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#202020"
            d="M2 14.7v34.4l17.2-17.5L2 14.7zm42.8 16.9L62 49.1V14.7L44.8 31.6z"
        />
        <path fill="#202020" d="M59.1 12H5l27 26.6L59.1 12z" />
        <path
            fill="#202020"
            d="M32 44.2l-10-9.8L4.7 52h54.6L42 34.4l-10 9.8z"
        />
    </svg>
);
