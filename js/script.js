function randomHexColor() {
  return `${(Math.floor(Math.random() * 16777215).toString(16)).padStart(6, '0')}`;
}

function getBinaryList(number, size) {
  return number.toString(2)
    .padStart(size, '0')
    .split('');
}

function drawRandomAvatar(element, resolution = 8, size = 16) {
  const xAxis = Math.floor(Math.random() * Math.pow(2, size));
  const yAxis = Math.floor(Math.random() * (Math.pow(2, size) - 1)) + 1;

  const rows = getBinaryList(yAxis, size);
  const cols = getBinaryList(xAxis, size);
  const colorMap = [];

  element.style.width = `${size * resolution}px`;

  rows.forEach((rowItem, item) => {    
    let color = randomHexColor();
    colorMap.push(color);
    cols.forEach(colItem => {
      const enabled = parseInt(rowItem, 10) ^ parseInt(colItem, 10);
      element.insertAdjacentHTML('beforeend', `<div style="width:${resolution}px; height:${resolution}px;background:${enabled ? `#${color}` : 'transparent'}"></div>`);
    });
  });

  return {
    y: yAxis,
    x: xAxis,
    c: colorMap
  };
}

function drawAvatarFromData(element, resolution, avatarData) {
  const { x: xAxis, y: yAxis, c: colorMap } = avatarData;
  const size = colorMap.length;

  if (xAxis >= Math.pow(2, size)) {
    throw Error('xAxis should be a number lower than size');
  }
  if (yAxis >= Math.pow(2, size)) {
    throw Error('yAxis should be a number lower than size');
  }

  console.log(JSON.stringify(avatarData));
  console.log(btoa(JSON.stringify(avatarData)));

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
  const resolution = 16;
  const size = 8;
  const randombox = document.getElementById('randombox');
  const recreatedavatar = document.getElementById('recreatedavatar');
  const generatedCodeOutput = document.getElementById('generatedcode');

  let avatarData = drawRandomAvatar(randombox, resolution, size);
  generatedCodeOutput.innerText = JSON.stringify(avatarData);
  drawAvatarFromData(recreatedavatar, resolution, avatarData);
  
  document.getElementById('updateimage').addEventListener('mouseup', (ev) => {
    ev.preventDefault();
    randombox.innerHTML = '';
    recreatedavatar.innerHTML = '';
    avatarData = drawRandomAvatar(randombox, resolution, size);
    generatedCodeOutput.innerText = JSON.stringify(avatarData);
    drawAvatarFromData(recreatedavatar, resolution, avatarData);
  })

})(document);
