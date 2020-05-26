(function(document, randomAvatarGenerator){
  const avatarSize = 256;
  const randombox = document.getElementById('randombox');
  const generatedCodeOutput = document.getElementById('generatedcode');
  const avatarSizeInput = document.getElementById('avatarsize');
  const avatarSizeVal = document.getElementById('avatarSizeVal');

  let size = parseInt(avatarSizeInput.value, 10);
  let resolution = Math.floor(avatarSize / size);
  let avatarData = randomAvatarGenerator.generateRandomAvatarData(size);
  avatarSizeVal.innerText = size;

  generatedCodeOutput.innerText = avatarData;
  randomAvatarGenerator.getAvatarFromData(randombox, resolution, avatarData);

  avatarSizeInput.addEventListener('input', (ev) => {
    avatarSizeVal.innerText = ev.srcElement.value;
  }, false);
  
  document.getElementById('updateimage').addEventListener('mouseup', (ev) => {
    ev.preventDefault();
    size = parseInt(avatarSizeInput.value, 10);
    resolution = Math.floor(avatarSize / size);
  
    avatarData = randomAvatarGenerator.generateRandomAvatarData(size);
    generatedCodeOutput.innerText = avatarData;
    randombox.innerHTML = '';
    randomAvatarGenerator.getAvatarFromData(randombox, resolution, avatarData);

  })
  
})(document, randomAvatarGenerator);
