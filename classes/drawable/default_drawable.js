class defaultDrawable {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.xScale = 1;
    this.yScale = 1;
    this.image = image;
  }

  Draw () {
    context.drawImage(this.image,
        (this.x*cScale) + window.innerWidth/2 - cScale/2 - players[0].x*cScale,
        (this.y*cScale) + window.innerHeight/2 - cScale/2 - players[0].y*cScale,
        cScale*this.xScale, cScale*this.yScale);
  }

  get distanceToPlayer() {
    return Math.sqrt(Math.pow(this.x - players[0].x, 2) + Math.pow(this.y - players[0].y, 2));
  }

  Update () {
    this.Draw();
  }
}

class floor extends defaultDrawable {
  constructor(x, y, image) {
    super(x, y, image);
    this.dist = super.distanceToPlayer;
    if ((this.y + this.x)%2 == 0) {
        this.color = true;
    } else {
        this.color = false;
    }
  }

  Update () {
    super.Update();
    this.dist = super.distanceToPlayer;
    this.drawColor();
  }

  drawColor () {
    // Dessine de la couleur en fonction de la disntance au joueur et de la musique
    if (this.dist <5) {
      if(beatIndex != -1) {
        if (beatIndex == 0) {
          context.fillStyle = RGBA(0, 255, 120, ((1-(this.dist/5))*0.3));

          if(!this.color) {
            context.fillRect(
              (this.x*cScale) + window.innerWidth/2 - cScale/2 - players[0].x*cScale,
              (this.y*cScale) + window.innerHeight/2 - cScale/2 - players[0].y*cScale,
              cScale, cScale
            );
          }
        } else {
          context.fillStyle = RGBA(255, 0, 120, ((1-(this.dist/5))*0.3));

          if(this.color) {
            context.fillRect(
              (this.x*cScale) + window.innerWidth/2 - cScale/2 - players[0].x*cScale,
              (this.y*cScale) + window.innerHeight/2 - cScale/2 - players[0].y*cScale,
              cScale, cScale
            );
          }
        }
      }
    }
  }

}

function updateDrawables() {

  var drawables = blocks.concat(players);

    for (i = 0; i < drawables.length; i++) {
        disableImageSmoothing();
        drawables[i].Update();
    }
}
