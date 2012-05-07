$(function () {

	//DOM�I�u�W�F�N�g�̎擾
	var canvas = document.getElementById("canvas1");
	//�`��R���e�L�X�g�̎擾
	var context = canvas.getContext("2d");
	//�R���e�L�X�g�̏�Ԃ̋L��
	context.save();

	var color = "#0000FF";
	var gA = 0.7;
	draw(color, gA);

	$('#canvas1').mousedown(function (event) {
		var X = event.pageX - $(this).offset().left;
		var Y = event.pageY - $(this).offset().top;
    		if(context.isPointInPath(X, Y) === true) {
			gA = 1.0;
			draw(color, gA);
		}
	});

	function draw(color, gA) {
		//�h��Ԃ��̐F�̎w��
		context.fillStyle = color;
		//���x�̕ύX
		context.globalAlpha = gA;
		//�p�X�̊J�n
		context.beginPath();
		//�~�̕`��
		context.arc(50,50,50,0,2*Math.PI,true);
		//�p�X�̕`��
		context.fill();
		//�R���e�L�X�g�̏�����
		context.restore();
		context.save();
	}
});

