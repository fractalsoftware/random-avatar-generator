import { getRandomAvatar, getAvatarFromData, generateRandomAvatarData } from './index.js';

describe('Generate random avatar Ddta', () => {
  it('should return a random code from default values', () => {
    const avatarCode = generateRandomAvatarData();
    expect(avatarCode.split('-').length).toEqual(18);
  });
  it('should return a random code', () => {
    const avatarCode = generateRandomAvatarData(4);
    expect(avatarCode.split('-').length).toEqual(6);
  });
});

describe('Get svg from avatar data', () => {
  it('should fail if wrong avatar code is submited', () => {
    expect(() => getAvatarFromData('')).toThrow('Incorrect avatar data');
    expect(() => getAvatarFromData('', '.')).toThrow('Incorrect avatar data');
  });
  it('should return a fixed svg for a given code', () => {
    expect(getAvatarFromData('0-2-3azl4-anrw'))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#54b5a8" d="M0,0 h128 v128 h-128Z M128,0 h128 v128 h-128Z"/><path fill="#0796dc" d=""/></svg>');
  });
  it('should return a svg for a given code', () => {
    expect(getAvatarFromData('1-2-4orq2-yhy8'))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#78265a" d="M0,0 h128 v128 h-128Z"/><path fill="#188f60" d="M128,128 h128 v128 h-128Z"/></svg>');
  });
  it('should return a svg rendered with circles for a given code', () => {
    expect(getAvatarFromData('1-2-4orq2-yhy8', 'circle'))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#78265a" d="M0,64 a64 64 0 1,1 128,0 a64 64 0 1,1 -128,0"/><path fill="#188f60" d="M128,192 a64 64 0 1,1 128,0 a64 64 0 1,1 -128,0"/></svg>');
  });
  it('should return a svg rendered with a custom method', () => {
    const renderTriangles = (res, iX, iY) => `M${(iX * res) + (res / 2)},${iY * res} l${res / 2} ${res} l-${res} 0z`;
    expect(getAvatarFromData('1-2-4orq2-yhy8', renderTriangles))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#78265a" d="M64,0 l64 128 l-128 0z"/><path fill="#188f60" d="M192,128 l64 128 l-128 0z"/></svg>');
  });
});

describe('Get a random svg avatar', () => {
  it('should return a random svg', () => {
    expect(getRandomAvatar()).toMatch(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="100%" height="100%" viewBox="0 0 256 256">.+<\/svg>/);
    expect(getRandomAvatar(2, 'circle')).toMatch(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="100%" height="100%" viewBox="0 0 256 256">.+<\/svg>/);
    expect(getRandomAvatar(2, 'circle', 16)).toMatch(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="100%" height="100%" viewBox="0 0 16 16">.+<\/svg>/);
  });
});