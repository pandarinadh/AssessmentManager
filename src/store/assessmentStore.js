"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");

var CHANGE_EVENT = 'change';

var _assessments = [];
var _assessment;

var AssessmentStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getAllAssessments: function(){
        console.log("getAllAssessments AssessmentStore ");
        console.log(_assessments);
        return _assessments;
    },

    getAssessmentById: function(Id){
        return _.find(_assessments, {Id: parseInt(Id)});
    }
});


Dispatcher.register(function(action){
    //debugger;
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
                action.initialData.assessments.then(function(data){
                    _assessments = data;
                    AssessmentStore.emitChange();
                });
            break;
        case ActionTypes.CREATE_ASSESSMENT:
                action.assessment.then(function(data){
                    var existingAssessment = _.find(_assessments, {Id: parseInt(data.Id)});
                    var existingAssessmentIndex = _.indexOf(_assessments, existingAssessment);
                    if(existingAssessmentIndex === -1){
                        _assessments.push(data);
                    }else{
                        _assessments.splice(existingAssessmentIndex, 1, data);
                    }
                    AssessmentStore.emitChange();
                });
            break;
        case ActionTypes.DELETE_ASSESSMENT:
                action.assessment.then(function(data){
                    console.log(data.Id);
                    _.remove(_assessments, function(assessment){
                        return parseInt(data.Id) === parseInt(assessment.Id);
                    });
                    AssessmentStore.emitChange();
                });
            break;
        default:
            //no op
    }
});


module.exports = AssessmentStore;