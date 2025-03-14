/* eslint-disable no-unused-vars */
class Game {
   /**
   * Constructor
   *
   * @param {string} sel - CSS selector pointing to game div
   */
   constructor(sel) {
      this.node = document.querySelector(sel);
      this.sprites = [];
      this.h = this.node.offsetHeight;
      this.w = this.node.offsetWidth;
   }

   /**
   * Sets game background
   *
   * @param {string} url - background image url
   */
   setBackground(url) {
      this.node.style.backgroundImage = `url(${url})`;
   }

   /**
   * Repaints all game sprites
   */
   repaint() {
      this.sprites.forEach(spr => spr.repaint());
   }

   /**
   * Removes all sprites from the game
   */
   clear() {
      this.sprites = [];
      this.innerHTML = [];
   }

   /**
   * Adds a sprite to the game
   *
   * @param {object} sprite - sprite to add
   */
   addSprite(sprite) {
      this.node.appendChild(sprite.node);
      this.sprites.push(sprite);
   }

   /**
   * Removes a sprite from the game
   *
   * @param {object} sprite - sprite to remove
   */
   removeSprite(sprite) {
      // remove from list
      const index = this.sprites.findIndex(item => item.id == sprite.id);
      if (index !== -1) this.sprites.splice(index, 1); 

      // remove from DOM
      const element = document.getElementById(sprite.id);
      if (element) element.remove();
   }
}

