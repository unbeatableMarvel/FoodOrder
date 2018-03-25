import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Checkbox from 'material-ui/Checkbox';
import { getMenuDetails } from '../Actions/getMenuDetails';


class AdminPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			typeValue: {},
			showMenuList: false,
			value: 1
		}
		this.cal = [],
			this.orderObject = {},
			this.totalPrice = 0;
			
	}
	componentDidMount()
	{
		this.props.getMenuDetails();
	}
	
	prepareBill(selectedDeatils, index, typeValue) {


		var value = Object.keys(typeValue);

		value.forEach(element => {

			selectedDeatils.price = parseInt(typeValue[element]);

		});


		if (this.cal.indexOf(selectedDeatils) == -1) {
			this.cal.push(selectedDeatils)

		}


		this.props.getMenuDetails(this.cal)
	}

	captureQuantity(key, event, value) {

		this.orderObject[key] = value;
		this.setState({ typeValue: this.orderObject })
	}
	updateCheck(event, isInputChecked) {

		if (isInputChecked) {
			localStorage.setItem('secondaryColor', JSON.stringify(event.target.value))
		}
		else {
			localStorage.removeItem('secondaryColor', JSON.stringify(event.target.value))
		}
		location.reload();
	}


	render() {
		console.log("kkk admin", this.props)

		return (
			<div>

				<div>

					<div>


						<Row style={{ margin: '10px' }}>
							<div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '70px' }}>Admin Page</div>
							<Col md="9" style={{ textAlign: 'center' }}>
								{this.props.menuList && this.props.menuList.map((details, index) =>

									<Col md="3" >
										<img src={details.url} />
										<div>{details.name}</div>
										<div >Price : INR {details.price}</div>
										<div>
											<TextField

												floatingLabelText="change Price"
												value={this.state.typeValue[details.name]}

												type='number'
												onChange={this.captureQuantity.bind(this, details.name)}
											/>
										</div>
										<div style={{ textAlign: 'center' }}>
											<RaisedButton label="submit" secondary={true} fullWidth={true} onClick={() => this.prepareBill(details, index, this.state.typeValue)} />
										</div>

									</Col>

								)}
							</Col>
							<Col md="3">
								<div style={{ fontWeight: 'bold' }}>CHANGE APPLICATION THEME</div>
								<div>
									<Checkbox
										label="Pink"
										value='#E91E63'
										onCheck={this.updateCheck.bind(this)}

									/>
									<Checkbox
										label="Purple"
										value='#9C27B0'
										onCheck={this.updateCheck.bind(this)}

									/>
									<Checkbox
										label="Green"
										value='#4CAF50'
										onCheck={this.updateCheck.bind(this)}

									/>
									<Checkbox
										label="Brown"
										value='#795548'
										onCheck={this.updateCheck.bind(this)}

									/>
								</div>
							</Col>

						</Row>
					</div>
				</div>

			</div>

		);
	}

}


function mapStateToProps(state) {

	return {
		menuList: state.MenuDetails
		
	};
}

let adminPageModule = muiThemeable()(AdminPage);

export default connect(mapStateToProps, { getMenuDetails })(adminPageModule);