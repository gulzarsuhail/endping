import { privateDecrypt, privateEncrypt, publicEncrypt } from 'crypto';

let serverPublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqxZJrkIeDBIoGNOexJyH\n5aMK1AcPenkACu8Qr1BYTz3ySW0BntXFez1QqpAbfuMPLIK7JPipQGR1+KGpQ5lR\ndtmkLIsvnxH1ZOSs2Q/JPeY0cLmf60zOU0AWMDFaV1b1IdcRD+hM97avSoO/Bi+c\nL56jkYOiumw/URbP4Jd7oPs7Iba5DU7AgaAuGrr3tXuVYpv4nVyRoOxNWbGRbiuv\nD0OFzchvmNC4BfTT/kFo2aY1hTOfQiqg1+tTVPHWzZzsw4hqrAcHiT2S9Oma2ql0\nk2TLO5mz6XZpkkimQCsnoYS0bEVFLeHaScoK2ukWgQRYAaYq0X78z6q0p9M6Q/pg\n8QIDAQAB\n-----END PUBLIC KEY-----";

let privateAuthKey = null;
let publicAuthKey = null;

export const setServerKey = serverKey => {
    serverPublicKey = serverKey
}

export const setPrivateKey = key => {
    privateAuthKey = key;
}

export const setPublicKey = key => {
    publicAuthKey = key;
}


const breakAndApply = (data, length, apply) => {
    let finalData = '';
    while (data.length > 0) {
        let substring = data.substring(0, length);
        finalData += apply(substring);
        data = data.substring(length);
    }
    return finalData;
}

export const privateDecryptUsingAuthKey = (data) =>
    breakAndApply (data, 344, substring => privateDecrypt(privateAuthKey, Buffer.from(substring, "base64")));

export const privateEncryptUsingAuthKey = (data) =>
    breakAndApply (data, 200, substring => privateEncrypt(privateAuthKey, Buffer.from(substring)).toString("base64"));

export const publicEncryptUsingAuthKey = (data) =>
    breakAndApply (data, 200, substring => publicEncrypt(publicAuthKey, Buffer.from(substring)).toString("base64"));

export const publicEncryptUsingPublicKey = (publicKey, data) =>
    breakAndApply (data, 200, substring => publicEncrypt(publicKey, Buffer.from(substring)).toString("base64"));

export const encryptMessageForReciever = (recieverPubKey, message) => {
    const senderEncrypt = privateEncryptUsingAuthKey(message);
    const recieverEncrypt = publicEncryptUsingPublicKey(recieverPubKey, senderEncrypt);
    return recieverEncrypt;
}