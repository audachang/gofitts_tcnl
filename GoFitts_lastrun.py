#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2022.1.4),
    on 七月 05, 2022, at 10:52
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

HIGHLIGHT_COLOR = "#CCCCFF"
NORMAL_COLOR = "#FFFFFF"
LINE_COLOR = "#6A6A6A"

target_c = 15
param_w = [40]
param_a = [200]
parameters = []

for a in param_a:
    for w in param_w:
        parameters.append((a, w))
        
shuffle(parameters)
n_seqs = len(parameters)
n_trials = target_c

targets = []
target_order = []
current_target = 0

target_w = 0
target_a = 0

def is_in_target(x, y):
    if current_target == target_c: return False
    tx, ty = targets[target_order[current_target]].pos
    return (x - tx) ** 2 + (y - ty) ** 2 <= (target_w // 2) ** 2


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2022.1.4'
expName = 'GoFitts'  # from the Builder filename that created this script
expInfo = {
    'participant': '',
    'session': '001',
}
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='D:\\CSIE\\ACL\\GoFitts\\GoFitts_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# Setup the Window
win = visual.Window(
    size=[1536, 864], fullscr=True, screen=0, 
    winType='pyglet', allowGUI=False, allowStencil=False,
    monitor='testMonitor', color=[1.0000, 1.0000, 1.0000], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='pix')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# Setup ioHub
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# Initialize components for Routine "init"
initClock = core.Clock()
text = visual.TextStim(win=win, name='text',
    text='This is the instruction scene.\n\nWork in progress.\n\nPress Enter to continue.',
    font='Open Sans',
    pos=(0, 0), height=40.0, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_resp = keyboard.Keyboard()

# Initialize components for Routine "sequence_start"
sequence_startClock = core.Clock()
text_2 = visual.TextStim(win=win, name='text_2',
    text='Press Enter to continue',
    font='Open Sans',
    pos=(0, 0), height=40.0, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
key_resp_3 = keyboard.Keyboard()

# Initialize components for Routine "trial"
trialClock = core.Clock()
mouse = event.Mouse(win=win)
x, y = [None, None]
mouse.mouseClock = core.Clock()
key_resp_2 = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "init"-------
continueRoutine = True
# update component parameters for each repeat
key_resp.keys = []
key_resp.rt = []
_key_resp_allKeys = []
# keep track of which components have finished
initComponents = [text, key_resp]
for thisComponent in initComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
initClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "init"-------
while continueRoutine:
    # get current time
    t = initClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=initClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text* updates
    if text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text.frameNStart = frameN  # exact frame index
        text.tStart = t  # local t and not account for scr refresh
        text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text, 'tStartRefresh')  # time at next scr refresh
        text.setAutoDraw(True)
    
    # *key_resp* updates
    waitOnFlip = False
    if key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp.frameNStart = frameN  # exact frame index
        key_resp.tStart = t  # local t and not account for scr refresh
        key_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp, 'tStartRefresh')  # time at next scr refresh
        key_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp.status == STARTED and not waitOnFlip:
        theseKeys = key_resp.getKeys(keyList=['return'], waitRelease=False)
        _key_resp_allKeys.extend(theseKeys)
        if len(_key_resp_allKeys):
            key_resp.keys = _key_resp_allKeys[-1].name  # just the last key pressed
            key_resp.rt = _key_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in initComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "init"-------
for thisComponent in initComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('text.started', text.tStartRefresh)
thisExp.addData('text.stopped', text.tStopRefresh)
# check responses
if key_resp.keys in ['', [], None]:  # No response was made
    key_resp.keys = None
thisExp.addData('key_resp.keys',key_resp.keys)
if key_resp.keys != None:  # we had a response
    thisExp.addData('key_resp.rt', key_resp.rt)
thisExp.addData('key_resp.started', key_resp.tStartRefresh)
thisExp.addData('key_resp.stopped', key_resp.tStopRefresh)
thisExp.nextEntry()
# the Routine "init" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
sequence_loop = data.TrialHandler(nReps=n_seqs, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='sequence_loop')
thisExp.addLoop(sequence_loop)  # add the loop to the experiment
thisSequence_loop = sequence_loop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisSequence_loop.rgb)
if thisSequence_loop != None:
    for paramName in thisSequence_loop:
        exec('{} = thisSequence_loop[paramName]'.format(paramName))

