"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var AssessmentForm = React.createClass({
    render: function(){
        
        var myStyle = this.props.showId ? 'inline' : 'none';
        return (
            <div>
                <div style= {{display: myStyle}}>
                        <div className="form-group">
                            <div>
                                <label htmlFor="assessment">Id </label>
                                <div className="field">
                                    <input type="text" name="Text" readOnly value={this.props.assessment.Id} className="form-control" onChange={this.props.onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <label htmlFor="assessment">Assessment </label>
                            <div className="field">
                                <input type="text" name="Text" value={this.props.assessment.Text} className="form-control" onChange={this.props.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <label htmlFor="description">Description</label>
                            <div className="field">
                                <input type="text" name="Description" value={this.props.assessment.Description} className="form-control" onChange={this.props.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save Assessment" className="btn btn-default" onClick={this.props.onSave} />
                        <Link to="assessments" className="btn btn-default">Cancel</Link>
                    </div>
            </div>
        );
    }
});

module.exports = AssessmentForm;