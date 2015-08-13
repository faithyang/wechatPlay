var maxLength = 300;
var delay = 2000;
var commentReview = document.querySelector('.comment-review'),
	textEle = document.querySelector('textarea'),
	textError = document.querySelector('#error'),
    textCount = document.querySelector('.count'),
    cancelBtn = document.querySelector('.cancel'),
    submitBtn = document.querySelector('.submit'),
    successClose = document.querySelector('.close'),
    commentForm = document.querySelector('.wechat-comments-f'),
    successTip = document.querySelector('.wechat-comments-s');
var submitEventListener = function() {
	successTip.style.display = 'block';
}
commentReview.addEventListener('touchstart', function() {
	commentForm.style.display = 'block';
}, false);
cancelBtn.addEventListener('touchstart', function() {
	commentForm.style.display = 'none';
}, false);
textEle.addEventListener('input', function() {
	//每个汉字算做两个字符
	var chineseArray = textEle.value.match(/[\u3400-\u9FBF]/g);
	var length = chineseArray ? chineseArray.length + textEle.value.length : textEle.value.length;
	switch (true) {
		case (length === 0):
			if(submitBtn.classList.contains('active')) {
				submitBtn.classList.remove('active');
				submitBtn.removeEventListener('touchstart', submitEventListener, false);
			}
			break;
		case (length >= maxLength + 1):
			if(submitBtn.classList.contains('active')) {
				submitBtn.classList.remove('active');
				submitBtn.removeEventListener('touchstart', submitEventListener, false);
			}
			textError.innerHTML = '评论内容超出' + maxLength + '字, 无法提交';
			break;
		default:
			if(!submitBtn.classList.contains('active')) {
				submitBtn.classList.add('active');
				submitBtn.addEventListener('touchstart', submitEventListener, false);
			}
			if(textError.innerHTML.length !== 0) {
				textError.innerHTML = '';
			}
			break;
	}
	textCount.innerHTML = length + '/' + maxLength;
}, false);
successClose.addEventListener('touchstart', function() {
	successTip.style.display = 'none';
	commentForm.style.display = 'none';
}, false);