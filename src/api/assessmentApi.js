"use strict";

var React = require("react");
var Common = require("./../constants/Common");

var apiUrl = Common.APIUrl + "assessment/";

var AssessmentApi = {
    getString: function(){
        //debugger;
       return fetch(apiUrl, {mode: 'cors'});
    },

    saveAssessment: function(assessment){
        return fetch(apiUrl + "saveAssessment", 
        {
            method: 'post',
            body: JSON.stringify(assessment),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },
    getAssessmentById: function(assessmentId){
        return fetch(apiUrl + "GetAssessmentById?assessmentId=" + assessmentId, 
        {
            mode: 'cors',
            method: 'GET',
            dataType: 'json',
            headers: {
            "Accept": "application/json"
            }
       }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },

    deleteAssessment: function(assessmentId){
        return fetch(apiUrl + "DeleteAssessment?assessmentId=" + assessmentId, 
        {
            mode: 'cors',
            method: 'GET',
            dataType: 'json',
            headers: {
            "Accept": "application/json"
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },

    getAllAssessments: function(){
          return fetch(apiUrl + "GetAllAssessments", 
            {
                mode: 'cors',
                method: 'GET',
                dataType: 'json',
                headers: {
                    "Accept": "application/json"
                 }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                    return data;
            }).catch(function(err){
                console.log('my error:' + err);
            });
        }

};

module.exports = AssessmentApi;

