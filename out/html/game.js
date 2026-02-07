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
window.enableGrayMode = function() {
    window.dendryUI.gray_mode = true;
    document.body.classList.add('gray-mode');
    window.dendryUI.saveSettings();
};
window.disableGrayMode = function() {
    window.dendryUI.gray_mode = false;
    document.body.classList.remove('gray-mode');
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
    if (window.dendryUI.gray_mode) {
        $('#gray_on')[0].checked = true;
    } else {
        $('#gray_no')[0].checked = true;
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

        if (window.dendryUI.gray_mode) {
        document.body.classList.add('gray-mode');
    }
  };

}());

var Q = window.dendryUI.dendryEngine.state.qualities;

function new_hire() {

var Q = window.dendryUI.dendryEngine.state.qualities;


if (Q.resources > 0) {

Q.director_pointer = Math.floor( Math.random() * Q.director_a.length);

    if (Q.ye_path == "unpromoted") {
        Q.director_pointer = Q.director_a.indexOf('Kanye West')
    }

Q.director_s = Q.director_a[Q.director_pointer];

Q.director_type = Math.floor( Math.random() * 3) + 1;

Q.resources -= 1;

window.changeTab('status.Targets', 'Targets', 'left');

} else {

alert('Broke');

}

}

function promote_kanye() {

var Q = window.dendryUI.dendryEngine.state.qualities;


Q.director_actions = 1;

Q.ye_path = "yes";
    side_bar = document.getElementById("stats_sidebar_right");
    side_bar.style.display = "block";
document.getElementById("kanye").style.display="block";
window.changeTab('status_right.kanye', 'kanye', 'right');

} 

function infiltrate_army() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.reichswehr_loyalty += 0.05;

Q.kanye_actions_timer = 6;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function indoctrinate_police() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.prussian_police_loyalty += 0.05;

Q.kanye_actions_timer = 6;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function discipline_interior_police() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.interior_police_loyalty += 0.05;


Q.kanye_actions_timer = 6;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function album_funds() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.resources += 6;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function export_globally() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.foreign_investment += 1;
Q.economic_stability +=5;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function country_tour() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.left_dissent -= 25;
Q.center_dissent -= 25;
Q.labor_dissent -= 25;
Q.reformist_dissent -= 25;
Q.neorevisionist_dissent -= 25;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function nuke_sa() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.sa_strength /= 2;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}



function nuke_sh() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.sh_strength /= 2;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function nuke_rfb() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.rfb_strength /= 2;


Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function ye_convert() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.ye_convert = 1;
Q.month_actions +=1;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function ye_concordat() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.ye_concordat = 1;

Q.month_actions +=1;

Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}

function ye_zentrum() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.z_relation += 25;

Q.month_actions +=1;

Q.special_kanye_actions = 0;

window.changeTab('status_right.kanye', 'kanye', 'right');

  

}


function fund_kanye() {

var Q = window.dendryUI.dendryEngine.state.qualities;

if (Q.resources > 0) {
    Q.album_funding +=1;

Q.resources -=1;
}

window.changeTab('status_right.album', 'album', 'right');

  

}

function album_menu() {

var Q = window.dendryUI.dendryEngine.state.qualities;


Q.director_actions = 1;

window.changeTab('status_right.album', 'album', 'right');

}



function director_actions() {

var Q = window.dendryUI.dendryEngine.state.qualities;


Q.director_actions = 1;

window.changeTab('status.Actions', 'Actions', 'left');

}

function rb_actions() {
var Q = window.dendryUI.dendryEngine.state.qualities;

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

function purge() {

var Q = window.dendryUI.dendryEngine.state.qualities;

Q.interior_police_loyalty += 0.1;

Q.prussian_police_loyalty += 0.1;

if (Q.plotMap[Q.plot_target]) {

Q[Q.plotMap[Q.plot_target]] -= Q.plot_strength * 3

}

Q.director_actions_timer = 3;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

  

}

function rush() {

var Q = window.dendryUI.dendryEngine.state.qualities;

if (Q.loyalty_decay < 0.04) {

Q.loyalty_decay += 0.01;

}

Q.interior_police_loyalty -= 0.1;

Q.prussian_police_loyalty -= 0.1;

if (Q.plotMap[Q.plot_target]) {

Q[Q.plotMap[Q.plot_target]] += Q.plot_strength * 3

}

Q.director_actions_timer = 3;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

  

}

  

function train_spies() {
var Q = window.dendryUI.dendryEngine.state.qualities;

if (Q.loyalty_decay > 0) {

Q.loyalty_decay -= 0.01;

}

if (Q.spy_network < 9) {

Q.spy_network += 3;

}

  

if (Q.assassination_partners == "Spies") {Q.plot_strength = Q.spy_network};

Q.director_actions_timer = 12;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

}

  

function train_police() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.prussian_police_strength += 10;

Q.prussian_police_loyalty += 0.05;

Q.director_actions_timer = 12;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

}

  

