window.Extra={"_handle_party/top/detail_weapon":function(){var a=window.location.hash.split("/"),b=a[a.length-1];this.waitOnce(".txt-skill-level").then(function(){var a=$(".txt-skill-level").text().split(" ")[1];window.localStorage.setItem(b,Number(a))}.bind(this))},"_handle_party/index":function(){this.inject("inject/weapon.js")},_handle_mypage:function(){console.log("111 = "+window.localStorage.getItem("seachEx-1"));"true"===window.localStorage.getItem("autoSeachEx")&&(location.href="http://gbf.game.mbga.jp/#quest/assist")},
"_handle_result_multi/empty":function(){var a=this;if("true"===window.localStorage.getItem("autoSeachEx"))var b=setInterval(function(){0<$(".btn-control").length?a.click(".btn-control"):(location.href="http://gbf.game.mbga.jp/#quest/assist",clearInterval(b))},2E3);if("true"==window.localStorage.getItem("master")||"true"==window.localStorage.getItem("coopraid"))b=setInterval(function(){0<$(".btn-control").length?a.click(".btn-control"):(location.href="http://gbf.game.mbga.jp/#coopraid",clearInterval(b))},
2E3)},_handle_quest:function(){var a=this;if("true"==window.localStorage.getItem("master")||"true"==window.localStorage.getItem("coopraid"))location.href="http://gbf.game.mbga.jp/#coopraid";if("true"===window.localStorage.getItem("autoSeachEx"))var b=setInterval(function(){0<$(".btn-usual-ok").length?a.click(".btn-usual-ok:eq(0)"):(location.href="http://gbf.game.mbga.jp/#quest/assist",clearInterval(b))},2E3);else""!==window.localStorage.getItem("quest-id")&&null!==window.localStorage.getItem("quest-id")&&
(b=setInterval(function(){0<$(".pop-show .prt-popup-header").length&&a.click(".btn-usual-ok")},1E3))},"_handle_quest/index":function(){var a=this;if("true"==window.localStorage.getItem("master")||"true"==window.localStorage.getItem("coopraid"))location.href="http://gbf.game.mbga.jp/#coopraid";else if("true"===window.localStorage.getItem("autoSeachEx"))var b=setInterval(function(){0<$(".btn-usual-ok").length?a.click(".btn-usual-ok:eq(0)"):(location.href="http://gbf.game.mbga.jp/#quest/assist",clearInterval(b))},
2E3)},"_handle_enhancement/weapon/material":function(){this.change(function(a){a.forEach(function(a){a.target===document.querySelector(".skill1-level")&&(a=$(".btn-base-chenge")[0].dataset.locationHref.split("/"),window.localStorage.setItem(a[a.length-1],Number($(".skill1-level").text())))},this)}.bind(this))},"_handle_enhancement/weapon/base":function(){this.parseSkillLevel()},_handle_list:function(){this.parseSkillLevel()},parseSkillLevel:function(){this.change(function(a){[].slice.call(document.querySelectorAll(".txt-status")).forEach(function(a){var d=
a.textContent;0<=d.indexOf("SLv")&&(d=d.replace("SLv",""),window.localStorage.setItem(a.parentNode.parentNode.dataset.itemId,Number(d)))})}.bind(this))},"_handle_quest/assist/unclaimed":function(){window.localStorage.getItem("assistIsClick")&&window.localStorage.setItem("assistIsClick","true");var a=this,b=setInterval(function(){0<$(".btn-multi-raid ").length&&(a.click(".btn-multi-raid:eq(0)"),clearInterval(b),window.localStorage.getItem("assistIsClick")&&window.localStorage.setItem("assistIsClick",
"false"))},1E3)},"_handle_quest/assist":function(){var a=this,b=[];window.localStorage.getItem("assistIsClick")||window.localStorage.setItem("assistIsClick","false");setTimeout(function(){window.localStorage.setItem("assistIsClick","false")},2E4);if("true"===window.localStorage.getItem("autoSeachEx")){if("1"==window.localStorage.getItem("ptSearchType")){for(var d=1;6>=d;d++)""!=window.localStorage.getItem("seachEx-"+d)&&b.push(window.localStorage.getItem("seachEx-"+d));setInterval(function(){console.log("isClick ========================"+
window.localStorage.getItem("assistIsClick"));0<$(".btn-use-full").length&&a.click(".btn-use-full:eq(1)");1==$(".btn-usual-ok").length&&a.click(".btn-usual-ok")},5E3);setInterval(function(){for(var f=0;f<$(".btn-multi-raid").length;f++)if(0<=b.indexOf($(".btn-multi-raid:eq("+f+")").attr("data-quest-id"))&&"false"==window.localStorage.getItem("assistIsClick")){a.click(".btn-multi-raid:eq("+f+")");break}},1E3);setTimeout(function(){"false"==window.localStorage.getItem("assistIsClick")&&window.location.reload()},
2E4)}if("2"==window.localStorage.getItem("ptSearchType")){setInterval(function(){$(".btn-post-key").length=0},1E3);var e="http://realtime.search.yahoo.co.jp/search?p=\u53c2\u52a0\u8005\u52df\u96c6+"+window.localStorage.getItem("seachTwitter")+"&ei=UTF-8",c="";setInterval(function(){var a=$.ajax({url:e,async:!1}).responseText,b=a.indexOf(" Lv")+30,a=a.substring(b),b=a.indexOf("ID\uff1a")+3,f=a.indexOf(" Lv");c=a.substring(b,f);console.log("\u53c2\u6218id========"+c)},5E3);setInterval(function(){console.log("isClick ========================"+
window.localStorage.getItem("assistIsClick"));0<$(".btn-post-key").length&&"text"==document.querySelector(".frm-battle-key").type&&a.click(".btn-post-key");0<$(".btn-use-full").length&&a.click(".btn-use-full:eq(1)");1==$(".btn-usual-ok").length&&a.click(".btn-usual-ok")},1E3);var f=setInterval(function(){"password"==document.querySelector(".frm-battle-key").type&&(document.querySelector(".frm-battle-key").type="text",document.querySelector(".frm-battle-key").value=c,clearInterval(f))},5E3);setTimeout(function(){"false"==
window.localStorage.getItem("assistIsClick")&&window.location.reload()},2E4)}}},_handle_sell:function(){this.change(function(a){a.forEach(function(a){a.target!==document.getElementById("lis-weapon")&&a.target!==document.getElementById("lis-summon")||this.inject("inject/select_all_normal.js")},this)}.bind(this))},"_handle_coopraid/room":function(){var a=this;"true"!=window.localStorage.getItem("master")&&"true"!=window.localStorage.getItem("coopraid")||setTimeout(function(){window.location.reload()},
15E3);if("true"==window.localStorage.getItem("master"))if(setInterval(function(){0<$(".btn-usual-ok").length&&a.click(".btn-usual-ok");0<$(".btn-use-full").length&&a.click(".btn-use-full:eq(1)")},1E3),"1"==window.localStorage.getItem("ptcoopraid"))var b=setInterval(function(){1==$(".btn-open-stage-2").length&&(a.click(".btn-open-stage-2"),clearInterval(b))},1E3),d=setInterval(function(){0<$(".btn-forward").length&&(a.click(".btn-forward"),clearInterval(d))},1E3),e=setInterval(function(){0<$(".btn-stage-detail").length&&
10==$(".btn-stage-detail:eq(2)").attr("data-stage-id")&&(a.click(".btn-stage-detail:eq(2)"),clearInterval(e))},1E3),c=setInterval(function(){0<$(".btn-set-quest").length&&(a.click(".btn-set-quest:eq(0)"),clearInterval(c))},1E3);else"2"==window.localStorage.getItem("ptcoopraid")?(b=setInterval(function(){1==$(".btn-open-stage-3").length&&(a.click(".btn-open-stage-3"),clearInterval(b))},1E3),e=setInterval(function(){if(0<$(".btn-stage-detail").length){var b=$(".btn-stage-detail").length-1;a.click(".btn-stage-detail:eq("+
b+")");clearInterval(e)}},1E3),c=setInterval(function(){if(0<$(".btn-set-quest").length){var b=$(".btn-set-quest").length-3;a.click(".btn-set-quest:eq("+b+")");clearInterval(c)}},1E3)):"3"==window.localStorage.getItem("ptcoopraid")?(b=setInterval(function(){1==$(".btn-open-stage-3").length&&(a.click(".btn-open-stage-3"),clearInterval(b))},1E3),e=setInterval(function(){if(0<$(".btn-stage-detail").length){var b=$(".btn-stage-detail").length-3;a.click(".btn-stage-detail:eq("+b+")");clearInterval(e)}},
1E3),c=setInterval(function(){if(0<$(".btn-set-quest").length){var b=$(".btn-set-quest").length-2;a.click(".btn-set-quest:eq("+b+")");clearInterval(c)}},1E3)):"4"==window.localStorage.getItem("ptcoopraid")?(b=setInterval(function(){1==$(".btn-open-stage-3").length&&(a.click(".btn-open-stage-3"),clearInterval(b))},1E3),e=setInterval(function(){if(0<$(".btn-stage-detail").length){var b=$(".btn-stage-detail").length-2;a.click(".btn-stage-detail:eq("+b+")");clearInterval(e)}},1E3),c=setInterval(function(){if(0<
$(".btn-set-quest").length){var b=$(".btn-set-quest").length-1;a.click(".btn-set-quest:eq("+b+")");clearInterval(c)}},1E3)):"5"==window.localStorage.getItem("ptcoopraid")&&(b=setInterval(function(){1==$(".btn-open-stage-3").length&&(a.click(".btn-open-stage-3"),clearInterval(b))},1E3),e=setInterval(function(){if(0<$(".btn-stage-detail").length){var b=$(".btn-stage-detail").length-3;a.click(".btn-stage-detail:eq("+b+")");clearInterval(e)}},1E3),c=setInterval(function(){if(0<$(".btn-set-quest").length){var b=
$(".btn-set-quest").length-1;a.click(".btn-set-quest:eq("+b+")");clearInterval(c)}},1E3));setInterval(function(){a.waitUntilVisible(".btn-make-ready-large.not-ready").then(function(){a.click(".btn-make-ready-large.not-ready")}.bind(a));a.waitUntilVisible(".btn-execute-ready.se-ok").then(function(){a.click(".btn-execute-ready.se-ok")}.bind(a));a.waitUntilVisible(".btn-quest-start.se-quest-start").then(function(){a.click(".btn-quest-start.se-quest-start")}.bind(a))},1E3)},"_handle_coopraid/offer":function(){this.waitUntilVisible(".btn-wanted-room").then(function(){var a=
null;$(".prt-wanted-room.btn-wanted-room").each(function(){if(3>$(this).find(".prt-member-icon").length&&0<$(this).find(".prt-invite-type-1").length)return a=$(this)[0].dataset.indexKey,!1});return a?(this.click(".btn-wanted-room[data-index-key="+a+"]"),this.waitUntilVisible(".btn-usual-join").then(function(){this.click(".btn-usual-join");return this.waitUntilVisible(".btn-usual-ok")}.bind(this)).then(function(){this.click(".btn-usual-ok");return this.sleep(1)}.bind(this))):this.sleep(1)}.bind(this)).then(function(){this.click(".btn-refresh-list");
return this.sleep(1)}.bind(this)).then(function(){return this.waitUntilInvisible("#loading")}.bind(this)).then(function(){this["_handle_coopraid/offer"]()}.bind(this))}};