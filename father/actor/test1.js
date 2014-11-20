(function(){
	console.log('TEST1');
})();

YUI.add('hello', function (Y) {
	Y.namespace('Hello');

	Y.Hello.sayHello = function() {
		// 这里的路径是相对于引用的文件的，这个很蛋疼，需要修改，否则失去了组件的意义
		Y.io('../../actor/hello.php', {
			method: 'GET',
			on: {
				success: function(id, res) {
					 if ((res.status >= 200 && res.status < 300) || res.status == 304) {
						var answer = Y.JSON.parse(res.responseText);
						var opp = '';
						Y.each(answer, function (i) {
							if (i) {
								opp += i;
							}
						});
						console.log(opp);
					 }
				 },

				failure: function() {
					console.log('获取出现一些问题');
				}
			
			}
		});
		return 'TEST1-TEST2';
	};
}, '0.0.1',
{requires:[
		'io-base',
		'json-parse'
	]});
