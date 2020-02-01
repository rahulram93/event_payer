var EventPlayer = (function() {
  var EventPlayer = function(events, index){
    this.timeoutEvent = 1000;
    this.totalEvents;
    this.events = events;
    this.eventsCompleted = index || 0;
    this.mouseEvents = [
      'auxclick',
      'click',
      'contextmenu',
      'dblclick',
      'mousedown',
      'mouseenter',
      'mouseleave',
      'mousemove',
      'mouseover',
      'mouseout',
      'mouseup',
      'pointerlockchange',
      'pointerlockerror',
      'select',
      'wheel'
    ];
    return this;
  }
  
  EventPlayer.prototype.eventDispatch = function(event) {
    var element = document.evaluate(event.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!element) return false;
    var domEvent;
    if (this.mouseEvents.includes(event.type)){
      domEvent = new MouseEvent( event.type, {
        view: window,
        bubbles: true,
        cancelable: true
      });
    }
    if (!domEvent) return;
    element.dispatchEvent(domEvent);
    return true;
  }
  
  EventPlayer.prototype.playEvent = function(index){
    var events = this.events;
    if (index >= events.length) return;
    if ( this.eventDispatch(events[index])){
      var that = this;
      that.eventsCompleted = that.eventsCompleted + 1;
      setTimeout(this.playEvent.bind(that, that.eventsCompleted), this.timeoutEvent);
    } else {
      console.log("Event broke of type " + events[index].type);
    }
  }
  
  EventPlayer.prototype.startPlay = function() {
    var that = this;
    setTimeout(this.playEvent.bind(that, that.eventsCompleted), this.timeoutEvent);
  }
  return EventPlayer;
})();
