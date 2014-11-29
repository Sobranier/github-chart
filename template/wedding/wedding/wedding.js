var init = function() {
	var set = {
		create: function() {
			var w = window.innerwidth || document.documentElement.clientWidth || document.body.clientWidth,
				h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			if (!document.getElementById('J-bacNav') && !document.getElementsByClassName('show')) {
				return false;
			}
			var bac = document.getElementById('J-bacNav'),
				childs = document.getElementsByClassName('show');
			bac.parentNode.style.height = h + 'px';
			for (var i = 0; i < childs.length; i ++) {
				childs[i].style.height = h + 'px';
				//bac.childNodes[i].style.height = h + 'px';
			}
			set.start(h);
			set.mus();
		},

		start: function(h) {
			var bac = document.getElementById('J-bacNav');
			bac.onclick = function(event) {
				var node = event.target;
				if (node.className && node.className.indexOf('J-btn') >= 0) {
					var page = node.getAttribute('data-id');
					console.log(page);
					bac.style.top = "-" + (page*h) +'px';
				}
			}   
		},

		mus:function() {
			var muisc = document.getElementById('music'),
				text = document.getElementById('musicText'),
				icon = document.getElementById('musicIcon'),
				audio = document.getElementById('audio');
			music.onclick = function(event) {
				if(text.innerHTML == '播放') {
					text.innerHTML = '关闭';
					icon.className = 'fa fa-music animation-turn';
					audio.play();
				} else {
					text.innerHTML = '播放';
					icon.className = 'fa fa-music';
					audio.pause();
				}
			}
				
			
		}
	};

	set.create();

}



init();
