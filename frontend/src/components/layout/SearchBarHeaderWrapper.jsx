import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SearchBarWrapper = ({ isVisible, children }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      gsap.to(barRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(barRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={barRef}
      style={{ overflow: 'hidden', height: 0, opacity: 0 }}
      className="bg-custom-search/80 backdrop-blur-sm px-4 py-2 border-t-2 border-emerald-400 shadow-sm"
      >
      {children}
    </div>
  );
};

export default SearchBarWrapper;
