## Modified by treewei
1. remove unused yyyyyyy.txt
2. remove video samples cache, for realtime play
3. infinity video stream duration, no more fixed to 13h
4. adjustable fps, default to 30fps
5. independent websocket

If you see the follow error in debug console, please exec wfs.attachMedia earlier.
createSourceBuffers failed DOMException: Failed to execute 'addSourceBuffer' on 'MediaSource': The MediaSource's readyState is not 'open'.


## Commands for generate your .264 file
mp4 to h264: ffmpeg -i test.mp4 -an -c:v libx264 -preset slow -profile:v baseline -crf 1 test.h264

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
