var events = [{
  xpath: '//*[@id="root"]/div/div[1]/div/div[3]/a[1]/span/div/div[1]/a',
  type: 'click'
},{
  xpath: '//*[@id="root"]/div/div[1]/div/div[3]/a[1]/span/div/div[2]/div/ul/li[1]/a/span',
  type: 'click'
}]

var ep = new EventPlayer();
ep.startPlay(events);
