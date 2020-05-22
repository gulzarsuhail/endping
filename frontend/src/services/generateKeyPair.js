const arrayBufferToBase64 = keyArrBuffer => {
    const byteArray = new Uint8Array(keyArrBuffer);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++)
        byteString += String.fromCharCode(byteArray[i]);
    const base64 = window.btoa(byteString);
    return base64;
}

const breakIntoLines = base64key => {
    let finalBase64Key = '';
    while (base64key.length > 0) {
        finalBase64Key += base64key.substring(0, 64) + '\n';
        base64key = base64key.substring(64);
    }
    return finalBase64Key;
}

const convertToPem = (key, type) => {
    const b64 = breakIntoLines(arrayBufferToBase64(key));
    const keyTypeString = type.toUpperCase();
    const pemKey = `-----BEGIN ${keyTypeString} KEY-----\n${b64}-----END ${keyTypeString} KEY-----`;
    return pemKey;
}

export function genKeyPair() {
    return new Promise ((resolve) => {
        window.crypto.subtle.generateKey({
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: "SHA-256"
        }, true, ["encrypt", "decrypt"])
        .then(keyPair => {
            return new Promise ((resolveExportKey) => {
                const exportPrivateKey =  window.crypto.subtle.exportKey(
                    "pkcs8",
                    keyPair.privateKey
                );
                const exportPublicKey =  window.crypto.subtle.exportKey(
                    "spki",
                    keyPair.publicKey
                );
                Promise.all([exportPublicKey, exportPrivateKey])
                .then(keys => resolveExportKey(keys))
            })
        }).then(generatedKeys => {
            const publicKey = convertToPem(generatedKeys[0], "public");
            const privateKey = convertToPem(generatedKeys[1], "private");
            resolve ([publicKey, privateKey]);
        });
    });
}