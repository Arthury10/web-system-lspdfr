import { useCallback, useState } from "react";

export const useResizable = () => {
  const [size, setSize] = useState({ width: '75%', height: '75%' });

  const handleResizeMouseDown = useCallback((e: any) => {
    if (e.button !== 0) return;

    const startWidth = e.currentTarget.parentElement.offsetWidth;
    const startHeight = e.currentTarget.parentElement.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;

    const doResize = (e: any) => {
      setSize({
        width: `${startWidth + (e.clientX - startX)}px`,
        height: `${startHeight + (e.clientY - startY)}px`,
      });
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);

    e.preventDefault();
  }, []);

  return { size, handleResizeMouseDown };
};
