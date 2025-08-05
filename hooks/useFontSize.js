// hooks/useFontSize.js
import { useState } from 'react';

export default function useFontSize(initialSize = 24) { // 添加初始值參數
  const [fontSize, setFontSize] = useState(initialSize);
  
  // 其他邏輯保持不變
  return { fontSize, setFontSize };
}