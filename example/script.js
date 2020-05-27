(function(document, randomAvatarGenerator){
  const avatarSize = 256;
  const randombox = document.getElementById('randombox');
  const generatedCodeOutput = document.getElementById('generatedcode');
  const avatarSizeInput = document.getElementById('avatarsize');
  const avatarSizeVal = document.getElementById('avatarSizeVal');
  const cellShapeSelect = document.getElementById('cellshape');

  const customRender = (resolution, indexX, indexY) => `M${(indexX * resolution) + (resolution /2)},${indexY * resolution} l${resolution * 0.5} ${resolution} l-${resolution} 0z`;

  let cellShape = cellShapeSelect.value === 'custom' ? customRender : cellShapeSelect.value;


  let size = parseInt(avatarSizeInput.value, 10);
  let avatarData = randomAvatarGenerator.generateRandomAvatarData(size);
  avatarSizeVal.innerText = size;

  generatedCodeOutput.innerText = avatarData;
  randombox.innerHTML = randomAvatarGenerator.getAvatarFromData(avatarData, avatarSize, cellShape);

  avatarSizeInput.addEventListener('input', (ev) => {
    avatarSizeVal.innerText = ev.srcElement.value;
  }, false);
  
  document.getElementById('updateimage').addEventListener('mouseup', (ev) => {
    ev.preventDefault();
    size = parseInt(avatarSizeInput.value, 10);
    cellShape = cellShapeSelect.value === 'custom' ? customRender : cellShapeSelect.value;
  
    avatarData = randomAvatarGenerator.generateRandomAvatarData(size);
    generatedCodeOutput.innerText = avatarData;
    randombox.innerHTML = randomAvatarGenerator.getAvatarFromData(avatarData, avatarSize, cellShape);
  })
  
})(document, randomAvatarGenerator);
