//// WALK ///////////////////////////
var poseWalk0 = {
  lleg: Math.PI/6,
  rleg: -Math.PI/6,
  larm: -Math.PI/6,
  rarm: Math.PI/6
}
var poseWalk1 = {
  lleg: -Math.PI/6,
  rleg: Math.PI/6,
  larm: Math.PI/6,
  rarm: -Math.PI/6
}
var keysWalk = [
  [0, poseWalk0],
  [0.5, poseWalk1],
  [1, poseWalk0]
];
var TWalk = 0.5;

//// STAND ///////////////////////////
var poseStand0 = { // stand
  lleg: 0,
  rleg: 0,
  larm: 0,
  rarm: 0
}
var poseStand1 = { // stand
  lleg: 0,
  rleg: 0,
  larm: 0,
  rarm: 0
}
var keysStand = [
  [0, poseStand0],
  [0.5, poseStand0],
  [1, poseStand1]
];
var TStand = 0.5; // any small amount


//// STAND-TO-WALK ///////////////////////////

var poseS2W0 = poseStand1; // end of stand
var poseS2W1 = {
  lleg: -Math.PI/6,
  rleg: Math.PI/40, // right leg stays still
  larm: Math.PI/6,
  rarm: -Math.PI/40
}
var poseS2W2 = poseWalk0; // beginning of walk
var keysS2W = [
  [0, poseS2W0],
  [0.5, poseS2W1],
  [1, poseS2W2]
];
var TS2W = 0.5;

//// WALK-TO-STAND ///////////////////////////

var poseW2S0 = { 
  lleg: 0,
  rleg: 0,
  larm: 0,
  rarm: 0
}
 // end of walk
var poseW2S1 = {
  lleg: Math.PI/40,
  rleg: -Math.PI/6, 
  larm: -Math.PI/6,
  rarm: Math.PI/40
}
var poseW2S2 = poseStand0; // beginning of walk
var keysW2S = [
  [0, poseW2S0],
  [0.5, poseStand0],
  [1, poseW2S2]
];
var TW2S = 0.5;


////////////////////////////////////////////////////////////
var count = 0;

function keyframeStand(t, T) { // periodic
  if(count >= 100){
     ts = 0;
     count = 0;
  }
  count += 1; 
  let keys = keysStand;
  var s = ((t - ts) % T) / T;
  
  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lleg * (1 - a) + keys[ii + 1][1].lleg * a,
            keys[ii][1].rleg * (1 - a) + keys[ii + 1][1].rleg * a,
            keys[ii][1].larm * (1 - a) + keys[ii + 1][1].larm * a,
            keys[ii][1].rarm * (1 - a) + keys[ii + 1][1].rarm * a 
  ];
  return intKey;
}

function keyframeS2W(t, T) {  // non-periodic
  if (t - ts > T) { // end of stand
    
    ts = t; // reset ts to start of walk
    walkState = "WALK"; 
    // end of S2W: return last frame
    return [poseS2W2.lleg, poseS2W2.rleg, poseS2W2.larm, poseS2W2.rarm];
  }

  // non-periodic stand-to-walk animation
  
  let keys = keysS2W;
  var s = (t - ts) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lleg * (1 - a) + keys[ii + 1][1].lleg * a,
            keys[ii][1].rleg * (1 - a) + keys[ii + 1][1].rleg * a,
            keys[ii][1].larm * (1 - a) + keys[ii + 1][1].larm * a,
            keys[ii][1].rarm * (1 - a) + keys[ii + 1][1].rarm * a 
  ];
  return intKey;
}

function keyframeWalk(t, T) { // walk; periodic
  
  let keys = keysWalk;
  var s = ((t - ts) % TWalk) / TWalk;
   
  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lleg * (1 - a) + keys[ii + 1][1].lleg * a,
            keys[ii][1].rleg * (1 - a) + keys[ii + 1][1].rleg * a,
            keys[ii][1].larm * (1 - a) + keys[ii + 1][1].larm * a,
            keys[ii][1].rarm * (1 - a) + keys[ii + 1][1].rarm * a 
  ];
  poseW2S0 = {lleg :intKey[0], rleg :intKey[1], larm: intKey[2], rarm: intKey[3]}

  return intKey;
}

function keyframeW2S(t, T) {  // non-periodic

  if (t - ts > T) { // end of walk
    console.log("11");
	ts = t; 
    walkState = 'STAND';
    flag1 = 0;
    // end of S2W: return last frame
    return [poseW2S2.lleg, poseW2S2.rleg, poseW2S2.larm, poseW2S2.rarm];
  }

  // non-periodic stand-to-walk animation
  
  let keys = keysW2S;
  keys[0][1] = poseW2S0;
  var s = (t - ts) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lleg * (1 - a) + keys[ii + 1][1].lleg * a,
            keys[ii][1].rleg * (1 - a) + keys[ii + 1][1].rleg * a,
            keys[ii][1].larm * (1 - a) + keys[ii + 1][1].larm * a,
            keys[ii][1].rarm * (1 - a) + keys[ii + 1][1].rarm * a 
  ];
  return intKey;
}