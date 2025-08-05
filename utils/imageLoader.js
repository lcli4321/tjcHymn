// utils/imageLoader.js
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    const key = item.replace('./', '').replace('.gif', '');
    images[key] = r(item);
  });
  return images;
}

// 自動載入 assets/views 資料夾下所有 .gif 檔案
const imageMap = importAll(
  require.context('../assets/views', false, /\.gif$/)
);

export const getViewImages = (viewMode, hymnId) => {
  const idStr = hymnId.toString().padStart(3, '0');
  const base = `${viewMode}_${idStr}`;
  const images = [];
  
  // 檢查單一圖片
  if (imageMap[base]) {
    images.push(imageMap[base]);
  } else {
    // 檢查多張圖片
    for (let i = 1; i <= 5; i++) {
      const key = `${base}-${i}`;
      if (imageMap[key]) {
        images.push(imageMap[key]);
      } else {
        break;
      }
    }
  }
  
  return images;
};