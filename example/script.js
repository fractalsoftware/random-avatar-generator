(function (document, randomAvatarGenerator) {
  const avatarSize = 256;
  const randomicon = document.getElementById('randomicon');
  const randombox = document.getElementById('randombox');
  const generatedCodeOutput = document.getElementById('generatedcode');
  const svgCodeOutput = document.getElementById('svgcode');
  const avatarCodeInput = document.getElementById('avatarcodeinput');
  const avatarComplexityInput = document.getElementById('avatarcomplexity');
  const avatarComplexityVal = document.getElementById('avatarComplexityVal');
  const cellShapeSelect = document.getElementById('cellshape');
  const svgFileSize = document.getElementById('svgFileSize');

  randomicon.innerHTML = randomAvatarGenerator.getRandomAvatar(4);

  const getRenderMethod = (method) => {
    switch (method) {
      case 'custom triangle':
        return (res, iX, iY) => `M${(iX * res) + (res / 2)},${iY * res} l${res / 2} ${res} l-${res} 0z`;
      case 'custom diamond':
        return (res, iX, iY) => `M${(iX * res) + (res / 2)},${iY * res} l${res / 2} ${res / 2} l-${res / 2} ${res / 2} l-${res / 2} -${res / 2}z`;
      case 'custom heart':
        return (res, iX, iY) => `M${(iX * res) + (res * (5 / 64))},${(iY * res) + (res / 2)} a${res / 4},${res / 4} 0 1,1 ${res * (3 / 8)},-${res * (3 / 8)} a${res / 4},${res / 4} 0 1,1 ${res * (3 / 8)},${res * (3 / 8)} l-${res * (3 / 8)},${res * (3 / 8)}z`;
      default:
        return method;
    }
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  const byteSize = str => formatBytes(new Blob([str]).size);

  let cellShape = getRenderMethod(cellShapeSelect.value);

  let complexity = parseInt(avatarComplexityInput.value, 10);
  let avatarData = randomAvatarGenerator.generateRandomAvatarData(complexity);
  avatarComplexityVal.innerText = complexity;

  generatedCodeOutput.innerText = avatarData;
  randombox.innerHTML = randomAvatarGenerator.getAvatarFromData(avatarData, avatarSize, cellShape);
  svgFileSize.innerText = byteSize(randombox.innerHTML);
  svgCodeOutput.innerText = randombox.innerHTML;

  avatarComplexityInput.addEventListener('input', (ev) => {
    avatarComplexityVal.innerText = ev.srcElement.value;
  }, false);

  avatarCodeInput.addEventListener('input', (ev) => {
    const avatarCode = ev.srcElement.value.trim();
    if (avatarCode) {
      avatarComplexityInput.disabled = true;
    } else {
      avatarComplexityInput.disabled = false;
    }
  });

  document.getElementById('updateimage').addEventListener('mouseup', (ev) => {
    ev.preventDefault();
    const avatarCode = avatarCodeInput.value.trim();

    if (avatarCode) {
      avatarData = avatarCode;
    } else {
      complexity = parseInt(avatarComplexityInput.value, 10);
      avatarData = randomAvatarGenerator.generateRandomAvatarData(complexity);
    }

    cellShape = getRenderMethod(cellShapeSelect.value);
    generatedCodeOutput.innerText = avatarData;
    try {
      randombox.innerHTML = randomAvatarGenerator.getAvatarFromData(avatarData, avatarSize, cellShape);
      svgFileSize.innerText = byteSize(randombox.innerHTML);
      svgCodeOutput.innerText = randombox.innerHTML;
    } catch (e) {
      randombox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><text x="20" y="50" fill="#d40">ERROR: Wrong avatar code</text></svg>';
      svgCodeOutput.innerText = e.message;
    }
  })

})(document, randomAvatarGenerator);
