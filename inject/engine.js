

window.SkillChecker = {
  'ディレイ': function() {}
}
var runFlag = 0;
var ifnotrunTime =0;

/*
setInterval(function(){if ($('.btn-usual-ok').length >0) {
		self.click(".btn-usual-ok");	
}},1000);
*/
setInterval(function(){turnWaitCancel();},100);

setInterval(function(){skiperror();},1000);

setInterval(function(){runFlag = 0;},10000);

if(window.localStorage.getItem('setreloadtime')=='true'&& window.localStorage.getItem('reloadtime')>10){
	
	ifnotrunTime = window.localStorage.getItem('reloadtime')*1000;
	
    setInterval(function(){
		console.log("reloadtime = "+ifnotrunTime);
		ifnotrun();
		},ifnotrunTime);
}else{
    setInterval(function(){ifnotrun();},60000);
}

 //  setInterval(function(){ifnotrun();},30000);



function ifnotrun(){
	if(runFlag == 0){pageReload();}
	return;	
}

function skiperror(){
    
    if (getStrMatch(String($("div.prt-error-infomation").find("p").html()), "エラーが発生しました。")) {
    	if (getStrMatchFront(location.hash,"#raid")) {
		    setTimeout("pageReload()",1000);
    	} else {
		    setTimeout("goMypage()",3000);
	}
        return false;
	}
	if (getStrMatch(String($("div.prt-popup-header").find("p").html()), "エラー")) {
		if (getStrMatchFront(location.hash,"#raid")) {
			setTimeout("pageReload()",1000);
		} else {
			setTimeout("goMypage()",3000);
		}
		return false;
	}
    if (getStrMatch(String($("div.prt-popup-header").find("p").html()), "終了")) {
         setTimeout("pageReload()",1000);
        return false;
    }
	
}

function turnWaitCancel() {
	if ("直前のターンを処理中です" == $("#pop div.txt-popup-body").html()	&&
		$("#pop div.btn-usual-ok").attr("oshita") == undefined) {
		$("#pop div.btn-usual-ok").attr("oshita","1");
		tap($("#pop div.btn-usual-ok"));
	}
}

function getStrMatchFront(str1, str2) {
	var str = " " + str1;
	if (str.indexOf(" " + str2) !== -1) {
		return true;
	} else {
		return false;
	}
}

function getStrMatchRear(str1, str2) {
	var str = str1 + " ";
	if (str.indexOf(str2 + " ") !== -1) {
		return true;
	} else {
		return false;
	}
}

function getStrMatchAll(str1, str2) {
	var str = " " + str1 + " ";
	if (str.indexOf(" " + str2 + " ") !== -1) {
		return true;
	} else {
		return false;
	}
}

function getStrMatch(str1, str2) {
	if(str1.indexOf(str2) != -1) {
		return true;
	} else {
		return false;
	}
}


function pageReload() {
	location.reload();
	window.Engine.start();
}

function goMypage() {
	location.href = "http://gbf.game.mbga.jp/#mypage";
}

