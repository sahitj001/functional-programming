// const endpoint = 'https://opendata.rdw.nl/resource/qidm-7mkf.json?$limit=2053'
// 'https://cors-anywhere.herokuapp.com/'
console.log('test')
// Here I will get the AreaId and the capacity of the parking garages
const url1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=1563'

// Here I will get the UUID out of the API so I later can find the location of the garage
const url2 = 'https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKEERGEBIED/mz4f-59fw?$limit=7928'

const url3 =  'https://npropendata.rdw.nl/parkingdata/v2/'

// Getting garage ID so I can look up its unique identifier. I will also get the parkingspots from this API.
getData('https://cors-anywhere.herokuapp.com/' + url2)
	.then(data => {

		const id = filterData(data, 'areaid')
		console.log(id);
		const parkingSpots = filterData(data, 'capacity')
		console.log(parkingSpots)

		// Put both values in an object
		const element = {
			areaId : id,
			capacity : parkingSpots
		}
		console.log(element.areaId.length)

		// Now I am getting the area ID where you also can find the UUID. The plan is to compare the areaId from the previous dataset with this one.
		// getData('https://cors-anywhere.herokuapp.com/' + garageId)
		// 	.then(data => {
		// 		const matchingId = filterData(data, 'areaid')
		// 		console.log(matchingId)
		// 	})
		// 	return element;
	})

async function getData(url) {
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const filterData = (data, column) => {
	return data.map(result => result[column])
}

