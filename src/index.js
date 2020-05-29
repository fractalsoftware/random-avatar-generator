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

  if (!data) {
    return ret;
  }

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

export function getAvatarFromData(avatarData, width = 256, renderMethod = 'square', avatarDataSeparator = '-') {
  const { xAxis, yAxis, colorMap } = parseAvatarData(avatarData, avatarDataSeparator);
  const size = colorMap.length;
  const resolution = Math.floor(width / size);

  if (size < 1 || xAxis >= Math.pow(2, size)) {
    throw Error('Incorrect avatar data');
  }

  let renderProcess = (resolution, indexX, indexY) => `M${indexX * resolution},${indexY * resolution} h${resolution} v${resolution} h${0 - resolution}Z`;

  if (renderMethod === 'circle') {
    renderProcess = (resolution, indexX, indexY) => {
      const radius = resolution / 2;
      return `M${indexX * resolution},${(indexY * resolution) + radius} a${radius} ${radius} 0 1,1 ${resolution},0 a${radius} ${radius} 0 1,1 -${resolution},0`;
    }
  } else if (typeof renderMethod === 'function') {
    renderProcess = renderMethod;
  }

  const rows = getBinaryList(yAxis, size);
  const cols = getBinaryList(xAxis, size);
  let ret = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} ${width}">`;

  rows.forEach((rowItem, indexY) => {
    let draw = [];
    cols.forEach((colItem, indexX) => {
      if (parseInt(rowItem, 10) ^ parseInt(colItem, 10)) {
        draw.push(renderProcess(resolution, indexX, indexY));
      }
    });
    ret += `<path fill="#${colorMap[indexY]}" d="${draw.join(' ')}"/>`;
  });

  return `${ret}</svg>`;
}

export default function getRandomAvatar(size = 16, width = 256) {
  let avatarData = generateRandomAvatarData(size);
  return getAvatarFromData(avatarData, width);
}
