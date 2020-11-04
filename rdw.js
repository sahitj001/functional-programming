

// //playing with data from folder so I won't get rate limited
const jsonData = require('./v2')
console.log(jsonData.ParkingFacilities.length)
console.log(jsonData.ParkingFacilities[0].identifier)

const garageId = []

// for (let index = 0; index < jsonData.ParkingFacilities.length; index++) {
// 	console.log('test')
// 	// garageId.push(jsonData.ParkingFacilities.identifier)
// 	// console.log(garageId)
// }

// console.log('d3 loaded', d3)


// Here I will get the AreaId and the capacity of the parking garages
const url1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=1563'

// Here I will get the UUID out of the API so I later can find the location of the garage
const url2 = 'https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKEERGEBIED/mz4f-59fw?$limit=7928'

const url3 = 'https://npropendata.rdw.nl/parkingdata/v2/'

const cors = 'https://cors-anywhere.herokuapp.com/'

// Getting garage ID so I can look up its unique identifier. I will also get the parkingspots from this API.
// const data1 = getData(cors + url3)
// 	.then(data => {
// 		// Get unique ID of garage
// 		const identifier = filterData(data, 'identifier')
// 		console.log(identifier);

// 		return identifier
// 	})

	// .then(information => {
	// 	console.log('informationnn', information)

	// 	for (let index = 0; index < information.length; index++) {
	// 		const element = array[index];

	// 	}

	// 	return information
	// })

async function getData(url) {
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const filterData = (data, column) => {
	return data.ParkingFacilities.map(result => result[column])
}
