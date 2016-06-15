'use strict';

var Client = {
	raid: [],
	observers: [],
	start: function() {
		if (this._started) {
			return;
		}
		this.handleGeneral();
		console.log('client starting');
		this._started = true;
		window.addEventListener('hashchange', this);
		this.handleEvent();
		this.sendCommand({
			type: 'started'
		});
		window.addEventListener('_debug', function(evt) {
			console.log(evt.detail);
		});
	},
	
	handleEvent: function() {
		var hash = window.location.hash.replace('#', '');
		var a = hash.split('/');
		var id = '';
		if (Number(a[a.length - 1]) >= 0) {
			id = Number(a.pop());
			hash = a.join('/');
		}
		console.log(hash, id);
		if (a.length >= 3 && this['_handle_' + a[0] + '/' + a[1] + '/' + a[2]]) {
			this['_handle_' + a[0] + '/' + a[1] + '/' + a[2]](id);
		} else if (a.length >= 2 && this['_handle_' + a[0] + '/' + a[1]]) {
			this['_handle_' + a[0] + '/' + a[1]](id);
		} else if (this['_handle_' + a[0]]) {
			this['_handle_' + a[0]](id);
		} else {
			this['_handle_' + hash] && this['_handle_' + hash](id);
		}
		this.sendCommand({
			type: 'hashchange',
			data: a[0]
		})
	},
	handleGeneral: function() {
		window.addEventListener('DOMContentLoaded', function() {
			console.log(document.body.innerHTML);
		});
		document.addEventListener('click', function(evt) {
			var target, thumb = '';
			if (evt.target.dataset.questId) {
				target = evt.target;
				var img = target.querySelector('.img-quest');
				if (img) {
					thumb = img.src;
				}
			} else {
				target = $(evt.target).parents('[data-quest-id]');
				if (!target.length) {
					return;
				}
				target = target[0];
				var img = target.querySelector('.img-quest');
				if (img) {
					thumb = img.src;
				}
			}
			if (!target) {
				return;
			}
			var quest = target.dataset;
			var currentDatabase = window.localStorage.getItem('quest-database');
			if (!currentDatabase) {
				currentDatabase = {};
			} else {
				currentDatabase = JSON.parse(currentDatabase);
			}
			currentDatabase[quest.questId] = currentDatabase[quest.questId] || {};
			if (target.classList.contains('se-quest-start')) {
				currentDatabase[quest.questId].hash = window.location.hash.replace('#', '');
			} else {
				for (var key in quest) {
					if (quest[key]) {
						currentDatabase[quest.questId][key] = quest[key];
					}
				}
			}
			if (thumb) {
				currentDatabase[quest.questId].thumb = thumb;
			}
			window.localStorage.setItem('quest-database', JSON.stringify(currentDatabase));
			this.sendCommand({
				type: 'localStorage',
				data: window.localStorage
			})
		}.bind(this), true);
	},
	'_handle_item': function() {
		var self = this;
		var getTimeOut = setTimeout(function() {
			self.load(window.localStorage.getItem('quest-id'));
		}, 20 * 1000);
		if (window.localStorage.getItem('restore-action-point') !== 'true') {
			return;
		}
		window.localStorage.setItem('restore-action-point', 'false');
		this.waitUntilVisible('.lis-item').then(function() {
			return this.sleep(3);
		}.bind(this)).then(function() {
			if (this.restoreFullAP()) {
				this.click('.prt-normal .lis-item.se[data-index=0]');
				clearTimeout(getTimeOut);
			} else {
				this.click('.prt-normal .lis-item.se[data-index=1]');
				clearTimeout(getTimeOut);
			}
			return this.waitUntilVisible('.btn-usual-use');
		}.bind(this)).then(function() {
			this.click('.btn-usual-use');
			return this.sleep(2);
		}.bind(this)).then(function() {
			this.load(window.localStorage.getItem('quest-id'));
		}.bind(this));
	},
	restoreFullAP: function() {
		return window.localStorage.getItem('use-full') === 'true';
	},
	'_handle_quest/supporter/farm': function() {
		if (!this.isFarmingQuest()) {
			return;
		}
		this['_handle_quest/supporter']();
	},
	click: function(selector) {
		console.log('clicking ' + selector);
		this.sleep(1 + Math.random()).then(function() {
			window.localStorage.setItem('button-selector', selector);
			this.inject('inject/click_.js')
		}.bind(this));
	},
	load: function(hash) {
		console.log('loading ' + hash);
		var currentD = new Date();
		var timeStart = window.localStorage.getItem('timeStart');
		var timeEnd = window.localStorage.getItem('timeEnd');
		
		var startHappyHourD = new Date();
		startHappyHourD.setHours(timeStart.substring(0, 2),timeStart.substring(2, 4),0);
		var endHappyHourD = new Date();
		endHappyHourD.setHours(timeEnd.substring(0, 2),timeEnd.substring(2, 4),0);
		console.log('setTime： ' + window.localStorage.getItem('setTime'));
		if(window.localStorage.getItem('setTime') == 'true'){
			var bba = setInterval(function() {
				console.log('timeStart： ' + timeStart.substring(0, 2) + ':' + timeStart.substring(2, 4));
				console.log('timeEnd： ' + timeEnd.substring(0, 2) + ':' + timeEnd.substring(2, 4));
				console.log("happy hour?")
				if(currentD >= startHappyHourD && currentD < endHappyHourD ){
					console.log("yes! let's party");
					this.sleep(Math.random()).then(function() {
						window.localStorage.setItem('_hash', hash);
						this.inject('inject/load_.js')
					}.bind(this));
					clearInterval(bba);
				}else{
					console.log("no, sorry! please wait");
				}
			}, 5000);
		}else{
			this.sleep(Math.random()).then(function() {
				window.localStorage.setItem('_hash', hash);
				this.inject('inject/load_.js')
			}.bind(this));
		}
	},
	'_handle_quest/stage': function() {
		this.waitOnce('.btn-command-forward').then(function() {
			this.click('.btn-command-forward');
			this.sleep(1).then(function() {
				if (window.location.hash.indexOf('stage') >= 0) {
					this['_handle_quest/stage']();
				}
			}.bind(this));
		}.bind(this));
	},
	'_handle_event': function() {
		if (this.isFarmingQuest() && window.location.hash !== '#' + window.localStorage.getItem('quest-id')) {
			this.load(window.localStorage.getItem('quest-id'));
		} else if (window.location.hash === '#' + window.localStorage.getItem('quest-id')) {
			this['_handle_quest/supporter']();
		} else if (window.localStorage.getItem('auto-medal') === 'true') {
			this.waitUntilVisible('.btn-medal.multi').then(function() {
				this.click('.btn-medal.multi');
			}.bind(this));
		}
	},
	getPreference: function(key) {
		return window.localStorage.getItem(key);
	},
	chooseSupporterByPref: function() {
		if (window.localStorage.getItem('assistIsClick')) {
			window.localStorage.setItem('assistIsClick', 'true');
		}
		var prefs = [];
		var set
		var set_attribute = [];
		set_attribute = window.localStorage.getItem('ptZokusei');
/*
	if (this.getPreference('fire') === 'true') {
     set_attribute = '1';
    }
		if (this.getPreference('water') === 'true') {
      set_attribute = '2';
    }
		if (this.getPreference('wind') === 'true') {
		set_attribute = '4';
    }
		if (this.getPreference('land') === 'true') {
       set_attribute = '3';
    }
		if (this.getPreference('light') === 'true') {
       set_attribute = '5';
    }
		if (this.getPreference('dark') === 'true') {
       set_attribute = '6';
    }
    */

		if (this.getPreference('select') === 'true') {
			var select = window.localStorage.getItem('select-id');
			prefs.push(select);
		}

		var url = window.localStorage.getItem('quest-id');
		var bbc = setTimeout("remainTime()", 100 * 1000);

		if (this.getPreference('dragon-girl') === 'true') {
			prefs.push('ジ・オーダー・グランデ');
			set_attribute = '0';
		}
		if (this.getPreference('black-dragon') === 'true') {
			prefs.push('バハムート');
			set_attribute = '6';
		}
		if (this.getPreference('gay') === 'true') {
			prefs.push('ルシフェル');
			set_attribute = '5';
		}
		var button = '';
		var expected = prefs.some(function(summon) {
			var supporters = $('div.prt-supporter-summon:contains("' + summon + '")').not(':contains("プロト")');
			if (supporters.length) {
				var userID = supporters[0].parentNode.parentNode.parentNode.dataset.supporterUserId;
				button = '[data-supporter-user-id="' + userID + '"][data-attribute="' + set_attribute + '"]';
				if (window.localStorage.getItem('assistIsClick')) {
					window.localStorage.setItem('assistIsClick', 'false');
				}
				return true;
			}
		}, this);
		if (!expected) {
			var candidates = [];
			set_attribute = window.localStorage.getItem('ptZokusei');
/*
	if (this.getPreference('fire') === 'true') {
     set_attribute = '1';
    }
		if (this.getPreference('water') === 'true') {
      set_attribute = '2';
    }
		if (this.getPreference('wind') === 'true') {
		set_attribute = '4';
    }
		if (this.getPreference('land') === 'true') {
       set_attribute = '3';
    }
		if (this.getPreference('light') === 'true') {
       set_attribute = '5';
    }
		if (this.getPreference('dark') === 'true') {
       set_attribute = '6';
    }	
	*/

			var $summonSkills = $('.prt-summon-skill:visible');
			if (!$summonSkills.length) {
				$summonSkills = $('.btn-supporter .prt-summon-skill:visible');
			}
			$summonSkills.each(function() {
				console.log($(this));
				var match = $(this).text().match(/[\d]+/);
				if (match && match.length) {
					candidates.push({
						id: $(this).parents('.btn-supporter')[0].dataset.supporterUserId,
						attribute: $(this).parents('.btn-supporter')[0].dataset.attribute,
						effectAmount: Number(match[0])
					});
				}
			});
			candidates = candidates.sort(function(a, b) {
				//console.log(a.effectAmount);
				//console.log(b.effectAmount);
				return a.effectAmount < b.effectAmount;
			});
			button = '[data-supporter-user-id="' + candidates[0].id + '"][data-attribute="' + set_attribute + '"]';
			if (window.localStorage.getItem('assistIsClick')) {
				window.localStorage.setItem('assistIsClick', 'false');
			}
		}

		return this.sleep(3).then(function() {
			this.click(button);
			return this.waitOnce('.se-quest-start');
		}.bind(this)).then(function() {
			if (Number($('.txt-stamina-after').text()) < 0) {
				return Promise.resolve();
			} else {
				this.click('.se-quest-start');
				//clearTimeout(bbc);
				return this.waitUntilVisible('div.prt-popup-header:contains("APが足りません"):visible');
			}
		}.bind(this)).then(function() {
			if (this.isFarmingQuest()) {
				window.localStorage.setItem('restore-action-point', true);
				this.load('item');
			}
		}.bind(this));
		this.sleep(5).then(function() {
			if (!$('.se-quest-start:visible').length) {
				this.click(button);
			}
		}.bind(this));
	},
	'_handle_quest/supporter_raid': function() {
		var self = this;
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbb = setInterval(function() {
				if ($('.btn-usual-ok').length == 1) {
					self.click(".btn-usual-ok");
				}
			}, 1000);
		}

		this['_handle_quest/supporter']();
	},
	'_handle_quest/supporter': function() {
		if (window.localStorage.getItem('auto-choose-supporter') === 'false') {
			return;
		}
		if (window.localStorage.getItem('assistIsClick')) {
			window.localStorage.setItem('assistIsClick', 'true');
		}
		this.waitUntilVisible('.btn-supporter').then(function() {
			this.chooseSupporterByPref();
		}.bind(this));
	},
	'_handle_raid': function() {
		Promise.race([this.waitUntilVisible('.prt-start-direction'), this.sleep(3)]).then(function() {

			console.log('ready to inject');
			this.inject('inject/engine.js');
		}.bind(this));
		this.waitOnce('[ability-name]').then(function() {
			var abilities = [];
			$('[ability-name]').each(function() {
				var a = $(this).attr('class').split(' ');
				var iconCls = a[0].replace('ico-ability', '');
				var posCls = a[1].replace('ability-character-num-', '');
				abilities.push({
					name: $(this).attr('ability-name'),
					position: posCls.split('-'),
					icon: iconCls,
					text: $(this).attr('text-data')
				})
			});
			this.sendCommand({
				type: 'abilities',
				data: abilities
			});
		}.bind(this));
	},
	'_handle_raid_multi': function() {
		this._handle_raid();
	},
	'_handle_quest/scene': function() {
		this.waitUntilVisible('.btn-skip').then(function() {
			this.click('.btn-skip');
			return this.waitUntilVisible('.btn-usual-ok');
		}.bind(this)).then(function() {
			this.click('.btn-usual-ok');
		}.bind(this));
	},
	'_handle_result_multi': function() {
	    if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
			var bbc = setInterval(function() {
				if ($('.btn-control').length > 0) {
					self.click(".btn-control")
				} else if($('.btn-usual-close').length > 0){
					self.click(".btn-usual-close")
				}else if($('.btn-usual-ok').length > 0){
					self.click(".btn-usual-ok:eq(0)")
					
				}	 else {
					location.href = "http://gbf.game.mbga.jp/#coopraid";
					clearInterval(bbc)
				}
			}, 2000)
		}
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbc = setTimeout(function() {
				location.reload();
			}, 10000);
		}
		this._handle_result();
	},
	'_handle_result': function() {
		if (this.isFarmingQuest()) {
			this.sleep(3).then(function() {
				this.load(window.localStorage.getItem('quest-id'));
			}.bind(this));
			return;
		}
		this.change(function(mutations) {
			mutations.forEach(function(mutation) {
				if ($('div.prt-popup-header:contains("時限クエスト出現"):visible').length) {
					this.click('.btn-usual-close');
				}
				if (mutation.attributeName === 'class' && mutation.target === document.querySelector('.pop-usual')) {
					if ($('.btn-usual-ok').is(':visible')) {
						this.click('.btn-usual-ok');
					}
				}
				if (mutation.type === 'childList' && mutation.removedNodes.length && mutation.target === document.querySelector('#pop')) {
					if ($('.btn-control').is(':visible')) {
						this.click('.btn-control');
					}
				}
				if (mutation.attributeName === 'style' && mutation.target === document.querySelector('.btn-control')) {
					if ($('.btn-control').is(':visible') && !$('.btn-usual-ok').length) {
						this.click('.btn-control');
					}
				}
			}, this);
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
	waitUntilVisible: function(selector) {
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
	waitOnce: function(selector) {
		return new Promise(function(resolve) {
			if ($(selector).length) {
				console.log('found existing ' + selector);
				resolve();
				return;
			}
			this.onceObserver && this.onceObserver.disconnect();
			var self = this;
			var observer = new MutationObserver(function(mutations) {
				if ($(selector).length) {
					console.log('found ' + selector);
					this.onceObserver && this.onceObserver.disconnect();
					resolve();
				}
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
	change: function(callback) {
		var self = this;
		var observer = new MutationObserver(function(mutations) {
			callback(mutations);
		}.bind(this));

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			characterData: false
		});
		this.observers.push(observer);
		return observer;
	},
	stop: function() {
		if (!this._started) {
			return;
		}
		console.log('client stopping');
		this._started = false;
		this.observer && this.observer.disconnect();
		this.observers && this.observers.forEach(function(o) {
			o.disconnect()
		});
		window.removeEventListener('hashchange', this);
		this.sendCommand({
			type: 'stopped'
		});
	},
	inject: function(file) {
		var s = document.createElement('script');
		s.src = chrome.extension.getURL(file);
		s.onload = function() {
			this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(s);
	},
	sendCommand: function(command, callback) {
		chrome.extension.sendRequest(command, callback ||
		function() {});
	},
	sleep: function(sec) {
		return new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, sec * 1000)
		}.bind(this));
	},

	startFarmQuest: function() {
		var quest = window.localStorage.getItem('quest-id');
		this['_handle_' + quest] = this['_handle_quest/supporter/farm']
		this.load(quest);
	},
	stopFarmQuest: function() {},
	isFarmingQuest: function() {
		return window.localStorage.getItem('quest-id') !== '' && window.localStorage.getItem('quest-id') !== null;
	}
};


 window.alert = function(str){
	console.log("alert disable!")
  return ;
}



function remainTime() {
	console.log("3000 pass remainTime");
	var url = window.localStorage.getItem('quest-id');
	$('#stop').click;
	$('#quest-id').value = url;
	$('#start').click;
}


if (window.Extra) {
	for (var k in window.Extra) {
		Client[k] = Extra[k];
	}
}

var PrefObserver = {
	start: function() {
		var self = this;
		var port = chrome.runtime.connect({
			name: "sync"
		});
		self.port = port;
		port.onMessage.addListener(function(msg) {
			var storage = msg;
			for (var key in msg) {
				if (window.localStorage.getItem(key) !== msg[key]) {
					window.localStorage.setItem(key, msg[key]);
					console.log('pref sync:', key, msg[key]);
					self['_observe_' + key] && self['_observe_' + key](msg[key]);
				}
			}
			self.toggleClient();
		});
	},
	postMessage: function(msg) {
		this.port && this.port.postMessage(msg);
	},
	'_observe_quest-id': function() {
		console.log('1');
		if (window.localStorage.getItem('quest-id')) {
			Client.startFarmQuest();
		} else {
			Client.stopFarmQuest();
		}
	},
	toggleClient: function() {
		if (window.localStorage.getItem('enabled') !== 'false') {
			Client.start();
		} else {
			Client.stop();
		}
	}
};

PrefObserver.start();