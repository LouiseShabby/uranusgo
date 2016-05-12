'use strict';


var App = {
  prefix: '-alive-gbf',
  start: function() {
    console.log('start!' + Date.now());
    this.abilities = [];
    chrome.extension.onRequest.addListener(this.onRequest.bind(this));
    window.addEventListener('storage', this);
    var self = this;
    chrome.runtime.onConnect.addListener(function(port) {
      console.log('connected');
      self.port = port;
      self.sync(window.localStorage);
    });
  },
  sync: function(message) {
    this.port.postMessage(message);
  },
  handleEvent: function(evt) {
    var newPref = {};
    newPref[evt.key] = evt.newValue;
    this.sync(newPref);
  },
  broadcast: function(message) {
    chrome.windows.getAll({populate: true}, function(windows) {
        var w,t;
        for (w=0; w<windows.length; w++) {
           for (t=0; t<windows[w].tabs.length; t++) {
              chrome.tabs.sendRequest(windows[w].tabs[t].id, message);
           }
        }
     });
  },
  onRequest: function(request, sender, sendResponse) {
    console.log(request);
    this['_handle_' + request.type](request, sender, sendResponse);
  },
  _handle_started: function(request, sender, sendResponse) {
    window.localStorage.setItem('enabled', true);
  },
  _handle_stopped: function(request, sender, sendResponse) {
    window.localStorage.setItem('enabled', false);
  },
  _handle_request_abilities: function(request, sender, sendResponse) {
    sendResponse(this.abilities);
  },
  _handle_hashchange: function(request) {
    switch (request.data) {
      case 'result':
      case 'result_multi':
        // Reset abilities when battle ended.
        this.onBattleEnd();
        break;
    }
  },
  onBattleEnd: function() {
    this.greenPotionCount = 0;
    this.bluePotionCount = 0;
    this.abilities = [];
  },
  _handle_abilities: function(request) {
    this.abilities = request.data;
  },
  _handle_reload: function(request, sender, sendResponse) {
  },
  _handle_localStorage: function(request) {
    // To be safe, only sync quest database here.
    var quests = request.data['quest-database'];
    console.log(quests);
    window.localStorage.setItem('quest-database', quests);
  },
  _handle_raid: function(request, sender, sendResponse) {
    // Create a simple text notification:
    var notification = new Notification(request.msg, {
      body: request.remaining,
      tag: 'Raid',
      icon: request.icon
    });
    this.raid.push(notification);
  },
  _handle_raids: function(request, sender, sendResponse) {
    var sorted = request.data.sort(function(a, b) {
      var aLv = Number(a.msg.split(' ')[0].replace('Lv', ''));
      var bLv = Number(b.msg.split(' ')[0].replace('Lv', ''));
      return aLv < bLv;
    });
    if (sorted.length > 0) {
      var topMost = sorted[0];
      var otherArray = [];
      for (var i = 0; i < sorted.length; i++) {
        otherArray.push({
          title: sorted[i].msg,
          message: sorted[i].remaining
        });
      }
      this.currentOptions = {
        title: topMost.msg,
        message: topMost.remaining,
        items: otherArray,
        type: 'list', // Which type of notification to display - https://developer.chrome.com/extensions/notifications#type-TemplateType
        iconUrl: topMost.icon// A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
      };
      if (!this.id) {
        this.id = chrome.notifications.create(this.currentOptions, function() {});
        chrome.notifications.onClosed.addListener(function(id, byUser) {
          console.log(id, byUser);
          if (!byUser) {
            chrome.notifications.update(this.id, this.currentOptions);
          }
        }.bind(this));
      } else {
        chrome.notifications.update(id, this.currentOptions);
      }
    }
  }
};


App.start();

