// filepath: /Users/hakim/Desktop/Desktop - Abdul’s MacBook Air/React Projects/eazy_ev/backend/config/imagekit.js
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;