YUI().use('node', 'transition', function(Y) {
	var Sou = Y.one('#headerGuide'),
		Tar = Y.one('#headerNav');
	//基本动画的效果是开始导航栏出现，一段时间以后隐藏，之后通过hover来实现出现和隐藏的效果。之后需要注意的是这里的所有效果是在云层消失以后再出现的
	Tar.hide();
	Sou.on('mouseover',function(){
		Tar.show(true);
	});
	Sou.on('mouseout',function(){
		Tar.hide(true);
	});
});
