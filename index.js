



addEventListener("DOMContentLoaded", (event) => {
    const cloud = new Image();
    const henry = new Image();
    const saran = new Image();
    saran.src = "./saran.png"
    henry.src = "./henry.png";
    cloud.src = "./real-cloud-picture-8.png";
    const canvas = document.querySelector('canvas');
    console.log(canvas)
    canvas.width = 870;
    canvas.height = 576;


    const context = canvas.getContext('2d');

    const gravity = 0.5;

    class Player {
        constructor(){
            this.position = {
                x: 0,
                y: 0
            }
            this.velocity = {
                x: 0,
                y: 1
            }
            this.width = 75
            this.height = 100
        }

        draw(){
            context.fillStyle = 'red';
            context.drawImage(
                henry,
                this.position.x,
                this.position.y,
                this.width,
                this.height);
        }

        update(){
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            this.draw();
            if(this.position.y + this.height + this.velocity.y <= canvas.height){
                this.velocity.y += gravity;
            }else{
                this.velocity.y = 0;
            }
        }


    }

    class Platform {
        constructor(x, y, width, height){
            this.position = {
                x,
                y,
            }
            this.width = width
            this.height = height
            this.image = cloud
        }
        draw(){
            context.fillStyle = 'green';
            context.drawImage(
                cloud,
                this.position.x,
                this.position.y,
                this.width,
                this.height);
        }
    }

    const player1 = new Player();

    function generateRandomPairs(num1, num2, maxWidth, maxHeight, numberOfPairs) {
        if (num1 < 0 || num2 < 0) {
          throw new Error("Numbers must be greater than or equal to 0");
        }

        const pairs = [];

        for (let i = 0; i < numberOfPairs; i++) {
          let randomNum1 = Math.floor(Math.random() * (num1 + 1));
          let randomNum2 = Math.floor(Math.random() * (num2 + 1));
          let width = Math.floor(Math.random() * (maxWidth + 1));
          let height = Math.floor(Math.random() * (maxHeight + 1));
          if(randomNum2 < 100){
            randomNum2 += 200;
          }
          pairs.push([randomNum1, randomNum2, width, height]);
        }

        return pairs;
    }


    //change the: length of game, how low the platforms can go, number of platforms, width of platforms, height of platforms
    const platformsRandomPositions = generateRandomPairs(100000, 650, 200, 50, 750);

    const platformContainer = platformsRandomPositions.map(coordinates => new Platform(...coordinates));
    const start = new Platform(0, 550, 650, 20);
    // const platform = new Platform(400, 600);


    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }
    player1.draw();







    function animate(){
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        player1.update();
        [start, ...platformContainer].forEach(platform => {

            platform.draw();


            if(keys.right.pressed && player1.position.x < 500){
                player1.velocity.x = 5;
            }else if(keys.left.pressed && player1.position.x > 100){
                player1.velocity.x = -5;
            }else{
                player1.velocity.x = 0;
                if(keys.right.pressed){
                    platform.position.x -= 5;
                } else if(keys.left.pressed){
                    platform.position.x += 5;
                }
            }

            if(player1.position.y < 0) player1.position.y = 0;

        //stop from falling off a platform
        if(player1.position.y + player1.height <= platform.position.y
            &&
            player1.position.y + player1.height + player1.velocity.y >= platform.position.y
            &&
            player1.position.x + player1.width >= platform.position.x
            &&
            player1.position.x <= platform.position.x + platform.width

            ){
            player1.velocity.y = 0
        }

        // set win condition
        // if(scrollOffset > )
    });


    }

    animate();




    window.addEventListener('keydown', (e)=>{
        // keyCode - depricated - see what key you're pressing
        //a 65
        //s 83
        //d 68
        //w 87
        //using e.key instead
        const pressedKey = e.key;
        if(pressedKey == 'a'){
            //left
            keys.left.pressed = true;
        }else if(pressedKey == 'd'){
            //right
            keys.right.pressed = true;
        }else if(pressedKey == 's'){
            //down
        }else if(pressedKey == 'w'){
            //up
            player1.velocity.y -= 10;
        }

    });

    window.addEventListener('keyup', (e)=>{
        const pressedKey = e.key;
        if(pressedKey == 'a'){
            //left
            keys.left.pressed = false;
        }else if(pressedKey == 'd'){
            //right
            keys.right.pressed = false;
        }else if(pressedKey == 's'){
            //down
        }

    });

});
