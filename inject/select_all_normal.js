
var click = function(dom) {
  return new Promise(function(resolve) {
    window.setTimeout(function() {
      dom.trigger('tap');
      window.setTimeout(function() {
        if (dom.hasClass('selected')) {
          resolve();
        }
      }, 100);
    }, 200);
  });
}

function clickNormal() {
  return this.click($('.btn-item:visible:not(.selected)[data-rarity="1"]').eq(0)).then(function() {
    clickNormal();
  });
}

clickNormal();