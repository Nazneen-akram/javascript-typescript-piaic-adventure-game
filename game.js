import inquirer from 'inquirer';
import chalk from 'chalk';

const enemies = {
  'Zombies': 40,
  'Assassins': 50,
  'Skeletons': 60
};

let player = {
  name: '',
  hp: 100
};

let enemy = {
  name: '',
  hp: 0
};

const startGame = async () => {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter your name:',
  });

  player.name = name;

  console.log(chalk.bold.green(`Welcome ${player.name}! Ahead lies monsters, zombies, assassins and deadly skeleton which enemy would you like to take into combat.`));

  const { enemyName } = await inquirer.prompt({
    type: 'list',
    name: 'enemyName',
    message: 'Select an enemy:',
    choices: ['Zombies', 'Assassins', 'Skeletons'],
  });

  enemy.name = enemyName;
  enemy.hp = enemies[enemyName];

  await combat();
};

const combat = async () => {
  if (player.hp <= 0) {
    console.log(chalk.red('You lost the game, Better luck next time'));
    return;
  }

  if (enemy.hp <= 0) {
    console.log(chalk.green('You won the game!'));
    return;
  }

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What action would you like to take?',
    choices: ['Attack', 'Drink Potion', 'Run Away...'],
  });

  switch (action) {
    case 'Attack':
      const playerDamage = Math.floor(Math.random() * (30 - 5) + 5);
      const enemyDamage = Math.floor(Math.random() * (25 - 1) + 1);

      player.hp -= enemyDamage;
      enemy.hp -= playerDamage;

      console.log(chalk.blue(`You dealt ${playerDamage} damage and received ${enemyDamage} damage.`));
      console.log(chalk.blue(`Your HP: ${player.hp}, ${enemy.name}'s HP: ${enemy.hp}`));
      break;
    case 'Drink Potion':
      const healAmount = Math.floor(Math.random() * (5 - 1) + 1);
      player.hp += healAmount;

      console.log(chalk.blue(`You healed for ${healAmount}.`));
      console.log(chalk.blue(`Your HP: ${player.hp}`));
      break;
    case 'Run Away...':
      console.log(chalk.red('You lost the game, Better luck next time'));
      return;
  }

  await combat();
};

startGame();
