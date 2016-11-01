const assert = require('assert');
const Canvas = require('canvas');
const fs = require('fs');
const easyimg = require('easyimage');
const loader = require('../lib/loader');

const Image = Canvas.Image;
const pattern20 = [
  ['lred', 'lyellow', 'lgreen', 'lcyan', 'lblue', 'lmagenta'],
  ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
  ['dred', 'dyellow', 'dgreen', 'dcyan', 'dblue', 'dmagenta'],
  ['white', 'white', 'white', 'black', 'black', 'black'],
];

function load(filename, codelSize) {
  return easyimg.info(filename).then((info) => {
    const data = fs.readFileSync(filename);
    const image = new Image();
    image.src = data;
    const width = info.width / codelSize;
    const height = info.height / codelSize;
    const canvas = new Canvas(width * codelSize, height * codelSize);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const v = loader.load(ctx, codelSize);
    return new Promise((r) => r(v));
  });
}

describe('loader', () => {
  describe('load test pattern', () => {
    it('codel size: 1', () => {
      const filename = 'test/images/colors.png';
      return load(filename, 1).then((v) => assert.deepEqual(pattern20, v));
    });
    it('cc: 25', () => {
      const filename = 'test/images/colors25.png';
      return load(filename, 25).then((v) => assert.deepEqual(pattern20, v));
    });
  });
  it('load 10 codel image', () => {
    const filename = 'test/images/devide_by_2.10cs.11x4.png';
    const code = [
      ['lred', 'dblue', 'dgreen', 'lyellow', 'lmagenta', 'dyellow', 'cyan', 'dred', 'black', 'white', 'dred'],
      ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'dred', 'dred', 'white', 'dred'],
      ['white', 'dcyan', 'white', 'white', 'white', 'black', 'white', 'yellow', 'black', 'white', 'dred'],
      ['white', 'dcyan', 'dcyan', 'dcyan', 'dcyan', 'dcyan', 'dyellow', 'yellow', 'white', 'black', 'dred'],
    ];
    return load(filename, 10).then((v) => assert.deepEqual(code, v));
  });
});
