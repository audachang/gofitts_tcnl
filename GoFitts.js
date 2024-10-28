/**************** 
 * Gofitts *
 ****************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'GoFitts';  // from the Builder filename that created this script
let expInfo = {
    '身分證字號': '',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from experiment_code
// Experiment Settings
const HIGHLIGHT_COLOR = "#CCCCFF";
const NORMAL_COLOR = "#FFFFFF";
const DWELLED_COLOR = "#F5EF42";
const LINE_COLOR = "#6A6A6A";

const TEST_MOUSE_TARGET_COUNT = 4;
const TEST_MOUSE_PARAMETERS = [[700, 40]];

const DWELL_TIME_SECS = 0.5;

const TEST_TARGET_COUNT = 15;
const TEST_IDS = [6.32, 6.32];

const PROD_TARGET_COUNT = 15;
const PROD_IDS = [3.75, 4.32, 4.75, 5.32, 5.75, 6.32];

const TEST_MODE = true;

// input: id, output: [a, w]

var w;
var a;
function generate_parameters(id) {
    const coef = (Math.pow(2, id) - 1) / 2;
    const w_ub = Math.floor(960 / (2 + coef));
    w = util.randint(20, w_ub);
    a = coef * w;
    return [a, w, id];
}

const TEST_PARAMETERS = [];
const PROD_PARAMETERS = [];

// fill parameters
for (let id of TEST_IDS) {
    TEST_PARAMETERS.push(generate_parameters(id));
}
for (let id of PROD_IDS) {
    PROD_PARAMETERS.push(generate_parameters(id));
}

var target_c = TEST_MODE ? TEST_TARGET_COUNT : PROD_TARGET_COUNT;
var parameters = TEST_MODE ? TEST_PARAMETERS : PROD_PARAMETERS;

// for loop variables
const n_seqs = TEST_MODE ? TEST_PARAMETERS.length : PROD_PARAMETERS.length;
const n_trials = TEST_MODE ? TEST_TARGET_COUNT : PROD_TARGET_COUNT;

// variables that needs to be referenced else where
var targets = [];
var target_order = [];
var current_target = 0;

var target_w = 0;
var target_a = 0;
var target_id = 0;
var retry = 999;

// trial targets (object)
var from_t, to_t;


function is_in_target(x, y, target_idx) {
    if (target_idx >= 0 && target_idx < target_c) {
        let tx, ty;
        [tx, ty] = targets[target_order[target_idx]].pos;
        return ((Math.pow((x - tx), 2) + Math.pow((y - ty), 2)) <= Math.pow(target_w / 2, 2));
    }
    return false;
}

// manually add expInfo
util.addInfoFromUrl(expInfo);

var timeStr = (new Date()).toISOString();
// The target that cursor currently is in, -1 = no target
var cursor_in_target = -1;
var enter_timestamp = 0;

// on leave

var cursor_in_target;
var enter_timestamp;
var first_leave;
function on_leave_target() {
    console.log("left target", cursor_in_target);
    
    // unpaint
    const target = targets[target_order[current_target]];
    target.fillColor = HIGHLIGHT_COLOR;
    target.draw();
    
    cursor_in_target = -1;
    // reset dwell time
    enter_timestamp = 0;
    
    if (first_leave) {
        psychoJS.experiment.addData('leave_time', mouse.mouseClock.getTime());
        console.log("first leave target");
        first_leave = false;
    }
}

// on enter

function on_enter_target(target_idx) {
    console.log("entered target", target_idx);

    cursor_in_target = target_idx;
    
    // paint
    const target = targets[target_order[cursor_in_target]];
    target.fillColor = DWELLED_COLOR;
    target.draw();
    
    enter_timestamp = mouse.mouseClock.getTime();
    psychoJS.experiment.addData('enter_time', mouse.mouseClock.getTime());
}
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([1.0, 1.0, 1.0]),
  units: 'pix',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(welcomeRoutineBegin());
flowScheduler.add(welcomeRoutineEachFrame());
flowScheduler.add(welcomeRoutineEnd());
const retry_testingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(retry_testingLoopBegin(retry_testingLoopScheduler));
flowScheduler.add(retry_testingLoopScheduler);
flowScheduler.add(retry_testingLoopEnd);



flowScheduler.add(initRoutineBegin());
flowScheduler.add(initRoutineEachFrame());
flowScheduler.add(initRoutineEnd());
const sequence_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(sequence_loopLoopBegin(sequence_loopLoopScheduler));
flowScheduler.add(sequence_loopLoopScheduler);
flowScheduler.add(sequence_loopLoopEnd);





flowScheduler.add(endRoutineBegin());
flowScheduler.add(endRoutineEachFrame());
flowScheduler.add(endRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'saving.jpg', 'path': 'saving.jpg'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.2.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["\u8eab\u5206\u8b49\u5b57\u865f"]}_${expName}_${timeStr}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var welcomeClock;
var welcome_text;
var welcome_confirm;
var test_mouseClock;
var mouse_2;
var test_instruction_text;
var confirmationClock;
var test_confirm_text;
var test_confirm;
var initClock;
var text;
var key_resp;
var sequence_startClock;
var seq_text;
var seq_start_confirm;
var trialClock;
var mouse;
var endClock;
var image;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  welcome_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_text',
    text: '歡迎參加目標點擊作業！\n\n本實驗需由全螢幕進行，請勿按 Esc 離開全螢幕\n\n實驗進行時請您快速又準確地移動滑鼠游標至紫色圓圈中\n\n開始進行作業前，先確認您能順利地操作滑鼠\n\n請按 Enter 鍵繼續\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 40.0,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  welcome_confirm = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "test_mouse"
  test_mouseClock = new util.Clock();
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  test_instruction_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_instruction_text',
    text: '請移動滑鼠游標，\n分別到上下左右四個圓圈範圍內\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 40.0,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "confirmation"
  confirmationClock = new util.Clock();
  test_confirm_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_confirm_text',
    text: '您剛才能夠順利操作滑鼠點擊四個目標圓圈嗎？\n如果不行的話，請調整桌面上滑鼠的操作空間，\n以及您使用滑鼠的姿勢，讓您可以順利地操作。\n\n若您已經可以順利操作，請按Enter鍵繼續\n若您需要調整滑鼠及姿勢，請按空白鍵重試',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 40.0,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  test_confirm = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "init"
  initClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '接下來我們要開始進行作業，一共有六個段落\n\n作業進行時請您快速又準確地移動滑鼠游標至紫色圓圈中\n\n移動至紫色圓圈後無需按滑鼠左鍵\n\n請按 Enter 鍵繼續\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 40.0,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "sequence_start"
  sequence_startClock = new util.Clock();
  seq_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'seq_text',
    text: '按下Enter鍵開始',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 40.0,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  seq_start_confirm = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "end"
  endClock = new util.Clock();
  image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image', units : undefined, 
    image : 'saving.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 80], size : [1086, 558],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _welcome_confirm_allKeys;
var welcomeComponents;
function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    welcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    welcome_confirm.keys = undefined;
    welcome_confirm.rt = undefined;
    _welcome_confirm_allKeys = [];
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(welcome_text);
    welcomeComponents.push(welcome_confirm);
    
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *welcome_text* updates
    if (t >= 0.0 && welcome_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_text.tStart = t;  // (not accounting for frame time here)
      welcome_text.frameNStart = frameN;  // exact frame index
      
      welcome_text.setAutoDraw(true);
    }
    
    
    // *welcome_confirm* updates
    if (t >= 0.0 && welcome_confirm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_confirm.tStart = t;  // (not accounting for frame time here)
      welcome_confirm.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { welcome_confirm.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { welcome_confirm.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { welcome_confirm.clearEvents(); });
    }
    
    if (welcome_confirm.status === PsychoJS.Status.STARTED) {
      let theseKeys = welcome_confirm.getKeys({keyList: ['return'], waitRelease: false});
      _welcome_confirm_allKeys = _welcome_confirm_allKeys.concat(theseKeys);
      if (_welcome_confirm_allKeys.length > 0) {
        welcome_confirm.keys = _welcome_confirm_allKeys[_welcome_confirm_allKeys.length - 1].name;  // just the last key pressed
        welcome_confirm.rt = _welcome_confirm_allKeys[_welcome_confirm_allKeys.length - 1].rt;
        welcome_confirm.duration = _welcome_confirm_allKeys[_welcome_confirm_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    for (const thisComponent of welcomeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    welcome_confirm.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var retry_testing;
function retry_testingLoopBegin(retry_testingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    retry_testing = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1000, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'retry_testing'
    });
    psychoJS.experiment.addLoop(retry_testing); // add the loop to the experiment
    currentLoop = retry_testing;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisRetry_testing of retry_testing) {
      snapshot = retry_testing.getSnapshot();
      retry_testingLoopScheduler.add(importConditions(snapshot));
      retry_testingLoopScheduler.add(test_mouseRoutineBegin(snapshot));
      retry_testingLoopScheduler.add(test_mouseRoutineEachFrame());
      retry_testingLoopScheduler.add(test_mouseRoutineEnd(snapshot));
      retry_testingLoopScheduler.add(confirmationRoutineBegin(snapshot));
      retry_testingLoopScheduler.add(confirmationRoutineEachFrame());
      retry_testingLoopScheduler.add(confirmationRoutineEnd(snapshot));
      retry_testingLoopScheduler.add(retry_testingLoopEndIteration(retry_testingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function retry_testingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(retry_testing);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function retry_testingLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var sequence_loop;
function sequence_loopLoopBegin(sequence_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    sequence_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_seqs, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'sequence_loop'
    });
    psychoJS.experiment.addLoop(sequence_loop); // add the loop to the experiment
    currentLoop = sequence_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisSequence_loop of sequence_loop) {
      snapshot = sequence_loop.getSnapshot();
      sequence_loopLoopScheduler.add(importConditions(snapshot));
      sequence_loopLoopScheduler.add(sequence_startRoutineBegin(snapshot));
      sequence_loopLoopScheduler.add(sequence_startRoutineEachFrame());
      sequence_loopLoopScheduler.add(sequence_startRoutineEnd(snapshot));
      const trial_loopLoopScheduler = new Scheduler(psychoJS);
      sequence_loopLoopScheduler.add(trial_loopLoopBegin(trial_loopLoopScheduler, snapshot));
      sequence_loopLoopScheduler.add(trial_loopLoopScheduler);
      sequence_loopLoopScheduler.add(trial_loopLoopEnd);
      sequence_loopLoopScheduler.add(sequence_loopLoopEndIteration(sequence_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trial_loop;
function trial_loopLoopBegin(trial_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trial_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_trials, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trial_loop'
    });
    psychoJS.experiment.addLoop(trial_loop); // add the loop to the experiment
    currentLoop = trial_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_loop of trial_loop) {
      snapshot = trial_loop.getSnapshot();
      trial_loopLoopScheduler.add(importConditions(snapshot));
      trial_loopLoopScheduler.add(trialRoutineBegin(snapshot));
      trial_loopLoopScheduler.add(trialRoutineEachFrame());
      trial_loopLoopScheduler.add(trialRoutineEnd(snapshot));
      trial_loopLoopScheduler.add(trial_loopLoopEndIteration(trial_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trial_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trial_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trial_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function sequence_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(sequence_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function sequence_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var target_c;
var parameters;
var targets;
var current_target;
var target_order;
var gotValidClick;
var test_mouseComponents;
function test_mouseRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'test_mouse' ---
    t = 0;
    test_mouseClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from experiment_code
    target_c = TEST_MOUSE_TARGET_COUNT;
    parameters = TEST_MOUSE_PARAMETERS;
    
    mouse.getPos();
    [target_a, target_w, target_id] = parameters[0];
    
    // Re-initalization
    targets = [];
    current_target = 0;
    target_order = [];
    
    // Add circle
    for (var i, _pj_c = 0, _pj_a = util.range(target_c), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        let x = ((target_a / 2) * Math.cos(((2.0 * pi) * (i / target_c))));
        let y = ((target_a / 2) * Math.sin(((2.0 * pi) * (i / target_c))));
        let target = new visual.Polygon({"win": psychoJS.window, "size": target_w, "pos": [x, y], "fillColor": "white", "lineWidth": 2, "lineColor": LINE_COLOR, "edges": 100});
        targets.push(target);
    }
    
    // Filling target order
    let idx = 0;
    while (idx < target_c) {
        target_order.push(idx);
        idx += 1;
    }
    // setup some python lists for storing info about the mouse_2
    gotValidClick = false; // until a click is received
    mouse_2.mouseClock.reset();
    // keep track of which components have finished
    test_mouseComponents = [];
    test_mouseComponents.push(mouse_2);
    test_mouseComponents.push(test_instruction_text);
    
    for (const thisComponent of test_mouseComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function test_mouseRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'test_mouse' ---
    // get current time
    t = test_mouseClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from experiment_code
    if (current_target != target_c) {
        for (var idx, _pj_c = 0, _pj_a = util.range(targets.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            idx = _pj_a[_pj_c];
            let target = targets[idx];
            if ((idx === target_order[current_target])) {
                target.fillColor = HIGHLIGHT_COLOR;
            } else {
                target.fillColor = NORMAL_COLOR;
            }
            target.draw();
        }
        if (mouse.mouseMoved()) {
            let [x, y] = mouse.getPos();
            if (is_in_target(x, y, current_target)) {
                if (current_target + 1 == target_c) {
                    continueRoutine = false;
                } else {
                    current_target += 1;
                }
            }
        }
    }
    
    
    // *test_instruction_text* updates
    if (t >= 0.0 && test_instruction_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_instruction_text.tStart = t;  // (not accounting for frame time here)
      test_instruction_text.frameNStart = frameN;  // exact frame index
      
      test_instruction_text.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of test_mouseComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function test_mouseRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'test_mouse' ---
    for (const thisComponent of test_mouseComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from experiment_code
    for (let target of targets) {
        target.hide();
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    // the Routine "test_mouse" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _test_confirm_allKeys;
var confirmationComponents;
function confirmationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'confirmation' ---
    t = 0;
    confirmationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    test_confirm.keys = undefined;
    test_confirm.rt = undefined;
    _test_confirm_allKeys = [];
    // keep track of which components have finished
    confirmationComponents = [];
    confirmationComponents.push(test_confirm_text);
    confirmationComponents.push(test_confirm);
    
    for (const thisComponent of confirmationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function confirmationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'confirmation' ---
    // get current time
    t = confirmationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_confirm_text* updates
    if (t >= 0.0 && test_confirm_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_confirm_text.tStart = t;  // (not accounting for frame time here)
      test_confirm_text.frameNStart = frameN;  // exact frame index
      
      test_confirm_text.setAutoDraw(true);
    }
    
    
    // *test_confirm* updates
    if (t >= 0.0 && test_confirm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_confirm.tStart = t;  // (not accounting for frame time here)
      test_confirm.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { test_confirm.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { test_confirm.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { test_confirm.clearEvents(); });
    }
    
    if (test_confirm.status === PsychoJS.Status.STARTED) {
      let theseKeys = test_confirm.getKeys({keyList: ['return', 'space'], waitRelease: false});
      _test_confirm_allKeys = _test_confirm_allKeys.concat(theseKeys);
      if (_test_confirm_allKeys.length > 0) {
        test_confirm.keys = _test_confirm_allKeys[_test_confirm_allKeys.length - 1].name;  // just the last key pressed
        test_confirm.rt = _test_confirm_allKeys[_test_confirm_allKeys.length - 1].rt;
        test_confirm.duration = _test_confirm_allKeys[_test_confirm_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of confirmationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function confirmationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'confirmation' ---
    for (const thisComponent of confirmationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from retry
    if (test_confirm.keys === "return") {
        retry_testing.finished = true;
    }
    
    test_confirm.stop();
    // the Routine "confirmation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_allKeys;
var initComponents;
function initRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'init' ---
    t = 0;
    initClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    initComponents = [];
    initComponents.push(text);
    initComponents.push(key_resp);
    
    for (const thisComponent of initComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function initRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'init' ---
    // get current time
    t = initClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }
    
    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }
    
    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['return'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of initComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function initRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'init' ---
    for (const thisComponent of initComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    key_resp.stop();
    // the Routine "init" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _seq_start_confirm_allKeys;
var sequence_startComponents;
function sequence_startRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'sequence_start' ---
    t = 0;
    sequence_startClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_2
    if (TEST_MODE) {
        target_c = TEST_TARGET_COUNT;
        parameters = TEST_PARAMETERS;
    } else {
        target_c = PROD_TARGET_COUNT;
        parameters = PROD_PARAMETERS; 
    }
    
    util.shuffle(parameters);
    
    mouse.getPos();
    [target_a, target_w, target_id] = parameters.pop();
    if (TEST_MODE) {
        console.log("target_a:", target_a);
        console.log("target_w:", target_w);
        console.log("target_id:", target_id);
    }
    
    // Re-initalization
    targets = [];
    current_target = 0;
    target_order = [];
    
    // Add circle
    for (var i, _pj_c = 0, _pj_a = util.range(target_c), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        let x = ((target_a / 2) * Math.cos(((2.0 * pi) * (i / target_c))));
        let y = ((target_a / 2) * Math.sin(((2.0 * pi) * (i / target_c))));
        // size is the "diameter" of the circle, not radius
        let target = new visual.Polygon({"win": psychoJS.window, "size": target_w, "pos": [x, y], "fillColor": "white", "lineWidth": 2, "lineColor": LINE_COLOR, "edges": 100});
        targets.push(target);
    }
    
    // Filling target order
    let start = util.randint(0, (target_c - 1));
    const interval = Number.parseInt(((target_c + 1) / 2));
    let idx = 0;
    while ((idx < target_c)) {
        target_order.push((start % target_c));
        idx += 1;
        if ((idx < target_c)) {
            target_order.push(((start + interval) % target_c));
            idx += 1;
        }
        start += 1;
    }
    seq_start_confirm.keys = undefined;
    seq_start_confirm.rt = undefined;
    _seq_start_confirm_allKeys = [];
    // keep track of which components have finished
    sequence_startComponents = [];
    sequence_startComponents.push(seq_text);
    sequence_startComponents.push(seq_start_confirm);
    
    for (const thisComponent of sequence_startComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function sequence_startRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'sequence_start' ---
    // get current time
    t = sequence_startClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *seq_text* updates
    if (t >= 0.0 && seq_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      seq_text.tStart = t;  // (not accounting for frame time here)
      seq_text.frameNStart = frameN;  // exact frame index
      
      seq_text.setAutoDraw(true);
    }
    
    
    // *seq_start_confirm* updates
    if (t >= 0.0 && seq_start_confirm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      seq_start_confirm.tStart = t;  // (not accounting for frame time here)
      seq_start_confirm.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { seq_start_confirm.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { seq_start_confirm.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { seq_start_confirm.clearEvents(); });
    }
    
    if (seq_start_confirm.status === PsychoJS.Status.STARTED) {
      let theseKeys = seq_start_confirm.getKeys({keyList: ['return'], waitRelease: false});
      _seq_start_confirm_allKeys = _seq_start_confirm_allKeys.concat(theseKeys);
      if (_seq_start_confirm_allKeys.length > 0) {
        seq_start_confirm.keys = _seq_start_confirm_allKeys[_seq_start_confirm_allKeys.length - 1].name;  // just the last key pressed
        seq_start_confirm.rt = _seq_start_confirm_allKeys[_seq_start_confirm_allKeys.length - 1].rt;
        seq_start_confirm.duration = _seq_start_confirm_allKeys[_seq_start_confirm_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of sequence_startComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function sequence_startRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'sequence_start' ---
    for (const thisComponent of sequence_startComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    seq_start_confirm.stop();
    // the Routine "sequence_start" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var to_t;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code
    if (current_target == 0) {
        psychoJS.experiment.addData('from', [...mouse.getPos()]);
        // can't reset mouse position!
    } else {
        from_t = targets[target_order[current_target - 1]];
        psychoJS.experiment.addData('from', [...from_t.pos]);
    }
    
    for (var idx, _pj_c = 0, _pj_a = util.range(targets.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        idx = _pj_a[_pj_c];
        let target = targets[idx];
        if ((idx === target_order[current_target])) {
            target.fillColor = HIGHLIGHT_COLOR;
        } else {
            target.fillColor = NORMAL_COLOR;
        }
        target.draw();
    }
    
    // reset
    first_leave = true
    enter_timestamp = 0;
    
    to_t = targets[target_order[current_target]];
    psychoJS.experiment.addData('to', [...to_t.pos]);
    psychoJS.experiment.addData('w', target_w);
    psychoJS.experiment.addData('a', target_a);
    psychoJS.experiment.addData('id', target_id);
    
    psychoJS.experiment.addData('sequence_loop.thisN', sequence_loop.thisN);
    // setup some python lists for storing info about the mouse
    // current position of the mouse:
    mouse.x = [];
    mouse.y = [];
    mouse.leftButton = [];
    mouse.midButton = [];
    mouse.rightButton = [];
    mouse.time = [];
    gotValidClick = false; // until a click is received
    mouse.mouseClock.reset();
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(mouse);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
var _mouseXYs;
function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from code
    if (current_target != target_c) {
        // check dwell time
        if (enter_timestamp > 0) {
            const cur_timestamp = mouse.mouseClock.getTime();
            if (cur_timestamp - enter_timestamp > DWELL_TIME_SECS) {
                continueRoutine = false;
                console.log("next target")
            }
        }
    
        if (mouse.mouseMoved()) {
            let [x, y] = mouse.getPos();
            // enter
            if (cursor_in_target < 0 && is_in_target(x, y, current_target)) {
                on_enter_target(current_target);
            }
        
            // leave
            if (cursor_in_target >= 0 && !is_in_target(x, y, cursor_in_target)) {
                on_leave_target(cursor_in_target);
            }
        }
    }
    
    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse.getPressed();
      _mouseXYs = mouse.getPos();
      mouse.x.push(_mouseXYs[0]);
      mouse.y.push(_mouseXYs[1]);
      mouse.leftButton.push(_mouseButtons[0]);
      mouse.midButton.push(_mouseButtons[1]);
      mouse.rightButton.push(_mouseButtons[2]);
      mouse.time.push(mouse.mouseClock.getTime());
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from code
    if (current_target + 1 == target_c) {
        for (let target of targets) {
            target.hide();
        }
    }
    current_target += 1;
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouse.x', mouse.x);
    psychoJS.experiment.addData('mouse.y', mouse.y);
    psychoJS.experiment.addData('mouse.leftButton', mouse.leftButton);
    psychoJS.experiment.addData('mouse.midButton', mouse.midButton);
    psychoJS.experiment.addData('mouse.rightButton', mouse.rightButton);
    psychoJS.experiment.addData('mouse.time', mouse.time);
    
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var endComponents;
function endRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'end' ---
    t = 0;
    endClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(10.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    endComponents = [];
    endComponents.push(image);
    
    for (const thisComponent of endComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function endRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'end' ---
    // get current time
    t = endClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *image* updates
    if (t >= 0.0 && image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image.tStart = t;  // (not accounting for frame time here)
      image.frameNStart = frameN;  // exact frame index
      
      image.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of endComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'end' ---
    for (const thisComponent of endComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


var message;
async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  // Run 'End Experiment' code from code_2
  message = "實驗已結束，感謝您的參與"
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
