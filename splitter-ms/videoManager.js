// npm install fluent-ffmpeg


const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { resolve } = require('path');

const FILE_STORAGE = 'E:\\workspace\\Videos\\1280x720\\full\\mp4\\';
const CHUNK_STORAGE = 'E:\\workspace\\Videos\\1280x720\\chunks\\mp4\\';
const fileName = 'original.mp4';

class VideoManager {

    constructor() {
        this.meanSegmentDuration = 60;
    }

    async splitVideoToChunks(fileName) {

        const videoPath = FILE_STORAGE.concat(fileName);

        try {
            if (await this.checkIfFileExists(videoPath)) {
                let videoDetails = await this.getOptimalVideoChunkDuration(videoPath)
                let chunksAmount = videoDetails.chunksAmount;
                let chunkDuration = videoDetails.chunkDuration;

                this.sliceVideo(videoPath, chunksAmount, chunkDuration).catch((err) => console.log(err));

            } else {
                throw 'file do not exist';
            }
        } catch (error) {
            console.log(error);
        }
    }

    checkIfFileExists(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, (err) => {

                if (err) {
                    console.log('file do not exist');
                    reject("Error in check if file exists");
                }
                else {
                    console.log('file exists');
                    resolve(true);
                }
            });
        });
    }

    async getOptimalVideoChunkDuration(videoPath) {

        let duration = await this.getVideoDuration(videoPath)

        return new Promise((resolve, reject) => {
            let optimalChunksAmount = 0;
            if (duration == 0) {
                reject('video duration is 0')

            } else if (duration <= this.meanSegmentDuration) {

                optimalChunksAmount = 1;

            } else if (duration > this.meanSegmentDuration) {

                if (duration % this.meanSegmentDuration < this.meanSegmentDuration / 2) {
                    optimalChunksAmount = Math.floor(duration / this.meanSegmentDuration);

                } else {
                    optimalChunksAmount = Math.ceil(duration / this.meanSegmentDuration);

                }
                let response = {
                    'duration': duration,
                    'chunksAmount': optimalChunksAmount,
                    'chunkDuration': duration / optimalChunksAmount
                }

                resolve(response);

            }

        })


    }

    getVideoDuration(videoPath) {
        console.log("in getVideoDetails");
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(videoPath, (err, metaData) => {
                const { duration } = metaData.format;

                if (!err) {
                    resolve(duration);
                } else {
                    reject("problem with reading video details")
                }
            })
        })


    }

    async sliceVideo(sourcePath, chunksAmount, chunkDuration) {
        return new Promise((resolve, reject) => {
            let outputPath = this.changeStoragePath(sourcePath, CHUNK_STORAGE);

            let startTime = 0;
            try {
                let chunkOutputPath;
                for (let i = 0; i < chunksAmount; i++) {
                    chunkOutputPath = this.concatChunkNumberToPath(outputPath, i);

                    ffmpeg()
                        .input(sourcePath)
                        .inputOptions([`-ss ${startTime}`])
                        .outputOptions([`-t ${chunkDuration}`, '-c:v copy', '-c:a copy'])
                        .output(chunkOutputPath)
                        // .on('progress', function (progress) {
                        //     console.log('Processing: ' + progress.percent + '% done');
                        // })
                        .run();

                    startTime += chunkDuration;

                    console.log(`created: ${chunkOutputPath}`)
                }
                resolve();

            } catch (error) {
                console.log("ERROR: " + error);
                reject('error with splitting video')
            }
        })
    }



    changeStoragePath(sourcePath, destinationPath) {
        let lastIndexBeforeFileName = sourcePath.lastIndexOf('\\');
        let fileName = sourcePath.substring(lastIndexBeforeFileName + 1);
        let outputPath = destinationPath.concat(fileName);
        return outputPath;

    }

    concatChunkNumberToPath(path, number) {
        let indexBeforeVideoFormat = path.lastIndexOf('.');
        let videoFormat = path.substring(indexBeforeVideoFormat + 1);
        let pathWithoutVideoFormat = path.substring(0, indexBeforeVideoFormat);

        if (number < 10) {
            pathWithoutVideoFormat = pathWithoutVideoFormat.concat(`_00${number}`)

        } else if (number >= 10) {
            pathWithoutVideoFormat = pathWithoutVideoFormat.concat(`_0${number}`)

        } else {
            pathWithoutVideoFormat = pathWithoutVideoFormat.concat(`_${number}`)

        }

        let finalName = pathWithoutVideoFormat.concat('.').concat(videoFormat);
        return finalName;
    }
}

module.exports = VideoManager;