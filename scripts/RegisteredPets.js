/*
1.) Update the code in RegisteredPets module so that the <li> for each pet has an 
    id attribute with the following format id="pet--1". The primary key should be correct for each element.
2.) Add a click event listener to your HTML document.
3.)Store the target HTML element of the click event in a variable.
4.)Check if the id property of the element starts with the string of "pet".
5.)If it does, use the split() method on the id property to get an array of two string (e.g. ["pet", "4"])
6.)Use array deconstruction to assign the primary key to a variable named petPrimaryKey.
7.)Find the whole pet object by iterating the array of pet objects and comparing each primary key 
    to the integer value of the petPrimaryKey variable.
8.)As soon as a match is found, display a message that the dog barks at you - "Rocket barks at you"
*/

/*
In this chapter, you will write code that will iterate two arrays of data to find the information you need. 
When you click on a pet name, you want to display the name of the pet, and the name of the person who walks the pet.
Since those two bits of information are in different arrays, you will need to find the pet object, 
and then find the related walker object based on the foreign key.
*/


import { getPets, getWalkers } from "./database.js"


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
        if (itemClicked.id.startsWith("canBeAnything")) {

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
            const [,petId] = itemClicked.id.split("--")

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
            let matchingPet = null
            for (const pet of pets) {
                /*
                    Compare the primary key of each walker to the one
                    you have. As soon as you find the right one, display
                    the window alert message.
                */
                if (pet.id === parseInt(petId)) {
                    matchingPet = pet
                    //window.alert(`${pet.name} barks at you`)
                }
            }
            let matchingWalker = null
            for (const walker of walkers){
                if (matchingPet.walkerId === walker.id) {
                    matchingWalker = walker
                }
            }
            window.alert(`${matchingPet.name} is being walked by ${matchingWalker.name}`)
        }
    }

)
const pets = getPets()
const walkers = getWalkers()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li id="canBeAnything--${pet.id}"> ${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

