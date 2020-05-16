import WhatsApp from "./whatsapp";

declare global {
    var L: typeof console.log;
    var E: typeof console.error;
}

///@ts-ignore
global.L = console.log
///@ts-ignore
global.E = console.error

const wa = new WhatsApp();
wa.connect().then(
    info => {
        console.log('Connected to whatsapp:', info.pushname, info.phone);
        setTimeout(() => {
            wa.getContacts().then(
                contacts => {
                    console.log('Contacts', contacts)
                }
            )
        }, 4000)
    }
).catch(err => console.error(err))

wa.on('disconnect', (kind) => {
    L('::disconnect', kind)
})

wa.on('replaced', () => {
    L('::replaced Login in another web whatsapp')
})

wa.on('timeskew', (ts) => {
    L('::timeskew', ts)
})

wa.on('close', (code, reason) => {
    L('::close')
})