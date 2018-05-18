"use strict";

var React = require("react");

var apiUrl = "http://localhost:90/api/AssesssmentCenter/";

var AssessmentApi = {
    getString: function(){
        //debugger;
       return fetch(apiUrl, {mode: 'cors'});
    },

    save: function(studentAssessment){
        return fetch(apiUrl + "save", 
        {
            method: 'post',
            body: JSON.stringify(studentAssessment),
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

    getAllStudentAssessments: function(){
          return fetch(apiUrl + "GetAllStudentAssessments", 
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

