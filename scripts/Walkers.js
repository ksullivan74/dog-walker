import { Assignments } from "./Assignments.js"
import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js"

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [, walkerId] = itemClicked.id.split("--")

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
            
            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const Assignments = filterWalkerCitiesByWalker(walkerCityAssignments)
                    const cities = assignedCityNames(citiesList,Assignments)
            
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)

const walkers = getWalkers()
const walkerCityAssignments = getWalkerCities()
const citiesList = getCities()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    return walkerHTML += "</ul>"

}

// The function need the walker information, so define a parameter
const filterWalkerCitiesByWalker = (walkerCityAssignmentsParam) => {
    // Define an empty array to store all of the assignment objects
    const assignments = []

    // Iterate the array value of walkerCities
    for (const assignment of walkerCityAssignmentsParam) {

        // Check if the primary key of the walker equals the foreign key on the assignment
        if (assignment.walkerId === walkers.id) {
            // If it does, add the current object to the array of assignments
            assignments.push(assignment)
        }
    }

    // After the loop is done, return the assignments array
    return assignments
}

// Define a function that builds a string of city names. Needs a paramter for assignments array.
const assignedCityNames = (citiesListParam,assignmentsParam) => {
    // Define an empty string that will get appended with matching cities
    let cityNames = ""
    // Iterate the array of assignment objects
    for (const assignment of assignmentsParam) {
        // For each assignment, iterate the cities array to find the match
        for (const city of citiesListParam) {
            if (city.id === assignment.cityId) {
                // Add the name of the matching city to the string of city names
                cityNames = `${city.name} and ${city.name}`
            }
        }
    }
    // After the loop is done, return the string
    return cityNames
}
