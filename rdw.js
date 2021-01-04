// playing with data from folder so I won't get rate limited

const fs = require('fs')
const myData = require('./v2.json')
// console.log(myData)


// console.log('length of dataset: ', jsonData.ParkingFacilities[0].identifier)

// const garages = require('./dummyData/')

// I will store the unique ID of the garages in this array
const garageId = myData.ParkingFacilities.map(getId)

// const getData = garageId.map()
// I will store the garage capacities in this array
const garageCap = []
// I will store the location aka the province of the garage into the array
const garageProvince = []
// Store all data in one object
const allData = []

function yayeet(){
	const getParkingId = getFiles(garageId[i])
}


// Here I get the unique ID of the parking garage and store it in garageId
// getId(myData)
// After having retrieved the ID, I can use that to find the capacity of the garage
getCapacity()
// I also can find in which province the garage is located in
getProvince()
// At last I store all values in one array as an object
storeData()

// After I got all my data, I will then look for the province I want to
// const myProv = filterProv('Zuid-Holland')




// First a quick sanity check. Here I request the information with the unique ID from another dataset. In this case I am looking for the parking capacity
// const infoGarageCheck = require('./dummyData/' + garageId[0])
// console.log('testing dummydata: ', infoGarageCheck.parkingFacilityInformation.specifications[0].capacity)
// const check = infoGarageCheck.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity')
// console.log(check)
// const getInfo = require('./dummyData/' + garageId[3])
// const getCap = getInfo.parkingFacilityInformation.specifications[0].capacity
// console.log('CHECKING GETCAP: ', getCap)


// Here I am sanity checking for the location of the garage
// const infoGarageCheck = require('./dummyData/' + garageId[0])
// console.log('testing dummydata: ', infoGarageCheck.parkingFacilityInformation.accessPoints[0].accessPointAddress.province)



// --------------------------------------------------------------------

// THE API WAY

// const url = 'https://npropendata.rdw.nl/parkingdata/v2/'

// const cors = 'https://cors-anywhere.herokuapp.com/'

// Getting garage ID so I can look up its unique identifier. I will also get the parkingspots from this API.
// const data = getData(cors + url)
// 	.then(data => {
// 		// Get unique ID of garage
// 		const myData = filterData(data, 'identifier')
// 		console.log('identifier', myData);

// 		return myData
// 	})
// console.log(data)

// async function getData(url) {
// 	const response = await fetch(url)
// 	const data = await response.json()
// 	return data
// }

// const filterData = (data, column) => {
// 	return data.ParkingFacilities.map(result => result[column])
// }

// --------------------------------------------------------------------

// Retrieving the identifier from the dataset
function getId(data) {
	return data.identifier
}

// Here I am retrieving the specific garage data
function getFiles(id){
	const getFile = require('./dummyData/' + id + '.json')
	return getFile
}

// Here I am getting the province out of the dataset with the ID.
// Just like getCapacity, I encountered many problems within the dataset so I tried many ways of extracting the data.
function getProvince() {
	console.log('getting provinces..')
	for (let i = 0; i < garageId.length; i++) {
		const getParkingId = getFiles(garageId[i])
		const checkOp = getParkingId.parkingFacilityInformation.hasOwnProperty('operator')
		const checkAp = getParkingId.parkingFacilityInformation.hasOwnProperty('accessPoints')

		if (checkOp || checkAp) {
			// console.log('garageId', garageId[i], i, 'is being checked now')
			if (getParkingId.parkingFacilityInformation.operator.administrativeAddresses === undefined || getParkingId.parkingFacilityInformation.operator.administrativeAddresses[0] === null) {
				// console.log('logging id: ', garageId[i])
				// console.log('yeeeeeeeeet')
				// garageProvince.push(String('it dont work like this'))
			} else {
				// console.log('logging id: ', garageId[i])
				// console.log('ye boi')
				const getProv = getParkingId.parkingFacilityInformation.operator.administrativeAddresses[0].province
				garageProvince.push(getProv)
			}
		} else {
			// console.log('found no specification value')
			// garageProvince.push(String('it dont work like this'))
		}
	}
}

