## Modified by treewei
1. remove video samples cache, for realtime play
2. infinity video stream duration, no more fixed to 13h
3. adjustable fps, default to 30fps. Set fps a little higher than h264 stream to avoid video delay
4. independent websocket
5. do not push video data when switch to other tab when using chrome

If you see the follow error in debug console, please exec wfs.attachMedia earlier.
createSourceBuffers failed DOMException: Failed to execute 'addSourceBuffer' on 'MediaSource': The MediaSource's readyState is not 'open'.

Set mvhd.duration = 0 to get Chrome to enter its "low delay" mode:
https://stackoverflow.com/questions/36364943/frame-by-frame-decode-using-media-source-extension

In my case, realtime video is autoplay, which will be paused when switch to other tab, do not push video data when paused. 
http://www.thesempost.com/google-chrome-restricting-autoplay-video-to-current-tab-only/

For realtime playing, SourceBuffer will free up space if needed.
For not realtime playing, if buffering more than 150M(from video.currentTime to newest buffered data) on chrome, we will get QuotaExceededError.
https://stackoverflow.com/questions/23871750/where-does-media-source-buffer-data-go
https://developers.google.com/web/updates/2017/10/quotaexceedederror

## Commands for generate your .264 file
mp4 to h264: ffmpeg -i test.mp4 -an -c:v libx264 -preset slow -profile:v baseline -crf 1 test.h264

ffprobe yyyyyyy.264 -show_frames | grep pkt_size | awk '{ print substr($1,10,length($1)) }' > yyyyyyy.txt

h264 to mp4: ffmpeg -framerate 30 -i test.h264 -c copy output.mp4

================


wfs.js - html5 player for raw h.264 streams. 
================
 
 A javascript library which implements websocket client for watching and focusing on raw h.264 live streams in your browser that works directly on top of a standard HTML5 element and MediaSource Extensions. 
 
 It works by transmuxing H264 NAL unit into ISO BMFF (MP4) fragments.

 Also,Implement a demo server to push video streams.   
 
##  Build
git clone https://github.com/ChihChengYang/wfs.js.git

**wfs.js**  

1. setup node.js/npm dev environement  

2. cd wfs.js  

3. npm install  

4. npm run build  

 
**demo server**  

Setup go's dev environement  

go get "github.com/gorilla/websocket"  
  
go get "github.com/satori/go.uuid"  

cd server && ./build_lite.sh && cd ..


Demo server serves with raw h.264 files,
yet that can be easily transfered and connected to RTSP or other sources (h.264 streaming).

##  Demo
1. cd demo && ./wfs_server

2. open a browser e.g. Chrome , 127.0.0.1:8888  

##  Reference

[hls.js](https://github.com/dailymotion/hls.js "hls.js")
