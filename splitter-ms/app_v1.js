// npm install fluent-ffmpeg
// do rabbitMQ npm install amqplib
const ffmpeg = require('fluent-ffmpeg');
const fileStoragePath = 'E:\workspace\Videos\1280x720\full\mp4';
const chunkStoragePath = 'E:\\workspace\\Videos\\1280x720\\chunks\\mp4';
const videoFile = "E:\\workspace\\Videos\\1280x720\\full\\mp4\\original.mp4";


let outputID1 = '1'
let outputID2 = '2'
let outputID3 = '3'
let outputID4 = '4'
let outputPath1 = chunkStoragePath + '\\out-1.mp4'
let outputPath2 = chunkStoragePath + '\\out-2.mp4'
let outputPath3 = chunkStoragePath + '\\out-3.mp4'
let outputPath4 = chunkStoragePath + '\\out-4.mp4'

ffmpeg.ffprobe(videoFile, (err, metaData) => {
    const { duration } = metaData.format;
    console.log(duration);
    const startingTime = 0;
    console.log(startingTime);
    const clipDuration = duration / 4;
    console.log(clipDuration);

    let t2 = startingTime + clipDuration;
    let t3 = startingTime + 2 * clipDuration;
    let t4 = startingTime + 3 * clipDuration;
    console.log(t2 + " " + t3 + " " + t4);
    ffmpeg()
        .input(videoFile)
        .inputOptions([`-ss ${startingTime}`])
        .outputOptions([`-t ${clipDuration}` , '-c:v copy', '-c:a copy'])
        .output(outputPath1)
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .run();
    ffmpeg()
        .input(videoFile)
        .inputOptions([`-ss ${t2}`])
        .outputOptions([`-t ${clipDuration}` , '-c:v copy', '-c:a copy'])
        .output(outputPath2)
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .run();

    ffmpeg()
        .input(videoFile)
        .inputOptions([`-ss ${t3}` ])
        .outputOptions([`-t ${clipDuration}` , '-c:v copy', '-c:a copy'])
        .output(outputPath3)
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .run();

    ffmpeg()
        .input(videoFile)
        .inputOptions([`-ss ${t4}`])
        .outputOptions([`-t ${clipDuration}` , '-c:v copy', '-c:a copy'])
        .output(outputPath4)
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .run();


})