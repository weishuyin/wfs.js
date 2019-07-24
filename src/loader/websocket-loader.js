/*
 * Websocket Loader
*/

import Event from '../events';
import EventHandler from '../event-handler';
import SlicesReader from '../utils/h264-nal-slicesreader.js';

class WebsocketLoader extends EventHandler {

  constructor(wfs) {
    super(wfs)
    this.wfs = wfs;
    this.buf = null;
    this.slicesReader = new SlicesReader(wfs);
  }
 
  destroy() { 
	this.slicesReader.destroy();
    EventHandler.prototype.destroy.call(this);
  }
 
  receiveSocketMessage(data){
    this.buf = new Uint8Array(data);
    var copy = new Uint8Array(this.buf);   
    
    if (this.wfs.mediaType ==='FMp4'){
      this.wfs.trigger(Event.WEBSOCKET_ATTACHED, {payload: copy });
    } 
    if (this.wfs.mediaType === 'H264Raw'){
      this.wfs.trigger(Event.H264_DATA_PARSING, {data: copy });
    }   
  }
}

export default WebsocketLoader;  