function joke() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.coup_progress = 99;

Q.month_actions += 1;

Q.director_actions_timer = 12;

window.changeTab('status.Actions', 'Actions', 'left')

}

  

function purge2() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.interior_police_loyalty += 0.1;

Q.prussian_police_loyalty += 0.1;

Q.plot_strength /= 2;

Q.director_actions_timer = 3;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

  

}

  

function rush2() {
var Q = window.dendryUI.dendryEngine.state.qualities;

if (Q.loyalty_decay < 0.04) {

Q.loyalty_decay += 0.01;

}

Q.interior_police_loyalty -= 0.1;

Q.prussian_police_loyalty -= 0.1;

Q.plot_strength *= 2;

Q.director_actions_timer = 3;

Q.month_actions += 1;

window.changeTab('status.Actions', 'Actions', 'left')

  

}

  

function dissent_reduction() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.rb_actions_timer = 3;

  

if (Q.rb_leader == "otto horsing") {

Q.rb_dissent = Math.max(0, Q.rb_dissent - 33);

} else if (Q.rb_leader == "karl holtermann") {

Q.rb_dissent = Math.max(0, Q.rb_dissent - 15);

}

  

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function republic_unity() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.rb_actions_timer = 3;

  

if (Q.rb_leader == "otto horsing") {

Q.rb_passive += 3;

} else if (Q.rb_leader == "karl holtermann") {

    Q.rb_passive += 6;

}

  

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function hiderb() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.hiding = 1;

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function showrb() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.hiding = 0;

window.changeTab('status_right.Actions_rb', 'Actions_rb', 'right');

}

  

function bruning() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.kpd_party_leader = "Conciliators";
Q.kpd_relation = 100;
Q.left_strength = 60;
Q.bruning_plot = "successful"

}

  

function hjalmar() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.hjalmar_plot = "successful"

}

  

function ViolenceAddon(whichSide, violenceAmt) {
var Q = window.dendryUI.dendryEngine.state.qualities;

  
let old_violence = Q.violence_level;

Q.violence_add_on += violenceAmt;

d['violence_perceived_addon_' + whichSide] += violenceAmt;

  

}

function AddRightStrength(saMult, shMult) {
var Q = window.dendryUI.dendryEngine.state.qualities;

    Q.sa_strength += (Q.violence_timer * saMult) * Q.violenceMultiplier;
    Q.sh_strength += (Q.violence_timer * shMult) * Q.violenceMultiplier;
}

function unity_focus() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.united_focus = "unity"
document.getElementById('status_right_focus').innerHTML = "We are focusing on uniting the RFB and Reichsbanner as a proper united front.";

}

function outreach_focus() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.united_focus = "outreach"
document.getElementById('status_right_focus').innerHTML = "We are reaching out to the leftwing of the Z and DDP.";


}

function sympathy_focus() {
var Q = window.dendryUI.dendryEngine.state.qualities;

Q.united_focus = "sympathy"
document.getElementById('status_right_focus').innerHTML = "We are spreading socialist sympathy within the army.";

}

function investigation_menu() {
document.getElementById('display-container-violence').innerHTML  ="";

}

function violence_menu() {
  document.getElementById('display-container-violence').innerHTML = `
    <h1>Balance of Power</h1>

    <div class="balance-container">
      <div class="faction">
        The Far Left:
        <div style="margin-top: auto;">${Q.far_left_strength}%</div>
      </div>

      <div class="faction">
        The Republic:
        <div>[+ weimar_strength +]%</div>
      </div>

      <div class="faction">
        The Far Right:
        <div>[+ far_right_strength +]%</div>
      </div>
    </div>

    <h1>We have [+ violence_timer +] months to crush the paramilitaries</h1>

    <div class="face-status-container">
      Violence Level : [+ violence_level +]%
    </div>
  `;

}