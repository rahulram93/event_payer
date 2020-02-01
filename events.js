var events = [{
  xpath: '//*[@id="root"]/div/div[1]/div/div[3]/a[1]/span/div/div[1]/a',
  type: 'mouseover'
},{
  xpath: '//*[@id="root"]/div/div[1]/div/div[2]/a[1]/span',
  type: 'click'
}]

var ep = new EventPlayer(events);
ep.startPlay();
