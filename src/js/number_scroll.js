var view_num = document.querySelector('#view-num');
var view_url = 'http://v.youku.com/x_ajaxGetVV?vid=212465329&_=1418721145745&callback=handleResponse';
var v_number = document.querySelector('.v-number');
function handleResponse(response) {
	var _num, _res;
	if(response) {
		_num = parseInt(view_num.innerHTML.split(',').join(''));
		_res = response - _num;
		if(_res > 0) {
			inTimer(_num, _res);
		}else {
			console.log('The number: ' + _res + ' is limited.');
		}	
	}else {
		console.error('Can not get the current view number.');
	}
}
function jsonpReq(view_url) {
	var script = document.createElement('script');
	script.src = view_url;
	document.body.insertBefore(script, document.body.firstChild);
	document.body.removeChild(script);
}
function inTimer(_num, _res) {
	var i = 0;
	var timer_inner = setTimeout(function() {
		i++;
		_num += 1;
		var num_arr = _num.toString().split('').reverse();
		if(num_arr.length >= 4) {
			num_arr.splice(3, 0, ',');
		}
		if(num_arr.length >= 8) {
			num_arr.splice(7, 0, ',');
		}
		view_num.innerHTML = num_arr.reverse().join('');
		if(timer_inner)
		clearTimeout(timer_inner);
		if(i < _res)
		timer_inner = setTimeout(arguments.callee, 4);
	}, 4);
}
function outTimer(delay, times) {
	var i = 0;
	var timer_outer = setTimeout(function() {
		i++;
		jsonpReq(view_url);
		if(timer_outer)
		clearTimeout(timer_outer);
		if(i < times)
		timer_outer = setTimeout(arguments.callee, delay);
	}, delay);
}
outTimer(5000, 1);