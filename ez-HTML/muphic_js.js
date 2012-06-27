$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");	
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
	var array = new Array(25);			//�����ʒu�f�[�^
	var array2 = new Array(25);
	for(var i=0;i<4;i++){
		array[i]=[' ',' ',' ',' '];
		array2[i]=[' ',' ',' ',' '];
	}

	var sflag = null;
	var pf=0;	//�s�A�m�t���O
	var gf=0;
	var tf=0;
	var vf=0;
	var start_f=0;	//�X�^�[�g�t���O
	var stop_f=0;	//�X�g�b�v�t���O
	var eraser_f=0;	//�����S���t���O
	var arraylast=0;	
	
	var moveStep = 2;
	var moveSpeed = 5;
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
	
	//�z�񏉊���
	function reset(){
		for(var i=0;i<4;i++){
			for(var j=0;j<=24;j++){
				array[i][j]=null;
				array[3][j]=0;
				array2[i][j]=null;
				array2[3][j]=0;
			}
		}			
	}
	
	//���ʍ쐬�֐�				
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
		
	//�{�^���֘A�֐�		
	function draw1(){
		canvas.onmousedown = mouseDownListner;
		
		//�N���b�N���o�֐�		
		function mouseDownListner(e){
			context.clearRect(0,0,cW,cH);
			adjustXY(e);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			draw();
			if(pf==1){
				copy("piano_",e);
				sflag = "piano_";
			}
			else if(gf==1){
				copy("guitar_",e);
				sflag = "guitar_";
			}
			else if(tf==1){
				copy("tranpet_",e);
				sflag = "tranpet_";
			}
			else if(vf==1){
				copy("violin_",e);
				sflag = "violin_";
			}	
			check();
			draw2();
			remember();
		}
		
		//�N���b�N�ʒu���o�֐�		
		function check(){
			humen(mouseX,mouseY,sflag);
			if(mouseX>=150 && mouseX<=250){					//���{�^���N���b�N
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
			
			if(mouseX>=300 && mouseX<=400){					//���{�^���N���b�N
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
			
			if(mouseX>=450 && mouseX<=550){					//���{�^���N���b�N
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
			
			if(mouseX>=600 && mouseX<=700){					//���{�^���N���b�N
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
			
			if(mouseX>=25 && mouseX<=125){					//�Đ��{�^���N���b�N
				if(mouseY>=100 && mouseY<200){
					imgpos_x = imgget_x();
					if(imgpos_x != 0){
						for(var i=0;i<25;i++){
							array2[0][i] = array[0][i];
							array2[1][i] = array[1][i];
							array2[2][i] = array[2][i];
							array2[3][i] = array[3][i];
						}
						arraylast = getlast();
						start_f = 1;
						eraser_f = 0;
						start();
					}
				}
			}
			if(mouseX>=25 && mouseX<=125){					//��~�{�^���N���b�N
				if(mouseY>=200 && mouseY<300){
					stop();
				}
			}
			
			if(mouseX>=25 && mouseX<=125){					//�����S���{�^���N���b�N
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
		
		//���ʃN���b�N�ʒu���o�֐�
		function humen(mouseX,mouseY,icon){
			if(pf==1 || gf==1 || tf==1 || vf==1 || start_f==1 || eraser_f==1){
				if(mouseX>=150 && mouseX<=1300){			//���ʃN���b�N
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
		
		//�摜�����֐�
		function copy(icon,e){
			adjustXY(e);
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
			}
		}
		
		//x,y���W�̍ő�l�擾�֐�
		function imgget_x(){
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
			return imgpos_x;
		}
		
		//�w�i�o�͊֐�
		function outhaikei(){
			context.clearRect(0,0,cW,cH);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			draw();
			draw2();
		}
		
		//�����摜�o�͊֐�
		function outonpu(x,y){
			var onpu1 = new Image();
			onpu1.src = "gazou/onpu.gif";
			context.drawImage(onpu1,x,y);
		}
		
		//�����摜�������֐�
		function getlast(){	
			arraylast=0;
			for(var i=0;i<25;i++){
				if(array2[3][i] == 1){
					arraylast++;
				}
			}
			return arraylast;
		}		
		
		
		//�Đ�����
		function start(){
			if(imgpos_x >=130){
				imgpos_x -= moveStep;
				for(var i=0;i<25;i++){
					array2[0][i] -= moveStep;
					if(array2[0][i]>125){
						if(array2[0][i] <= 130){
							if(array2[3][i] == 1){
								humen(array2[0][i]+55.9375,array2[1][i]+25,array2[2][i]);	
								array2[3][i] = 0;			//�����莟�悻�̉����摜�͕`�ʂ̕K�v���Ȃ��Ȃ�
							}
						}
						outhaikei();					//�w�i�̕`��
						for(var j=0;j<25;j++){
							if(array2[3][j] == 1){		//�`�ʂ��K�v�ȉ����摜����							
								outonpu(array2[0][j],array2[1][j]);			//�����摜�̕`��
							}
						}						
					}
				}
				if(imgpos_x > 130){
						setTimeout(start,moveSpeed);
				}
				if(imgpos_x <= 130){
					stop();
					start_f=0;
					draw2();
				}
			}
		}
		
		//��~����
		function stop(){
			for(var i=0;i<=24;i++){
				array2[3][i] = 0;
			}
			imgpos_x = 0;
			remember();
		}
		
		//�폜����
		function eraser(countX,countY){
			for(var i=0;i<25;i++){
				if(165.9375+71.875*(countX-1) == array[0][i] && 95+40*(10-countY) == array[1][i]){
					array[3][i] = 0;
					remember();
					break;
				}
			}
		}
		
		//���o�͊֐�				
		function output(e,icon){
			document.getElementById(icon+e).play();
		}	
			
		//�N���b�N���W���o�֐�					
		function adjustXY(e){
			var rect = e.target.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
	}
	
	//�摜�o�͊֐�		
	function draw2(){
		
		var muphic = new Image();
		muphic.src = "gazou/muphic1.gif";
		context.drawImage(muphic,300,0);
		var start = new Image();
		start.src = "gazou/start_button.gif";
		context.drawImage(start,25,100);
		var stop = new Image();
		stop.src = "gazou/stop_button.gif";
		context.drawImage(stop,25,200);
		
		var eraser = new Image();
		if(eraser_f==1){
			eraser.src = "gazou/keshigomu_2.gif";
		}
		else{
			eraser.src = "gazou/keshigomu_1.gif";
		}
		context.drawImage(eraser,25,300);
		
		var piano = new Image();
		if(pf==1){
			piano.src = "gazou/piano_2.gif";
		}
		else{
			piano.src = "gazou/piano_1.gif";
		}
		context.drawImage(piano,150,550);
		
		var guitar = new Image();
		if(gf==1){
			guitar.src = "gazou/guitar_2.gif";
		}
		else{
			guitar.src = "gazou/guitar_1.gif";
		}
		context.drawImage(guitar,300,550);

		var tranpet = new Image();
		if(tf==1){
			tranpet.src = "gazou/tranpet_2.gif";
		}
		else{
			tranpet.src = "gazou/tranpet_1.gif";
		}
		context.drawImage(tranpet,450,550);
		
		var violin = new Image();
		if(vf==1){
			violin.src = "gazou/violin_2.gif";
		}
		else{
			violin.src = "gazou/violin_1.gif";
		}
		context.drawImage(violin,600,550);
	}
	
	//�����摜�����ʒu�L���֐�
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