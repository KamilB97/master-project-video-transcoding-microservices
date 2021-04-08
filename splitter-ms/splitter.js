const { exec } = require("child_process");
//const COMMAND = 'ffmpeg -i E:\\workspace\\Videos\\1280x720\\full\\mp4\\original.mp4 -c copy -map 0 -segment_time 00:01:00 -f segment -reset_timestamps 1 E:\\workspace\\Videos\\1280x720\\chunks\\mp4\\name_chunk_%03d.mp4'

class Splitter {

    constructor(source, destination, segmentTime){
        this.source = source;
        this. destination = destination;
        this. command = `ffmpeg -i ${source} -c copy -map 0 -segment_time ${segmentTime} -f segment -reset_timestamps 1 ${destination}`
    }

    split(){
        exec(this.command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}
module.exports = Splitter


