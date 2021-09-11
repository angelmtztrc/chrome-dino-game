import kaboom from 'kaboom';

const main = document.getElementById('main');

const FLOOR_HEIGHT = 20;
const JUMP_FORCE = 800;
const SPEED = 200;

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  root: main
});

layers(['bg', 'game', 'ui'], 'game');

loadRoot('src/images/');
loadSprite('desert', 'background.png');
loadSprite('dino', 'dino.png');
loadSprite('cactus', 'cactus.png');

scene('game', () => {
  gravity(2200);

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
  const dino = add([sprite('dino'), pos(40, height() - 100), area(), body()]);

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
  const jump = () => dino.grounded() && dino.jump(JUMP_FORCE);

  // on actions
  keyPress('space', jump);
  keyPress('up', jump);
  keyPress('w', jump);

  // function to spawn a random cactus
  const spawnCactus = () => {
    add([
      sprite('cactus'),
      scale(0.8),
      pos(width(), height() - FLOOR_HEIGHT),
      origin('botleft'),
      move(LEFT, SPEED)
    ]);

    wait(rand(1, 2), spawnCactus);
  };

  spawnCactus();
});

go('game');
