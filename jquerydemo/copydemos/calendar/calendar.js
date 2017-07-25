(function(){
	console.log('calendar is runing...');
	var is_calendar = null;
	var day = [6,0,1,2,3,4,5];
	var Calendar = function(config){
		this.init(config);
	}
	Calendar.prototype.init = function(config){
		this.date = config.date || new Date();
		this.box = config.id;
		this.Dom = "<div class='calendar'> \
						<div class='calendar-header'> \
							<span class='cale-left'><</span><span class='cale-right'>></span>\
							<input type='text' class='year'>年<input type='text' class='month'>月\
							<span class='cale-que'>取消</span><span class='cale-com'>确定</span>\
						</div>\
						<div class='cale-nav clearfix'>\
							<span>Mon</span>\
							<span>Tue</span>\
							<span>Wed</span>\
							<span>Thu</span>\
							<span>Fri</span>\
							<span>Sat</span>\
							<span>Sun</span>\
						</div>\
						<div class='calendar-ri'></div>\
					</div>";
		this.callback = config.callback;
		this.show();
	}
	Calendar.prototype.show = function(){
		var date = new Date(this.date);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var d = date.getDate();
		var days = [31,28+is_leap(date.getFullYear()),31,30,31,30,31,31,30,31,30,31];
		var newDate = new Date(year+','+month+','+1);
		var kun = day[newDate.getDay()];
		var tian = days[newDate.getMonth()];
		if(is_calendar)return;
		$(this.box).css({position:'relative'}).append(this.Dom);
		is_calendar = this;
		$('.calendar').css({position:'absolute',left:0,top:$(this.box).height()})
		var spanKun = str_repeat('<span></span>',kun,tian);
		$('.year').val(year);
		$('.month').val(month);
		$('.calendar-ri').append(spanKun).children('span').eq(d+kun-1).addClass('active');
		var _this = this;
		$('.cale-left').on('click',function(){
			if(month==1){
				year--;
				month=13;
			}
			_this.upDate(year,--month);
		})
		$('.cale-right').on('click',function(){
			if(month==12){
				year++;
				month=0;
			}
			_this.upDate(year,++month);
		})
		$('.calendar input').on('change',function(){
			var year = $('.year').val();
			var month = $('.month').val();
			console.log(year.match(/^\d+$/));
			if(!year.match(/^\d+$/)|| !month.match(/^\d+$/)){
				$('.calendar-ri').html('<h3>你输入的是火星时间吧</h3>');
				return;
			}
			_this.upDate(year,month);
		})
		$('.calendar-ri span').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
		$('.cale-que').on('click',function(e){
			e.stopPropagation();
			_this.hide();
			_this.callback&&_this.callback('取消');
		})
		$('.cale-com').on('click',function(e){
			e.stopPropagation();
			var y = $('.year').val();
			var m = $('.month').val();
			var d = $('.calendar-ri .active').text();
			_this.hide();

			_this.callback&&_this.callback(y,m,d);
		})
	}
	Calendar.prototype.hide = function(){
		$('.calendar').remove();
		is_calendar=null;
	}
	Calendar.prototype.upDate = function(year,month){
		$('.calendar-ri').html('');
		var days = [31,28+is_leap(year),31,30,31,30,31,31,30,31,30,31];
		var newDate = new Date(year+','+month+','+1);
		var kun = day[newDate.getDay()];
		var tian = days[newDate.getMonth()];
		var spanKun = str_repeat('<span></span>',kun,tian);
		$('.year').val(year);
		$('.month').val(month);
		$('.calendar-ri').append(spanKun).children('span').eq(kun).addClass('active');
		$('.calendar-ri span').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	}
	var golbal = this || (0, eval)('this');
	golbal.Calendar = Calendar;
	// 判断是否为闰年
	function is_leap(year){
		return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
	}
	// 重复生成字符串
	function str_repeat(str,n,t){
		var strs='';
		var m = 7-(n+t)%7;
		for(var i=0;i<n+t+m;i++){
			if(i<n){
				strs+=str;
			}else if(i<n+t){
				strs+='<span>'+(i-n+1)+'</span>';
			}else if(i<n+t+m){
				strs+=str;
			}
			
		}
		return strs;
	}
})()