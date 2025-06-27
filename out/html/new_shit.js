var d = dendryUI.dendryEngine.state.qualities;

 function new_hire () {
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

function director_actions () {
   d.director_actions = 1;
   window.changeTab('status.Actions', 'Actions')
}
function purge () {
   d.interior_police_loyalty += 0.1;
   d.prussian_police_loyalty += 0.1;
if (d.plotMap[d.plot_target]) {
   d[d.plotMap[d.plot_target]] -= d.plot_strength * 3
}
   d.director_actions_timer = 3;
   d.month_actions += 1;
   window.changeTab('status.Actions', 'Actions')

}
function rush () {
   
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

function train_spies () {
   
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

function train_police () {
   d.prussian_police_strength += 10;
   d.prussian_police_loyalty += 0.05;
   d.director_actions_timer = 12;
   d.month_actions += 1;
   window.changeTab('status.Actions', 'Actions')
}

function joke () {
   d.coup_progress = 10;
   d.month_actions += 1;
   window.changeTab('status.Actions', 'Actions')
}

function purge2 () {
   d.interior_police_loyalty += 0.1;
   d.prussian_police_loyalty += 0.1;
   d.plot_strength /= 2;
   d.director_actions_timer = 3;
   d.month_actions += 1;
   window.changeTab('status.Actions', 'Actions')

}

function rush2 () {
   
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

function dissent_reduction () {
   //Make sure to say to the player that horsing is more effective dissent reduction
   d.rb_actions_timer = 3;
   if (d.rb_dissent > 25) {
   d.rb_dissent -= 25;
   } else {
   d.rb_dissent = 0;
   }
   window.changeTab('status_right.Actions_rb', 'Actions_rb');
}

function bruning () {
   d.bruning_plot = "successful"
}

function hjalmar () {
   d.hjalmar_plot = "successful"
}
