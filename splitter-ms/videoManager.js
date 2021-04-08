const ffmpeg = require('fluent-ffmpeg');


class VideoManager {

    constructor() {
        this.meanSegmentDuration = 120;
    }

    getOptimalVideoChunkDuration(videoPath) {

        const duration = this.getVideoDetails();
        console.log("video duration: " + duration);

        if (duration <= meanSegmentDuration) {
            console.log("duration is less than 120")

            return duration;

        } else {
            console.log("duration is greater than 120")
            let optimalChunksNumber = 0;
            if (duration % meanSegmentDuration < meanSegmentDuration / 2) {
                optimalChunksNumber = Math.floor(duration / meanSegmentDuration);


            } else {
                optimalChunksNumber = Math.ceil(duration / meanSegmentDuration);

            }
            return duration / optimalChunksNumber;


        }
    }

    getVideoDetails(videoPath) {

        ffmpeg.ffprobe(videoPath, (err, metaData) => {
            const { duration } = metaData.format;

            return duration

        }

        )
    }

}

module.exports = { VideoManager, getOptimalVideoChunkDuration }

