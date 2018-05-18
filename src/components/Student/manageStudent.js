"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var StudentStore = require("../../store/studentStore");
var StudentActions = require("../../actions/studentActions");

var ManageStudentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState');
        return {
            student: {Id: '', Name: '', Address: '', City: '', State: '', Zip: '' },
            showId: false
        };
    },

    componentWillMount: function(){
        var studentId = this.props.params.id;
        var currentComponent = this;

        if(studentId){
            this.setState({ student: StudentStore.getStudentById(studentId), showId: true });
        }
  },

    setStudentState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.student[field] = value;
        //this.state.student.Id = "-1";
        return this.setState({student: this.state.student});
    },

    saveStudent: function(event){
        event.preventDefault();
        console.log(this.state.student);
         StudentActions.saveStudent(this.state.student);
         Toastr.success("student saved");
        this.transitionTo("students");
    },

    render: function(){

        var myStyle = this.state.showId ? 'inline' : 'none';

        return (
            <div>
                <h1>Manage Student</h1>
                <div style= {{display: myStyle}}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="student">Id </label>
                            <div className="field">
                                <input type="text" name="Text" readOnly value={this.state.student.Id} className="form-control" onChange={this.setStudentState} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="student">Name </label>
                        <div className="field">
                            <input type="text" name="Name" value={this.state.student.Name} className="form-control" onChange={this.setStudentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Address</label>
                        <div className="field">
                            <input type="text" name="Address" value={this.state.student.Address} className="form-control" onChange={this.setStudentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">City</label>
                        <div className="field">
                            <input type="text" name="City" value={this.state.student.City} className="form-control" onChange={this.setStudentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">State</label>
                        <div className="field">
                            <input type="text" name="State" value={this.state.student.State} className="form-control" onChange={this.setStudentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Zip</label>
                        <div className="field">
                            <input type="text" name="Zip" value={this.state.student.Zip} className="form-control" onChange={this.setStudentState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Student" className="btn btn-default" onClick={this.saveStudent} />
                    <Link to="students" className="btn btn-default">Cancel</Link>
                </div>

            </div>
        );
    }
});

module.exports = ManageStudentPage;
