const VideoManager = require('./videoManager')
const fileName = 'original.mp4';

const FILE_STORAGE = 'E:\\workspace\\Videos\\1280x720\\full\\mp4\\';
const CHUNK_STORAGE = 'E:\\workspace\\Videos\\1280x720\\chunks\\mp4\\';


const videoManager = new VideoManager(FILE_STORAGE, CHUNK_STORAGE);
videoManager.splitVideoToChunks(fileName);