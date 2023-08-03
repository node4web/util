// import Buffer from "@nodefill/buffer/Buffer.js";
const Buffer = { isBuffer: () => false };

const { isBuffer } = Buffer;
export = isBuffer;
