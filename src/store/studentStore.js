"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");

var CHANGE_EVENT = 'change';

var _students = [];
var _student;

var StudentStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getAllStudents: function(){
        console.log("getAllStudents StudentStore ");
        console.log(_students);
        return _students;
    },

    getStudentById: function(Id){
        return _.find(_students, {Id: parseInt(Id)});
    }
});


Dispatcher.register(function(action){
    //debugger;
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
                action.initialData.students.then(function(data){
                    _students = data;
                    StudentStore.emitChange();
                });
            break;
        case ActionTypes.CREATE_STUDENT:
                action.student.then(function(data){
                    var existingStudent = _.find(_students, {Id: parseInt(data.Id)});
                    var existingStudentIndex = _.indexOf(_students, existingStudent);
                    if(existingStudentIndex === -1){
                        _students.push(data);
                    }else{
                        _students.splice(existingStudentIndex, 1, data);
                    }
                    StudentStore.emitChange();
                });
            break;
        case ActionTypes.DELETE_STUDENT:
                action.student.then(function(data){
                    _.remove(_students, function(student){
                        return parseInt(data.Id) === parseInt(student.Id);
                    });
                    StudentStore.emitChange();
                });
            break;
        default:
    }
});


module.exports = StudentStore;