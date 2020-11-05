

// playing with data from folder so I won't get rate limited

const jsonData = require('./v2')
console.log(jsonData.ParkingFacilities.length)

// Getting unique id from json list
const garageId = []

for (let i = 0; i < jsonData.ParkingFacilities.length; i++) {
	// console.log(i)
	garageId.push(jsonData.ParkingFacilities[i].identifier)
}


// Here I request the information with the unique ID from another dataset.

// sanity check
const infoGarageCheck = require('./dummyData/' + garageId[0])
console.log('testing dummydata: ', infoGarageCheck.parkingFacilityInformation.specifications[0].capacity)

// store garage capacity into an array
const garageCap = []

const check = infoGarageCheck.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity')
console.log(check)

// garageCap.push(infoGarageCheck.parkingFacilityInformation.specifications[0].capacity)
// console.log(garageCap[0])

// for (let i = 0; i < garageId.length; i++) {
 	const getInfo = require('./dummyData/' + garageId[3])
	const getCap = getInfo.parkingFacilityInformation.specifications[0].capacity
	console.log('CHECKING GETCAP: ', getCap)
	// const checkCap = getInfo.parkingFacilityInformation.specifications[0]
	// .hasOwnProperty('capacity')

// 	console.log('check true or false: ', checkCap)

// 	garageCap.push(getCap)
// }
// console.log('test ', garageCap[0])






for (let i = 0; i < garageId.length; i++) {
	const getParkingCap = require('./dummyData/' + garageId[i])
	// const checkCap = getParkingCap.parkingFacilityInformation.specifications[0].capacity
	const check = getParkingCap.parkingFacilityInformation.hasOwnProperty('specifications')
	// const checkCap = getParkingCap.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity')

	if(check){
		console.log('id has a specification')
		// const checkIt = getParkingCap.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity')

		if(getParkingCap.parkingFacilityInformation.specifications[0] === null){
			console.log('yeeeeeeeeet')
			garageCap.push(String('it dont work like this'))
		} else if(getParkingCap.parkingFacilityInformation.specifications.hasOwnProperty('capacity') == true){
			console.log('logging id: ', garageId[i])
			console.log('reeee')
			garageCap.push(String('it dont work like this'))
		} else {
			console.log('logging id: ', garageId[i])
			const getCapacity = getParkingCap.parkingFacilityInformation.specifications[0].capacity
			garageCap.push(getCapacity)
		}

	} else {
		console.log('found no capacity')
		garageCap.push(String('it dont work like this'))

	}
}
console.log('this log should give 22: ', garageCap[0])

const checkArray = garageCap.includes("it dont work like this")
console.log('checking array..: ', checkArray)


function checkNull(obj) {
	const replace = 'none'
	if(obj === null) {
		console.log('checknull doesnt approve')
		return replace
	} else {
		return console.log('checknull approves')
	}
}

// const allData = [{
// 	province : province,
// 	capacity : capacity
// }]


// THE API WAY
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

	// 	for (let i = 0; i < information.length; i++) {
	// 		const element = array[i];

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
