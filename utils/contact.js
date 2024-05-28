// readline modul core
const fs = require('fs');

// cek folder
const dirPath = 'data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// cek file
const dataPath = 'data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

// detail contact
const findContact = (n) => {
    const contacts = loadContact();
    const contact = contacts.find((c) => c.firstName.toLowerCase() === n.toLowerCase());
    return contact;
}

// add contact
const saveContacts = (c) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(c));
}

const addContact = (reqBody) => {
    contacts = loadContact();
    contacts.push(reqBody);
    saveContacts(contacts);
};

// check duplicate
const checkDuplicate = (v) => {
    const contacts = loadContact();
    return contacts.find((c) => c.firstName === v);
}

// delete contact
const deleteContact = (v) => {
    const contacts = loadContact();
    const filterContact = contacts.filter((contact) => contact.firstName !== v);
    saveContacts(filterContact);
}

// edit contact
const editContact = (v) => {
    const contacts = loadContact();
    // remove old contact
    const filterContact = contacts.filter((contact) => contact.firstName !== v.oldName);
    delete v.oldName;
    filterContact.push(v);
    saveContacts(filterContact);
}

module.exports = { loadContact, findContact, addContact, checkDuplicate, deleteContact, editContact };