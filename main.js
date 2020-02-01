//service workker
if ('serviceWorker' in navigator) {
	console.log('Puedes usar los serviWorker en tu navegador');



	navigator.serviceWorker.register('./sw.js')
	                        .then(res => console.log('sercviceWorker cargado correctamente', res))
	                        .catch(err => console.log('serviceWorker no se ha podido registrar', err));
}else{
	console.log('No puedes usar los ServiceWorker en tu navegador');
}

//scrollsuavisado

$(document).ready(function(){
	
$("#menu a").click(function(e){
	e.preventDefault();

	console.log($('#footer').offset().top);

$("html, body").animate({ 
	scrollTop:$($(this).attr('href')).offset().top

});
	return false;
});

});