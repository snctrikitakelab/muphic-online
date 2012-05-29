$(function () {
	var canvas =document.getElementById("canvas1");		
	var context = canvas.getContext("2d");
	context.save();		
	var cW = 1300;
	var cH = 650;
	var mouseX;
	var mouseY;
	var k=0;
	var array = new Array(25);
	for(var i=0;i<2;i++){
		array[i]=[' ',' ',' '];
	}
	var array2 = new Array(25);
	for(var i=0;i<2;i++){
		array2[i]=[' ',' ',' '];
	}
	var pf=0;	//�s�A�m�t���O	
		
	draw2();

	window.onload = function(){
		reset();
		draw();
		draw2();
		draw1();
	}	
	
	//�z�񏉊���
	function reset(){
		for(var i=0;i<=1;i++){
			for(var j=0;j<=24;j++){
				array[i][j]=null;
			}
		}
		for(var i=0;i<=1;i++){
			for(var j=0;j<=24;j++){
				array2[i][j]=null;
			}
		}
	}
	//���ʍ쐬�֐�				
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
				copy("piano",e);
			}
			check();
			draw2();
		}
		//�N���b�N�ʒu���o�֐�		
		function check(){
			humen(mouseX,mouseY);
			if(mouseX>=50 && mouseX<=150){					//���{�^���N���b�N
				if(mouseY>=550 && mouseY<650){
					if(pf==0){
						pf=1;
					}
					else{
						pf=0;
					}
				}
			}
			if(mouseX>=25 && mouseX<=125){					//�Đ��{�^���N���b�N
				if(mouseY>=50 && mouseY<150){
					start();
				}
			}
			
		}
		//���ʊ֐�
		function humen(mouseX,mouseY){
			if(pf==1){
				if(mouseX>=150 && mouseX<=1300){			//���ʃN���b�N
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
		
		
		//�摜�����֐�
		function copy(icon,e){
			adjustXY(e);
			if(mouseX>=150 && mouseX<=1300 && mouseY>=100 && mouseY<=500){
				array[0][k]=mouseX;
				array[1][k]=mouseY;
				k++;
			}
		}
		
		function start(){
//			alert("kiteru");
			for(var time=0;time<=(array[0][0]-20);time++){
				for(var i=0;i<100000;i++){}
				var x = array[0][0];
				var y = array[1][0];
				var posx = (x-20)-time;
				var posy = (y-25);
				var onpu = new Image();
				onpu.src = "gazou/onpu.gif";
				context.drawImage(onpu,posx,posy);
				check2(posx+20,y);						//�����摜�̐^�񒆂ŉ����o�����߂�x�̂�+20
			}
		}
		
		//���o�͊֐�				
		function output(e){
			if(e>=9){
				alert("�����Ȃ�(�L�E�ցE�M)");
				draw2();
			}
			else	document.getElementById("piano_"+e).play();
		}
		
		//�N���b�N���W���o�֐�					
		function adjustXY(e){
			var rect = e.target.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
		
		//���o�͔��f�֐�
		function check2(x,y){
			if(x==150){
				humen(x,y);
			}
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
		
		for(var i=0;i<=24;i++){
			if(array[0][i] != null){
				var onpu = new Image();
				onpu.src = "gazou/onpu.gif";
				context.drawImage(onpu,array[0][i]-20,array[1][i]-25);
			}
			else break;
		}
	}
});