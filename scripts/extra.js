window.Extra = {
  '_handle_party/top/detail_weapon': function() {
    var a = window.location.hash.split('/');
    var id = a[a.length - 1];
    this.waitOnce('.txt-skill-level').then(function() {
      var t = $('.txt-skill-level').text();
      var level = t.split(' ')[1]
      window.localStorage.setItem(id, Number(level));
    }.bind(this));
  },
  '_handle_party/index': function() {
    this.inject('inject/weapon.js');
  },
  '_handle_enhancement/weapon/material': function() {
    this.change(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.target !== document.querySelector('.skill1-level')) {
          return;
        }
        var l = $('.btn-base-chenge')[0].dataset.locationHref;
        var a = l.split('/');
        var id = a[a.length - 1];
        window.localStorage.setItem(id, Number($('.skill1-level').text()));
      }, this);
    }.bind(this));
  },
  '_handle_enhancement/weapon/base': function() {
    this.parseSkillLevel();
  },
  _handle_list: function() {
    this.parseSkillLevel();
  },
  parseSkillLevel: function() {
    this.change(function(mutations) {
      [].slice.call(document.querySelectorAll('.txt-status')).forEach(function(state) {
        var txt = state.textContent;
        if (txt.indexOf('SLv') >= 0) {
          txt = txt.replace('SLv', '')
        } else {
          return;
        }
        window.localStorage.setItem(state.parentNode.parentNode.dataset.itemId, Number(txt));
      });
    }.bind(this));
  },
  '_handle_quest/assist': function() {
    var self = this;
    var found = false;
    this.change(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName !== 'class') {
          return;
        }
        if (mutation.target.id === 'prt-assist-multi') {
          [].slice.call(mutation.target.querySelectorAll('.btn-multi-raid')).some(function(node) {
            var boss = node.querySelector('.txt-raid-name');
            if (boss.textContent.indexOf('ティアマト・マグナ') >= 0) {
              found = true;
              self.click('.lis-raid[data-raid-id="' + node.dataset.raidId + '"]');
                this.waitOnce('.btn-use-full').then(function() {
                this.click('.btn-use-full');
                return this.waitOnce('div.prt-popup-header:contains("アイテム使用完了")');
              }.bind(this)).then(function() {
                this.click('.btn-usual-ok');
              }.bind(this));
            }
            var icon = node.querySelector('.img-raid-thumbnail');
            var remaining = node.querySelector('.prt-remaining-time');
            self.raid.push({
              type: 'raid',
              msg: boss.textContent,
              remaining: remaining.textContent,
              icon: icon.src
            });
            return found;
          }, this);
          self.sendCommand({
            type: 'raids',
            data: self.raid
          });
          if (!found && window.localStorage.getItem('reload-assist') === 'true') {
            self.inject('reload.js');
          }
        }
      }, this);
    }.bind(this));
  },
  '_handle_sell': function() {
    this.change(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.target !== document.getElementById('lis-weapon') &&
            mutation.target !== document.getElementById('lis-summon')) {
          return;
        }
        this.inject('inject/select_all_normal.js');
      }, this);
    }.bind(this));
  },
  '_handle_coopraid/room': function() {
    this.waitUntilVisible('.btn-make-ready-large.not-ready').then(function() {
      this.click('.btn-make-ready-large.not-ready');
    }.bind(this));
    this.waitOnce('.btn-execute-ready.se-ok').then(function() {
      this.click('.btn-execute-ready.se-ok');
    }.bind(this));
  },
  '_handle_coopraid/offer': function() {
    this.waitUntilVisible('.btn-wanted-room').then(function() {
      var self = this;
      var key = null;
      $('.prt-wanted-room.btn-wanted-room').each(function() {
        if ($(this).find('.prt-member-icon').length < 3 &&
            $(this).find('.prt-invite-type-1').length > 0) {
          key = $(this)[0].dataset.indexKey;
          return false;
        }
      });
      if (key) {
        this.click('.btn-wanted-room[data-index-key='+key+']');
        return this.waitUntilVisible('.btn-usual-join').then(function() {
          this.click('.btn-usual-join');
          return this.waitUntilVisible('.btn-usual-ok');
        }.bind(this)).then(function() {
          this.click('.btn-usual-ok');
          return this.sleep(1);
        }.bind(this));
      } else {
        return this.sleep(1);
      }
    }.bind(this)).then(function() {
      this.click('.btn-refresh-list');
      return this.sleep(1);
    }.bind(this)).then(function() {
      return this.waitUntilInvisible('#loading');
    }.bind(this)).then(function() {
      this['_handle_coopraid/offer']();
    }.bind(this));
  }
}
