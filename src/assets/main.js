

const API = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=ClO0bxbWLxY&part=id%2Csnippet&type=video&maxResults=4';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5110b14c1amshc44b6a0f8f96730p12a8e6jsn5a9578dd985e',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
   
}



(async()=>{
    

try {
	const videos = await fetchData(API);
	let view = ` ${videos.items.map(video => `
         <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
            </h3>
          </div>
        </div>
    `).slice(0,4).join('') }`;
    content.innerHTML = view;

    } catch (error) {
        console.error(error);
    }
    })();