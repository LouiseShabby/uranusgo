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
    //var exLis = [];
	console.log("111 = "+window.localStorage.getItem('seachEx-1'));
	/*
	for(var i=1;i<=6;i++){
		console.log(window.localStorage.getItem("seachEx-"+i));
	
		if(window.localStorage.getItem("seachEx-"+i) != ""){
			exLis.push(window.localStorage.getItem("seachEx-"+i));
			 console.log(exLis);
		}
	}
	*/
	var searchName = window.localStorage.getItem('seachTwitter');
	var requesturl = "http://realtime.search.yahoo.co.jp/search?p=参加者募集+"+searchName+"&ei=UTF-8";
	
	
	var htmlobj=$.ajax({url:requesturl,async:false});
	
	
	var str = htmlobj.responseText;
	var s = str.indexOf('ID：')+3;//第一个=出现的位置
	var e = str.indexOf(' Lv');//第一个&出现的位置
	var re = str.substring(s,e);//返回的值
	console.log(re);
	
	if(window.localStorage.getItem('autoSeachEx') === 'true'){
		location.href = "http://gbf.game.mbga.jp/#quest/assist";
	}
	
  },
  '_handle_result_multi/empty':function() {
    var self = this;
	//  console.log(window.localStorage.getItem('autoSeachEx'));
	 
		 var bbc = setInterval(function () {
			  if ($('.btn-control').length > 0) {
						self.click(".btn-control");
					}
				else{
					 if(window.localStorage.getItem('autoSeachEx') === 'true'){
					 location.href = "http://gbf.game.mbga.jp/#quest/assist";
					 clearInterval(bbc);
				}}
	  }, 2000);
  },
   '_handle_quest': function() {
	  var self = this;
	  	
    	if((window.localStorage.getItem('master')=='true')
		||(window.localStorage.getItem('coopraid')=='true')){
			location.href = "http://gbf.game.mbga.jp/#coopraid";
		}
	  if(window.localStorage.getItem('autoSeachEx') === 'true'){
			var bbc = setInterval(function () {
			  if ($('.btn-usual-ok').length > 0) {
						self.click(".btn-usual-ok:eq(0)");
					}
				else{
						location.href = "http://gbf.game.mbga.jp/#quest/assist";
						clearInterval(bbc);
				}
	  }, 2000);}
       
  },
  '_handle_quest/index': function() {
	  var self = this;
    	if((window.localStorage.getItem('master')=='true')
		||(window.localStorage.getItem('coopraid')=='true')){
			location.href = "http://gbf.game.mbga.jp/#coopraid";
		}	  
		if(window.localStorage.getItem('autoSeachEx') === 'true'){
			var bbc = setInterval(function () {
			  if ($('.btn-usual-ok').length > 0) {
						self.click(".btn-usual-ok:eq(0)");
					}
				else{
						location.href = "http://gbf.game.mbga.jp/#quest/assist";
						clearInterval(bbc);
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
  '_handle_quest/assist/unclaimed': function() {
	  if(window.localStorage.getItem('assistIsClick')){
		window.localStorage.setItem('assistIsClick','true');
	}
	var self = this;
	var bbc =setInterval(function(){
				if ($('.btn-multi-raid ').length > 0) {
				self.click(".btn-multi-raid:eq(0)");
				clearInterval(bbc);
				if(window.localStorage.getItem('assistIsClick')){
					window.localStorage.setItem('assistIsClick','false');
	}}},1000);
  },
  '_handle_quest/assist': function() {
    var self = this;
    var found = false;
	var isClick = false;
	var exLis = [];
	if(!window.localStorage.getItem('assistIsClick')){
		window.localStorage.setItem('assistIsClick','false');
	}
	setTimeout(function(){
		window.localStorage.setItem('assistIsClick','false');
	},20000);
	if(window.localStorage.getItem('autoSeachEx') === 'true'){
		if(window.localStorage.getItem("ptSearchType")=='1'){
		
			for(var i=1;i<=6;i++){
				if(window.localStorage.getItem("seachEx-"+i) != ""){
					exLis.push(window.localStorage.getItem("seachEx-"+i));
					}
			}
			var bbb =setInterval(function (){
				console.log("isClick ========================"+window.localStorage.getItem('assistIsClick'));
				if ($('.btn-use-full').length > 0) {
					self.click(".btn-use-full:eq(1)");
					
				}
				if ($('.btn-usual-ok').length == 1) {
						 self.click(".btn-usual-ok");
				 }
			},5000);
			

			var bbc =setInterval(function () {

				//chrome.runtime.sendMessage({type: 'pass', herf: location.hash}, function (response) {});
				//if(window.localStorage.getItem('assistIsClick') == 'true'){
				//		clearInterval(bbc);;}
				for (var i = 0; i < $(".btn-multi-raid").length; i++) {
							//console.log($(".btn-multi-raid:eq(" + i + ")").attr("data-quest-id"));
					var mu_index = exLis.indexOf($(".btn-multi-raid:eq(" + i + ")").attr("data-quest-id"));
							//console.log("index =========="+mu_index);
					if (mu_index >= 0 && window.localStorage.getItem('assistIsClick') == 'false') {
						self.click(".btn-multi-raid:eq(" + i + ")");
						return;
					}}
				
				}, 1000);
				
			 var bbd = setTimeout(function (){	
				if(window.localStorage.getItem('assistIsClick') == 'false'){
						//self.click(".btn-tabs:eq(0)")
						window.location.reload();}},20000);
			 
			}
		if(window.localStorage.getItem("ptSearchType")=='2'){	
				
				
				var bbe = setInterval(function(){
					if($('.btn-post-key').length=0){
						self.click(".btn-tabs:eq(2)");
						clearInterval(bbe);
					}	
				},1000);
				
									
				
				var searchName = window.localStorage.getItem('seachTwitter');
				var requesturl = "http://realtime.search.yahoo.co.jp/search?p=参加者募集+"+searchName+"&ei=UTF-8";
				var re = "";
				var bbdb = setInterval(function(){
					var htmlobj=$.ajax({url:requesturl,async:false});
					var str = htmlobj.responseText;
					var getNext = str.indexOf(' Lv')+30;
					var NextStr = str.substring(getNext);
					var s = NextStr.indexOf('ID：')+3;
					var e = NextStr.indexOf(' Lv');
					
					re = NextStr.substring(s,e);
					console.log("参战id========"+re);
				},5000);

			
				
				var bbb =setInterval(function (){
					console.log("isClick ========================"+window.localStorage.getItem('assistIsClick'));
					if ($('.btn-post-key').length >0&&document.querySelector('.frm-battle-key').type=='text') {
						self.click(".btn-post-key");	
					}	
					if ($('.btn-use-full').length > 0) {
						self.click(".btn-use-full:eq(1)");
						
					}
					if ($('.btn-usual-ok').length == 1) {
							 self.click(".btn-usual-ok");
					 }
				},1000);
				
				
				
					var bbf = setInterval(function(){
						if(document.querySelector('.frm-battle-key').type=='password'){
							document.querySelector('.frm-battle-key').type='text';
							document.querySelector('.frm-battle-key').value=re;
							clearInterval(bbf);
						}	
					},5000);
				
				
			
			
	
				var bbd = setTimeout(function (){	
				if(window.localStorage.getItem('assistIsClick') == 'false'){
						//self.click(".btn-tabs:eq(0)")
						window.location.reload();}},20000);
		
		}		
	}
		 		
	
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
	
	
	if((window.localStorage.getItem('master')=='true')
		||(window.localStorage.getItem('coopraid')=='true')){
				setTimeout(function(){
					window.location.reload();},15000)
		}
	if(window.localStorage.getItem('master')=='true'){
	
		var ok =setInterval(function () {
			if ($('.btn-usual-ok').length >0) {
				self.click(".btn-usual-ok");	
			}
			if ($('.btn-use-full').length > 0) {
					self.click(".btn-use-full:eq(1)");
			}		
			//onsole.log($(".prt-quest-banner").length);
			/*
			if ($('.btn-make-ready-large').length > 0) {
					self.click(".btn-make-ready-large");
					clearInterval(ok);					
					}*/
		    }, 1000);
			if(window.localStorage.getItem('ptcoopraid') =='1'){
			var bba =setInterval(function () {
				if ($('.btn-open-stage-2').length == 1) {
					self.click(".btn-open-stage-2");
					clearInterval(bba);
					}
				}, 1000); 
			var bbb =setInterval(function () {
				if ($('.btn-forward').length > 0) {
					self.click(".btn-forward");
					clearInterval(bbb);
					}
				}, 1000); 
			var bbc =setInterval(function () {
				if ($('.btn-stage-detail').length >0) {
					if($('.btn-stage-detail:eq(2)').attr("data-stage-id")==10){
						self.click(".btn-stage-detail:eq(2)");
						clearInterval(bbc);
					}}
				}, 1000); 
			var bbd =setInterval(function () {
					if ($('.btn-set-quest').length >0) {
					self.click(".btn-set-quest:eq(0)");	
					clearInterval(bbd);
					}
				}, 1000); 
	    	}else if(window.localStorage.getItem('ptcoopraid') =='2'){
			var bba =setInterval(function () {
				if ($('.btn-open-stage-3').length == 1) {
					self.click(".btn-open-stage-3");
					clearInterval(bba);
					}
				}, 1000); 
			var bbc =setInterval(function () {
				if ($('.btn-stage-detail').length >0) {
					var count = $('.btn-stage-detail').length - 1;
					self.click(".btn-stage-detail:eq(" + count + ")");
					clearInterval(bbc);
					}
				}, 1000); 
			var bbd =setInterval(function () {
					if ($('.btn-set-quest').length >0) {
					var count2 = $('.btn-set-quest').length - 3;
					self.click(".btn-set-quest:eq(" + count2 + ")");	
					clearInterval(bbd);
					}
				}, 1000); 
			}else if(window.localStorage.getItem('ptcoopraid') =='3'){
			var bba =setInterval(function () {
				if ($('.btn-open-stage-3').length == 1) {
					self.click(".btn-open-stage-3");
					clearInterval(bba);
					}
				}, 1000); 
			var bbc =setInterval(function () {
				if ($('.btn-stage-detail').length >0) {
					var count = $('.btn-stage-detail').length - 3;
					self.click(".btn-stage-detail:eq(" + count + ")");
					clearInterval(bbc);
					}
				}, 1000); 
			var bbd =setInterval(function () {
					if ($('.btn-set-quest').length >0) {
					var count2 = $('.btn-set-quest').length - 2;
					self.click(".btn-set-quest:eq(" + count2 + ")");	
					clearInterval(bbd);
					}
				}, 1000); 
			}else if(window.localStorage.getItem('ptcoopraid') =='4'){
			var bba =setInterval(function () {
				if ($('.btn-open-stage-3').length == 1) {
					self.click(".btn-open-stage-3");
					clearInterval(bba);
					}
				}, 1000); 
			var bbc =setInterval(function () {
				if ($('.btn-stage-detail').length >0) {
					var count = $('.btn-stage-detail').length - 2;
					self.click(".btn-stage-detail:eq(" + count + ")");
					clearInterval(bbc);
					}
				}, 1000); 
			var bbd =setInterval(function () {
					if ($('.btn-set-quest').length >0) {
					var count2 = $('.btn-set-quest').length - 1;
					self.click(".btn-set-quest:eq(" + count2 + ")");	
					clearInterval(bbd);
					}
				}, 1000); 
			}else if(window.localStorage.getItem('ptcoopraid') =='5'){
			var bba =setInterval(function () {
				if ($('.btn-open-stage-3').length == 1) {
					self.click(".btn-open-stage-3");
					clearInterval(bba);
					}
				}, 1000); 
			var bbc =setInterval(function () {
				if ($('.btn-stage-detail').length >0) {
					var count = $('.btn-stage-detail').length - 3;
					self.click(".btn-stage-detail:eq(" + count + ")");
					clearInterval(bbc);
					}
				}, 1000); 
			var bbd =setInterval(function () {
					if ($('.btn-set-quest').length >0) {
					var count2 = $('.btn-set-quest').length - 1;
					self.click(".btn-set-quest:eq(" + count2 + ")");	
					clearInterval(bbd);
					}
				}, 1000); 
			}
		/*
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
			
	*/		
	}
	var room =setInterval(function () {
	self.waitUntilVisible('.btn-make-ready-large.not-ready').then(function() {
      self.click('.btn-make-ready-large.not-ready');
    }.bind(self));
    self.waitUntilVisible('.btn-execute-ready.se-ok').then(function() {
      self.click('.btn-execute-ready.se-ok');
    }.bind(self));
	self.waitUntilVisible('.btn-quest-start.se-quest-start').then(function() {
      self.click('.btn-quest-start.se-quest-start');
    }.bind(self));},1000);

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

