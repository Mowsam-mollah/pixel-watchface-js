const cvs2 = document.getElementById("canvas2");
const ctx2 = cvs2.getContext("2d");

cvs2.width = 400;
cvs2.height = 400;

const circle2 = {
    name: "circle2",
    bgColor: "#000",
    contrastColor: "#00b4d8",
    midX: cvs2.width/2,
    midY: cvs2.height/2,
    lgCircle: 150,
    smallCircle: 90,
    svgImage: new Image(),
    drawSecImg: function(radius, rotAngle){
        
        ctx2.save();
        this.svgImage.src = "outer-ring.svg";
        ctx2.translate(this.midX, this.midY);
        ctx2.rotate(rotAngle); // Rotate the canvas
        ctx2.drawImage(this.svgImage, -radius / 2, -radius / 2, radius, radius); // Draw the SVG
        ctx2.restore();
    },
    drawText: function(num, pos, circleSize, angleOfset){
        const arcX = this.midX + circleSize * Math.sin(angleOfset + pos );
        const arcY = this.midY - circleSize * Math.cos(angleOfset + pos );

        ctx2.beginPath();
        ctx2.fillStyle = this.contrastColor;  // Text color
        ctx2.font = "16px Arial"; // Font size and type
        ctx2.textAlign = "center"; // Center the text
        ctx2.textBaseline = "middle"; // Middle-aligned text
        ctx2.fillText(num, arcX, arcY);
        ctx2.closePath();
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
        ctx2.beginPath();
        ctx2.fillStyle = this.bgColor;
        ctx2.fillRect(0, 0, cvs2.width, cvs2.height);
        ctx2.closePath();
   
        // minute text circle2
        this.drawTxtCircle(this.smallCircle, minuteAngle);

        // round rectangle
        ctx2.beginPath();
        ctx2.strokeStyle = this.contrastColor;
        ctx2.lineWidth = 5;
        ctx2.fillStyle = this.bgColor;
        ctx2.roundRect(this.midX + 60, this.midY-19, 140, 35, [20, 0, 0, 20]);
        ctx2.stroke();
        ctx2.fill();
        ctx2.closePath();

        // hour marker
        ctx2.beginPath();
        ctx2.fillStyle = "white";  // Text color
        ctx2.font = "500 50px Arial"; // Font size and type
        ctx2.textAlign = "center"; // Center the text
        ctx2.textBaseline = "middle"; // Middle-aligned text
        ctx2.fillText(hour.toString().padStart(2,"0"), this.midX, this.midY);
        ctx2.closePath();

        // minute marker
        ctx2.beginPath();
        ctx2.fillStyle = "white";  // Text color
        ctx2.font = "25px Arial"; // Font size and type
        ctx2.textAlign = "center"; // Center the text
        ctx2.textBaseline = "middle"; // Middle-aligned text
        ctx2.fillText(minute.toString().padStart(2,"0"), this.midX + this.smallCircle, this.midY);
        ctx2.closePath();

        // second text circle2
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
            const hour = now.getHours();

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
circle2.draw(0, 0, 0, 0);
circle2.update();