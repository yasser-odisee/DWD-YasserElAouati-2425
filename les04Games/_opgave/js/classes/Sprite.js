/* eslint-disable no-unused-vars */
class Sprite {
   /**
   * Constructor
   *
   * @param {object} props - object holding all sprite properties (id, url, w, h, x = 0, y = 0, frames = [])
   */
   constructor(props) {
      // copy properties
      this.id = props.id;
      this.url = props.url;
      this.w = props.w;
      this.h = props.h;
      this.x = props.x ?? 0;
      this.y = props.y ?? 0;
      this.frames = props.frames ?? [];
      this.scale = props.scale ?? 1;

      // internal counter
      this.ticks = 0;

      // speed
      this.speedX = 0;
      this.speedY = 0;
      this.direction = 1; // -1 = left, 1 = right

      // animation
      this.animate = true;
      this.animDrag = props.animDrag ?? 10; // the higher the number, the slower the animation

      // DOM node
      this.node = document.createElement('DIV');
      this.node.id = this.id;
      this.node.style.position = 'absolute';
      this.node.style.backgroundImage = `url(${this.url})`;
      this.node.style.backgroundSize = `auto 100% `;
      this.node.style.left = `${this.x}px`;
      this.node.style.top = `${this.y}px`;
      this.node.style.width = `${this.w}px`;
      this.node.style.height = `${this.h}px`;
   }

   /**
   * Recalculates its position, and adjusts the left, top and transform CSS properties
   * In case of animation: shifts the background to the right position for the current frame
   */
   repaint() {
      // increment internal counter of this sprite
      this.ticks++;

      // recalculate x and y position
      this.x += this.speedX;
      this.y += this.speedY;

      // set related node CSS left and top properties
      this.node.style.left = `${parseInt(this.x)}px`;
      this.node.style.top = `${parseInt(this.y)}px`;

      // flip horizontally if direction is -1
      this.node.style.transform = `scaleX(${this.direction})`;

      // for animated sprites: jump to next frame and shift background image 
      this.frameNr = parseInt(this.ticks / this.animDrag) % this.frames.length;
      if (this.animate) this.node.style.backgroundPositionX = `${this.frames[this.frameNr]}px`;  
   }

   /**
   * Checks if this sprite is hit by another sprite
   *
   * @param {object} sprite - hitting sprite
   */
   hitBy(sprite) {
      const horizontalOverlap = this.x < sprite.x + sprite.w && this.x + this.w > sprite.x;
      const verticalOverlap = this.y < sprite.y + sprite.h && this.y + this.h > sprite.y;
      return horizontalOverlap && verticalOverlap;
   }
}