'use strict';
window.Extra = {
	'_handle_party/top/detail_weapon': function() {
		var a = window.location.hash.split('/');
		var id = a[a.length - 1];
		this.waitOnce('.txt-skill-level').then(function() {
			var t = $('.txt-skill-level').text();
			var level = t.split(' ')[1] 
			window.localStorage.setItem(id, Number(level))
		}.bind(this))
	},
	'_handle_party/index': function() {
		this.inject('inject/weapon.js')
	},
	'_handle_mypage': function() {
		console.log("111 = " + window.localStorage.getItem('seachEx-1'));
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			location.href = "http://gbf.game.mbga.jp/#quest/assist"
		}
	},
	'_handle_result_multi/empty': function() {
		var self = this;
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbc = setInterval(function() {
				if ($('.btn-control').length > 0) {
					self.click(".btn-control")
				} else if($('.btn-usual-close').length > 0){
					self.click(".btn-usual-close")
				}else if($('.btn-usual-ok').length > 0){
					self.click(".btn-usual-ok:eq(0)")
					
				}						
				else
				{
					location.href = "http://gbf.game.mbga.jp/#quest/assist";
					clearInterval(bbc)
				}
			}, 2000)
		} else if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
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
	},
	'_handle_quest': function() {
		var self = this;
		if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
			location.href = "http://gbf.game.mbga.jp/#coopraid"
		}
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbc = setInterval(function() {
				if ($('.btn-usual-ok').length > 0) {
					self.click(".btn-usual-ok:eq(0)")
				} else {
					location.href = "http://gbf.game.mbga.jp/#quest/assist";
					clearInterval(bbc)
				}
			}, 2000)
		} else if (window.localStorage.getItem('quest-id') !== '' && window.localStorage.getItem('quest-id') !== null) {
			var bbc = setInterval(function() {
				if ($(".pop-show .prt-popup-header").length > 0) {
					self.click(".btn-usual-ok")
				}
			}, 1000)
		}
	},
	'_handle_event':function(){
	    var self = this;
	    if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
			location.href = "http://gbf.game.mbga.jp/#coopraid"
		} else if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbc = setInterval(function() {
				if ($('.btn-usual-ok').length > 0) {
					self.click(".btn-usual-ok:eq(0)")
				} else {
					location.href = "http://gbf.game.mbga.jp/#quest/assist";
					clearInterval(bbc)
				}
			}, 2000)
		}
	},
	'_handle_quest/index': function() {
		var self = this;
		if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
			location.href = "http://gbf.game.mbga.jp/#coopraid"
		} else if (window.localStorage.getItem('autoSeachEx') === 'true') {
			var bbc = setInterval(function() {
				if ($('.btn-usual-ok').length > 0) {
					self.click(".btn-usual-ok:eq(0)")
				} else {
					location.href = "http://gbf.game.mbga.jp/#quest/assist";
					clearInterval(bbc)
				}
			}, 2000)
		}
	},
	'_handle_enhancement/weapon/material': function() {
		this.change(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.target !== document.querySelector('.skill1-level')) {
					return
				}
				var l = $('.btn-base-chenge')[0].dataset.locationHref;
				var a = l.split('/');
				var id = a[a.length - 1];
				window.localStorage.setItem(id, Number($('.skill1-level').text()))
			}, this)
		}.bind(this))
	},
	'_handle_enhancement/weapon/base': function() {
		this.parseSkillLevel()
	},
	'_handle_list': function() {
		this.parseSkillLevel()
	},
	parseSkillLevel: function() {
		this.change(function(mutations) {
			[].slice.call(document.querySelectorAll('.txt-status')).forEach(function(state) {
				var txt = state.textContent;
				if (txt.indexOf('SLv') >= 0) {
					txt = txt.replace('SLv', '')
				} else {
					return
				}
				window.localStorage.setItem(state.parentNode.parentNode.dataset.itemId, Number(txt))
			})
		}.bind(this))
	},
	'_handle_quest/assist/unclaimed': function() {
		if (window.localStorage.getItem('assistIsClick')) {
			window.localStorage.setItem('assistIsClick', 'true')
		}
		var self = this;
		var bbc = setInterval(function() {
			if ($('.btn-multi-raid ').length > 0) {
				self.click(".btn-multi-raid:eq(0)");
				clearInterval(bbc);
				if (window.localStorage.getItem('assistIsClick')) {
					window.localStorage.setItem('assistIsClick', 'false')
				}
			}
		}, 1000)
	},
	'_handle_quest/assist': function() {
		var self = this;
		var found = false;
		var isClick = false;
		var exLis = [];
		if (!window.localStorage.getItem('assistIsClick')) {
			window.localStorage.setItem('assistIsClick', 'false')
		}
		setTimeout(function() {
			window.localStorage.setItem('assistIsClick', 'false')
		}, 20000);
		if (window.localStorage.getItem('autoSeachEx') === 'true') {
			if (window.localStorage.getItem("ptSearchType") == '1') {
				for (var i = 1; i <= 6; i++) {
					if (window.localStorage.getItem("seachEx-" + i) != "") {
						exLis.push(window.localStorage.getItem("seachEx-" + i))
					}
				}
				var bbb = setInterval(function() {
					console.log("isClick ========================" + window.localStorage.getItem('assistIsClick'));
					if ($('.btn-use-full').length > 0) {
						self.click(".btn-use-full:eq(1)")
					}
					if ($('.btn-usual-ok').length == 1) {
						self.click(".btn-usual-ok")
					}
				}, 5000);
				var bbc = setInterval(function() {
					for (var i = 0; i < $(".btn-multi-raid").length; i++) {
						var mu_index = exLis.indexOf($(".btn-multi-raid:eq(" + i + ")").attr("data-quest-id"));
						if (mu_index >= 0 && window.localStorage.getItem('assistIsClick') == 'false') {
							self.click(".btn-multi-raid:eq(" + i + ")");
							return
						}
					}
				}, 1000);
				var bbd = setTimeout(function() {
					if (window.localStorage.getItem('assistIsClick') == 'false') {
						window.location.reload()
					}
				}, 20000)
			}
			if (window.localStorage.getItem("ptSearchType") == '2') {
				var bbe = setInterval(function() {
					if ($('.btn-post-key').length = 0) {
						self.click(".btn-tabs:eq(2)");
						clearInterval(bbe)
					}
				}, 1000);
				var searchName = window.localStorage.getItem('seachTwitter');
				var requesturl = "http://realtime.search.yahoo.co.jp/search?p=参加者募集+" + searchName + "&ei=UTF-8";
				var re = "";
				var bbdb = setInterval(function() {
					var htmlobj = $.ajax({
						url: requesturl,
						async: false
					});
					var str = htmlobj.responseText;
					var getNext = str.indexOf(' Lv') + 30;
					var NextStr = str.substring(getNext);
					var s = NextStr.indexOf('ID：') + 3;
					var e = NextStr.indexOf(' Lv');
					re = NextStr.substring(s, e);
					console.log("参战id========" + re)
				}, 5000);
				var bbb = setInterval(function() {
					console.log("isClick ========================" + window.localStorage.getItem('assistIsClick'));
					if ($('.btn-post-key').length > 0 && document.querySelector('.frm-battle-key').type == 'text') {
						self.click(".btn-post-key")
					}
					if ($('.btn-use-full').length > 0) {
						self.click(".btn-use-full:eq(1)")
					}
					if ($('.btn-usual-ok').length == 1) {
						self.click(".btn-usual-ok")
					}
				}, 1000);
				var bbf = setInterval(function() {
					if (document.querySelector('.frm-battle-key').type == 'password') {
						document.querySelector('.frm-battle-key').type = 'text';
						document.querySelector('.frm-battle-key').value = re;
						clearInterval(bbf)
					}
				}, 5000);
				var bbd = setTimeout(function() {
					if (window.localStorage.getItem('assistIsClick') == 'false') {
						window.location.reload()
					}
				}, 20000)
			}
		}
	},
	'_handle_sell': function() {
		this.change(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.target !== document.getElementById('lis-weapon') && mutation.target !== document.getElementById('lis-summon')) {
					return
				}
				this.inject('inject/select_all_normal.js')
			}, this)
		}.bind(this))
	},
	'_handle_coopraid/room': function() {
		var self = this;
		if (window.localStorage.getItem('master') == 'true') {
			var startRoom = setInterval(function(){
				if ($('.btn-use-full').length > 0) {
					self.click(".btn-use-full:eq(1)")
				}
					//btn-usual-cancel
				if ($('.btn-usual-cancel').length > 0 && $('.btn-reset-quest').length > 0 ) {
						self.click(".btn-use-full:eq(1)")
				}
				
				if(!$(".btn-quest-start").length > 0){
					$(".btn-usual-ok").attr("data-quest-id",window.localStorage.getItem('ptcoopraid'))
					console.log($(".btn-quest-start").length)
					self.click(".btn-usual-ok")
				}
				
				if(!$(".btn-quest-start").length > 0 && $(".btn-usual-ok").length < 1){
					var d = document.createElement("div")
					var b = document.createElement("div")
					var c = document.querySelector(".prt-3tabs")
					 
					var setDetailElm = document.createElement("div");
					setDetailElm.className = "pop-quest-detail";
					setDetailElm.style.cursor = "default";

					var dataAp = "0";
					if(window.localStorage.getItem('ptcoopraid') == "601011"){
						dataApp = "20";
					}else{
						dataAp = "40";
					}
					var setBtnElm = document.createElement("span")
					setBtnElm.className = "btn-usual-ok"
					setBtnElm.setAttribute("data-quest-id", window.localStorage.getItem('ptcoopraid')), 
					setBtnElm.setAttribute("data-ap", dataAp),
					setBtnElm.setAttribute("data-required-rank", "10")
					setBtnElm.textContent =  "罐子"
					setBtnElm.style.fontSize = "10px"
					setBtnElm.style.padding = "0px"
					setBtnElm.style.height = "17px"
					setBtnElm.style.width = "105px"
					setBtnElm.style.backgroundImage = "url()"
					setBtnElm.style.backgroundColor = ""
					setDetailElm.appendChild(setBtnElm);
					b.style.position = "relative";
					b.style.position = "relative";
					b.appendChild(setDetailElm);
					c.parentNode.insertBefore(b, c)
				}
			},3000);
		}
		
		
		if ((window.localStorage.getItem('master') == 'true') || (window.localStorage.getItem('coopraid') == 'true')) {
			setTimeout(function() {
				window.location.reload()
			}, 15000)
		}
		
		/*
		
		if (window.localStorage.getItem('master') == 'true') {
			var ok = setInterval(function() {
				if ($('.btn-usual-ok').length > 0) {
					self.click(".btn-usual-ok")
				}
				if ($('.btn-use-full').length > 0) {
					self.click(".btn-use-full:eq(1)")
				}
			}, 1000);
			if (window.localStorage.getItem('ptcoopraid') == '1') {
				var bba = setInterval(function() {
					if ($('.btn-open-stage-2').length == 1) {
						self.click(".btn-open-stage-2");
						clearInterval(bba)
					}
				}, 1000);
				var bbb = setInterval(function() {
					if ($('.btn-forward').length > 0) {
						self.click(".btn-forward");
						clearInterval(bbb)
					}
				}, 1000);
				var bbc = setInterval(function() {
					if ($('.btn-stage-detail').length > 0) {
						if ($('.btn-stage-detail:eq(2)').attr("data-stage-id") == 10) {
							self.click(".btn-stage-detail:eq(2)");
							clearInterval(bbc)
						}
					}
				}, 1000);
				var bbd = setInterval(function() {
					if ($('.btn-set-quest').length > 0) {
						self.click(".btn-set-quest:eq(0)");
						clearInterval(bbd)
					}
				}, 1000)
			} else if (window.localStorage.getItem('ptcoopraid') == '2') {
				var bba = setInterval(function() {
					if ($('.btn-open-stage-3').length == 1) {
						self.click(".btn-open-stage-3");
						clearInterval(bba)
					}
				}, 1000);
				var bbc = setInterval(function() {
					if ($('.btn-stage-detail').length > 0) {
						var count = $('.btn-stage-detail').length - 1;
						self.click(".btn-stage-detail:eq(" + count + ")");
						clearInterval(bbc)
					}
				}, 1000);
				var bbd = setInterval(function() {
					if ($('.btn-set-quest').length > 0) {
						var count2 = $('.btn-set-quest').length - 3;
						self.click(".btn-set-quest:eq(" + count2 + ")");
						clearInterval(bbd)
					}
				}, 1000)
			} else if (window.localStorage.getItem('ptcoopraid') == '3') {
				var bba = setInterval(function() {
					if ($('.btn-open-stage-3').length == 1) {
						self.click(".btn-open-stage-3");
						clearInterval(bba)
					}
				}, 1000);
				var bbc = setInterval(function() {
					if ($('.btn-stage-detail').length > 0) {
						var count = $('.btn-stage-detail').length - 3;
						self.click(".btn-stage-detail:eq(" + count + ")");
						clearInterval(bbc)
					}
				}, 1000);
				var bbd = setInterval(function() {
					if ($('.btn-set-quest').length > 0) {
						var count2 = $('.btn-set-quest').length - 2;
						self.click(".btn-set-quest:eq(" + count2 + ")");
						clearInterval(bbd)
					}
				}, 1000)
			} else if (window.localStorage.getItem('ptcoopraid') == '4') {
				var bba = setInterval(function() {
					if ($('.btn-open-stage-3').length == 1) {
						self.click(".btn-open-stage-3");
						clearInterval(bba)
					}
				}, 1000);
				var bbc = setInterval(function() {
					if ($('.btn-stage-detail').length > 0) {
						var count = $('.btn-stage-detail').length - 2;
						self.click(".btn-stage-detail:eq(" + count + ")");
						clearInterval(bbc)
					}
				}, 1000);
				var bbd = setInterval(function() {
					if ($('.btn-set-quest').length > 0) {
						var count2 = $('.btn-set-quest').length - 1;
						self.click(".btn-set-quest:eq(" + count2 + ")");
						clearInterval(bbd)
					}
				}, 1000)
			} else if (window.localStorage.getItem('ptcoopraid') == '5') {
				var bba = setInterval(function() {
					if ($('.btn-open-stage-3').length == 1) {
						self.click(".btn-open-stage-3");
						clearInterval(bba)
					}
				}, 1000);
				var bbc = setInterval(function() {
					if ($('.btn-stage-detail').length > 0) {
						var count = $('.btn-stage-detail').length - 3;
						self.click(".btn-stage-detail:eq(" + count + ")");
						clearInterval(bbc)
					}
				}, 1000);
				var bbd = setInterval(function() {
					if ($('.btn-set-quest').length > 0) {
						var count2 = $('.btn-set-quest').length - 1;
						self.click(".btn-set-quest:eq(" + count2 + ")");
						clearInterval(bbd)
					}
				}, 1000)
			}
		}
		*/
		
		var room = setInterval(function() {
			self.waitUntilVisible('.btn-make-ready-large.not-ready').then(function() {
				self.click('.btn-make-ready-large.not-ready')
			}.bind(self));
			self.waitUntilVisible('.btn-execute-ready.se-ok').then(function() {
				self.click('.btn-execute-ready.se-ok')
			}.bind(self));
			self.waitUntilVisible('.btn-quest-start.se-quest-start').then(function() {
				self.click('.btn-quest-start.se-quest-start')
			}.bind(self))
		}, 1000)
	},
	'_handle_coopraid/offer': function() {
		this.waitUntilVisible('.btn-wanted-room').then(function() {
			var self = this;
			var key = null;
			$('.prt-wanted-room.btn-wanted-room').each(function() {
				if ($(this).find('.prt-member-icon').length < 3 && $(this).find('.prt-invite-type-1').length > 0) {
					key = $(this)[0].dataset.indexKey;
					return false
				}
			});
			if (key) {
				this.click('.btn-wanted-room[data-index-key=' + key + ']');
				return this.waitUntilVisible('.btn-usual-join').then(function() {
					this.click('.btn-usual-join');
					return this.waitUntilVisible('.btn-usual-ok')
				}.bind(this)).then(function() {
					this.click('.btn-usual-ok');
					return this.sleep(1)
				}.bind(this))
			} else {
				return this.sleep(1)
			}
		}.bind(this)).then(function() {
			this.click('.btn-refresh-list');
			return this.sleep(1)
		}.bind(this)).then(function() {
			return this.waitUntilInvisible('#loading')
		}.bind(this)).then(function() {
			this['_handle_coopraid/offer']()
		}.bind(this))
	}
}