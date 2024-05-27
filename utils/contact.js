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

const findContact = (n) => {
    const contacts = loadContact();
    const contact = contacts.find((c) => c.name.toLowerCase() === n.toLowerCase());
    return contact;
}

module.exports = { loadContact, findContact };