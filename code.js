

var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["db0f0423-c3da-4d49-a8cf-94d501178b9c","41776537-f0dc-4fe3-b0f7-8c7e2948810f","6bdbd6cb-f31c-47cd-9b03-4caa13e88272","adfa0588-4216-427d-ab29-77077b12c4b6","942457ce-e263-426a-a91e-f97436982581","37b888ac-48d2-4f1e-b546-152651cab221","272a3255-45ea-416c-8c6a-9e78b47f62a8","ea0ce556-c954-4455-b740-caca89c0e926"],"propsByKey":{"db0f0423-c3da-4d49-a8cf-94d501178b9c":{"name":"MainCar.png_1","sourceUrl":null,"frameSize":{"x":144,"y":147},"frameCount":1,"looping":true,"frameDelay":12,"version":"EJ2XkC8S0kbUlN9vTRE.2v.DwVYAkVHv","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":144,"y":147},"rootRelativePath":"assets/db0f0423-c3da-4d49-a8cf-94d501178b9c.png"},"41776537-f0dc-4fe3-b0f7-8c7e2948810f":{"name":"Road.png_1","sourceUrl":"assets/v3/animations/93b59ce0-5642-4eb8-8a7e-21ed34ad82d1/41776537-f0dc-4fe3-b0f7-8c7e2948810f.png","frameSize":{"x":1920,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"RnjkDtYqjx60ZpnmV4CWBbepjd1EZ9i6","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1920,"y":1080},"rootRelativePath":"assets/v3/animations/93b59ce0-5642-4eb8-8a7e-21ed34ad82d1/41776537-f0dc-4fe3-b0f7-8c7e2948810f.png"},"6bdbd6cb-f31c-47cd-9b03-4caa13e88272":{"name":"1.png_1","sourceUrl":null,"frameSize":{"x":651,"y":446},"frameCount":4,"looping":true,"frameDelay":12,"version":"XTW.linDGF3b9XhhoGziZWD7bnGHPGPr","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1302,"y":892},"rootRelativePath":"assets/6bdbd6cb-f31c-47cd-9b03-4caa13e88272.png"},"adfa0588-4216-427d-ab29-77077b12c4b6":{"name":"scanlines","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"hAXLZVFbNHFh7khA1Sgw4nBvs090kwZR","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/adfa0588-4216-427d-ab29-77077b12c4b6.png"},"942457ce-e263-426a-a91e-f97436982581":{"name":"FinishLine.png_1","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"FhS4cnUhsYxlrGzawoz.PeZ9Mimj74Mp","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/942457ce-e263-426a-a91e-f97436982581.png"},"37b888ac-48d2-4f1e-b546-152651cab221":{"name":"Lap.png_1","sourceUrl":null,"frameSize":{"x":874,"y":438},"frameCount":1,"looping":true,"frameDelay":12,"version":"qupjehAtbv6shmmpvmkRDDs1LDYWnbJb","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":874,"y":438},"rootRelativePath":"assets/37b888ac-48d2-4f1e-b546-152651cab221.png"},"272a3255-45ea-416c-8c6a-9e78b47f62a8":{"name":"CarRight.png_1","sourceUrl":null,"frameSize":{"x":135,"y":106},"frameCount":1,"looping":true,"frameDelay":12,"version":"QzmYb5961sujb4J8xCYkhcF5rI_Cnbzb","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":135,"y":106},"rootRelativePath":"assets/272a3255-45ea-416c-8c6a-9e78b47f62a8.png"},"ea0ce556-c954-4455-b740-caca89c0e926":{"name":"CarLeft.png_1","sourceUrl":null,"frameSize":{"x":135,"y":106},"frameCount":1,"looping":true,"frameDelay":12,"version":"29VxyjO0GiO7VOP1RkmGZBhUvP31QiNM","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":135,"y":106},"rootRelativePath":"assets/ea0ce556-c954-4455-b740-caca89c0e926.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var scale = 0.35;
var start = 0;
var last_sound_frame = -1;
var begining_sfx_i = 0;
var last_lap_line = 0;
var lap_mark_true = false;
var current_velocity;
var lap = 1;
var mph = 0;
var highest_mph = 0;
var distance = 0;
var lap_line_crossed = false;
var road_1 = createSprite(200, 200);
var road_width = road_1.width*scale;
var road_2 = createSprite(road_1.x + road_width, 200);
var lap_line = createSprite(420, 200);
var top_cars = createGroup();
var bottom_cars = createGroup();
var player = createSprite(35, 155);
var top_cars_length = 0;
var bottom_cars_length = 0;
var velocities_1=[];
var velocities_2=[];
// making initial cars
for (var i = 0; i < randomNumber(1, 3); i++) {
  var car = createSprite(randomNumber(50, 200), randomNumber(40, 180));
  car.visible = true;
  car.velocityX = randomNumber(2, 3);
  car.setAnimation("CarRight.png_1");
  car.scale = 0.3;
  top_cars.add(car);
  velocities_1.push(car.velocityX);
  top_cars_length = top_cars_length + 1;
}
for (var i = 0; i < randomNumber(1, 3); i++) {
  var car = createSprite(randomNumber(50, 200), randomNumber(240, 360));
  car.visible = true;
  car.velocityX = randomNumber(-3, -2);
  car.setAnimation("CarLeft.png_1");
  car.scale = 0.3;
  bottom_cars.add(car);
  velocities_2.push(car.velocityX);
  bottom_cars_length = bottom_cars_length + 1;
}
car.visible = false;
var countdown_sprite = createSprite(200, 200);
var lap_mark = createSprite(200, 200);
var scanlines = createSprite(200, 200);
player.setAnimation("MainCar.png_1");
road_1.setAnimation("Road.png_1");
road_2.setAnimation("Road.png_1");
lap_line.setAnimation("FinishLine.png_1");
top_cars.setAnimationEach("CarRight.png_1");
countdown_sprite.setAnimation("1.png_1");
lap_mark.setAnimation("Lap.png_1");
scanlines.setAnimation("scanlines");
player.scale = scale -0.05;
var invincibility = 0;
road_1.scale = scale;
road_2.scale = scale;
countdown_sprite.scale = scale;
lap_mark.scale = scale;
scanlines.scale = 1;
lap_mark.visible = false;
function lap_line_init() {
  if (last_lap_line != distance) {
    lap_line_crossed = false;
    last_lap_line = distance;
    lap_line.x = 420;
  }
}
function start_music() {
  if (start == 0) {
    playSound("assets/midnight-motorist.mp3", true);
  }
}
function draw() {
  if (World.seconds < 5) {
    if (World.frameCount % 30 == 0 && World.frameCount != last_sound_frame && begining_sfx_i <=2) {
      begining_sfx_i = begining_sfx_i + 1;
      if (begining_sfx_i == 3) {
        playSound("assets/CountdownGo.mp3", false);
      } else {
        playSound("assets/MidnightMotorist-Countdown.mp3");
      }
      last_sound_frame = World.frameCount;
    }

    /*
    if (!(old_world_seconds == World.seconds)) {
      if (World.seconds - old_world_seconds > 1) {
        old_world_seconds = World.seconds;
        countdown_sprite.nextFrame();
      } else {
        
      }
    }
    */
    countdown_sprite.setFrame(World.seconds);
    if (World.seconds > 3) {
      start_music();
      start = 1;
    }
  } else {
    countdown_sprite.destroy();
  }
  player_movement();
  //road logic
  if (World.frameCount % 2 == 0 && start == 1) {
    mph = mph + 1;
    if (mph>highest_mph) {
      highest_mph = mph;
    }
    distance = distance+ 0.5;
    road_1.velocityX = road_1.velocityX - 0.1;
    road_2.velocityX = road_1.velocityX;
    //car code
    for (var i = 0; i < top_cars_length; i++) {
      current_velocity = top_cars.get(i).velocityX;
      top_cars.get(i).velocityX = road_1.velocityX + velocities_1[i];
      if (top_cars.get(i).x < -100 || top_cars.get(i).x > 500) {
        top_cars_length = top_cars_length -1;
        velocities_1.splice(i, 1);
        top_cars.get(i).destroy();
      }
    }
    for (var i = 0; i < bottom_cars_length; i++) {
      current_velocity = bottom_cars.get(i).velocityX;
      bottom_cars.get(i).velocityX = road_1.velocityX + velocities_2[i];
      if (bottom_cars.get(i).x < -100 || bottom_cars.get(i).x > 500) {
        bottom_cars_length = bottom_cars_length - 1;
        velocities_2.splice(i, 1);
        bottom_cars.get(i).destroy();
      }
    }
    if (randomNumber(1, 20) >= 20 && invincibility < World.frameCount) {
      var car = createSprite(450, randomNumber(40, 180));
      car.visible = true;
      car.velocityX = randomNumber(0.2, 2);
      car.setAnimation("CarRight.png_1");
      car.scale = 0.3;
      top_cars.add(car);
      velocities_1.push(car.velocityX);
      top_cars_length = top_cars_length + 1;
    }
    if (randomNumber(1, 20) >= 20 && invincibility < World.frameCount) {
      var car = createSprite(450, randomNumber(240, 380));
      car.visible = true;
      car.velocityX = randomNumber(-2, -0.2);
      car.setAnimation("CarRight.png_1");
      car.scale = 0.3;
      bottom_cars.add(car);
      velocities_2.push(car.velocityX);
      bottom_cars_length = bottom_cars_length + 1;
    }
  }
  
  if (road_1.x + road_width / 2 < 0) {
      road_1.x = road_2.x + road_width + 42;
    }
  if (road_2.x + road_width / 2 < 0) {
      road_2.x = road_1.x + road_width + 42;
    }
  if (road_1.velocityX < -22) {
    road_1.velocityX = -22;
  }
  if (road_2.velocityX < -22) {
    road_2.velocityX = -22;
  }
  //lap_line_logic
  if (distance % (80 * lap) == 0) {
    lap_line_init();
  }
  if ((lap_line.x) <= 200 && !lap_line_crossed) {
    lap_mark_true = true;
    lap = lap + 1;
    lap_line_crossed = true;
    playSound("assets/e9dd145e.mp3", false);
  }
  if (lap_line.x > -200) {
    lap_line.velocityX = road_1.velocityX;
  }
  if (lap_line.x < 0) {
    lap_mark_true = false;
  }
  if (lap_mark_true && World.frameCount % 2 != 0) {
    lap_mark.visible = true;
  } else {
    lap_mark.visible = false;
  }
  
  background(rgb(0, 0, 0));
  drawSprites();
  textSize(20);
  text("MPH " + mph, 5, 45, "white");
  text("LAP " + lap, 5, 70, "white");
  text("HIGHEST MPH " +highest_mph, 5, 355);
}
function player_movement() {
  if (start == 1) {
    if (keyDown("up") || keyDown("w") && player.y >= 20) {
      player.y = player.y - 5;
    } else {
      if (keyDown("down") || keyDown("s") && player.y <= 380) {
        player.y = player.y + 5;
      }
    }
    
    if (keyDown("left") || keyDown("a") && player.x >= 20) {
      player.x = player.x - 5;
    } else {
      if (keyDown("right") || keyDown("d") && player.x <= 380) {
        player.x = player.x + 5;
      }
    }
  }
  for (var i = 0; i < top_cars_length; i++) {
    if (player.isTouching(top_cars.get(i)) && invincibility <= World.frameCount) {
      invincibility = World.frameCount + 50;
      mph = 0;
      road_1.velocityX = 0;
      playSound("assets/crash.mp3");
    }
  }
  for (var i = 0; i < bottom_cars_length; i++) {
    if (player.isTouching(bottom_cars.get(i)) && invincibility <= World.frameCount) {
      invincibility = World.frameCount + 50;
      mph = 0;
      road_1.velocityX = 0;
      road_2.velocityX = 0;
      lap_line.velocityX = 0;
      playSound("assets/crash.mp3");
    } else {
      if (invincibility > World.frameCount) {
        player.rotationSpeed = 6.3;
      } else {
        player.rotation = 0;
        player.rotationSpeed = 0;
      }
    }
  }
}
playSound("assets/MidnightMotorist-Countdown.mp3", false);

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
