//enchantの初期化
enchant();

//HTML読み込み完了時に実行する処理
window.onload = function() {
    //ゲームオブジェクト生成
    var game = new Game(320, 160);
    /*
    	1300,700(とりあえず)って書いても実際に作られているのは320,320っぽい
    */
    
    //画像の読み込み
    game.preload('imgs/img1.png','imgs/img2.png','imgs/img3.png');
    
    //画像読み込み完了時に実行する処理
    game.onload = function() {
        
        //譜面
        var music = new Sprite(320, 160);
        music.image = game.assets['imgs/img1.png'];
        music.x = 20;
        music.y = 80;
        
        //音階
        var scales = new Sprite(20, 170);
        scales.image = game.assets['imgs/img2.png'];
        scales.y = 70;
        
        //再生ボタン
        var startbutton = new Sprite(50,50);
        startbutton.image = game.assets['imgs/img3.png'];
        startbutton.frame = 0;
        startbutton.x = 160;
        startbutton.y = 15;
        
        //停止ボタン
        //var startbutton = new Sprite(50,50);
        //startbutton.image = game.assets['imgs/img3.png'];
        /*
        	複数のSpriteオブジェクトでassetsが一緒だとダメっぽい
        */
        //startbutton.frame = 0;
        //startbutton.x = 160;
        //startbutton.y = 15;
        
        //表示オブジェクトツリーに追加
        game.rootScene.addChild(music);
        game.rootScene.addChild(scales);
        game.rootScene.addChild(startbutton);
        //game.rootScene.addChild(stopbutton);
        
    };
    game.start();
};