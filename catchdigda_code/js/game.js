$(function(){
	$("#how-btn").on("click",function(){
		$(this).fadeOut().prev().fadeOut();
		$(".how-box").fadeIn();
	})
	// 곧바로 게임시작 되는 버튼
	var count = 4;
	$("#start-btn1").on("click",function(){
		$(this).fadeOut().next().fadeOut();
		gameCountStart()
	});
	
	//게임방법박스 안에 있는 게임시작 버튼
	$("#start-btn2").on("click",closeBoxGameStart);
	
	//한번 더 플레이 버튼
	$("#replay-btn").on("click",closeBoxGameStart);
	
	//게임 완료후 뜨는 스코어박스 닫는버튼  
	$("#endingbox-close").on("click",function(){
		$(this).parent().fadeOut();
		$("#how-btn").show();
		$("#start-btn1").show();
	})
	
	/** 게임구현 함수 **/
	function digdaCatch() {
		var score = 0;
		var timer = 0;
		var timerText = document.querySelector("#timer");
		var scoreText = document.querySelector("#score");
		var digdaBox = document.querySelector(".digda-box");		
		var digda = document.createElement("img");
		var digda2 = document.createElement("img");
		var digdaClass = document.querySelector(".digda");
		
		// 동적으로 생성된 디그다 스타일 설정
		digda.setAttribute("src","/img/digda.png");
		digda.setAttribute("id","digda");		
		digda.style.position = "absolute";
		digda.style.zIndex = "10000";
		digda.style.animation = "digdashake infinite 0.2s";
		
		// 디그다 2
		digda2.setAttribute("src","/img/digda.png");
		digda2.setAttribute("id","digda2");		
		digda2.style.position = "absolute";
		digda2.style.zIndex = "10000";
		digda2.style.animation = "digdashake infinite 0.2s";
		
		//디그다 이벤트 1초마다 반복.
		var digdaGame = setInterval(function(){	
			var randomLeft = Math.round(Math.random() * 10) * 50;
			var randomTop = Math.round(Math.random() * 10) * 45;
			// 게임 시작시에 디그다 이미지 동적으로 생성.
			digdaBox.appendChild(digda);							
			digdaBox.appendChild(digda2);
			//디그다위치 랜덤하게 위치변경
			if(randomLeft >= 700) {
				randomLeft = 500;
			}
			if(randomTop >= 600) {
				randomTop = 400;
			}		
			$("#digda").css("left", randomLeft);
			$("#digda").css("top",randomTop);
			$("#digda2").css("left", randomLeft);
			$("#digda2").css("left",randomTop);				
			
			//게임 플레이 타이머 출력 
			timer++;
			timerText.textContent = timer;
			if(timer >= 10) {
				clearInterval(digdaGame);
				$("#ending-score").text(score);
				// 게임종료후 디그다 삭제
				$("#digda").remove();
				$("#digda2").remove();
				// 엔딩박스 페이드인 및 스코어,타이머 초기화
				$(".ending-box").fadeIn(function(){
					scoreText.textContent = "0";
					timerText.textContent = "0";
				});							
			}
		},1000);
		
		/**디그다 클릭시 스코어 점수 올림 **/
		digda.addEventListener("click",function(){
			//스코어 출력
			score++;
			scoreText.textContent = score;
			$(this).hide(100,function(){
				var that = $(this);
				setTimeout(function(){
					that.show()
				},400);
			});		
		});
		
		/** 디그다 2 클릭시 스코어 점수 처리 **/
		digda2.addEventListener("click",function(){
			//스코어 출력
			score++;
			scoreText.textContent = score;
			$(this).hide(100,function(){
				var that = $(this);
				setTimeout(function(){
					that.show()
				},200);
			});		
		});
	}
	
	/** 게임 카운트 후 게임실행 **/
	function gameCountStart() {
		var gameStartCount = setInterval(function(){
			count--;
			$(".game-title").html(count);
			if(count === 0) {
				$(".game-title").html("Catch DigDa!");
				digdaCatch();
				clearInterval(gameStartCount);
			}
		},1000)
		count = 4;
	}
	
	/** 버튼 클릭시 모달창 페이드 아웃후 1초후 게임시작 **/
	function closeBoxGameStart(e) {
		$(this).parent("div.game-box").fadeOut(function(){
			gameCountStart();
		});	
	}
});