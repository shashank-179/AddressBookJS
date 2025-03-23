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
        if (this.contacts.length === 0) {
            console.log("📖 Address Book is empty.");
            return;
        }
        console.log("\n📖 Address Book:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.display()}`);
        });
    }

    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
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

// Create readline interface
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
    console.log("5. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case "1":
                addContactPrompt();
                break;
            case "2":
                editContactPrompt();
                break;
            case "3":
                myAddressBook.displayContacts();
                showMenu();
                break;
            case "4":
                deleteContactPrompt();
                break;
            case "5":
                console.log("👋 Exiting Address Book.");
                rl.close();
                break;
            default:
                console.log("❌ Invalid choice, please enter 1-5.");
                showMenu();
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

function editContactPrompt() {
    rl.question("Enter First Name of the contact to edit: ", (firstName) => {
        rl.question("Enter Last Name of the contact to edit: ", (lastName) => {
            let contact = myAddressBook.findContact(firstName, lastName);
            if (!contact) {
                console.log("❌ Contact not found.");
                showMenu();
                return;
            }

            console.log("\nEnter new details (press Enter to keep the existing value):");
            const fields = ["address", "city", "state", "zip", "phone", "email"];
            let index = 0;

            function editField() {
                if (index >= fields.length) {
                    console.log(`✅ Contact updated: ${contact.display()}`);
                    showMenu();
                    return;
                }

                const field = fields[index];
                rl.question(`New ${field.charAt(0).toUpperCase() + field.slice(1)} (${contact[field]}): `, (newValue) => {
                    if (newValue) contact[field] = newValue;
                    index++;
                    editField();
                });
            }

            editField();
        });
    });
}

function deleteContactPrompt() {
    rl.question("Enter First Name of the contact to delete: ", (firstName) => {
        rl.question("Enter Last Name of the contact to delete: ", (lastName) => {
            myAddressBook.deleteContact(firstName, lastName);
            showMenu();
        });
    });
}

showMenu();
