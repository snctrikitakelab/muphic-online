$(function () {

	//DOMオブジェクトの取得
	var canvas = document.getElementById("canvas1");
	//描画コンテキストの取得
	var context = canvas.getContext("2d");
	//コンテキストの状態の記憶
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
		//塗りつぶしの色の指定
		context.fillStyle = color;
		//明度の変更
		context.globalAlpha = gA;
		//パスの開始
		context.beginPath();
		//円の描画
		context.arc(50,50,50,0,2*Math.PI,true);
		//パスの描画
		context.fill();
		//コンテキストの初期化
		context.restore();
		context.save();
	}
});

