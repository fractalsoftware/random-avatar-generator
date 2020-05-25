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

function drawRandomAvatar(element, resolution = 8, size = 16, avatarDataSeparator = '-') {
  const xAxis = Math.floor(Math.random() * Math.pow(2, size - 1));
  const yAxis = Math.floor(Math.random() * (Math.pow(2, size) - 1)) + 1;

  const rows = getBinaryList(yAxis, size);
  const cols = getBinaryList(xAxis, size);
  let ret = `${xAxis.toString(36)}${avatarDataSeparator}${yAxis.toString(36)}`;

  element.style.width = `${size * resolution}px`;

  rows.forEach(rowItem => {    
    let color = Math.floor(Math.random() * 16777215);
    ret += `${avatarDataSeparator}${color.toString(36)}`;
    cols.forEach(colItem => {
      const enabled = parseInt(rowItem, 10) ^ parseInt(colItem, 10);
      element.insertAdjacentHTML('beforeend', `<div style="width:${resolution}px; height:${resolution}px;background:${enabled ? `#${decToHexColor(color)}` : 'transparent'}"></div>`);
    });
  });

  return ret;
}

function drawAvatarFromData(element, resolution, avatarData) {
  const { xAxis, yAxis, colorMap } = avatarData;
  const size = colorMap.length;

  if (xAxis >= Math.pow(2, size)) {
    throw Error('xAxis should be a number lower than size');
  }
  if (yAxis >= Math.pow(2, size)) {
    throw Error('yAxis should be a number lower than size');
  }

  console.log(JSON.stringify(avatarData));

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

(function(document){
  const avatarSize = 256;
  const randombox = document.getElementById('randombox');
  const recreatedavatar = document.getElementById('recreatedavatar');
  const generatedCodeOutput = document.getElementById('generatedcode');
  const avatarSizeInput = document.getElementById('avatarsize');
  const avatarSizeVal = document.getElementById('avatarSizeVal');

  let size = parseInt(avatarSizeInput.value, 10);
  let resolution = Math.floor(avatarSize / size);
  avatarSizeVal.innerText = size;
  
  let avatarData = drawRandomAvatar(randombox, resolution, size);
  console.log(avatarData);
  console.log(btoa(avatarData));
  generatedCodeOutput.innerText = avatarData;
  // drawAvatarFromData(recreatedavatar, resolution, parseAvatarData(avatarData));

  avatarSizeInput.addEventListener('input', (ev) => {
    avatarSizeVal.innerText = ev.srcElement.value;
  }, false);
  
  document.getElementById('updateimage').addEventListener('mouseup', (ev) => {
    ev.preventDefault();
    size = parseInt(avatarSizeInput.value, 10);
    resolution = Math.floor(avatarSize / size);
  
    randombox.innerHTML = '';
    recreatedavatar.innerHTML = '';
    avatarData = drawRandomAvatar(randombox, resolution, size);
    console.log(avatarData);
    console.log(btoa(avatarData));
    generatedCodeOutput.innerText = avatarData;
    // drawAvatarFromData(recreatedavatar, resolution, parseAvatarData(avatarData));
  })
  
})(document);
