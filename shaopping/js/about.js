(function() {
	function getvl(name) {
		var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
		if(reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
		return "";
	};
	var id = getvl("id");
	console.log(id)
	var title = getvl("title");
	console.log( title);
	function reg(title) {
		var url = "";
		switch(title) {
			case "健康险":
				url += "http://192.168.1.129:8080/xintongtec-admin/safe/safe";
				break;
			case "寿险":
				url+= "http://192.168.1.129:8080/xintongtec-admin/life/life";
				break;
			case "意外险":
				url+= "http://192.168.1.129:8080/xintongtec-admin/accident/accident";
				break;
			case "旅游险":
				url+= "http://192.168.1.129:8080/xintongtec-admin/travel/travel";
				break;
			case "免费":
				url+= "http://192.168.1.129:8080/xintongtec-admin/free/free";
				break;
			default:
				break;
		}
		$.ajax({
			async: false,
			url: url,
			type: "GET",
			dataType: "jsonp",
			timeout: 8000,
			jsonpCallback: 'callback',
			contentType: "application/jsonp; charset=utf-8",
			error: function(jqXHR, textStatus, errorThrown) {
				if(textStatus >= "timeout") {
					alert("加载超时");
					$(".mui-loading").remove();
				} else {
					alert("后台没有开启");
					$(".mui-loading").remove();
				}
			},
			success: function(data) {
				var arr = [];
				for(var i=0;i<data.length;i++){
					if(data[i].id==id){
						arr.push(data[i])
					}
				}
				if(document.querySelector('.mui-loading')){
					$(".mui-title").text(arr[0].title);
					$(".mui-content img")[0].src = String(arr[0].image);
	                $("title").text(arr[0].name);
	                $(".title").text("保险名称:"+arr[0].name);
	                $(".produce").text("保险信息:"+arr[0].produce);
	                 $(".footer h3").text("¥"+arr[0].price)
	                $(".mui-loading").remove();
				}
				console.log(arr);
				
			}
				           	
		});
	}
	reg(title)
	$(".ll").click(function(){
		alert("这只是一个demo页面，并不能真正的购买")
	})
})()