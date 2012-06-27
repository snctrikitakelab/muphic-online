$(function () {	
	//ïàñ çÏê¨ä÷êî				
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
		
		var w = screen.width;
		var h = screen.height;
		alert(w+","+h);
	}
	
});