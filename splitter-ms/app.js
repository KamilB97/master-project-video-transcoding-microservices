const VideoManager = require('./videoManager')
const fileName = 'original.mp4';



const videoManager = new VideoManager();
videoManager.splitVideoToChunks(fileName);