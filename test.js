


const data = getData('https://gist.githubusercontent.com/sahitj001/e6e6f8d83952abe03bcfa591be65faa1/raw/061a0fffaf64b2ef62ffdf5e1ec9bcc7e48977fc/garages.json')
	// .then(data => {
	// 	// Get unique ID of garage
	//   console.log(data)

	// 	return data
	// })

	console.log(data)

async function getData(url) {
	const response = await fetch(url)
	const data = await response.json()
	return data
}
