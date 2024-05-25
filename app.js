// readline modul core
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

rl.question('siapa nama anda : ', (name) => {
    rl.question('berapa nomer hp anda: ', (nomor) => {
        
        const contact  = { name, nomor };
        const file = fs.readFileSync('data/contact.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(contact);
        console.log(contacts);
        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
        console.log('terimakasih sudah memasukan')
        rl.close();

    });
});