// In this for loop I will be extracting the garage capacity out of the elements. I have encountered many problems with empty values and values that weren't even there.
// I use the identifiers I got from the other dataset to look up the elements in another dataset. Here I can get various stuff.
function getCapacity() {
	console.log('getting garage capacities..')
	for (let i = 0; i < garageId.length; i++) {

		const getParkingId = getFiles(garageId[i])
		const check = getParkingId.parkingFacilityInformation.hasOwnProperty('specifications')

		if (check) {
			// console.log('garageId', garageId[i], i, 'has a specification')
			if (getParkingId.parkingFacilityInformation.specifications[0] === null || getParkingId.parkingFacilityInformation.specifications[0] === undefined) {
				// console.log('logging id: ', garageId[i])
				// console.log('yeeeeeeeeet')
				// garageCap.push(String('it dont work like this'))
			} else if (getParkingId.parkingFacilityInformation.specifications.hasOwnProperty('capacity') == true) {
				// console.log('logging id: ', garageId[i])
				// console.log('reeee')
				const getCapacity = getParkingId.parkingFacilityInformation.specifications[0].capacity
				garageCap.push(getCapacity)
			} else {
				// console.log('logging id: ', garageId[i])
				// console.log('found the capacity!')
				const getCapacity = getParkingId.parkingFacilityInformation.specifications[0].capacity
				garageCap.push(getCapacity)
			}

		} else {
			// console.log('found no specification value')
			// garageCap.push(String('it dont work like this'))

		}
	}
}

// I store all the data I got in one array.
function storeData() {
	console.log('storing id, capacities and province in allData..')
	for (let i = 1; i < garageId.length; i++) {
		allData.push({
			id: garageId[i],
			capacity: garageCap[i],
			province: garageProvince[i]
		})
	}
}

// Here I will be filtering all my data to a specific province. This doesn't mean that all values are correct so I still have to check the objects.
function filterProv(prov) {
	const chosenProv = allData.filter(filterChosenProv)
	const result = chosenProv.filter(filterJunk)

// I first check if the values are empty or if they are not the province we want.
	console.log('filtering on province:', prov)
	function filterChosenProv() {
		for (let i = 0; i < allData.length; i++) {
			if (allData[i].province === undefined || allData[i].province.includes(prov) == false) {
				allData.splice(i, 1)
				//  console.log('yeeting', allData[i])
			} else {
				// if the correct province is found, do nothing
				// console.log('u good', allData[i])
			}
		}
		return allData
	}

	// Since we got the province we want, the next step will be to check if every object has a capacity. If it doesn't have a capacity, it will be removed from the array.
	console.log('cleaning province..')
	function filterJunk() {
		for (let i = 0; i < chosenProv.length; i++) {

			if (typeof chosenProv[i].capacity === 'undefined' || typeof chosenProv[i].capacity === 'null' || chosenProv[i].hasOwnProperty('capacity') == false) {
				chosenProv.splice(i, 1)
			} else {
				//do nothing
			}
		}
		return chosenProv
	}
	return result
}

// Here I calculate the average of the capacity of the province.
function calcAverage(chosenArray){
	console.log('calculating average..')
	let total = 0
	let average = 0
	for (let i = 0; i < chosenArray.length; i++) {
		total += chosenArray[i].capacity
		average = total / chosenArray.length
	}
	return average
}

// sanity checking by writing data on a file so i can see for myself if something is wrong
function qString() {
	const convertedString = []
	for (let i = 0; i < myProv.length; i++) {
		convertedString.push(myProv[i].province.toString())
	}
	return convertedString
}

// const testit = qString(myProv)
const convert = JSON.stringify(allData)

fs.writeFile('allData.json', convert, function () {
	console.log('Saved!')
})

