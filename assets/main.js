

const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL06XWdnMHRc7AM6b6u95Ro1ApNwQ2BC-y&part=snippet';

const content = null || document.getElementById('content');
const player = document.getElementById('player'); // Contenedor para el iframe

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5110b14c1amshc44b6a0f8f96730p12a8e6jsn5a9578dd985e',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}


function playVideo(videoId) {
    player.innerHTML = `
        <iframe width="100%" height="500" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
            frameborder="0" allowfullscreen>
        </iframe>
    `;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
            ${videos.items.map(video => {
                const videoId = video.snippet.resourceId.videoId; 
                return `
                <div class="group relative cursor-pointer" onclick="playVideo('${videoId}')">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">${video.snippet.title}</h3>
                    </div>
                </div>
                `;
            }).slice(0, 5).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();