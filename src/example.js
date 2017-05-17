#!/usr/bin/env node

/**
 *  @file       example.js
 *
 *	@desc       Ableton Link state changes into state store, forwarded to
 *	            SuperCollider replica state store.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/



import { createStore } from "redux"
import supercolliderRedux from "supercollider-redux"
import abletonLinkRedux from "abletonlink-redux"
import SCStoreController from "./SCStoreController"
import AbletonLinkController from "./AbletonLinkController"
import awakeningSequencers from "."

//// When we want the sound to play
//const SIMPLE_SOUND_QUEUED = "SIMPLE_SOUND_QUEUED";
//// when the sound is actually scheduled to play in the sound engine
//const SIMPLE_SOUND_SCHEDULED = "SIMPLE_SOUND_SCHEDULED"

//var actions = {
  //simpleSoundQueued: () => {
    //return {
      //type: SIMPLE_SOUND_QUEUED
    //}
  //}
//};

//var simpleSound = function (state = {queued: false}, action) {
  //switch (action.type) {
    //case abletonLinkRedux.actionTypes.LINK_TRANSPORT_CHANGED:
      //state.queued = true;
      //break;
    //case SIMPLE_SOUND_SCHEDULED:
      //state.queued = false;
      //break;
    //default:
      //break;
  //}
  //return state;
//};
//var simpleSequence

function create_default_state () {
  return {
    sequencers: {
      'metro': awakeningSequencers.create_default_sequencer('metro')
    }
  };
}

var rootReducer = function (state = create_default_state(), action) {

  //state.simpleSound = simpleSound(state.simpleSound, action);
  state.abletonlink = abletonLinkRedux.reducer(state.abletonlink, action);
  state.supercolliderRedux = supercolliderRedux.reducer(state.supercolliderRedux, action);

  state.sequencers = awakeningSequencers.reducer(state.sequencers, action);

  return state;
  
};

var store = createStore(rootReducer);
var scStoreController = new SCStoreController(store);
var abletonLinkController = new AbletonLinkController(store, 'abletonlink');

setInterval(() => {
  console.log("store.getState()");
  console.log(store.getState());
}, 1000);

setTimeout(() => {
  console.log("Queueing metronome...");
  store.dispatch(awakeningSequencers.actions.sequencerQueued('metro'));
}, 4000);
