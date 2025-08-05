// hooks/useViewMode.js
import { useState } from 'react';

export default function useViewMode(initialMode = 'lyric') {
  const [viewMode, setViewMode] = useState(initialMode);
  
  const cycleMode = () => {
    setViewMode(prev => {
      if (prev === 'lyric') return 'staff';
      if (prev === 'staff') return 'simp'; 
      if (prev === 'simp') return 'amis';
      return 'lyric';
    });
  };
  
  return { viewMode, cycleMode };
}