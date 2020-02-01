var EventPlayer = (function() {
  var EventPlayer = function(){
    this.timeoutEvent = 1000;
    this.totalEvents;
    this.eventsCompleted = 0;
    this.mouseEvents = ["auxclick", "click", "contextmenu", "dblclick", "mousedown", "mouseenter"];
    return this;
  }
  
  EventPlayer.prototype.eventListener = function(event) {
    var element = document.evaluate(event.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!element) return false;
    var event = new MouseEvent( event.type, {
      view: window,
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(event);
    if (this.eventsCompleted + 1 == this.totalEvents) alert("Events completed");
    return true;
  }
  
  EventPlayer.prototype.playEvent = function(events, index){
    if (index >= events.length) return;
    if ( this.eventListener(events[index])){
      this.eventsCompleted++;
      index++;
      var that = this;
      setTimeout(this.playEvent.bind(that, events, index), this.timeoutEvent);
    } else {
      console.log("Event broke of type " + events[index].type);
    }
  }
  
  EventPlayer.prototype.startPlay = function(events) {
    var index = 0;
    var that = this;
    that.totalEvents = events.length;
    setTimeout(this.playEvent.bind(that, events, index), this.timeoutEvent);
  }
  return EventPlayer;
})();
