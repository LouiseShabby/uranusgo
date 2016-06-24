'use strict';

var Popup = {
  start: function() {
    this.initSkills();
    this.initQuests();
	//this.setCheckboxs(".ck",array);
    $('#timeStart').val(window.localStorage.getItem('timeStart'));
    $('#timeEnd').val(window.localStorage.getItem('timeEnd'));
	
    $('#quest-id').val(window.localStorage.getItem('quest-id'));
    $('#start').on('click', function() {
      $('#quest-id').trigger('change');
    });
    $('#stop').on('click', function() {
      $('#quest-id').val('').trigger('change');
    });
	$('#select-id').val(window.localStorage.getItem('select-id'));
    $('#OK').on('click', function() {
      $('#select-id').trigger('change');
    });	
	$('#seachEx-1').val(window.localStorage.getItem('seachEx-1'));
	
	$('input[name="reloadtime"]').val(window.localStorage.getItem('reloadtime'));
	$('#setreloadtime-ok').on('click', function() {
      $('#reloadtime').trigger('change');
    });	
    $('input[name="ptcoopraid"]').val([localStorage["ptcoopraid"]]);
	$('input[name="ptcoopraid"]').change(function() {
		localStorage["ptcoopraid"] = $('input[name="ptcoopraid"]:checked').val();
	});
	
	$('input[name="speed"]').val([localStorage["speed"]]);
	$('input[name="speed"]').change(function() {
		localStorage["speed"] = $('input[name="speed"]:checked').val();
	});
	
	$('input[name="ptZokusei"]').val([localStorage["ptZokusei"]]);
	$('input[name="ptZokusei"]').change(function() {
		localStorage["ptZokusei"] = $('input[name="ptZokusei"]:checked').val();
	});
	$('input[name="ptSearchType"]').val([localStorage["ptSearchType"]]);
	$('input[name="ptSearchType"]').change(function() {
		localStorage["ptSearchType"] = $('input[name="ptSearchType"]:checked').val();
	});
	$('#skill-1-1').val(window.localStorage.getItem('skill-1-1'));
	$('#skill-1-2').val(window.localStorage.getItem('skill-1-2'));
	$('#skill-1-3').val(window.localStorage.getItem('skill-1-3'));
	$('#skill-1-4').val(window.localStorage.getItem('skill-1-4'));
	
	$('#skill-2-1').val(window.localStorage.getItem('skill-2-1'));
	$('#skill-2-2').val(window.localStorage.getItem('skill-2-2'));
	$('#skill-2-3').val(window.localStorage.getItem('skill-2-3'));
	$('#skill-2-4').val(window.localStorage.getItem('skill-2-4'));
	
	$('#skill-3-1').val(window.localStorage.getItem('skill-3-1'));
	$('#skill-3-2').val(window.localStorage.getItem('skill-3-2'));
	$('#skill-3-3').val(window.localStorage.getItem('skill-3-3'));
	$('#skill-3-4').val(window.localStorage.getItem('skill-3-4'));
	
	$('#skill-4-1').val(window.localStorage.getItem('skill-4-1'));
	$('#skill-4-2').val(window.localStorage.getItem('skill-4-2'));
	$('#skill-4-3').val(window.localStorage.getItem('skill-4-3'));
	$('#skill-4-4').val(window.localStorage.getItem('skill-4-4'));
	
	$('#summon-1').val(window.localStorage.getItem('summon-1'));
	$('#summon-2').val(window.localStorage.getItem('summon-2'));
	$('#summon-3').val(window.localStorage.getItem('summon-3'));
	$('#summon-4').val(window.localStorage.getItem('summon-4'));
	$('#summon-5').val(window.localStorage.getItem('summon-5'));
	$('#summon-6').val(window.localStorage.getItem('summon-6'));
	
	$('#seachTwitter').val(window.localStorage.getItem('seachTwitter'));
	$('#seachEx-1').val(window.localStorage.getItem('seachEx-1'));
	$('#seachEx-2').val(window.localStorage.getItem('seachEx-2'));
	$('#seachEx-3').val(window.localStorage.getItem('seachEx-3'));	
	$('#seachEx-4').val(window.localStorage.getItem('seachEx-4'));
	$('#seachEx-5').val(window.localStorage.getItem('seachEx-5'));
	$('#seachEx-6').val(window.localStorage.getItem('seachEx-6'));	
	$('#saveList').on('click', function() {
		$("#seachTwitter").trigger('change');
		for(var i=1;i<=6;i++){
			    $("#seachEx-"+i).trigger('change');
	}});	
	$('#saveList').on('click', function() {
		for(var i=1;i<=4;i++){
			for(var j=1;j<=4;j++){
			   $("#skill-"+i+"-"+j).trigger('change');
			}}
		for(var i=1;i<=6;i++){
			    $("#summon-"+i).trigger('change');
		}
	});
    $('form').on('click', '[data-quest-id]', function() {
      $('#quest-id').val($(this)[0].dataset.questId).trigger('change');
    });
    $('form').on('change', 'input[type=checkbox]', function() {
      console.log($(this).attr('name'), $(this).is(":checked"));
      window.localStorage.setItem($(this).attr('name'), $(this).is(":checked"));
    });
    $('form').on('change', 'input[type=text]', function() {
      console.log($(this).attr('name'), $(this).val());
      window.localStorage.setItem($(this).attr('name'), $(this).val());
    });
    $('form input[type=checkbox]').each(function() {
      if (window.localStorage.getItem($(this).attr('name')) === 'true') {
        $(this).attr('checked', true);
      }
    });/*
	$("btnsub").on('click', function() {
        var newResult=[];
        jQuery("input[type=checkbox][name=checkbox]").each(function(index){
			jQuery(this).trigger('change');
            if(jQuery(this).attr("checked")=="checked")
                newResult[index]= 1;
            else
                newResult[index]= 0;
        });
		
		window.localStorage["result"]= newResult.toString();
	});	*/
},
/*
   setCheckboxs: function(CKname,array) {
    $(CKname).each(function (index, ele) {
        if (array[index] == "1") {
            $(ele).attr("checked", true);
        }
        else {
            $(ele).attr("checked", false);
        }
        $(ele).click(function () {
            if ($(ele).attr("checked") == "checked") {
                $(ele).attr("checked", false);
            }
            else {
                $(ele).attr("checked", true);
            }
        });
    });
  },*/
  initQuests: function() {
    var quests = window.localStorage.getItem('quest-database');
    if (!quests) {
      return;
    }
    quests = JSON.parse(quests);
    for (var id in quests) {
      if (quests[id].hash) {
        $('#quest-history').append('<button class="btn btn-default" type="button" data-quest-id="'+quests[id].hash+'"><img src="'+quests[id].thumb+'" />'+(quests[id].questName || quests[id].hash)+'</button')
      }
    }
  },
  initSkills: function() {
    var container = document.getElementById('skill-list');
    chrome.extension.sendRequest({type: 'request_abilities'}, function(abilities) {
      abilities.forEach(function(ability) {
        var charPos = Number(ability.position[0]);
        var skillPos = Number(ability.position[1]);
        if (!$('div[pos="'+charPos+'"]').length) {
          $(container).append('<div pos="'+charPos+'"></div>');
        }
        var checked = '';
        if (window.localStorage.getItem(ability.name) !== 'false') {
          checked = 'checked';
        }
        $('div[pos="'+charPos+'"]').append('<span><input type="checkbox" name="'+ability.name+'" '+checked+' /><img alt="'+ability.name+':'+ability.text+'" src="http://gbf.game-a.mbga.jp/assets/img/sp/ui/icon/ability/m/'+ability.icon+'.png" /></span>');
      });
    });
  }
};
document.addEventListener('DOMContentLoaded', function () {
  Popup.start();

});


