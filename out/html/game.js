(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;
    // Add your custom code here.

  };

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

  // the url is a link to game.json
  // TODO; 
  window.loadMod = function(url) {
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };


  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
  };

  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
  window.displayText = function(text) {
      return text;
  };

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  // TODO: have some code for tabbed sidebar browsing.
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.updateSidebarRight = function() {
    $('#qualities_right').empty();
    var scene = dendryUI.game.scenes[window.statusTabRight];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    $('#qualities_right').append(dendryUI.contentToHTML.convert(displayContent));
};

  window.changeTab = function(newTab, tabId, whichSidebar) {
    if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
        window.alert('Polls are not available in historical mode.');
        return;
    }
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';

    if (whichSidebar === 'right') {
        window.statusTabRight = newTab;
        window.updateSidebarRight();
    } else {
        window.statusTab = newTab;
        window.updateSidebar();
    }
};

  window.onDisplayContent = function() {
      window.updateSidebar();
      window.updateSidebarRight();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };

  window.justLoaded = true;
  window.statusTab = "status";
  window.statusTabRight = "status_right";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings();
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
    window.statusTab = "status";
    window.updateSidebar();
    window.statusTabRight = "status_right";
    window.updateSidebarRight();
  };

}());

var d = window.dendryUI.dendryEngine.state.qualities;

function new_hire() {

if (d.resources > 0) {

d.director_pointer = Math.floor( Math.random() * d.director_a.length);

d.director_s = d.director_a[d.director_pointer];

d.director_type = Math.floor( Math.random() * 3) + 1;

if (d.director_s == 'Kanye West') {

d.director_type = -1;

}

d.resources -= 1;

window.changeTab('status.Targets', 'Targets');

} else {

alert('Broke');

}

}

  

function director_actions() {

d.director_actions = 1;

window.changeTab('status.Actions', 'Actions')

}

function rb_actions() {

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

function purge() {

d.interior_police_loyalty += 0.1;

d.prussian_police_loyalty += 0.1;

if (d.plotMap[d.plot_target]) {

d[d.plotMap[d.plot_target]] -= d.plot_strength * 3

}

d.director_actions_timer = 3;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

  

}

function rush() {

if (d.loyalty_decay < 0.04) {

d.loyalty_decay += 0.01;

}

d.interior_police_loyalty -= 0.1;

d.prussian_police_loyalty -= 0.1;

if (d.plotMap[d.plot_target]) {

d[d.plotMap[d.plot_target]] += d.plot_strength * 3

}

d.director_actions_timer = 3;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

  

}

  

function train_spies() {

if (d.loyalty_decay > 0) {

d.loyalty_decay -= 0.01;

}

if (d.spy_network < 9) {

d.spy_network += 3;

}

  

if (d.assassination_partners == "Spies") {d.plot_strength = d.spy_network};

d.director_actions_timer = 12;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

}

  

function train_police() {

d.prussian_police_strength += 10;

d.prussian_police_loyalty += 0.05;

d.director_actions_timer = 12;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

}

  

function joke() {

d.coup_progress = 10;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

}

  

function purge2() {

d.interior_police_loyalty += 0.1;

d.prussian_police_loyalty += 0.1;

d.plot_strength /= 2;

d.director_actions_timer = 3;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

  

}

  

function rush2() {

if (d.loyalty_decay < 0.04) {

d.loyalty_decay += 0.01;

}

d.interior_police_loyalty -= 0.1;

d.prussian_police_loyalty -= 0.1;

d.plot_strength *= 2;

d.director_actions_timer = 3;

d.month_actions += 1;

window.changeTab('status.Actions', 'Actions')

  

}

  

function dissent_reduction() {

d.rb_actions_timer = 3;

  

if (d.rb_leader == "otto horsing") {

d.rb_dissent = Math.max(0, d.rb_dissent - 33);

} else if (d.rb_leader == "karl holtermann") {

d.rb_dissent = Math.max(0, d.rb_dissent - 15);

}

  

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function republic_unity() {

d.rb_actions_timer = 3;

  

if (d.rb_leader == "otto horsing") {

d.rb_passive += 3;

} else if (d.rb_leader == "karl holtermann") {

    d.rb_passive += 6;

}

  

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function hiderb() {

d.hiding = 1;

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function showrb() {

d.hiding = 0;

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function bruning() {

d.bruning_plot = "successful"

}

  

function hjalmar() {

d.hjalmar_plot = "successful"

}

  

function ViolenceAddon(whichSide, violenceAmt) {

  
let old_violence = d.violence_level;

d.violence_add_on += violenceAmt;

d['violence_perceived_addon_' + whichSide] += violenceAmt;

  

}