"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var AssessmentStore = require("../../store/assessmentStore");
var AssessmentActions = require("../../actions/assessmentActions");
var QuestionList = require("./../question/questionList");

var ManageAssessmentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState');
        return {
            assessment: {Id: '', Text: '', Description: '', Questions: []},
            showId: false
        };
    },

    componentWillMount: function(){
        var assessmentId = this.props.params.id;
        var currentComponent = this;

        if(assessmentId){
            this.setState({ assessment: AssessmentStore.getAssessmentById(assessmentId), showId: true });
        }
  },

    setAssessmentState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.assessment[field] = value;
        //this.state.assessment.Id = "-1";
        return this.setState({assessment: this.state.assessment});
    },

    saveAssessment: function(event){
        event.preventDefault();
        console.log(this.state.assessment);
         AssessmentActions.saveAssessment(this.state.assessment);
         Toastr.success("assessment saved");
        this.transitionTo("assessments");
    },

    render: function(){

        var myStyle = this.state.showId ? 'inline' : 'none';

        return (
            <div>
                <h1>Manage Assessment</h1>
                <div style= {{display: myStyle}}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="assessment">Id </label>
                            <div className="field">
                                <input type="text" name="Text" readOnly value={this.state.assessment.Id} className="form-control" onChange={this.setAssessmentState} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="assessment">Assessment </label>
                        <div className="field">
                            <input type="text" name="Text" value={this.state.assessment.Text} className="form-control" onChange={this.setAssessmentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Description</label>
                        <div className="field">
                            <input type="text" name="Description" value={this.state.assessment.Description} className="form-control" onChange={this.setAssessmentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Assessment" className="btn btn-default" onClick={this.saveAssessment} />
                    <Link to="assessments" className="btn btn-default">Cancel</Link>
                </div>

                <div className="Row">
                    <div className="col-xs-10">
                       <h1><strong>List of Questions </strong></h1>
                    </div>
                </div>
                <div className="Row">
                    <QuestionList questions = {this.state.assessment.Questions} />
                 </div>
            </div>
        );
    }
});

module.exports = ManageAssessmentPage;
