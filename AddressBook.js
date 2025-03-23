// addressBook.js

const readline = require("readline");

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    display() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        console.log(`✅ Contact added: ${contact.firstName} ${contact.lastName}`);
    }

    displayContacts() {
        console.log("\n📖 Address Book:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.display()}`);
        });
    }
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input
function getContactDetails() {
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter ZIP Code: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phone) => {
                                rl.question("Enter Email: ", (email) => {
                                    const newContact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
                                    myAddressBook.addContact(newContact);
                                    myAddressBook.displayContacts();
                                    rl.close();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

const myAddressBook = new AddressBook();
getContactDetails();
