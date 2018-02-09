'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const ons = require('onsenui');
const Ons = require('react-onsenui');
const client = require('./client');

// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}
		
	renderToolbar() {
	    return (
	      <Ons.Toolbar>
	        <div className='center'>My app</div>
	        <div className='right'>
	        <Ons.ToolbarButton>
	          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
	        </Ons.ToolbarButton>
	        </div>
	      </Ons.Toolbar>
	    )
	}

	handleClick() {
        ons.notification.alert("test");
	}	
	
	renderRow(row, index) {
		return(
			<Ons.ListItem tappable 
			    onClick={() => ons.notification.alert(row.description) }>
				<div className="center">
					{row.firstName}&nbsp;{row.lastName}
				</div>
			</Ons.ListItem>
		)
	}

	render() {
		return (
	      <Ons.Page renderToolbar={this.renderToolbar}>
	      	<Ons.List 
	      		dataSource={this.state.employees}
	      		renderRow={this.renderRow}
	      	/>
	      </Ons.Page>
		)
	}
}
// end::app[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
