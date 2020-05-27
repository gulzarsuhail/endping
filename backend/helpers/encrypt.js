const { publicEncrypt, publicDecrypt } = require('crypto');

const SERVER_PUBLIC_KEY = process.env.SERVER_PUBLIC_KEY.replace(/\\n/g, '\n');
const DUMMY_PUBLIC_KEY = process.env.DUMMY_PUBLIC_KEY.replace(/\\n/g, '\n');

const breakAndApply = (data, length, apply) => {
    let finalData = '';
    while (data.length > 0) {
        let substring = data.substring(0, length);
        finalData += apply(substring);
        data = data.substring(length);
    }
    return finalData;
}

//  publicEnc ( dummyKey, data)
module.exports.publicEncryptUsingDummyKey = data =>{
    return breakAndApply(data, 200, substring => publicEncrypt(DUMMY_PUBLIC_KEY, Buffer.from(substring)).toString("base64"));
}

// publicEnc (serverKey, data)
module.exports.publicEncryptServerPublicKey = externalPublicKey => {
    return breakAndApply(SERVER_PUBLIC_KEY, 200, substring => publicEncrypt(externalPublicKey, Buffer.from(substring)).toString("base64"));
}

//  publicEnc (key, data)
module.exports.publicEncryptUsingKey = (key, data) => {
    return breakAndApply(data, 200, substring => publicEncrypt(key, Buffer.from(substring)).toString("base64"));
}

//  publicDec (key, data)
module.exports.publicDecryptUsingKey = (key, data) => {
    return breakAndApply(data, 344, substring => publicDecrypt(key, Buffer.from(substring ,"base64")));
}