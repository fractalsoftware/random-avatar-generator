function decToHexColor(colorNumber) {
  return `${colorNumber.toString(16).padStart(6, '0')}`;
}

function getBinaryList(number, size) {
  return number.toString(2)
    .padStart(size, '0')
    .split('');
  }
  
function parseAvatarData(data, separator = '-') {
  const ret = {
    xAxis: 0,
    yAxis: 0,
    colorMap: []
  };

  data.split(separator).forEach((element, index) => {
    let intVal = parseInt(element, 36);

    switch (index) {
      case 0:
        ret.xAxis = intVal;
        break;
      case 1:
        ret.yAxis = intVal;
        break;
    
      default:
        ret.colorMap.push(decToHexColor(intVal));
        break;
    }
  });

  return ret;
}

export function generateRandomAvatarData(size = 16, avatarDataSeparator = '-') {
  const xAxis = Math.floor(Math.random() * Math.pow(2, size - 1));
  const yAxis = Math.floor(Math.random() * (Math.pow(2, size) - 1)) + 1;

  const rows = getBinaryList(yAxis, size);
  let ret = `${xAxis.toString(36)}${avatarDataSeparator}${yAxis.toString(36)}`;
  let color;

  rows.forEach(() => {    
    color = Math.floor(Math.random() * 16777215);
    ret += `${avatarDataSeparator}${color.toString(36)}`;
  });

  return ret;
}

export function getAvatarFromData(element, resolution, avatarData) {
  const { xAxis, yAxis, colorMap } = parseAvatarData(avatarData);
  const size = colorMap.length;

  if (xAxis >= Math.pow(2, size)) {
    throw Error('xAxis should be a number lower than size');
  }
  if (yAxis >= Math.pow(2, size)) {
    throw Error('yAxis should be a number lower than size');
  }

  const rows = getBinaryList(yAxis, size);
  const cols = getBinaryList(xAxis, size);

  element.style.width = `${size * resolution}px`;

  rows.forEach((rowItem, index) => {
    let color = colorMap[index];
    cols.forEach(colItem => {
      const enabled = parseInt(rowItem, 10) ^ parseInt(colItem, 10);
      element.insertAdjacentHTML('beforeend', `<div style="width:${resolution}px; height:${resolution}px;background:${enabled ? `#${color}` : 'transparent'}"></div>`);
    });
  });  
}

export default function getRandomAvatar(resolution = 8, size = 16) {
  let avatarData = generateRandomAvatarData(size);
  return getAvatarFromData(element, resolution, avatarData);
}
