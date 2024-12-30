const cvs = document.getElementById("canvas1");
const ctx = cvs.getContext("2d");

cvs.width = 210;
cvs.height = 600;

const circle = {
    name: "circle",
    bgColor: "#000",
    contrastColor: "#00b4d8",
    midX: 15,
    midY: cvs.height/2,
    lgCircle: 150,
    smallCircle: 90,
    svgImage: new Image(),
    drawSecImg: function(radius, rotAngle){
        ctx.save();
        this.svgImage.src = "outer-ring.svg";
        ctx.translate(this.midX, this.midY);
        ctx.rotate(rotAngle); // Rotate the canvas
        ctx.drawImage(this.svgImage, -radius / 2, -radius / 2, radius, radius); // Draw the SVG
        ctx.restore();
    },
    drawText: function(num, pos, circleSize, angleOfset){
        const arcX = this.midX + circleSize * Math.sin(angleOfset + pos );
        const arcY = this.midY - circleSize * Math.cos(angleOfset + pos );

        ctx.beginPath();
        ctx.fillStyle = this.contrastColor;  // Text color
        ctx.font = "16px Arial"; // Font size and type
        ctx.textAlign = "center"; // Center the text
        ctx.textBaseline = "middle"; // Middle-aligned text
        ctx.fillText(num, arcX, arcY);
        ctx.closePath();
    }, 
    drawTxtCircle: function(circleSize, angleOfset){

        for (let i = 0; i < 12; i++) {
            const pos = - (Math.PI/6*i) + (Math.PI/2);
            number = i*5;
            this.drawText(number.toString().padStart(2, "0"), pos, circleSize, angleOfset);
        }

        // this.drawText("00", 0, circleSize);
        // this.drawText("05", Math.PI/6, circleSize);
        // this.drawText("10", Math.PI/3, circleSize);
        // this.drawText("15", Math.PI/2, circleSize);
        // this.drawText("20", Math.PI*2/3, circleSize);
        // this.drawText("25", Math.PI*5/6, circleSize);
        // this.drawText("30", Math.PI, circleSize);
        // this.drawText("35", Math.PI*7/6, circleSize);
        // this.drawText("40", Math.PI*8/6, circleSize);
        // this.drawText("45", Math.PI*3/2, circleSize);
        // this.drawText("50", Math.PI*5/3, circleSize);
        // this.drawText("55", Math.PI*11/6, circleSize);
    },
    draw : function(secAngle, minuteAngle, hour, minute){

        // background
        ctx.beginPath();
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.closePath();
   
        // minute text circle
        this.drawTxtCircle(this.smallCircle, minuteAngle);

        // round rectangle
        ctx.beginPath();
        ctx.strokeStyle = this.contrastColor;
        ctx.lineWidth = 5;
        ctx.fillStyle = this.bgColor;
        ctx.roundRect(this.midX + 60, this.midY-19, 140, 35, [20, 0, 0, 20]);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // hour marker
        ctx.beginPath();
        ctx.fillStyle = "white";  // Text color
        ctx.font = "500 50px Arial"; // Font size and type
        ctx.textAlign = "center"; // Center the text
        ctx.textBaseline = "middle"; // Middle-aligned text
        ctx.fillText(hour.toString().padStart(2,"0"), this.midX+15, this.midY);
        ctx.closePath();

        // minute marker
        ctx.beginPath();
        ctx.fillStyle = "white";  // Text color
        ctx.font = "25px Arial"; // Font size and type
        ctx.textAlign = "center"; // Center the text
        ctx.textBaseline = "middle"; // Middle-aligned text
        ctx.fillText(minute.toString().padStart(2,"0"), this.midX + this.smallCircle, this.midY);
        ctx.closePath();

        // second text circle
        this.drawTxtCircle(this.lgCircle, secAngle);

        this.drawSecImg(380, secAngle);
        this.drawSecImg(260, minuteAngle);
        
    },
    update: function(){
        // const startTime = performance.now(); // Record the start time
        
        const animate = () => {
            const now = new Date();
            const milisec = now.getMilliseconds();
            const sec = now.getSeconds();
            const minute = now.getMinutes();
            const hour = now.getHours() % 12 || 12;

            const secAngle = ((milisec + sec*1000)/60000)*2*Math.PI;
            const minuteAngle = (minute/60)*2*Math.PI;

            // this.angle = ((2 * Math.PI * elapsed) / this.duration) % (2 * Math.PI); // Wrap angle to [0, 2π]
            // this.angle2 = ((2 * Math.PI * elapsed) / this.duration2) % (2 * Math.PI);

            this.draw(secAngle, minuteAngle, hour, minute);
            // this.draw(0, 0);

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}
circle.draw(0, 0, 0, 0);
circle.update();