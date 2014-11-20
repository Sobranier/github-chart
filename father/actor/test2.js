(function(){
	console.log('TEST2');
})();

YUI().use('node-base', 'hello', function (Y) {
	console.log(Y.Hello.sayHello());
	var t = "margin:30px; padding:40px;line-height:68px;background:url('http://source.qunar.com/site/images/hotel/luotuo.gif') no-repeat;"
	console.log("%c",t);
});

