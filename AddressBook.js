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

    validateName(name) { return /^[A-Z][a-zA-Z]{2,}$/.test(name); }
    validateAddress(value) { return /^[a-zA-Z0-9\s]{4,}$/.test(value); }
    validateZip(zip) { return /^\d{5,6}$/.test(zip); }
    validatePhone(phone) { return /^\d{10}$/.test(phone); }
    validateEmail(email) { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() { this.contacts = []; }

    addContact(contact) {
        const isDuplicate = this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
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

        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log("\n📖 Sorted Address Book:");
        this.contacts.forEach((contact, index) => console.log(`${index + 1}. ${contact.toString()}`));
    }

    countContacts() {
        console.log(`📊 Total Contacts: ${this.contacts.length}`);
    }

    searchByCity(city) {
        const contactsInCity = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
        if (contactsInCity.length === 0) {
            console.log(`❌ No contacts found in ${city}.`);
            return;
        }
        console.log(`\n🏙️ Contacts in ${city}:`);
        contactsInCity.forEach(contact => console.log(contact.toString()));
        console.log(`📊 Total contacts in ${city}: ${contactsInCity.length}`);
    }

    searchByState(state) {
        const contactsInState = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());
        if (contactsInState.length === 0) {
            console.log(`❌ No contacts found in ${state}.`);
            return;
        }
        console.log(`\n🌎 Contacts in ${state}:`);
        contactsInState.forEach(contact => console.log(contact.toString()));
        console.log(`📊 Total contacts in ${state}: ${contactsInState.length}`);
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

    sortByCity() {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
        console.log("\n🏙️ Address Book Sorted by City:");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }

    sortByState() {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
        console.log("\n🌎 Address Book Sorted by State:");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }

    sortByZip() {
        this.contacts.sort((a, b) => a.zip - b.zip);
        console.log("\n📦 Address Book Sorted by ZIP:");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const myAddressBook = new AddressBook();

function showMenu() {
    console.log("\n📌 Address Book Menu:");
    console.log("1. Add a Contact");
    console.log("2. Edit a Contact");
    console.log("3. View All Contacts");
    console.log("4. Delete a Contact");
    console.log("5. Count Contacts");
    console.log("6. Search by City");
    console.log("7. Search by State");
    console.log("8. Exit");
    console.log("9. Sort Contacts by City");
    console.log("10. Sort Contacts by State");
    console.log("11. Sort Contacts by ZIP");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case "1": addContactPrompt(); break;
            case "2": editContactPrompt(); break;
            case "3": myAddressBook.displayContacts(); showMenu(); break;
            case "4": deleteContactPrompt(); break;
            case "5": myAddressBook.countContacts(); showMenu(); break;
            case "6":
                rl.question("Enter City Name: ", (city) => { myAddressBook.searchByCity(city); showMenu(); });
                break;
            case "7":
                rl.question("Enter State Name: ", (state) => { myAddressBook.searchByState(state); showMenu(); });
                break;
            case "8": console.log("👋 Exiting Address Book."); rl.close(); break;
            case "9": myAddressBook.sortByCity(); showMenu(); break;
            case "10": myAddressBook.sortByState(); showMenu(); break;
            case "11": myAddressBook.sortByZip(); showMenu(); break;
            default: console.log("❌ Invalid choice, please enter 1-11."); showMenu();
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
                                    try { myAddressBook.addContact(new Contact(firstName, lastName, address, city, state, zip, phone, email)); }
                                    catch (error) { console.log(error.message); }
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
