// playing with data from folder so I won't get rate limited
const jsonData = require('./v2')
console.log(jsonData.ParkingFacilities.length)

// I will store the unique ID of the garages in this array
const garageId = []
// I will store the garage capacities in this array
const garageCap = []
// I will store the location aka the province of the garage into the array
const garageProvince = []

// Here I get the unique ID of the parking garage and store it in the array
getId()


// First a quick sanity check. Here I request the information with the unique ID from another dataset. In this case I am looking for the parking capacity
// const infoGarageCheck = require('./dummyData/' + garageId[0])
// console.log('testing dummydata: ', infoGarageCheck.parkingFacilityInformation.specifications[0].capacity)
// const check = infoGarageCheck.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity')
// console.log(check)
// const getInfo = require('./dummyData/' + garageId[3])
// const getCap = getInfo.parkingFacilityInformation.specifications[0].capacity
// console.log('CHECKING GETCAP: ', getCap)


// Here I am sanity checking for the location of the garage
const infoGarageCheck = require('./dummyData/' + garageId[0])
console.log('testing dummydata: ', infoGarageCheck.parkingFacilityInformation.accessPoints[0].accessPointAddress.province)

// TODO: need to extract province out of dataset

console.log(garageProvince)

for (let i = 0; i < garageId.length; i++) {
	const getParkingId = require('./dummyData/' + garageId[i])
	const check = getParkingId.parkingFacilityInformation.hasOwnProperty('operator')

	if (check) {
		console.log('garageId', garageId[i], i, 'is being checked now')
		if (getParkingId.parkingFacilityInformation.operator.administrativeAddresses[0] === null) {
			console.log('logging id: ', garageId[i])
			console.log('yeeeeeeeeet')
			garageProvince.push(String('it dont work like this'))
		} else if (getParkingId.parkingFacilityInformation.operator.administrativeAddresses[0].hasOwnProperty('province') == true) {
			console.log('logging id: ', garageId[i])
			console.log('reeee')
			garageProvince.push(String('it dont work like this'))
		} else if (getParkingId.parkingFacilityInformation.accessPoints[0].accessPointAddress.hasOwnProperty('province') == true) {
			console.log('logging id: ', garageId[i])
			console.log('found the province in the accesspoint!')
			garageProvince.push(getParkingId.parkingFacilityInformation.accessPoints[0].accessPointAddress.province)
		}
		else {
			console.log('logging id: ', garageId[i])
			console.log('found the province in the operator!')
			const getProv = getParkingId.parkingFacilityInformation.operator.administrativeAddresses[0].province
			garageProvince.push(getProv)
		}

	} else {
		console.log('found no specification value')
		garageProvince.push(String('it dont work like this'))
	}
}

// TODO: put all data in one object-array
// const allData = [{
// 	province : province,
// 	capacity : capacity,
//  id : id
// }]

// TODO: sort/splice the object-array

function test(){for (let i = 0; i < garageId.length; i++) {
	const getParkingId = require('./dummyData/' + garageId[i])
	const checkOp = getParkingId.parkingFacilityInformation.hasOwnProperty('operator')
	const checkAp = getParkingId.parkingFacilityInformation.accessPoints.hasOwnProperty('province')

	if(checkAp){

	}

}
}


// In this for loop I will be extracting the garage capacity out of the elements. I have encountered many problems with empty values and values that weren't even there.
// I use the identifiers I got from the other dataset to look up the elements in another dataset. Here I can get various stuff.

// for (let i = 0; i < garageId.length; i++) {
// 	const getParkingId = require('./dummyData/' + garageId[i])
// 	const check = getParkingId.parkingFacilityInformation.hasOwnProperty('specifications')

// 	if (check) {
// 		console.log('id has a specification')
// 		if (getParkingId.parkingFacilityInformation.specifications[0] === null) {
// 			console.log('logging id: ', garageId[i])
// 			console.log('yeeeeeeeeet')
// 			garageCap.push(String('it dont work like this'))
// 		} else if (getParkingId.parkingFacilityInformation.specifications.hasOwnProperty('capacity') == true) {
// 			console.log('logging id: ', garageId[i])
// 			console.log('reeee')
// 			const getCapacity = getParkingId.parkingFacilityInformation.specifications[0].capacity
// 			garageCap.push(getCapacity)
// 		} else {
// 			console.log('logging id: ', garageId[i])
// 			console.log('found the capacity!')
// 			const getCapacity = getParkingId.parkingFacilityInformation.specifications[0].capacity
// 			garageCap.push(getCapacity)
// 		}

// 	} else {
// 		console.log('found no specification value')
// 		garageCap.push(String('it dont work like this'))

// 	}
// }
// console.log('this log should give 22: ', garageCap[0])

// checking if if/else statements really worked.
const checkArray = garageCap.includes("it dont work like this")
console.log('checking array..: ', checkArray)







// THE API WAY



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

function getId() {
	for (let i = 0; i < jsonData.ParkingFacilities.length; i++) {
		garageId.push(jsonData.ParkingFacilities[i].identifier)
	}
}

