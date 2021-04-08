const Splitter = require('./splitter.js')

const source = 'E:\\workspace\\Videos\\1280x720\\full\\mp4\\original.mp4';
const destination = 'E:\\workspace\\Videos\\1280x720\\chunks\\mp4\\name_chunk_%03d.mp4';
const segmentTime = 60;

let splitter = new Splitter(source, destination, segmentTime);

splitter.split();

