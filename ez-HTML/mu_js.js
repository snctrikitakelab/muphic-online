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
		draw1();
		draw2();
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
			//context.strokeRect(50,50,100,80);
			draw();
			draw2();
			check();
		}
				
		function check(){
			if(mouseX>=150 && mouseX<=1300){
				if(mouseY>=460 && mouseY<500){
					output(1);
				}
				else if(mouseY>=420 && mouseY<460){
					output(2);
				}
				else if(mouseY>=380 && mouseY<420){
					output(3);
				}
				else if(mouseY>=340 && mouseY<380){
					output(4);
				}
				else if(mouseY>=300 && mouseY<340){
					output(5);
				}
				else if(mouseY>=260 && mouseY<300){
					output(6);
				}
				else if(mouseY>=220 && mouseY<260){
					output(7);
				}
				else if(mouseY>=180 && mouseY<220){
					output(8);
				}
				else if(mouseY>=140 && mouseY<180){
					output(9);
				}
				else if(mouseY>=100 && mouseY<140){
					output(10);
				}
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
		var picture = new Image();
		//picture.onload = function(){context.drawImage(picture,25,50);};
		picture.src = "start_button.gif";
		context.drawImage(picture,25,50);
		var picture2 = new Image();
		//picture2.onload = function(){context.drawImage(picture2,25,150);};
		picture2.src = "stop_button.gif";
		context.drawImage(picture2,25,150);
		var picture3 = new Image();
		//picture3.onload = function(){context.drawImage(picture3,25,250);};
		picture3.src = "gomibako.jpg";
		context.drawImage(picture3,25,250);
		var piano = new Image();
		//piano.onload = function(){context.drawImage(piano,50,550);};
		piano.src = "piano.jpg";
		context.drawImage(piano,50,550);
	}

	//DOMオブジェクトの取得
	var canvas1 = document.getElementById("canvas1");
	var canvas2 = document.getElementById("canvas1");
	//描画コンテキストの取得
	var context1 = canvas1.getContext("2d");
	var context2 = canvas2.getContext("2d");
	//var context3 = canvas.getContext("2d");
	//コンテキストの状態の記憶
	context1.save();
	context2.save();
	//context3.save();

	drawcanvas();

	$('#canvas1').mousedown(function (event) {
		var X = event.pageX - $(this).offset().left;
		var Y = event.pageY - $(this).offset().top;
    		if(context1.isPointInPath(X, Y) === true) {
			alert('再生！');
		}	else if(context2.isPointInPath(X, Y) === true) {
			alert('停止！');
		}	
	});

	function drawcanvas() {
		//塗りつぶしの色の指定
		context1.fillStyle = red;
		context2.fillStyle = red;
		//context3.fillStyle = #000000;
		//明度の変更
		context1.globalAlpha = 1.0;
		context2.globalAlpha = 0.0;
		//context3.globalAlpha = 0.0;
		//パスの開始
		context1.beginPath();
		context2.beginPath();
		//context3.beginPath();
		//円の描画
		context1.arc(100,150,50,0,2*Math.PI,true);
		context2.arc(50,25,150,0,2*Math.PI,true);
		//context3.rect(50,50,50,0,2*Math.PI,true);
		//パスの描画
		context1.fill();
		context2.fill();
		//context3.fill();
		//コンテキストの初期化
		context1.restore();
		context1.save();
		context2.restore();
		context2.save();
		//context3.restore();
		//context3.save();
		
		draw();
		draw2();
	}
});