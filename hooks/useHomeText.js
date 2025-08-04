import { useState } from 'react';

export const useHomeText = () => {
  const [text, setText] = useState('This is home fragment');
  
  return { text, setText };
};

// 如果您想要直接返回文本值（用於簡單的文本顯示）
export const useHomeTextValue = () => {
  const [text] = useState('This is home fragment');
  return text;
};