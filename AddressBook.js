// addressBook.js

const readline = require("readline");

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.validateName(firstName)) throw new Error("Invalid First Name! Must start with a capital letter and have at least 3 characters.");
        if (!this.validateName(lastName)) throw new Error("Invalid Last Name! Must start with a capital letter and have at least 3 characters.");
        if (!this.validateAddress(address)) throw new Error("Invalid Address! Must have at least 4 characters.");
        if (!this.validateAddress(city)) throw new Error("Invalid City! Must have at least 4 characters.");
        if (!this.validateAddress(state)) throw new Error("Invalid State! Must have at least 4 characters.");
        if (!this.validateZip(zip)) throw new Error("Invalid ZIP Code! Must be a 5 or 6 digit number.");
        if (!this.validatePhone(phone)) throw new Error("Invalid Phone Number! Must be a 10-digit number.");
        if (!this.validateEmail(email)) throw new Error("Invalid Email Address! Format should be example@domain.com");

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }
    validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    validateAddress(value) {
        return /^[a-zA-Z0-9\s]{4,}$/.test(value);
    }

    validateZip(zip) {
        return /^\d{5,6}$/.test(zip);
    }

    validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
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
