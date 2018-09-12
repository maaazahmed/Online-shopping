const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


function LoadTokens(){
    let refee = admin.database().ref('/token');
    let token = new Promise((resolve, reject) => {
        refee.once('value').then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        })
    })
    return token;
}

exports.sendNotification = functions.database.ref('/Categorys').onWrite(() => {
    const payload = {
        data: {
            priority: 'high'
        },
        notification: {
            title: "Online shopping",
            body: "New Post in Online Shopping",
            sound: 'default'
        }
    }

    return LoadTokens().then(token => {
        const snapshot = token.val();
        const tokens = [];
        for (let key in snapshot) {
            tokens.push(snapshot[key]['fcmToken']);
        }
        return admin.messaging().sendToDevice(tokens, payload);
    })

})
    