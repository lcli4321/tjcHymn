// hooks/useRepeatMode.js
import { useState } from 'react';

export default function useRepeatMode(initialMode = 'repeat_no') {
  const [mode, setMode] = useState(initialMode); // 使用傳入的初始值
  
  const toggle = () => {
    setMode(prev => {
      if (prev === 'repeat_no') return 'repeat_all';
      if (prev === 'repeat_all') return 'repeat_one';
      return 'repeat_no';
    });
  };
  
  const icon = {
    repeat_no: require('../assets/icons/repeat_no.png'),
    repeat_all: require('../assets/icons/repeat_all.png'),
    repeat_one: require('../assets/icons/repeat_one.png'),
  }[mode];
  
  return { mode, icon, toggle };
}