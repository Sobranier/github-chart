YUI().use('node',function(){
	Y.one('#drawerBtn').delegate('click',function(e){
		alert(e.target.getHTML);
		var gtID = e.target.getHTML;
		//验证可否通过变化的id来锁定目标
		
	},'li');
	//按上面的标签切换下方的内容


});
