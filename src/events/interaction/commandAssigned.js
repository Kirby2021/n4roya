const client = require('../../');
client.on('applicationCommandCreate', async(command) => {
    console.log(`Command ${command.name} created.`)
    console.log('-'.repeat(`\`Command ${command.name} created.\``.length))
})
client.on('applicationCommandDelete', async(command) => {
    console.log(`Command ${command.name} deleted.`)
    console.log('-'.repeat(`\`Command ${command.name} created.\``.length))
})
client.on('applicationCommandUpdate', async(command) => {
    console.log(`Command ${command.name} updated.`)
    console.log('-'.repeat(`\`Command ${command.name} created.\``.length))
})