for thisSequence_loop in sequence_loop:
    currentLoop = sequence_loop
    # abbreviate parameter names if possible (e.g. rgb = thisSequence_loop.rgb)
    if thisSequence_loop != None:
        for paramName in thisSequence_loop:
            exec('{} = thisSequence_loop[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "sequence_start"-------
    continueRoutine = True
    # update component parameters for each repeat
    mouse.getPos() # this is needed here because of mouse.mouseMoved()
    target_a, target_w = parameters.pop()
    
    targets = []
    current_target = 0
    target_order = []
    
    for i in range(target_c):
        x = target_a / 2 * cos(2.0 * pi * (i / target_c))
        y = target_a / 2 * sin(2.0 * pi * (i / target_c))
        target = visual.Circle(win=win,
                               size=target_w,
                               pos=(x,y),
                               fillColor="white",
                               lineWidth=2,
                               lineColor=LINE_COLOR)
        targets.append(target)
    
    start = randint(0, target_c - 1)
    interval = int((target_c + 1) / 2)
    idx = 0
    while idx < target_c:
        target_order.append(start % target_c)
        idx += 1
        if idx < target_c:
            target_order.append((start + interval) % target_c)
            idx += 1
        start += 1
    
    print(target_order)
    key_resp_3.keys = []
    key_resp_3.rt = []
    _key_resp_3_allKeys = []
    # keep track of which components have finished
    sequence_startComponents = [text_2, key_resp_3]
    for thisComponent in sequence_startComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    sequence_startClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "sequence_start"-------
    while continueRoutine:
        # get current time
        t = sequence_startClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=sequence_startClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *text_2* updates
        if text_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            text_2.frameNStart = frameN  # exact frame index
            text_2.tStart = t  # local t and not account for scr refresh
            text_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(text_2, 'tStartRefresh')  # time at next scr refresh
            text_2.setAutoDraw(True)
        
        # *key_resp_3* updates
        waitOnFlip = False
        if key_resp_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            key_resp_3.frameNStart = frameN  # exact frame index
            key_resp_3.tStart = t  # local t and not account for scr refresh
            key_resp_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(key_resp_3, 'tStartRefresh')  # time at next scr refresh
            key_resp_3.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(key_resp_3.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(key_resp_3.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if key_resp_3.status == STARTED and not waitOnFlip:
            theseKeys = key_resp_3.getKeys(keyList=['return'], waitRelease=False)
            _key_resp_3_allKeys.extend(theseKeys)
            if len(_key_resp_3_allKeys):
                key_resp_3.keys = _key_resp_3_allKeys[-1].name  # just the last key pressed
                key_resp_3.rt = _key_resp_3_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in sequence_startComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "sequence_start"-------
    for thisComponent in sequence_startComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    sequence_loop.addData('text_2.started', text_2.tStartRefresh)
    sequence_loop.addData('text_2.stopped', text_2.tStopRefresh)
    # check responses
    if key_resp_3.keys in ['', [], None]:  # No response was made
        key_resp_3.keys = None
    sequence_loop.addData('key_resp_3.keys',key_resp_3.keys)
    if key_resp_3.keys != None:  # we had a response
        sequence_loop.addData('key_resp_3.rt', key_resp_3.rt)
    sequence_loop.addData('key_resp_3.started', key_resp_3.tStartRefresh)
    sequence_loop.addData('key_resp_3.stopped', key_resp_3.tStopRefresh)
    # the Routine "sequence_start" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    trial_loop = data.TrialHandler(nReps=n_trials, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='trial_loop')
    thisExp.addLoop(trial_loop)  # add the loop to the experiment
    thisTrial_loop = trial_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisTrial_loop.rgb)
    if thisTrial_loop != None:
        for paramName in thisTrial_loop:
            exec('{} = thisTrial_loop[paramName]'.format(paramName))
    
    for thisTrial_loop in trial_loop:
        currentLoop = trial_loop
        # abbreviate parameter names if possible (e.g. rgb = thisTrial_loop.rgb)
        if thisTrial_loop != None:
            for paramName in thisTrial_loop:
                exec('{} = thisTrial_loop[paramName]'.format(paramName))
        
        # ------Prepare to start Routine "trial"-------
        continueRoutine = True
        # update component parameters for each repeat
        # setup some python lists for storing info about the mouse
        mouse.x = []
        mouse.y = []
        mouse.leftButton = []
        mouse.midButton = []
        mouse.rightButton = []
        mouse.time = []
        gotValidClick = False  # until a click is received
        mouse.mouseClock.reset()
        key_resp_2.keys = []
        key_resp_2.rt = []
        _key_resp_2_allKeys = []
        # keep track of which components have finished
        trialComponents = [mouse, key_resp_2]
        for thisComponent in trialComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        trialClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "trial"-------
        while continueRoutine:
            # get current time
            t = trialClock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=trialClock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            if current_target != target_c:
                for idx in range(len(targets)):
                    target = targets[idx]
                    if idx == target_order[current_target]:
                        target.fillColor = HIGHLIGHT_COLOR
                    else:
                        target.fillColor = NORMAL_COLOR
                    target.draw()
            
                if mouse.mouseMoved():
                    x, y = mouse.getPos()
                    if is_in_target(x, y):
                        continueRoutine = False
            # *mouse* updates
            if mouse.status == NOT_STARTED and t >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                mouse.frameNStart = frameN  # exact frame index
                mouse.tStart = t  # local t and not account for scr refresh
                mouse.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(mouse, 'tStartRefresh')  # time at next scr refresh
                mouse.status = STARTED
                prevButtonState = mouse.getPressed()  # if button is down already this ISN'T a new click
            if mouse.status == STARTED:  # only update if started and not finished!
                x, y = mouse.getPos()
                mouse.x.append(x)
                mouse.y.append(y)
                buttons = mouse.getPressed()
                mouse.leftButton.append(buttons[0])
                mouse.midButton.append(buttons[1])
                mouse.rightButton.append(buttons[2])
                mouse.time.append(mouse.mouseClock.getTime())
            
            # *key_resp_2* updates
            waitOnFlip = False
            if key_resp_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                key_resp_2.frameNStart = frameN  # exact frame index
                key_resp_2.tStart = t  # local t and not account for scr refresh
                key_resp_2.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(key_resp_2, 'tStartRefresh')  # time at next scr refresh
                key_resp_2.status = STARTED
                # keyboard checking is just starting
                waitOnFlip = True
                win.callOnFlip(key_resp_2.clock.reset)  # t=0 on next screen flip
                win.callOnFlip(key_resp_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
            if key_resp_2.status == STARTED and not waitOnFlip:
                theseKeys = key_resp_2.getKeys(keyList=['return'], waitRelease=False)
                _key_resp_2_allKeys.extend(theseKeys)
                if len(_key_resp_2_allKeys):
                    key_resp_2.keys = _key_resp_2_allKeys[-1].name  # just the last key pressed
                    key_resp_2.rt = _key_resp_2_allKeys[-1].rt
                    # a response ends the routine
                    continueRoutine = False
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in trialComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "trial"-------
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # save target position
        target = targets[target_order[current_target]]
        thisExp.addData('targetPosition', target.pos)
        
        current_target += 1
        # store data for trial_loop (TrialHandler)
        trial_loop.addData('mouse.x', mouse.x)
        trial_loop.addData('mouse.y', mouse.y)
        trial_loop.addData('mouse.leftButton', mouse.leftButton)
        trial_loop.addData('mouse.midButton', mouse.midButton)
        trial_loop.addData('mouse.rightButton', mouse.rightButton)
        trial_loop.addData('mouse.time', mouse.time)
        # check responses
        if key_resp_2.keys in ['', [], None]:  # No response was made
            key_resp_2.keys = None
        trial_loop.addData('key_resp_2.keys',key_resp_2.keys)
        if key_resp_2.keys != None:  # we had a response
            trial_loop.addData('key_resp_2.rt', key_resp_2.rt)
        trial_loop.addData('key_resp_2.started', key_resp_2.tStartRefresh)
        trial_loop.addData('key_resp_2.stopped', key_resp_2.tStopRefresh)
        # the Routine "trial" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
    # completed n_trials repeats of 'trial_loop'
    
    thisExp.nextEntry()
    
# completed n_seqs repeats of 'sequence_loop'


# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
