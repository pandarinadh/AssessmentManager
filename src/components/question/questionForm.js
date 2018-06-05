"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var QuestionForm = React.createClass({
    render: function(){
    //debugger;
        var myStyle = this.props.showId ? 'inline' : 'none';

        return (
            <div>
                <div style= {{display: myStyle}}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="question">Id </label>
                            <div className="field">
                                <input type="text" name="Text" readOnly value={this.props.question.Id} className="form-control" onChange={this.props.onChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="question">Question </label>
                        <div className="field">
                            <input type="text" name="Text" value={this.props.question.Text} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Description</label>
                        <div className="field">
                            <input type="text" name="Description" value={this.props.question.Description} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Question" className="btn btn-default" onClick={this.props.onSave} />
                    <Link to="questions" className="btn btn-default">Cancel</Link>
                </div>
             </div>
        );
    }
});

module.exports = QuestionForm;
