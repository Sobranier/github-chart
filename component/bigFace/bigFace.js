//先试用js原生编写，之后换成yui组件
function setHeight(){
	var h=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

	if(!document.getElementById("bigFace") || !document.getElementById("bigFaceCover")){return false;};
	var home__hero=document.getElementById("bigFace");
	var home__face=document.getElementById("bigFaceCover");
	home__hero.style.height = h+"px";
	home__face.style.height = h+"px";
	//这里之后要设置一个最小的高度
}
setHeight();
window.onresize = setHeight;

function slift(node){
	var lift = parseInt(node.style.left);
	console.log(lift);

	setInterval(function(){
		lift -= 5;
		node.style.left = lift + 'px';
	
	},5);
}

function setCloud(){
	var clouds = document.getElementsByClassName('bigFaceCo');
	clouds[0].className = clouds[0].className + " cloudAni1";
	clouds[1].className = clouds[1].className + " cloudAni2";
	clouds[2].className = clouds[2].className + " cloudAni3";
	clouds[3].className = clouds[3].className + " cloudAni4";
}

function setChange(){
	if(!document.getElementById("bigFace") || !document.getElementById("bigFaceCover")){return false;};
	var home__hero = document.getElementById("bigFace");
	var home__face = document.getElementById("bigFaceCover");
	var home__leader = document.getElementById("headerGuide");
	home__hero.className = 'bigFace-bg';
	setCloud();
	setTimeout(function(){
		home__leader.style.display = 'block';
	},2500);
	setTimeout(function(){
		home__face.style.display = 'none';
	},4000);
}
window.onload =setTimeout(setChange,1000)

