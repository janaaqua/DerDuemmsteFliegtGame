class Player {
  // to do: avatar
  constructor({ id, name, avatar, isCreator, lives = 3 }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.isCreator = isCreator;
    this.lives = lives;
  }

  substractOneLife() {
    if (this.lives > 0) {
      this.lives--;
    }
  }

  isAlive() {
    return this.lives > 0;
  }
}

export default Player;
