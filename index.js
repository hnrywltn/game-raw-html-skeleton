





addEventListener("DOMContentLoaded", (event) => {
    const canvas = document.querySelector('canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;


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
            this.width = 50
            this.height = 75
        }

        draw(){
            context.fillStyle = 'red';
            context.fillRect(
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
        constructor(){
            this.position = {
                x: 200,
                y: 100
            }
            this.width = 200
            this.height = 20
        }
        draw(){
            context.fillStyle = 'blue';
            context.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height);
        }
    }

    const player1 = new Player();
    const platform1 = new Platform();
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
        platform1.draw();

        if(keys.right.pressed){
            player1.velocity.x = 5;
        }else if(keys.left.pressed){
            player1.velocity.x = -5;
        }else{
            player1.velocity.x = 0;
        }


        //stop from falling off a platform
        if(player1.position.y + player1.height <= platform1.position.y
            &&
            player1.position.y + player1.height + player1.velocity.y >= platform1.position.y
            &&
            player1.position.x + player1.width >= platform1.position.x
            &&
            player1.position.x <= platform1.position.x + platform1.width

            ){
            player1.velocity.y = 0
        }



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
        }else if(pressedKey == 'w'){
            //up
            player1.velocity.y -= 10;
        }

    });

});
