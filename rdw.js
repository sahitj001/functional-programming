let endpoint = 'https://opendata.rdw.nl/resource/qidm-7mkf.json';

getData(endpoint);
.then(data => {
	const result = filterData(data, 'UsageIdDesc');
	console.log(result);
} )

async function getData(url){
	const response = await fetch(url);
	const data = await response.json();
	return data;
}
