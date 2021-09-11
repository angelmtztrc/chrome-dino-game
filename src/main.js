import kaboom from 'kaboom';

const main = document.getElementById('main');

const FLOOR_HEIGHT = 20;

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  root: main
});

layers(['bg', 'game', 'ui'], 'game');

loadRoot('src/images/');
loadSprite('dino', 'dino.png');
loadSprite('desert', 'background.png');

scene('game', () => {
  gravity(2400);

  // adds a background
  add([
    sprite('desert', {
      width: width(),
      height: height()
    }),
    layer('bg'),
    pos(0, 0)
  ]);

  // adds the dino
  const dino = add([
    sprite('dino'),
    pos(30, height() - 100),
    scale(1),
    area(),
    body()
  ]);

  // adds the floor
  add([
    rect(width(), FLOOR_HEIGHT),
    pos(0, height() - FLOOR_HEIGHT),
    area(),
    solid(),
    color(255, 255, 255),
    opacity(0)
  ]);

  // actions
  const jump = () => dino.grounded() && dino.jump();

  // on actions
  keyPress('space', jump);
});

go('game');
