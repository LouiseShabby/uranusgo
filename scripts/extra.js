'use strict';

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
  '_handle_mypage': function() {
    var exLis = [];
	console.log("111 = "+window.localStorage.getItem('seachEx-1'));
	for(var i=1;i<=6;i++){
		console.log(window.localStorage.getItem("seachEx-"+i));
	
		if(window.localStorage.getItem("seachEx-"+i) != ""){
			exLis.push(window.localStorage.getItem("seachEx-"+i));
			 console.log(exLis);
		}
	}
  },
  '_handle_result_multi/empty':function() {
    var self = this;
	  console.log(window.localStorage.getItem('autoSeachEx'));
	  if(window.localStorage.getItem('autoSeachEx') === 'true'){
		  setInterval(function () {
			  if ($('.btn-control').length > 0) {
						self.click(".btn-control");
					}
				else{
						location.href = "http://gbf.game.mbga.jp/#quest/assist";
				}
	  }, 2000);}
  },
   '_handle_quest': function() {
	  var self = this;
	  console.log(window.localStorage.getItem('autoSeachEx'));
	  if(window.localStorage.getItem('autoSeachEx') === 'true'){
		  setInterval(function () {
			  if ($('.btn-usual-ok').length > 0) {
						self.click(".btn-usual-ok:eq(0)");
					}
				else{
						location.href = "http://gbf.game.mbga.jp/#quest/assist";
				}
	  }, 2000);}
       
  },
  '_handle_quest/index': function() {
	  var self = this;
	  console.log(window.localStorage.getItem('autoSeachEx'));
	  if(window.localStorage.getItem('autoSeachEx') === 'true'){
		  setInterval(function () {
			  if ($('.btn-usual-ok').length > 0) {
						self.click(".btn-usual-ok:eq(0)");
					}
				else{
						location.href = "http://gbf.game.mbga.jp/#quest/assist";
				}
	  }, 2000);}
       
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
  '_handle_list': function() {
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
	
	var exLis = [];
	for(var i=1;i<=6;i++){
		if(window.localStorage.getItem("seachEx-"+i) != ""){
			exLis.push(window.localStorage.getItem("seachEx-"+i));
		}
	}
	//console.log($('.btn-multi-raid').length);
	if(window.localStorage.getItem('autoSeachEx') === 'true'){

	var bbc =setInterval(function () {
			currtime++;
			//onsole.log(currtime % 10);
			if ($('.btn-usual-ok').length == 1) {
                       self.click(".btn-usual-ok");
             }
			if (/raid_multi/i.test(location.hash)) {
			}
			else if (/result_multi/i.test(location.hash) || /result\//i.test(location.hash)) {
					if ($('.btn-control').length > 0) {
						self.click(".btn-control:eq(0)");
			}}
			else if (/#quest\/supporter_raid/i.test(location.hash)) {
				clearInterval(bbc);
				//return self.sleep(10);
			}else if (/quest\/assist/i.test(location.hash)) {
					if ($('.btn-use-full').length > 0) {
						self.click(".btn-use-full:eq(1)");
					}
					for (var i = 0; i < $(".btn-multi-raid").length; i++) {
						//console.log($(".btn-multi-raid:eq(" + i + ")").attr("data-quest-id"));
						var mu_index = exLis.indexOf($(".btn-multi-raid:eq(" + i + ")").attr("data-quest-id"));
						//console.log("index =========="+mu_index);
						if (mu_index >= 0) {
							self.click(".btn-multi-raid:eq(" + i + ")");
							clearInterval(bbc);
					}}	
					if (currtime % 10  == "9") {
						self.click(".btn-tabs:eq(0)");
						
			}}else {				location.href = "http://gbf.game.mbga.jp/#quest/assist";
			}}, 3000); }
	//randomTime = getRandomInt(0, 5);

	/*	 
      mutations.forEach(function(mutation) {
        if (mutation.attributeName !== 'class') {
          return;
        }
		//console.log($(this).find('#prt-multi-list'));
		//console.log(mutation.target.id);      
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
	  
    
	*/
	//}.bind(this));
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
	//if(window.localStorage.getItem('coopraid-owner') === 'true'){
	/*	this.waitUntilVisible('.btn-open-stage-2').then(function() {
			this.click('.btn-open-stage-2');
		}.bind(this));
		this.waitUntilVisible('.btn-forward').then(function() {
			this.click('.btn-forward');
		}.bind(this));
		this.waitUntilVisible('.btn-stage-detail:10').then(function() {
			this.click('.btn-stage-detail.room');
		}.bind(this));
			this.waitUntilVisible('.btn-stage-detail').then(function() {
			this.click('.btn-set-quest');
		}.bind(this));
	//}   */
	var self = this;
	if(window.localStorage.getItem('master')=='true'){
		var ok =setInterval(function () {
			if ($('.btn-usual-ok').length >0) {
				self.click(".btn-usual-ok");	
			}
			if ($('.btn-use-full').length > 0) {
					self.click(".btn-use-full:eq(1)");
			}		
			console.log($(".prt-quest-banner").length);
			if ($('.btn-make-ready-large').length > 0) {
					self.click(".btn-make-ready-large");
					clearInterval(ok);					
					
		}}, 2000);
		var bba =setInterval(function () {
			
			if ($('.btn-open-stage-2').length == 1) {
				self.click(".btn-open-stage-2");
				clearInterval(bba);
				}
			}, 5000); 
		var bbb =setInterval(function () {
			if ($('.btn-forward').length > 0) {
				self.click(".btn-forward");
				clearInterval(bbb);
				}
			}, 5000); 
		var bbc =setInterval(function () {
			if ($('.btn-stage-detail').length >0) {
				if($('.btn-stage-detail:eq(2)').attr("data-stage-id")==10){
					self.click(".btn-stage-detail:eq(2)");
					clearInterval(bbc);
				}}
			}, 5000); 
		var bbd =setInterval(function () {
				if ($('.btn-set-quest').length >0) {
				self.click(".btn-set-quest:eq(0)");	
				clearInterval(bbd);
				}
			}, 5000); 
			
	}
	 this.waitUntilVisible('.btn-make-ready-large.not-ready').then(function() {
      this.click('.btn-make-ready-large.not-ready');
    }.bind(this));
    this.waitUntilVisible('.btn-execute-ready.se-ok').then(function() {
      this.click('.btn-execute-ready.se-ok');
    }.bind(this));
	this.waitUntilVisible('.btn-quest-start.se-quest-start').then(function() {
      this.click('.btn-quest-start.se-quest-start');
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

var currtime=0;