'use strict';

(function(exports) {
  exports.Inject = {
    playBingo: function() {
      var observer4pop = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
          this.tapOk();
        }, this);
      }.bind(this));
      observer4pop.observe(document.getElementById('pop'), {
          childList: true
        , subtree: true
        , attributes: true
        , characterData: false
      });
      this.tapOk();
      var hit = document.querySelector('.prt-hit-box');
      var observer4hit = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (hit.firstElementChild && hit.firstElementChild.firstElementChild) {
            var hint = hit.firstElementChild.firstElementChild;
            if (!hint.classList) {
              return;
            }
            for (var i = 0; i < hint.classList.length; i++) {
              var a = hint.classList[i].split('-');
              if (a.length === 4) {
                var button = $('.btn-number-close-' + a[3]);
                button && button.trigger('tap');
              }
            }
          }
        });
      });
      observer4hit.observe(document.querySelector('.prt-hit-box'), {
          childList: true
        , subtree: true
        , attributes: true
        , characterData: false
      });
    },
    tapOk: function() {
      $('.btn-play-ok') && $('.btn-play-ok').trigger('tap');
      $('.btn-play-again') && $('.btn-play-again').trigger('tap');
    },
    stop: function() {
      this.observer.disconnect();
    },
    start: function() {
      var started = false;
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type !== 'childList') {
            return;
          }
          if (!document.getElementById('pop') || started) {
            return;
          }
          started = true;
          this.playBingo();
        }, this);
      }.bind(this));

      observer.observe(document.body, {
          childList: true
        , subtree: true
        , attributes: true
        , characterData: false
      });
      this.observer = observer;
    }
  };
}(window));

