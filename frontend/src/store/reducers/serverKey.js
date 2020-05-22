import { SET_SERVER_PUBLIC_KEY } from '../actionTypes';

const defaultServerKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqxZJrkIeDBIoGNOexJyH\n5aMK1AcPenkACu8Qr1BYTz3ySW0BntXFez1QqpAbfuMPLIK7JPipQGR1+KGpQ5lR\ndtmkLIsvnxH1ZOSs2Q/JPeY0cLmf60zOU0AWMDFaV1b1IdcRD+hM97avSoO/Bi+c\nL56jkYOiumw/URbP4Jd7oPs7Iba5DU7AgaAuGrr3tXuVYpv4nVyRoOxNWbGRbiuv\nD0OFzchvmNC4BfTT/kFo2aY1hTOfQiqg1+tTVPHWzZzsw4hqrAcHiT2S9Oma2ql0\nk2TLO5mz6XZpkkimQCsnoYS0bEVFLeHaScoK2ukWgQRYAaYq0X78z6q0p9M6Q/pg\n8QIDAQAB\n-----END PUBLIC KEY-----";

const parseKey = (key) => key.replace(/\\n/g, '\n');

export default (state=parseKey(defaultServerKey), action) => {
    switch (action.type) {
        case SET_SERVER_PUBLIC_KEY:
            return parseKey(action.key);
        default:
            return state;
    }
}