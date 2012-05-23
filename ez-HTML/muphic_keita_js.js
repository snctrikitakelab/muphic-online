$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");
	context.save();		
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
		
	draw2();

	window.onload = function(){
		draw();
		draw2();
		draw1();
	}	
					
	function draw(){
		context.strokeStyle = "black";
		context.fillStyle = "white";	
		context.beginPath();
		context.moveTo(150,100);
		context.lineTo(150,500);
		context.lineTo(1300,500);
		context.lineTo(1300,100);
		context.closePath();
		context.fill();
		context.stroke();

		context.beginPath();
		for(var i=1;i<=10;i++){	
			var n = 40*i;
			context.moveTo(150,100+n);
			context.lineTo(1300,100+n);
		}
		context.stroke();
				
		context.beginPath();
		for(var i=1;i<=16;i++){	
			var n = 71.875*i;
			context.moveTo(150+n,100);
			context.lineTo(150+n,500);
		}
		context.stroke();
	}	
			
	function draw1(){
				
		canvas.onmousedown = mouseDownListner;
				
		function mouseDownListner(e){
			context.clearRect(0,0,cW,cH);
			adjustXY(e);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			context.fillText("X座標：" + mouseX, 5, 12);
			context.fillText("Y座標：" + mouseY, 5, 24);
			context.fillText("イベント：マウスダウン", 5, 36);
			draw();
			draw2();
			check();
		}
				
		function check(){
			if(mouseX>=150 && mouseX<=1300){
				var count=0;
				for(var i=500;i>=140;i-=40){
					count++;
					if(mouseY>=i-40 && mouseY<i){
						output(count);
					}
				}
			}
			else{
				alert("失敗");
			}
		}
						
		function output(e){
			if(e>=9){
				alert("音源ない(´・ω・｀)");
				draw2();
			}
			else	document.getElementById("piano_"+e).play();
		}
							
		function adjustXY(e){
			var rect = e.target.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
	}
			
	function draw2(){
		var start = new Image();
		start.src = "gazou/start_button.gif";
		context.drawImage(start,25,50);
		var stop = new Image();
		stop.src = "gazou/stop_button.gif";
		context.drawImage(stop,25,150);
		var gomi = new Image();
		gomi.src = "gazou/gomibako.jpg";
		context.drawImage(gomi,25,250);
		var piano = new Image();
		piano.src = "gazou/piano.jpg";
		context.drawImage(piano,50,550);
	}	
});