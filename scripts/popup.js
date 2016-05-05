'use strict';

var Popup = {
  start: function() {
    this.initSkills();
    this.initQuests();
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
    });
  },
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


