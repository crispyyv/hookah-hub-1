const progress = document.querySelector('.progress');
var like = document.querySelector(".like-review");
var heart = document.querySelector(".fa-heart");

like.addEventListener("click", (e) => {
	document.querySelector('.like-review').innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> You liked this';
	like.firstChild.classList.add("animate-like");
});

window.addEventListener('scroll', progressBar);

function progressBar(e){
	let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let per = windowScroll / windowHeight * 100;
	progress.style.width = per + '%';
};

