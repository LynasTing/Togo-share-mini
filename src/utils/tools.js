export function modifyPostParam (obj) {
  let query = '', name, value, fullSubName, subName, subValue, innerObj, i;
  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += this.modifyPostParam(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += this.modifyPostParam(innerObj) + '&';
      } 
    } else if (value !== undefined && value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }
  return query.length ? query.substr(0, query.length - 1) : query;
};

// 字符串过长切割
export function splitString(str, length) {
  if (typeof str !== 'string' || typeof length !== 'number') {
    return ''
  }
  if (length <= 0) {
    console.log(`未传入切割位数或位数小于0 + ::>>`, )
    // throw new Error('长度不能小于0');
  }
  if(str.length <= length) {
    return str
  }
  return str.substring(0, length) + '...'
}
// 计时器 实时时间
export const displayTime = (timestamp) => {
  const elapsedTime = ((Date.now() - new Date(timestamp).getTime()) / 1000 )
  let now = ''
  let h, m, s
  const padZero = (val) => {
    return (val < 10 ? '0' : '') + val
  }
  if(elapsedTime >= 3600) {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor((elapsedTime % 3600) / 60)
    s = Math.floor(elapsedTime % 60)
  }else {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor(elapsedTime / 60) 
    s = Math.floor(elapsedTime % 60) 
  }
  now = padZero(h) + ' 时 ' + padZero(m) + ' 分 ' + padZero(s)
  return now
}