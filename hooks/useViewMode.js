import { useState } from 'react';

const modes = ['lyric', 'simple', 'staff', 'amis'];

export default function useViewMode(initial = 'lyric') {
  const [viewMode, setViewMode] = useState(initial);

  const cycleMode = () => {
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  return { viewMode, setViewMode, cycleMode };
}
