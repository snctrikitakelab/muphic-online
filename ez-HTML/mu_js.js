$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
	var k=0;
	var array = new Array(25);			//�����ʒu�f�[�^
	var array2 = new Array(25);			//�����ړ����f�[�^
	for(var i=0;i<5;i++){
		array[i]=[' ',' ',' ',' ',' '];
		array2[i]=[' ',' ',' ',' ',' '];
	}
	
	var sflag = null;
	var pf=0;	//�s�A�m�t���O
	var gf=0;	
	var tf=0;
	var vf=0;
	var start_f=0;	//�X�^�[�g�t���O
	var stop_f=0;	//�X�g�b�v�t���O
	var gomi_f=0;	//�S�~�t���O
	var onpu_f = new Array(25);		//�����t���O
	
	var bpm = 500;					//Beats Per Minutes:��
	var fpb = 10;					//Flame Per Bpm:Bpm���Ƃɕ`�ʂ���t���[����
	//var bpm_a = 1/(35.9375/bpm);	//�֐�animation�p���[�v����b��
	var loop_s = 0;					//�֐�sound���[�v�񐔃J�E���g�ϐ�
	var loop_a = 0;					//�֐�animation���[�v�񐔃J�E���g�ϐ�
	var arraylast = 0;

	var moveStep = 30/fpb;			
	var moveSpeed = bpm/fpb;		//�A�j���[�V����������ׂ�����
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
		for(var i=0;i<5;i++){
			for(var j=0;j<=24;j++){
				array[i][j]=null;
				array2[i][j]=null;
			}
		}
		for(var i=0;i<=24;i++){
			onpu_f[i]=0;
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
			context.fillText("X���W�F" + mouseX, 5, 12);
			context.fillText("Y���W�F" + mouseY, 5, 24);
			context.fillText("�C�x���g�F�}�E�X�_�E��", 5, 36);
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
			if(mouseX>=50 && mouseX<=150){					//���{�^���N���b�N
				if(mouseY>=550 && mouseY<650){
					if(pf==0){
						pf=1;
						gf=0;
						tf=0;
						vf=0;
					}
					else{
						pf=0;
					}
				}
			}
			
			if(mouseX>=150 && mouseX<=250){					//���{�^���N���b�N
				if(mouseY>=550 && mouseY<650){
					if(gf==0){
						gf=1;
						pf=0;
						tf=0;
						vf=0;
					}
					else{
						gf=0;
					}
				}
			}
			
			if(mouseX>=250 && mouseX<=350){					//���{�^���N���b�N
				if(mouseY>=550 && mouseY<650){
					if(tf==0){
						tf=1;
						pf=0;
						gf=0;
						vf=0;
					}
					else{
						tf=0;
					}
				}
			}
			
			if(mouseX>=350 && mouseX<=450){					//���{�^���N���b�N
				if(mouseY>=550 && mouseY<650){
					if(vf==0){
						vf=1;
						pf=0;
						tf=0;
						gf=0;
					}
					else{
						vf=0;
					}
				}
			}
			
			if(mouseX>=25 && mouseX<=125){					//�Đ��{�^���N���b�N
				if(mouseY>=50 && mouseY<150){
					imgpos_x = imgget_x();
					for(var i=0;i<25;i++){
						array2[0][i] = array[0][i];
						array2[1][i] = array[1][i];
						array2[2][i] = array[2][i];
						array2[4][i] = array[4][i];
					}
					start();	
				}
			}
			if(mouseX>=25 && mouseX<=125){					//��~�{�^���N���b�N
				if(mouseY>=150 && mouseY<250){
					stop();
				}
			}
			if(mouseX>=25 && mouseX<=125){					//�S�~���{�^���N���b�N
				if(mouseY>=250 && mouseY<350){
					gomi();
				}
			}
		}
		
		//���ʃN���b�N�ʒu���o�֐�
		function humen(mouseX,mouseY,icon){
			if(pf==1 || gf==1 || tf==1 || vf==1){
				if(mouseX>=150 && mouseX<=1300){			//���ʃN���b�N
					var count=0;				
					for(var i=500;i>=140;i-=40){
						count++;
						if(mouseY>=i-40 && mouseY<i){
							output(count,icon);
						}
					}
				}
			}
			
		}
		
		//�摜�����֐�
		function copy(icon,e){
			adjustXY(e);
			if(mouseX>=150 && mouseX<=1300 && mouseY>=100 && mouseY<=500){
				for(var i=500;i>=140;i-=40){
					if(mouseY>=i-40 && mouseY<i){
						mouseY = i-20;
						break;
					}
				}
				
				for(var i=150;i<=1300;i+=71.875){
					if(mouseX>=i && mouseX<i+71.875){
						mouseX = i+35.9375;
						break;
					}
				}

				array[0][k]=mouseX-20;
				array[1][k]=mouseY-25;
				array[2][k]=icon;
				array[4][k]=beats(array[0][k]);
				k++;
			}
		}
		
		//x,y���W�̍ő�l�擾�֐�
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
		
		//�w�i�o�͊֐�
		function outhaikei(){
			context.clearRect(0,0,cW,cH);
			context.globalAlpha = 1;
			context.fillStyle = "#666666";
			context.fillText("X���W�F" + mouseX, 5, 12);
			context.fillText("Y���W�F" + mouseY, 5, 24);
			context.fillText("�C�x���g�F�}�E�X�_�E��", 5, 36);
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
			for(var i=0;i<25;i++){
				if(array2[1][i] != null){
					arraylast++;
				}
			}
			return arraylast;
		}		
		
		//���������֐�
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
		
		//�A�j���[�V�����֐�
		function animation(){
			//for(var i=0;i<fpb;i++){
				outhaikei();
				for(var j=0;j<arraylast;j++){
					array2[0][j] -= moveStep;
					if(onpu_f[j] == 0){								//�`�ʂ��K�v�ȉ����摜����
						outonpu(array2[0][j],array2[1][j]);			//�����摜�̕`��
					}
				}
			//}
			if(loop_a < fpb){
				loop_a++;
				setTimeout(animation,moveSpeed-5);
			}
		}
		
		//�o���֐�
		function sound(){
			//imgpos_x -= moveStep;
			loop_a = 0;
			setTimeout(animation,0);			//0[ms]�ŃA�j���[�V�����֐����Ăяo��
			for(var i=0;i<25;i++){
				if(array2[4][i] == 0){			//����炷�ׂ����Ԃ�������
					humen(array2[0][i]+55.9375,array2[1][i]+25,array2[2][i]);		//����炷
					onpu_f[i] = 1;					//�炵�������͕`�ʂ���K�v���Ȃ�
				}	
			}
			if(array2[4][arraylast-1] != 0){
				for(var i=0;i<25;i++){
					array2[4][i]--;
				}
				//loop_s++;
				setTimeout(sound,bpm);
			}
		}
		
		//�Đ�����
		function start(){
			loop_s = 1;
			arraylast=0;
			arraylast = getlast();
			if(imgpos_x != 0){
				sound();
				//animation();
				if(imgpos_x <= 130){
					alert("�Đ��I��");
					stop();
				}
			}
		}
		
		//��~����
		function stop(){
			for(var i=0;i<=24;i++){
				onpu_f[i]=0;
			}
			imgpos_x = 0;
			remember();
		}
		
		//�폜����
		function gomi(){
			alert("gomi");
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
		var start = new Image();
		start.src = "gazou/start_button.gif";
		context.drawImage(start,25,50);
		var stop = new Image();
		stop.src = "gazou/stop_button.gif";
		context.drawImage(stop,25,150);
		var gomi = new Image();
		gomi.src = "gazou/keshigomu_1.gif";
		context.drawImage(gomi,25,250);
		
		var piano = new Image();
		if(pf==1){
			piano.src = "gazou/piano_2.gif";
		}
		else{
			piano.src = "gazou/piano_1.gif";
		}
		context.drawImage(piano,50,550);
		
		var guitar = new Image();
		if(gf==1){
			guitar.src = "gazou/guitar_2.gif";
		}
		else{
			guitar.src = "gazou/guitar_1.gif";
		}
		context.drawImage(guitar,150,550);

		var tranpet = new Image();
		if(tf==1){
			tranpet.src = "gazou/tranpet_2.gif";
		}
		else{
			tranpet.src = "gazou/tranpet_1.gif";
		}
		context.drawImage(tranpet,250,550);
		
		var violin = new Image();
		if(vf==1){
			violin.src = "gazou/violin_2.gif";
		}
		else{
			violin.src = "gazou/violin_1.gif";
		}
		context.drawImage(violin,350,550);
	}
	
	//�����摜�����ʒu�L���֐�
	function remember(){				
		for(var i=0;i<=24;i++){
			if(array[0][i] != null){
				var onpu = new Image();
				onpu.src = "gazou/onpu.gif";
				context.drawImage(onpu,array[0][i],array[1][i]);
			}
			else break;
		}
	}
});