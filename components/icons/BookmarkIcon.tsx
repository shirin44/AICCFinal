// /components/icons/BookmarkIcon.tsx
import React from "react";

type Props = React.SVGProps<SVGSVGElement> & { filled?: boolean };

const BookmarkIcon: React.FC<Props> = ({ filled = false, ...props }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path
      d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default BookmarkIcon;
