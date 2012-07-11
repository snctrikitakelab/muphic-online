$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");	
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
	var array = new Array(25);			//音符位置データ
	var array2 = new Array(25);
	for(var i=0;i<5;i++){
		array[i]=[' ',' ',' ',' ',' '];
		array2[i]=[' ',' ',' ',' ',' '];
	}

	var sflag = null;
	var pf=0;	//ピアノフラグ
	var gf=0;
	var tf=0;
	var vf=0;
	var start_f=0;	//スタートフラグ
	var stop_f=0;	//ストップフラグ
	var eraser_f=0;	//消しゴムフラグ
	
	var muphic = new Image();
	var start = new Image();
	var stop = new Image();
	var eraser = new Image();		
	var piano = new Image();		
	var guitar = new Image();
	var tranpet = new Image();
	var violin = new Image();	
	
	var beat_x = new Array(32);
	for(var i=0;i<32;i++){
		beat_x[i] = 150 + 35.9375*i - 20;
	}
	
	var bpm = 500;					//Beats Per Minutes:拍
	var fpb = 12;					//Flame Per Bpm:Bpmごとに描写するフレーム数
	var loop_s = 1;					//関数soundループ回数カウント変数
	var loop_a = 0;					//関数animationループ回数カウント変数
	var arraylast = 0;

	var moveStep = 36/fpb;			
	var moveSpeed = bpm/fpb;		//アニメーションさせるべき速さ

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
		for(var i=0;i<5;i++){
			for(var j=0;j<=24;j++){
				array[i][j]=null;
				array[3][j]=0;
				array2[i][j]=null;
				array2[3][j]=0;
			}
		}			
	}
	
	//譜面作成関数				
	function draw(){
		context.strokeStyle = "black";
		context.fillStyle = "#FFCCFF";	
		context.beginPath();
		context.moveTo(150,100);
		context.lineTo(150,500);
		context.lineTo(1300,500);
		context.lineTo(1300,100);
		context.closePath();
		context.fill();
		context.stroke();

		context.fillStyle = "#CCFFFF";			
		for(var i=1;i<=10;i+=2){	
			var n = 40*i;
			context.beginPath();
			context.moveTo(150,100+n);
			context.lineTo(1300,100+n);
			context.lineTo(1300,140+n);
			context.lineTo(150,140+n);
			context.closePath();
			context.fill();				
			context.stroke();				
		}
				
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
			draw();
			if(pf==1){
				sflag = "piano_";
				copy(sflag);
			}
			else if(gf==1){
				sflag = "guitar_";
				copy(sflag);
			}
			else if(tf==1){
				sflag = "tranpet_";
				copy(sflag);
			}
			else if(vf==1){
				sflag = "violin_";
				copy(sflag);
			}	
			check();
			draw2();
			remember();
		}
		
		//クリック位置検出関数		
		function check(){
			humen(mouseX,mouseY,sflag);
			if(mouseX>=150 && mouseX<=250){					//音ボタンクリック
				if(mouseY>=550 && mouseY<650){
					if(pf==0){
						pf=1;
						gf=tf=vf=eraser_f=0;
					}
					else{
						pf=0;
					}
				}
			}
			
			if(mouseX>=300 && mouseX<=400){					//音ボタンクリック
				if(mouseY>=550 && mouseY<650){
					if(gf==0){
						gf=1;
						pf=tf=vf=eraser_f=0;
					}
					else{
						gf=0;
					}
				}
			}
			
			if(mouseX>=450 && mouseX<=550){					//音ボタンクリック
				if(mouseY>=550 && mouseY<650){
					if(tf==0){
						tf=1;
						pf=gf=vf=eraser_f=0;
					}
					else{
						tf=0;
					}
				}
			}
			
			if(mouseX>=600 && mouseX<=700){					//音ボタンクリック
				if(mouseY>=550 && mouseY<650){
					if(vf==0){
						vf=1;
						pf=tf=gf=eraser_f=0;
					}
					else{
						vf=0;
					}
				}
			}
			
			if(mouseX>=25 && mouseX<=125){					//再生ボタンクリック
				if(mouseY>=100 && mouseY<200){
					imgget();
					if(imgpos_x != 0){
						for(var i=0;i<25;i++){
							array2[0][i] = array[0][i];
							array2[1][i] = array[1][i];
							array2[2][i] = array[2][i];
							array2[3][i] = array[3][i];
							array2[4][i] = array[4][i];
						}
						start_f = 1;
						eraser_f = 0;
						start();
					}
				}
			}
			if(mouseX>=25 && mouseX<=125){					//停止ボタンクリック
				if(mouseY>=200 && mouseY<300){
					stop();
				}
			}
			
			if(mouseX>=25 && mouseX<=125){					//消しゴムボタンクリック
				if(mouseY>=300 && mouseY<400){
					stop();
					if(eraser_f==0){
						vf=pf=tf=gf=0;
						eraser_f=1;
						humen(mouseX,mouseY,eraser_f);
					}
					else{
						eraser_f=0;
					}
				}
			}
		}
		
		//譜面クリック位置検出関数
		function humen(mouseX,mouseY,icon){
			if(pf==1 || gf==1 || tf==1 || vf==1 || start_f==1 || eraser_f==1){
				if(mouseX>=150 && mouseX<=1300){			//譜面クリック
					var countX=0;
					var countY=0;
					for(var i=500;i>=140;i-=40){
						countY++;
						if(mouseY>=i-40 && mouseY<i){
							if(eraser_f == 1){					//eraser_f=1
								for(var j=150;j<=1228.125;j+=71.875){
									countX++;
									if(mouseX>=j && mouseX<j+71.875){
										eraser(countX,countY);
									}
								}
							}
							else{
								output(countY,icon);
							}
						}
					}
				}
			}			
		}
		
		//画像複製関数
		function copy(icon){
			var k=0;
			if(mouseX>=150 && mouseX<=1300 && mouseY>=100 && mouseY<=500){
				while(array[3][k]==1){
					k++;
				}
				for(var i=500;i>=140;i-=40){
					if(mouseY>=i-40 && mouseY<i){
						array[1][k]=i-45;
						break;
					}
				}
				
				for(var i=150;i<=1300;i+=71.875){
					if(mouseX>=i && mouseX<i+71.875){
						array[0][k]=i+15.9375;
						break;
					}
				}
				array[2][k]=icon;
				array[3][k]=1;
				array[4][k]=beats(array[0][k]);
			}
		}
		
		//x,y座標の最大値取得関数
		function imgget(){
			var a = 0;
			imgpos_x = 0;
			imgpos_y = 0;
			while(a < 25){
				if(array[3][a] == 1){
					if(imgpos_x < array[0][a]){
						imgpos_x = array[0][a];
						imgpos_y = a;
						a++;
					}
					else{
						a++;
					}
				}
				else{
					a++;
				}	
			}
		}
		
		//背景出力関数
		function outhaikei(){
			context.clearRect(0,0,cW,cH);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
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
		function getlast(){	
			arraylast=0;
			for(var i=0;i<25;i++){
				if(array2[1][i] != null){		//???
					arraylast = i;
				}
			}
		}
		
		//拍数調査関数
		function beats(x){
			var beat = 0;
			for(var i=150;i<=1300;i+=35.9375){
				if(x>=i && x<i+35.9375){
					beat++;
					break;
				}
				else beat++;
			}
			return beat;
		}
		
		//アニメーション関数
		function animation(){
			if(imgpos_x > 110){
				outhaikei();
				for(var j=0;j<=arraylast;j++){
					var x = beat_x[array2[4][j]]-(loop_a*moveStep);
					if(array[3][j] == 1){							//描写が必要な音符画像だけ
						if(x > 130){
							outonpu(x,array2[1][j]);					//音符画像の描写	
						}
					}
				}
				if(loop_a < fpb){
					loop_a++;
					setTimeout(animation,moveSpeed-5);
				}
				else{
					for(var i=0;i<25;i++){
						if(array2[4][i] >= 0){
							array2[4][i]--;
						}
					}
				}
			}
		}
		
		//出音関数
		function sound(){
			loop_a = 0;
			setTimeout(animation,0);
			for(var i=0;i<25;i++){
				if(array2[4][i] == 0 && array2[3][i] == 1){				//音を鳴らすべき時間が来たら
					humen(array2[0][i]+55.9375,array2[1][i]+25,array2[2][i]);		//音を鳴らす
					array2[3][i] = 0;					//鳴らした音符は描写する必要がない
				}	
			}
			if(array2[3][imgpos_y] == 1){
			 	setTimeout(sound,bpm);
			 	imgpos_x -= 35.9375;		//1拍分の座標
			}
			else{
				stop();
				start_f=0;
				draw2();
			}
		}
		
		//再生処理
		function start(){
			getlast();
			if(imgpos_x >= 110){				//音符がおいてあったら
				sound();
			}
		}
		
		//停止処理
		function stop(){
			for(var i=0;i<=24;i++){
				array2[3][i] = 1;
			}
			imgpos_x = 0;
			remember();
		}
		
		//削除処理
		function eraser(countX,countY){
			for(var i=0;i<25;i++){
				if(165.9375+71.875*(countX-1) == array[0][i] && 95+40*(10-countY) == array[1][i]){
					array[4][i] = null;
					array[3][i] = 0;
					array[2][i] = null;
					array[1][i] = null;
					array[0][i] = null;
					remember();
					break;
				}
			}
		}
		
		//音出力関数				
		function output(e,icon){
			document.getElementById(icon+e).play();
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
		muphic.src = "gazou/muphic1.gif";
		context.drawImage(muphic,300,0);
		start.src = "gazou/start_button.gif";
		context.drawImage(start,25,100);
		stop.src = "gazou/stop_button.gif";
		context.drawImage(stop,25,200);
		
		if(eraser_f==1){
			eraser.src = "gazou/keshigomu_2.gif";
		}
		else{
			eraser.src = "gazou/keshigomu_1.gif";
		}
		context.drawImage(eraser,25,300);
		
		if(pf==1){
			piano.src = "gazou/piano_2.gif";
		}
		else{
			piano.src = "gazou/piano_1.gif";
		}
		context.drawImage(piano,150,550);
		
		if(gf==1){
			guitar.src = "gazou/guitar_2.gif";
		}
		else{
			guitar.src = "gazou/guitar_1.gif";
		}
		context.drawImage(guitar,300,550);

		if(tf==1){
			tranpet.src = "gazou/tranpet_2.gif";
		}
		else{
			tranpet.src = "gazou/tranpet_1.gif";
		}
		context.drawImage(tranpet,450,550);
		
		if(vf==1){
			violin.src = "gazou/violin_2.gif";
		}
		else{
			violin.src = "gazou/violin_1.gif";
		}
		context.drawImage(violin,600,550);
	}
	
	//音符画像初期位置記憶関数
	function remember(){				
		for(var i=0;i<=24;i++){
			if(array[3][i] == 1){
				var onpu = new Image();
				onpu.src = "gazou/onpu.gif";
				context.drawImage(onpu,array[0][i],array[1][i]);
			}
		}
	}
});