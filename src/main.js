import kaboom from 'kaboom';

const main = document.getElementById('main');

const FLOOR_HEIGHT = 20;
const JUMP_FORCE = 800;
const SPEED = 250;

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
  const jump = () => {
    if (dino.grounded()) {
      dino.jump(JUMP_FORCE);
    }
  };

  // on actions
  keyPress('space', jump);
  keyPress('up', jump);
  keyPress('w', jump);

  // function to spawn a random cactus
  const spawnCactus = () => {
    add([
      area(),
      sprite('cactus'),
      scale(0.8),
      pos(width(), height() - FLOOR_HEIGHT),
      origin('botleft'),
      move(LEFT, SPEED),
      'cactus'
    ]);

    wait(rand(1.5, 3), spawnCactus);
  };

  // start the spawn of cactus
  spawnCactus();

  let score = 0;

  const scoreLabel = add([text(score), pos(width() / 2 - 100, 0)], scale(0.5));

  action(() => {
    score++;
    scoreLabel.text = score;
  });

  // on dino collides
  dino.collides('cactus', () => {
    go('lose', score);
  });
});

scene('lose', score => {
  // adds a background
  add([
    sprite('desert', {
      width: width(),
      height: height()
    }),
    layer('bg'),
    pos(0, 0)
  ]);

  add([
    sprite('dino'),
    pos(width() / 2, height() / 2 - 80),
    scale(2),
    origin('center')
  ]);

  // display score
  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(1),
    origin('center')
  ]);
});

go('game');
