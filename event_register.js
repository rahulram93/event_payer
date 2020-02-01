var EventPlayer = (function() {
  var EventPlayer = function(events, index){
    this.timeoutEvent = 1000;
    this.totalEvents;
    this.events = events || [];
    this.eventsCompleted = index || 0;
    this.mouseEvents = [
      'auxclick',
      'click',
      'contextmenu',
      'dblclick',
      'mousedown',
      //'mouseenter',
      //'mouseleave',
      //'mousemove',
      'mouseover',
      //'mouseout',
      'mouseup',
      'pointerlockchange',
      'pointerlockerror',
      'select',
      'wheel'
    ];
    this.registeredEvents = [];
    return this;
  }
  
  // Player
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
    } else if (event.type == "input"){
      domEvent = new Event('input', { bubbles: true });
      domEvent.simulated = true;
      element.value = event.value;
    }
    if (!domEvent) return false;
    element.dispatchEvent(domEvent);
    return true;
  }
  
  EventPlayer.prototype.playEvent = function(index){
    var events = this.events;
    if (index >= events.length) return true;
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


  // Listener
  EventPlayer.prototype.eventListener = function(){
    var that = this;
    this.mouseEvents.forEach(function(event){
      var eventFunction = function(event) {
        that.events.push({
          xpath: event.target,
          type: event.type
        });
      }
      document.addEventListener(event, eventFunction);
      that.registeredEvents.push([event, eventFunction]);
    });
  }


  EventPlayer.prototype.startCapture = function(){
    this.eventListener();
  }

  EventPlayer.prototype.disableCapture = function(){
    var that = this;
    that.registeredEvents.forEach(function(eventItem){
      document.removeEventListener(eventItem[0], eventItem[1]);
    });
  }

  return EventPlayer;
})();
