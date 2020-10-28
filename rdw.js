const endpoint = 'https://opendata.rdw.nl/resource/qidm-7mkf.json'

getData(endpoint)
.then(data => {
	const result = filterData(data, 'usageiddesc')
	console.log(result);
	const cleanedData = cleanData(result)
	console.log(cleanedData);
	})

async function getData(url){
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const filterData = (data, column) => {
	return data.map(result => result[column])
}

const cleanData = (data => {
	console.log('test')
	if(data = 'undefined'){
		const none = data.concat('geen')
		console.log('added geen' ,none)
	}
})
