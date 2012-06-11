$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");
	context.save();		
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
	var k=0;
	var array = new Array(25);			//音符位置データ
	for(var i=0;i<3;i++){
		array[i]=[' ',' ',' '];
	}
	
	var array2 = new Array(25);			//音符移動中データ
	for(var i=0;i<3;i++){
		array2[i]=[' ',' ',' '];
	}
	
	var pf=0;		//ピアノフラグ
	var start_f=0;	//スタートフラグ
	var stop_f=0;	//ストップフラグ
	var gomi_f=0;	//ゴミフラグ
	var onpu_f = new Array(25);		//音符フラグ
	
	var moveStep = 1;
	var moveSpeed = 15;
	var imgpos_x = 0;
	var imgpos_y = 0;
	draw2();

	window.onload = function(){
		reset();
		draw();
		draw2();
		remember();
		draw1();
	}
	
	//配列初期化
	function reset(){
		for(var i=0;i<=1;i++){
			for(var j=0;j<=24;j++){
				array[i][j]=null;
				array2[i][j]=null;
			}
		}
		for(var i=0;i<=24;i++){
			onpu_f[i]=0;
		}
	}
	
	//譜面作成関数				
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
	
	//ボタン関連関数		
	function draw1(){
	
		canvas.onmousedown = mouseDownListner;		
		//クリック検出関数		
		function mouseDownListner(e){
			context.clearRect(0,0,cW,cH);
			adjustXY(e);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			context.fillText("X座標：" + mouseX, 5, 12);
			context.fillText("Y座標：" + mouseY, 5, 24);
			context.fillText("イベント：マウスダウン", 5, 36);
			draw();
			if(pf==1){
				copy("piano",e);
			}
			check();
			draw2();
			remember();
		}
		
		//クリック位置検出関数		
		function check(){
			humen(mouseX,mouseY);
			if(mouseX>=50 && mouseX<=150){					//音ボタンクリック
				if(mouseY>=550 && mouseY<650){
					if(pf==0){
						pf=1;
					}
					else{
						pf=0;
					}
				}
			}
			if(mouseX>=25 && mouseX<=125){					//再生ボタンクリック
				if(mouseY>=50 && mouseY<150){
					imgpos_x = imgget_x();
					for(var i=0;i<25;i++){
						array2[0][i] = array[0][i];
						array2[1][i] = array[1][i];
					}
					start();
				}
			}
			if(mouseX>=25 && mouseX<=125){					//停止ボタンクリック
				if(mouseY>=150 && mouseY<250){
					stop();
				}
			}
			if(mouseX>=25 && mouseX<=125){					//ゴミ箱ボタンクリック
				if(mouseY>=250 && mouseY<350){
					gomi();
				}
			}
		}
		
		//譜面クリック位置検出関数
		function humen(mouseX,mouseY){
			if(pf==1){
				if(mouseX>=150 && mouseX<=1300){			//譜面クリック
					var count=0;
					for(var i=500;i>=140;i-=40){
						count++;
						if(mouseY>=i-40 && mouseY<i){
							output(count);
						}
					}
				}
			}
		}
		
		//画像複製関数
		function copy(icon,e){
			adjustXY(e);
			if(mouseX>=150 && mouseX<=1300 && mouseY>=100 && mouseY<=500){
				array[0][k]=mouseX-20;
				array[1][k]=mouseY-25;
				k++;
			}
		}
		
		//x,y座標の最大値取得関数
		function imgget_x(){
			var a = 0;
			imgpos_x = 0;
			imgpos_y = 0;
			while(a < 25){
				if(imgpos_x < array[0][a]){
					imgpos_x = array[0][a];
					imgpos_y = a;
					a++;
				}
				else{
					a++;
				}	
			}
			return imgpos_x;
		}	
		
		//背景出力関数
		function outhaikei(){
			context.clearRect(0,0,cW,cH);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			context.fillText("X座標：" + mouseX, 5, 12);
			context.fillText("Y座標：" + mouseY, 5, 24);
			context.fillText("イベント：マウスダウン", 5, 36);
			draw();
			draw2();
		}
		
		//音符画像出力関数
		function outonpu(x,y){
			var onpu1 = new Image();
			onpu1.src = "gazou/onpu.gif";
			context.drawImage(onpu1,x,y);
		}
		
		//音符画像個数調査関数
		function getlast(arraylast){	
			for(var i=0;i<25;i++){
				if(array2[1][i] != null){
					arraylast++;
				}
			}
			return arraylast;
		}
		
		//再生処理
		function start(){
			var arraylast=0;
			arraylast = getlast(arraylast);
			if(imgpos_x != 0){
				imgpos_x -= moveStep;
				for(var i=0;i<25;i++){
					array2[0][i] -= moveStep;
				}
				for(var i=0;i<25;i++){
					if(array2[0][i]>0){
						if(array2[0][i] <= 130){
							humen(array2[0][i]+20,array2[1][i]+25);			//音符画像の真ん中で音を出すためにxのみ+20
							onpu_f[i] = 1;				//音が鳴り次第その音符画像は描写の必要がなくなる
						}
						outhaikei();					//背景の描写
						for(var j=0;j<=arraylast;j++){
							if(onpu_f[j] == 0){			//描写が必要な音符画像だけ
								outonpu(array2[0][j],array2[1][j]);			//音符画像の描写
							}
						}
					}
				}
				if(imgpos_x > 130){
					setTimeout(start,moveSpeed);
				}
				if(imgpos_x <= 130){
					stop();
				}
			}
		}
		
		//停止処理
		function stop(){
			for(var i=0;i<=24;i++){
				onpu_f[i]=0;
			}
			imgpos_x = 0;
			remember();
		}
		
		//削除処理
		function gomi(){
			alert("gomi");
		}
		
		//音出力関数				
		function output(e){
			if(e>=9){
				alert("音源ない(´・ω・｀)");
				draw2();
			}
			else	document.getElementById("piano_"+e).play();
		}
	
		//クリック座標検出関数					
		function adjustXY(e){
			var rect = e.target.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
	}
	
	//画像出力関数		
	function draw2(){
		var start = new Image();
		start.src = "gazou/start_button.png";
		context.drawImage(start,25,50);
		var stop = new Image();
		stop.src = "gazou/stop_button.png";
		context.drawImage(stop,25,150);
		var gomi = new Image();
		gomi.src = "gazou/gomibako.jpg";
		context.drawImage(gomi,25,250);
		
		var piano = new Image();
		if(pf==1){
			piano.src = "gazou/piano_2.gif";
		}
		else{
			piano.src = "gazou/piano_1.gif";
		}
		context.drawImage(piano,50,550);
	}
	
	//音符画像初期位置記憶関数
	function remember(){
		for(var i=0;i<25;i++){
			if(array[0][i] != null){
				var onpu = new Image();
				onpu.src = "gazou/onpu.gif";
				context.drawImage(onpu,array[0][i],array[1][i]);
			}
			else break;
		}
	}
});