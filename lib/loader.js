const colors = {
  lred: 0xffc0c0, // light red
  lyellow: 0xffffc0, // light yellow
  lgreen: 0xc0ffc0, // light green
  lcyan: 0xc0ffff, // light cyan
  lblue: 0xc0c0ff, // light blue
  lmagenta: 0xffc0ff, // light magenta

  red: 0xff0000, // red
  yellow: 0xffff00, // yellow
  green: 0x00ff00, // green
  cyan: 0x00ffff, // cyan
  blue: 0x0000ff, // blue
  magenta: 0xff00ff, // magenta

  dred: 0xc00000, // dark red
  dyellow: 0xc0c000, // dark yellow
  dgreen: 0x00c000, // dark green
  dcyan: 0x00c0c0, // dark cyan
  dblue: 0x0000c0, // dark blue
  dmagenta: 0xc000c0, // dark magenta

  white: 0xffffff, // white
  black: 0x000000, // black
};

function pickColor(ctx, x, y) {
  const img = ctx.getImageData(x, y, 1, 1);
  const data = img.data;
  return (data[0] << 16) + (data[1] << 8) + (data[2] << 0);
}

function load(ctx, codelSize) {
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;
  const code = new Array(height).fill(
    new Array(width).fill('black')
  );

  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      const color = pickColor(ctx, j * codelSize, i * codelSize);
      for (const k of Object.keys(colors)) {
        if (color === colors[k]) {
          code[i][j] = k;
          break;
        }
      }
    }
  }
  return code;
}

module.exports = {
  colors,
  load,
};