window.Engine = {
  start: function() {
	this.debug('Engine Start!!');
	var self =this;
	if(window.localStorage.getItem('easybattle')=='true'){
		this.debug("gogogo");
		setInterval(function(){
			self.new_battle();
		},1000);
	
	  }else{
		
		if(window.localStorage.getItem('coopraid')=='true'){

			  if (this.turn === undefined) {
			this.eachTurn(0);
			return;
		  }
		}
		if(window.localStorage.getItem('assistIsClick')){
			window.localStorage.setItem('assistIsClick','false');
		}
		this.observers = [];
		this.observeEnd();

		if (window.location.hash.indexOf('raid_multi') >= 0) {
		  this._handle_raid_multi();
		} else {
		  this._handle_raid();
		}
	  }	
  },
  debug: function(msg) {
    window.dispatchEvent(new CustomEvent('_debug', {
      detail: arguments
    }))
  },
  
  new_battle: function() {
		
		  if($(".pop-show .prt-popup-header").length>0){
             this.click(".pop-show .prt-popup-footer .btn-usual-ok");
          }
          if ($(".btn-result").is(":visible")) {
                  $(".btn-result").trigger("tap");
                 this.click(".btn-result");
                  return;
              }
		  if ($(".btn-attack-start").hasClass("display-on")) {
                 if (window.localStorage.getItem('normal-attack-only') === 'true') {
                     this.click(".btn-attack-start");
                      return;
                  }	  
		  if(window.localStorage.getItem('xuecaibichi') === 'true'){
			if ($(".prt-member .lis-character0 .prt-gauge-special-inner").attr('style') == "width: 100%;") {
                    if ($(".prt-member .lis-character1 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                        if ($(".prt-member .lis-character2 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                            if ($(".prt-member .lis-character3 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                                  window.localStorage.setItem('xuecaiGo',1);}}}}
				else {			
					window.localStorage.setItem('xuecaiGo',0);
                     if ($(".btn-lock").hasClass("lock0")) {
                          this.click(".btn-lock");}}}		  
	    	else if(window.localStorage.getItem('FCopen') === 'true'){
				if ($(".prt-member .lis-character0 .prt-gauge-special-inner").attr('style') == "width: 100%;") {
                    if ($(".prt-member .lis-character1 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 90) {
                        if ($(".prt-member .lis-character2 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 80) {
                            if ($(".prt-member .lis-character3 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 70) {
						allFull = 1;}}}
				if (allFull == 1) {fcGo = 1;
						if ($(".btn-lock").hasClass("lock1")) {this.click(".btn-lock"); }}}
				else {
                     if ($(".btn-lock").hasClass("lock0")) {
                          this.click(".btn-lock");} }
			}
          	  var c =0;	  
			  for(var i=0;i<=3;i++){
				  for(var j=0;j<=3;j++){
				       this.debug("skill =================="+(window.localStorage.getItem("skill-"+(i+1)+"-"+(j+1))));
					   this.debug("c============"+c);
						if(window.localStorage.getItem("skill-"+(i+1)+"-"+(j+1))=='1'
								&& $(".lis-ability:eq(" + c + ")").hasClass("btn-ability-available")
								&& !$(".prt-command-chara:eq(" + i + ")").hasClass("ability-disable")){
										this.click(".lis-ability:eq(" + c + ")");		
										return;
			 			}
						else if(window.localStorage.getItem("skill-"+(i+1)+"-"+(j+1))=='8'
								&& window.localStorage.getItem('xuecaiGo')=='1'
								&& $(".lis-ability:eq(" + c + ")").hasClass("btn-ability-available")
								&& !$(".prt-command-chara:eq(" + i + ")").hasClass("ability-disable")){
										this.click(".lis-ability:eq(" + c + ")");		
										return;
			 			}								
						c++;			
			 	}
			  }
				  
				 this.click(".btn-attack-start");  

           }   
  },
  
  
  isMultiRaid: function() {
    return window.location.hash.indexOf('raid_multi') >= 0;
  },
  getFreePotion: function() {
    if (this.isMultiRaid()) {
      return this.waitUntilVisible('....');
    } else {
      return Promise.resolve();
    }
  },
  FC: function() {
  },
 
  getTurnNum: function() {
    var className = '';
    var turn = $('.prt-turn-info .prt-number div');
    turn.each(function() {
      className = $(this).attr('class') || className;
    });
    if (!className) {
      return 0;
    }
    return Number(className.replace('num-turn', ''));
  },
  click: function(selector) {
    window.localStorage.setItem('button-selector', selector);
    $(selector) && $(selector).trigger('tap');
    this.debug('click:', selector);
  },
  eachWave: function(wave) {
	
    this.wave = wave;
    this.greenPotionCount = undefined;
    this.bluePotionCount = undefined;
    this.eventHealCount = undefined;
    this.eventReviveCount = undefined;
    if (this.turn === undefined) {
      this.eachTurn(0);
    }
  },
  '_handle_raid_multi': function() {
	  
	this.debug('inject complete!!');
    Promise.race([
     this.waitUntilVisible('div.prt-popup-header:contains("救援依頼")'),
      this.sleep(1)
    ]).then(function() {
      this.click('.btn-usual-cancel');
      return this.sleep(1);
    }.bind(this)).then(function() {
      this.eachTurn(0);
    }.bind(this));
  },
  eachTurn: function(turn) {
    if (this.turn === turn) {
      return;
    }
	runFlag = 1;
	window.localStorage.setItem('xuecaiGo',0);

	//setTimeout("remainTime()",60*1000);  
	this.debug('reloadtime = '+ifnotrunTime);
    this.turn = turn;
    var currentWave = this.wave;
    var allFull = 0;	 
	var fcGo = 0;
	var fcRE = 0;	
	 // this.debug("lalalalalla = "+window.localStorage.getItem('FCopen'));
	if(window.localStorage.getItem('xuecaibichi') === 'true'){
			if ($(".prt-member .lis-character0 .prt-gauge-special-inner").attr('style') == "width: 100%;") {
                    if ($(".prt-member .lis-character1 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                        if ($(".prt-member .lis-character2 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                            if ($(".prt-member .lis-character3 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") == 100) {
                                  window.localStorage.setItem('xuecaiGo',1);}}}}
      else {			
					window.localStorage.setItem('xuecaiGo',0);
                     if ($(".btn-lock").hasClass("lock0")) {
                          this.click(".btn-lock");}}}	  
	if(window.localStorage.getItem('FCopen') === 'true'){
			if ($(".prt-member .lis-character0 .prt-gauge-special-inner").attr('style') == "width: 100%;") {
                    if ($(".prt-member .lis-character1 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 90) {
                        if ($(".prt-member .lis-character2 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 80) {
                            if ($(".prt-member .lis-character3 .prt-gauge-special-inner").attr('style').split(':')[1].replace(/%;/, "") >= 70) {
						allFull = 1;}}}
				if (allFull == 1) {fcGo = 1;
						if ($(".btn-lock").hasClass("lock1")) {this.click(".btn-lock"); }}}
      else {
                     if ($(".btn-lock").hasClass("lock0")) {
                          this.click(".btn-lock");} }}
	if ($('.prt-navi.btn-scene-next').is(':active')) {
	    this.debug("按掉了提示框！");
			this.click('.prt-navi.btn-scene-next');}
	//this.click('.prt-navi btn-scene-next active.display-on');		
    this.waitUntilVisible('.btn-attack-start.display-on').then(function() {
		return this.healIfInjured();
    }.bind(this)).then(function() {
      if (this.isBossWave()) {
        return this.summonIfPossible();
      } else {
		return Promise.resolve();
      }
    }.bind(this)).then(function() {
      if (this.isBossWave()) {
        return this.castIfAvailable();
      } else {
        return Promise.resolve();
      }
    }.bind(this)).then(function() {
	  //this.sleep(2);
      this.attack();
	  
	  if (fcGo === 1 && window.localStorage.getItem('FCrefresh') == 'true'){ 
					this.debug("re");window.location.reload();
							this._handle_raid_multi();}
      return Promise.resolve();
    }.bind(this)).then(function() {
      return this.waitUntilVisible('.btn-attack-start.display-on');
	  
    }.bind(this)).then(function() {
      if (this.wave !== currentWave) {
        return Promise.resolve();
      }
      this.eachTurn(this.getTurnNum());
    }.bind(this));
  },
  observeEnd: function() {
	this.debug("observeEnd");
    var self = this;
    var observer = new MutationObserver(function(mutations) {
      if ($('.btn-result').is(':visible')) {
        this.click('.btn-result');
      }
    }.bind(this));
	this.debug("observeEnd2");	/*
    observer.observe(document.querySelector('.prt-command-end'), {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    });*/
	this.debug("observeEnd3");
    this.observers.push(observer);
  },
  observePop: function() {
    var self = this;
    var observer = new MutationObserver(function(mutations) {
      if ($('.btn-usual-ok:visible').length) {
        this.click('.btn-usual-ok');
        observer.disconnect();
      } else if ($('.btn-usual-cancel:visible').length) {
        this.click('.btn-usual-cancel');
        observer.disconnect();
      } else if ($('.btn-usual-close:visible').length) {
        this.click('.btn-usual-close');
        observer.disconnect();
      }else if ($('.btn-control:visible').length) {
        this.click('.btn-control');
        observer.disconnect();    
      }else if ($('.btn-usual-close').length) {
        this.click('.btn-usual-close');
        observer.disconnect();    
      }
    }.bind(this));

    observer.observe(document.querySelector('#pop'), {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    });
    this.observers.push(observer);
  },
  observeTurnInfo: function() {
    var self = this;
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && $('.prt-turn-info.anim-on').length) {
          var turn = Number($('.prt-turn-info .prt-number').children().eq(0).attr('class').replace('num-turn', ''));
          this.eachTurn(turn);
        }
      }, this);
    }.bind(this));

    observer.observe(document.querySelector('.prt-turn-info'), {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    });
    this.observers.push(observer);
  },
  '_handle_raid': function() {
    this.observeWaveInfo();
    //this.observeEnd();
    // this.observePop();
  },
  observeWaveInfo: function() {
	this.debug("observeWaveInfo");  
    var self = this;
    var observer = new MutationObserver(function(mutations) {
      this.waitUntilVisible('.btn-attack-start.display-on').then(function() {
        this.eachWave(Number($('.txt-info-num:visible').children(':first').attr('class').replace('num-info', '')));
      }.bind(this));
    }.bind(this));

    observer.observe(document.querySelector('.prt-battle-num'), {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    });
    this.observers.push(observer);
  },

  waitUntilVisible: function(selector) {
    this.debug('waiting visible:' + selector);
    return new Promise(function(resolve) {
      if ($(selector).is(":visible")) {
        resolve();
        return;
      }
      this.visibleObserver && this.visibleObserver.disconnect();
      var self = this;
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if ($(selector).is(":visible")) {
            this.visibleObserver && this.visibleObserver.disconnect();
            resolve();
          }
        }, this);
      }.bind(this));

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false
      });
      this.visibleObserver = observer;
    }.bind(this));
  },
  waitUntilInvisible: function(selector) {
    return new Promise(function(resolve) {
      if (!$(selector).is(":visible")) {
        resolve();
        return;
      }
      this.invisibleObserver && this.invisibleObserver.disconnect();
      var self = this;
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (!$(selector).is(":visible")) {
            this.invisibleObserver && this.invisibleObserver.disconnect();
            resolve();
          }
        }, this);
      }.bind(this));

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false
      });
      this.invisibleObserver = observer;
    }.bind(this));
  },
  waitOnce: function(selector) {
    this.debug('waiting:' + selector);
    return new Promise(function(resolve) {
      this.onceObserver && this.onceObserver.disconnect();
      var self = this;
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if ($(selector).length || document.querySelector(selector)) {
            this.onceObserver && this.onceObserver.disconnect();
            resolve();
          }
        }, this);
      }.bind(this));

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false
      });
      this.onceObserver = observer;
    }.bind(this));
  },
  change: function(callback, dom) {
    this.observer && this.observer.disconnect();
    var self = this;
    var observer = new MutationObserver(function(mutations) {
      callback(mutations);
    }.bind(this));

    observer.observe(dom || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    });
    this.observer = observer;
  },
  stop: function() {
    this.observer && this.observer.disconnect();
  },
  isBossWave: function() {
    return (window.location.hash.indexOf('raid_multi') >= 0) ||
           ($('.txt-info-num:visible').children(':first').attr('class') ===
            $('.txt-info-num:visible').children(':last').attr('class'));
  },
  /**
   * Return the npc id who is injured.
   */
  isInjured: function(index) {
    var injured = -1;
    var $npchp = $('.prt-gauge-hp:visible').eq(index);
    var total = $npchp.width();
    var current = $npchp.children('.prt-gauge-hp-inner').width();
    if (current / total < 0.6 && !this.hasBarrier(index)) {
      return true;
    }
    return false;
  },
  hasBarrier: function(index) {
    if ($('.prt-status.prt-condition[pos="'+index+'"]').find('[data-status="1003"]').length) {
      return true;
    } else {
      return false;
    }
  },
  actionable: function() {
    return this.waitUntilVisible('.btn-attack-start.display-on').then(function() {
      this.debug('ready for next action');
      return Promise.resolve();
    }.bind(this));
  },
  healIfInjured: function() {
    return this.heal(0).then(function() {
      return this.heal(1);
    }.bind(this)).then(function() {
      return this.heal(2);
    }.bind(this)).then(function() {
      return this.heal(3);
    }.bind(this));
  },
  castIfAvailable: function() {
    if (window.localStorage.getItem('normal-attack-only') === 'true') {
      return Promise.resolve();
    }
    return this.castAllSkill(0).then(function() {
      return this.castAllSkill(1);
    }.bind(this)).then(function() {
      return this.castAllSkill(2);
    }.bind(this)).then(function() {
      return this.castAllSkill(3);
    }.bind(this));
  },
  summonIfPossible: function() {
    if ($('.summon-on').length && window.localStorage.getItem('auto-summon') === 'true') {
      return this.summon()
    } else {
      Promise.resolve();
    }
  },
  summon: function() {
    this.click('.summon-on');
    return this.waitOnce('.summon-show').then(function() {
      return this.sleep(1.5);
    }.bind(this)).then(function() {
      this.click('.lis-summon.on.btn-summon-available:first');
      return this.waitUntilVisible('.btn-summon-use');
    }.bind(this)).then(function() {
      this.click('.btn-summon-use');
      return this.sleep(1.5);
    }.bind(this)).then(function() {
      return this.waitUntilVisible('.btn-attack-start.display-on');
    }.bind(this));
  },
  getSkillPreference: function(skill) {
    return window.localStorage.getItem(skill) !== 'false';
  },
  notFirstTurnSkill: function(skillName) {
    var set = ['ディレイ', 'ヴォーパルレイジ','スカーレットギフト'];
    return set.some(function(match) {
      return (skillName.indexOf(match) >= 0);
    });
  },
  setSkillTurn3rd:function(skillName){
	var set = ['千転','鏡花水月'];
	return set.some(function(match) {
		return (skillName.indexOf(match) >= 0);
    });
  },
  xuecaiSkill:function(skillName){
	var set = ['ヒン・リヒテン'];
	return set.some(function(match) {
		return (skillName.indexOf(match) >= 0);
    });
  },
  
  isblock: function(index) {
    if ($('.prt-status.prt-condition[pos="'+index+'"]').find('[data-status="1111"]').length) {
      return true;
    } else {
      return false;
    }
  },
  isSleep: function(index) {
    if ($('.prt-status.prt-condition[pos="'+index+'"]').find('[data-status="1263"]').length) {
      return true;
    } else {
      return false;
    }
  },
  cast: function(skillId) {
    var skillName = $('.lis-ability:visible:eq('+skillId+')').find('[ability-name]').attr('ability-name');
    if ((skillName && (this.getTurnNum() === 0 && this.notFirstTurnSkill(skillName))) ||
		(skillName && (this.getTurnNum() < 2 && this.setSkillTurn3rd(skillName)))||
        this.getSkillPreference(skillName) === false ||
		(skillName) && (this.xuecaiSkill(skillName)&& window.localStorage.getItem('xuecaiGo')=='0')||
		!$('.lis-ability:visible:eq('+skillId+')').is('.btn-ability-available')) {
      return Promise.resolve();
    } else {
      this.click('.lis-ability:visible:eq('+skillId+')');
      return this.waitUntilVisible('.prt-log.log-ability').then(function() {
        return this.actionable();
      }.bind(this));
    }
  },
  castAllSkill: function(npcId) {
	if(this.isblock(npcId) ==true||this.isSleep(npcId) ==true){
		this.debug("skill id ========================"+npcId);
		return this.waitUntilInvisible('.prt-command-chara[pos="'+(npcId+1)+'"]')}  
    var self = this;
    var $states = $('.btn-command-character[pos="'+npcId+'"]:visible .lis-ability-state');
    var available = false;
    $states.each(function(index) {
      var skillName = $('.prt-ability-list').eq(npcId).find('[ability-name]').eq(index).attr('ability-name');
      if (self.getSkillPreference(skillName) === false ||
          self.getTurnNum() === 0 && skillName && skillName.indexOf('ディレイ') >= 0) {
        return true;
      }
      if ($(this).attr('state') === '2') {
        available = true;
        return false;
      }
    });
    if (!available) {
      return Promise.resolve();
    }
    this.click('.btn-command-character[pos="'+npcId+'"]:visible');
    return this.sleep(1).then(function() {
      return this.cast(0);
    }.bind(this)).then(function() {
      return this.cast(1);
    }.bind(this)).then(function() {
      return this.cast(2);
    }.bind(this)).then(function() {
      return this.cast(3);
    }.bind(this)).then(function() {
      this.click('.btn-command-back.display-on');
      return this.waitUntilInvisible('.prt-command-chara[pos="'+(npcId+1)+'"]')
    }.bind(this));
  },
  waitForTransitionend: function(selector) {
    return new Promise(function(resolve) {
      $(selector).one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
        resolve();
      });
    });
  },
  noPotion: function() {
    return (window.localStorage.getItem('use-green-potion') !== 'true' ||
			this.greenPotionCount === 0 )&& 
			(window.localStorage.getItem('use-green-potion') !== 'true' ||
			this.bluePotionCount === 0 )&&
           (window.localStorage.getItem('use-event-potion') !== 'true' ||
            this.eventPotionCount === 0) &&
           (window.localStorage.getItem('use-event-revive') !== 'true' ||
            this.eventReviveCount === 0);
  },
  heal: function(index) {
    if (!this.isInjured(index) ||
        this.noPotion()) {
      return Promise.resolve();
    }
    this.click('.btn-temporary');
    return this.waitOnce('.pop-raid-item.pop-show').then(function() {
      var greenPotionCount = parseInt($('.having-num').eq(0).text());
      var bluePotionCount = parseInt($('.having-num').eq(1).text());
      var eventPotionCount = parseInt($('.having-num').eq(3).text() || 0);
      var eventReviveCount = parseInt($('.having-num').eq(5).text() || 0);
      this.greenPotionCount = greenPotionCount;
      this.bluePotionCount = bluePotionCount;
      this.eventReviveCount = eventReviveCount;
      this.eventPotionCount = eventPotionCount;


      if ( greenPotionCount > 0) {
        this.click('.btn-temporary-small');
        return this.waitOnce('div.prt-popup-header:contains("アイテムを使用")').then(function() {
          this.click('.btn-command-character:visible:eq(' + index + ')');
          this.greenPotionCount--;
          return this.sleep(3);
        }.bind(this)).then(function() {
          return this.waitUntilVisible('.btn-attack-start.display-on');
        }.bind(this));
      } else if ( bluePotionCount > 0) {
        this.click('.item-large.btn-temporary-large');
        return this.waitOnce('div.prt-popup-header:contains("アイテムを使用")').then(function() {
          this.click('.btn-usual-use');
          this.bluePotionCount--;
          return this.sleep(3);
        }.bind(this)).then(function() {
          return this.waitUntilVisible('.btn-attack-start.display-on');
        }.bind(this));
      } else if (window.localStorage.getItem('use-event-potion') === 'true' &&
                 eventPotionCount > 0) {
        this.click('.lis-item.btn-event-item[item-id="1"]');
        return this.waitOnce('div.prt-popup-header:contains("アイテムを使用")').then(function() {
          this.click('.btn-usual-ok');
          this.eventPotionCount--;
          return this.sleep(3);
        }.bind(this)).then(function() {
          return this.waitUntilVisible('.btn-attack-start.display-on');
        }.bind(this));
     } else if (window.localStorage.getItem('use-event-revive') === 'true' &&
                eventReviveCount > 0) {
        this.click('.lis-item.btn-event-item[item-id="3"]');
        return this.waitOnce('div.prt-popup-header:contains("アイテムを使用")').then(function() {
          this.click('.btn-usual-ok');
          this.eventPotionCount--;
          return this.sleep(3);
        }.bind(this)).then(function() {
          return this.waitUntilVisible('.btn-attack-start.display-on');
        }.bind(this));
      } else {
        this.click('.pop-raid-item .btn-usual-cancel');
        return this.waitUntilInvisible('.pop-raid-item');
      }
    }.bind(this));
  },
  attack: function() {
    this.click('.btn-attack-start.display-on');
    this.debug('attack, ' + this.turn);
  },
  sleep: function(sec) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, sec * 1000)
    }.bind(this));
  }
};
function remainTime(){ 
	console.log("3000 pass remainTime"); 
	setTimeout("pageReload()",1000);
} 
window.Engine.start();