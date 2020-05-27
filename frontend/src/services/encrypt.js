import { privateDecrypt, privateEncrypt } from 'crypto';

const breakAndApply = (data, length, apply) => {
    let finalData = '';
    while (data.length > 0) {
        let substring = data.substring(0, length);
        finalData += apply(substring);
        data = data.substring(length);
    }
    return finalData;
}

export const privateDecryptUsingKey = (key, data) => 
    breakAndApply (data, 344, substring => privateDecrypt(key, Buffer.from(substring, "base64")));

export const privateEncryptUsingKey = (key, data) =>
    breakAndApply (data, 200, substring => privateEncrypt(key, Buffer.from(substring)).toString("base64"));