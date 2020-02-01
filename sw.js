//asignar nombre y version de la cahe 
const CACHE_NAME = 'v1_cache_patrico_reinoso_pwa';

//ficheros a cachera en la aplicacion
var urlsToCache =[
	'./',
	'./css/styles.css',
	'./img/img/favicon.png',
	'./img/img/1.png',
	'./img/img/2.png',
	'./img/img/3.png',
	'./img/img/4.png',
	'./img/img/5.png',
	'./img/img/6.png',
	'./img/img/facebook.png',
	'./img/img/instagram.png',
	'./img/img/twitter.png',
	'./img/img/favicon-1024.png',
	'./img/img/favicon-512.png',
	'./img/img/favicon-384.png',
	'./img/img/favicon-256.png',
	'./img/img/favicon-192.png',
	'./img/img/favicon-128.png',
	'./img/img/favicon-96.png',
	'./img/img/favicon-64.png',
	'./img/img/favicon-32.png',
	'./img/img/favicon-16.png'
];

//eventos
// evento install
//inatalacion del servicio worker y guarda en cahe los recursos estaticos 
self.addEventListener ('install', e =>{
				e.waitUntil(
					caches.open(CACHE_NAME)
					      .then(cache =>{
			          return cache.addAll(urlsToCache)
					          .then(()=> {
					          	self.skipWaiting();
					          });
					          
				
					     })
					       .catch (err =>	console.log('No se ha registado', err))
					 );         

				

			});

// evento active
self.addEventListener('activate',e =>{
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
		      .then(cacheNames => {
		      	return Promise.all(
		      		cacheNames.map(cacheName =>{
		      			if (cacheWhitelist.indexOf(cacheName) === -1) {
		      				////borrar elementos que no nesecitamos 
		      				return caches.delete(cacheName);
		      			}

		      		})
		      		);
		       })
		      .then(()=>{
		      	//activar cache
		      	self.clients.claim();

		      })


		);
});

// evento fetch
self.addEventListener('fetch', e =>{
	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				//devuelvo datos desde cache
				return res;
			}
			return fetch(e.request);
			})
		


		);
});	
