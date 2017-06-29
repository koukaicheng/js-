        (function() {
//				$('.mui-scroll-wrapper').scroll({
//					indicators: true //是否显示滚动条
//				});
              //把获取数据动态的创建标签，封装成函数
               function appends(arr,ul){
                  var html = "";
                  for(var i = 0;i<arr.length;i++){
                  	 html+="<li class='mui-table-view-cell mui-media' id='"+arr[i].id+"' title='"+arr[i].title+"'>"+ 
										"<a href='html/about.html?id="+arr[i].id+"&title="+arr[i].title+"' class=''>"+
											"<img class='mui-media-object mui-pull-left' src='"+arr[i].image+"'>"+
											"<div class='mui-media-body'>"+
												"<span class='sp'>"+arr[i].name+"</span>"+
												"<p class='mui-ellipsis' >"+arr[i].produce+"</p>"+
											    "<p  class='matwo'>"+
											      "<span class='mui-pull-left mui-icon fontb'>¥"+arr[i].price+"</span> <span class='mui-pull-right mui-icon mui-icon-forward mui-right'>详情</span>"
											    "</p>"+
											"</div>"+
										"</a>"+
									"</li>";
							ul.innerHTML = html;
                          }
                 }
               //滑动到其他页面动态获取ajax，只有滑动的页面进行ajax请求，其他的不请求
                   function loading(url,item,view,jurl){
                         	$.ajax({
							     async:false,
							     url: url,
							     type: "GET",
							     dataType: "jsonp",
							     　  timeout:5000,  
							     jsonpCallback: 'callback',
							     contentType: "application/jsonp; charset=utf-8",
							     error:function(jqXHR, textStatus, errorThrown){   
				                           console.log("服务未开启 即将从本地请求数据");
				                           jsonkkc(jurl,view,item);;
				                    }, 
							      success: function(data) {
										     item.querySelector('.mui-loading').remove();
											 appends(data,view);
							       }
							     });
                    }; 
                    //如果服务未开启,就从本地json数据请求
                    function jsonkkc(jurl,view,item){
                    	$.ajax({
							     async:false,
							     url: jurl,
							     type: "GET",
							      error:function(){ 
				                            alert("加载超时")
				                    }, 
							      success: function(data) {
										     item.querySelector('.mui-loading').remove();
											 appends(data.data,view);
							       }
							     });
                    }
                    //封装函数 点击进入详情的传入url地址参数
                  
                   
                //五个保险所在的页面
				var item1 = document.getElementById('item1mobile');
				var item2 = document.getElementById('item2mobile');
				var item3 = document.getElementById('item3mobile');
				var item4 = document.getElementById('item4mobile');
				var item5 = document.getElementById('item5mobile');
				//页面进来先请求首页
				 $(document).ready(function(){
						$.ajax({
						     async:false,
						     url: "http://192.168.1.129:8080/xintongtec-admin/safe/safe",
						     type: "GET",
						     dataType: "jsonp",
						      timeout:500,  
						     jsonpCallback: 'callback',
						     contentType: "application/jsonp; charset=utf-8",
						     error:function(jqXHR, textStatus, errorThrown){   
				                            alert("服务未开启 即将从本地数据请求");   
				                            $.ajax({
											     async:false,
											     url: "json/safe.json",
											     type: "GET",
											      error:function(){   
								                       alert("加载超时");
								                    }, 
											      success: function(data) {
														 item1.querySelector('.mui-loading').remove();
													     appends(data.data,$(".mui-table-view")[0]);
//                                                       console.log(data)
											       }
											     });
				                    }, 
						     success: function(data) {
			                    appends(data,$(".mui-table-view")[0]);
//			                    console.log(data)
			                    item1.querySelector('.mui-loading').remove();
                                 $("#ul1").children().click(function(){
                                    window.location.href="http://127.0.0.1:8080/shopping/html/about.html?id="+$(this)[0].id+"&title="+$(this)[0].title;
                                 })
						    }	
				     });
					})
				     function scll(){
				 	   if(!$(window).scrollTop()==0){
								$("html,body").animate({scrollTop:0},300);	
							}
				    }
				 //事件委托，把事件监听放在父级标签上，可以动态的监听当前是那个页面，从而在所在的页面请求数据
				document.getElementById('slider').addEventListener('slide', function(e) {
					if (e.detail.slideNumber === 1) {
						if (item2.querySelector('.mui-loading')) {
							loading("http://192.168.1.129:8080/xintongtec-admin/life/life",item2,$(".mui-table-view")[1],"json/life.json");
							console.log($(window).scrollTop())
							
						}
						scll()
					} else if (e.detail.slideNumber === 2) {
						if (item3.querySelector('.mui-loading')) {
							loading("http://192.168.1.129:8080/xintongtec-admin/accident/accident",item3,$(".mui-table-view")[2],"json/accident.json");
							console.log($(window).scrollTop())
							
						}
						scll()
					}else if (e.detail.slideNumber === 3) {
						if (item4.querySelector('.mui-loading')) {
							loading("http://192.168.1.129:8080/xintongtec-admin/travel/travel",item4,$(".mui-table-view")[3],"json/travel.json");  
						}
						scll()
					}else if (e.detail.slideNumber === 4) {
						if (item5.querySelector('.mui-loading')) {
							loading("http://192.168.1.129:8080/xintongtec-admin/free/free",item5,$(".mui-table-view")[4],"json/free.json");
						}
						scll()
					}
				});     	                     		    
				})();
				 