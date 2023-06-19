export default function loadAMapSDK(key) {
  return new Promise((resolve, reject) => {
    if (typeof wx === 'undefined') {
      reject(new Error('微信小程序环境未定义'));
    }
    if (typeof wx.getSystemInfo === 'undefined') {
      reject(new Error('当前微信版本过低，无法使用地图功能，请升级到最新微信版本后重试'));
    }
    if (typeof AMap === 'undefined') {
      const script = wx.createInnerAudioContext();
      script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}`;
      script.onError(reject);
      script.onCanplay(() => {
        resolve(AMap);
      });
      script.play();
    } else {
      resolve(AMap);
    }
  });
}
