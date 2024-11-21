// Tile data
const OBSTACLE = 'obstacle';
const LANTERN = 'lantern';

const startGame = () => {
  const board = new Board({
    backgroundColor: grey,
    indicatorBorderColor: light,
  }).center();

  const player = new Person();
  board.add(player, 3, 0);

  const transparentTreePositions = [
    [4, 3],
    [5, 7],
  ];
  loop(transparentTreePositions, transparentTreePosition => {
    board.add(new Tree().alp(0.8), transparentTreePosition[0], transparentTreePosition[1]);
  });
  const treePositions = [
    [0, 5],
    [5, 0],
  ];
  loop(treePositions, treePosition => {
    board.add(new Tree(), treePosition[0], treePosition[1]);
  });

  const correctColors = series(pink, red, blue, yellow, green).shuffle();
  new Tile({
    obj: new Circle({
      radius: 20,
      color: correctColors,
    }),
    cols: 5,
    rows: 1,
    spacingH: 10,
  }).pos({
    x: 40,
    y: 40,
    horizontal: RIGHT,
    vertical: BOTTOM,
  });
  new Label({
    text: 'To pass, reveal the orbs in this order',
    size: 40,
    color: 'purple',
  }).loc({
    x: 70,
    y: 690,
  });

  const colors = shuffle(correctColors.array);
  const lanternPositions = [
    [1, 1],
    [5, 2],
    [6, 6],
    [2, 7],
    [3, 4],
  ];
  loop(colors, (color, i) => {
    const cover = new Rectangle({
      width: 70,
      height: 70,
      color: silver,
    });
    const lantern = new Container({
      width: cover.width,
      height: cover.height,
    });
    cover.addTo(lantern);
    lantern.reg(CENTER, lantern.height - 30).sca(0.5);
    lantern.cover = cover;
    lantern.orb = new Orb({
      radius: cover.width * 0.3,
      color,
    });
    board.add(lantern, lanternPositions[i][0], lanternPositions[i][1], LANTERN);
  });

  const obstaclePositions = [
    [2, 0],
    [2, 1],
    [1, 2],
    [2, 2],
    [1, 3],
    [3, 6],
    [4, 6],
    [3, 7],
    [4, 7],
    [4, 3],
    [5, 3],
    [4, 4],
    [5, 4],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [7, 6],
  ];

  loop(obstaclePositions, obstaclePosition => {
    const tile = board.getTile(obstaclePosition[0], obstaclePosition[1]);
    board.setColor(tile, dark);
    board.setData(tile, OBSTACLE);
  });

  board.addKeys(player, 'arrows', { notData: [OBSTACLE, LANTERN] });
};

const ready = () => {
  // Welcome screen so the user can interact with and we can listen for keyboard events
  // When pane is clicked, it will be removed and the game will start
  new Pane({
    // We use noMouse() to be able to click through the label
    content: new Label({
      text: 'Welcome clever traveler!',
      size: 70,
      color: 'yellow',
    }).noMouse(),
    backgroundColor: purple,
  }).show(startGame);
};

new Frame({
  scaling: FIT,
  width: 1024,
  height: 768,
  color: 'black',
  outerColor: dark,
  ready,
});
