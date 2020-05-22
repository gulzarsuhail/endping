import { privateDecrypt } from 'crypto';

const breakAndApply = (data, length, apply) => {
    let finalData = '';
    while (data.length > 0) {
        let substring = data.substring(0, length);
        finalData += apply(substring);
        data = data.substring(length);
    }
    return finalData;
}

export const privateDecryptUsingKey = (key, data) => {
    return breakAndApply (data, 344, substring => privateDecrypt( key, Buffer.from(substring, "base64") ));
}