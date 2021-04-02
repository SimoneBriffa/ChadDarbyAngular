"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cricketCoach_1 = require("./cricketCoach");
var golfCoach_1 = require("./golfCoach");
var myCricketCoach = new cricketCoach_1.CricketCoach();
var myGolfCoach = new golfCoach_1.GolfCoach();
var theCoaches = [];
theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCoach);
for (var _i = 0, theCoaches_1 = theCoaches; _i < theCoaches_1.length; _i++) {
    var tempCoach = theCoaches_1[_i];
    console.log(tempCoach.getDailyWorkout());
}
