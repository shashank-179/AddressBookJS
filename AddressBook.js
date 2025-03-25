const readline = require("readline");

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.validateName(firstName)) throw new Error("❌ Invalid First Name! Must start with a capital letter and have at least 3 characters.");
        if (!this.validateName(lastName)) throw new Error("❌ Invalid Last Name! Must start with a capital letter and have at least 3 characters.");
        if (!this.validateAddress(address)) throw new Error("❌ Invalid Address! Must have at least 4 characters.");
        if (!this.validateAddress(city)) throw new Error("❌ Invalid City! Must have at least 4 characters.");
        if (!this.validateAddress(state)) throw new Error("❌ Invalid State! Must have at least 4 characters.");
        if (!this.validateZip(zip)) throw new Error("❌ Invalid ZIP Code! Must be a 5 or 6 digit number.");
        if (!this.validatePhone(phone)) throw new Error("❌ Invalid Phone Number! Must be a 10-digit number.");
        if (!this.validateEmail(email)) throw new Error("❌ Invalid Email Address! Format should be example@domain.com");

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

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        const isDuplicate = this.contacts.filter(c => c.firstName === contact.firstName && c.lastName === contact.lastName).length > 0;
        if (isDuplicate) {
            console.log(`❌ Contact ${contact.firstName} ${contact.lastName} already exists!`);
            return;
        }
        this.contacts.push(contact);
        console.log(`✅ Contact added: ${contact.firstName} ${contact.lastName}`);
    }
    

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("📖 Address Book is empty.");
            return;
        }
        console.log("\n📖 Address Book:");
        this.contacts.map((contact, index) => {
            console.log(`${index + 1}. ${contact.display()}`);
        });
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));

    console.log("\n📖 Sorted Address Book:");
    this.contacts.map((contact, index) => {
        console.log(`${index + 1}. ${contact.toString()}`);
    });
    }

    countContacts() {
        const count = this.contacts.reduce(total => total + 1, 0);
        console.log(`📊 Total Contacts: ${count}`);
    }

    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }
    searchByCity(city) {
        const contactsInCity = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
        
        if (contactsInCity.length === 0) {
            console.log(`❌ No contacts found in ${city}.`);
            return;
        }
    
        console.log(`\n🏙️ Contacts in ${city}:`);
        contactsInCity.map(contact => console.log(contact.display()));
    
        const count = contactsInCity.reduce(total => total + 1, 0);
        console.log(`📊 Total contacts in ${city}: ${count}`);
    }
    
    searchByState(state) {
        const contactsInState = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());
        
        if (contactsInState.length === 0) {
            console.log(`❌ No contacts found in ${state}.`);
            return;
        }
    
        console.log(`\n🌎 Contacts in ${state}:`);
        contactsInState.map(contact => console.log(contact.display()));
    
        const count = contactsInState.reduce(total => total + 1, 0);
        console.log(`📊 Total contacts in ${state}: ${count}`);
    }
    
    

    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index === -1) {
            console.log("❌ Contact not found.");
            return;
        }
        this.contacts.splice(index, 1);
        console.log(`🗑️ Contact ${firstName} ${lastName} deleted successfully.`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const myAddressBook = new AddressBook();

function showMenu() {
    console.log("\n📌 Address Book Menu:");
    console.log("1. Add a Contact");
    console.log("2. Edit a Contact");
    console.log("3. View All Contacts");
    console.log("4. Delete a Contact");
    console.log("5. Count Contacts");
    console.log("7. Search by City");
    console.log("8. Search by State");
    console.log("6. Exit");
    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case "1": addContactPrompt(); break;
            case "2": editContactPrompt(); break;
            case "3": myAddressBook.displayContacts(); showMenu(); break;
            case "4": deleteContactPrompt(); break;
            case "5": myAddressBook.countContacts(); showMenu(); break;
            case "6": console.log("👋 Exiting Address Book."); rl.close(); break;
            case "7":
    rl.question("Enter City Name: ", (city) => {
        myAddressBook.searchByCity(city);
        showMenu();
    });
    break;

case "8":
    rl.question("Enter State Name: ", (state) => {
        myAddressBook.searchByState(state);
        showMenu();
    });
    break;
            default: console.log("❌ Invalid choice, please enter 1-6."); showMenu();
        }
    });
}

function addContactPrompt() {
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter ZIP Code: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phone) => {
                                rl.question("Enter Email: ", (email) => {
                                    try {
                                        const newContact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
                                        myAddressBook.addContact(newContact);
                                    } catch (error) {
                                        console.log(error.message);
                                    }
                                    showMenu();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

showMenu();
