import React, {Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CheckOutDetails } from '../Actions/CheckOutDetails';
import { getMenuDetails } from '../Actions/getMenuDetails';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/remove';
import TextField from 'material-ui/TextField';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {Link, Router, BrowserRouter, Route, Switch, Redirect, browserHistory } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Payment from './payment';



class FoodMenuList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			typeValue: {},
			showMenuList: false
		}
		this.cal = [],
			this.orderObject = {},
			this.totalPrice=0;
			
	}
	componentDidMount()
	{
		var MenuList=JSON.parse(localStorage.getItem('MenuList'));
		var originalMenu=[
			{
				
				name: "Hamburger",
				price:400,
				url:'../Images/hamburger.jpg'
				
			},
			{
			   
				name: "Fries",
				price:300,
				url:'../Images/fries.jpeg'
			},
			{
			   
				name: "Coke",
				price:200,
				url:'../Images/coke.jpg'
			},
			{
			 
				name: "Pepsi",
			   price:100,
			   url:'../Images/pepsi.jpeg'
			}
			
		]
		if(MenuList)
		{
			localStorage.setItem('MenuList',JSON.stringify(MenuList))
		}
		else
		{
				localStorage.setItem('MenuList',JSON.stringify(originalMenu))
		}
	
		this.props.getMenuDetails();
	}
	prepareBill(selectedDeatils, index, typeValue) {

		this.setState({ showMenuList: true })
		var value = Object.keys(typeValue);
		value.forEach(element => {
			selectedDeatils.quantity = typeValue[element];
		});
		
		if (this.cal.indexOf(selectedDeatils) == -1) {
			this.cal.push(selectedDeatils)

		}
		console.log("kkk", this.cal,selectedDeatils)
		
         
	}

	captureQuantity(key, event, value) {

		this.orderObject[key] = value;
		this.setState({ typeValue: this.orderObject })
	}

	removeItem(index)
	{
		this.cal.splice(index,1)
	
		this.setState({ showMenuList: true })	
	
	}
	proceedTopayment()
	{
	
		this.context.router.history.push('/payment');
		
		this.props.CheckOutDetails(this.cal)
		
	}
		
	render() {
		
		
		return (
			<div>	
				  <div style={{fontWeight:'bold',textAlign:'center',marginTop:'50px',marginBottom:'90px'}}> FOOD MENU LIST	</div>	
						<div>
							<Row style={{ margin: '10px' }}>
								<Col md="9">
									{this.props.menuList && this.props.menuList.map((details, index) =>

										<Col md="3" key={index}>
											<img src={details.url} />
											<div>{details.name}</div>
											<div >Price : INR {details.price}</div>
											<div>
												<TextField

													floatingLabelText="mention quantity"
													value={this.state.typeValue[details.name]}

													type='number'
													onChange={this.captureQuantity.bind(this, details.name)}
												/>
											</div>
											<div style={{ textAlign: 'center' }}>
												<RaisedButton label="Add" secondary={true} fullWidth={true} onClick={() => this.prepareBill(details, index, this.state.typeValue)} />
											</div>

										</Col>

									)}
								</Col>
								<Col md="3">
									{this.state.showMenuList && <Row style={{ margin: '10px' }}>
										<div style={{ fontWeight: 'bold' }}> Order List</div>
										{this.cal.map((menu, index) =>
											<Row  key={index}>
												<Col >

													<Table>
														{index==0 && <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
															<TableRow>
																<TableHeaderColumn>FoodName</TableHeaderColumn>
																<TableHeaderColumn>Quantity</TableHeaderColumn>
																<TableHeaderColumn>Price</TableHeaderColumn>
															</TableRow>
														</TableHeader>}
														<TableBody displayRowCheckbox={false}>
															<TableRow>
																<TableRowColumn>{menu.name} </TableRowColumn>
																<TableRowColumn>{menu.quantity}</TableRowColumn>
																<TableRowColumn>{menu.price * menu.quantity}</TableRowColumn>
														        <TableRowColumn><FloatingActionButton mini={true} secondary={true} onClick={()=>this.removeItem(index)} >
                                                                  <ContentAdd/>
                                                               </FloatingActionButton>
	                                                          </TableRowColumn>
															</TableRow>
															
														</TableBody>
													</Table>
													
												</Col>


											</Row>
										)}
										
                                     <RaisedButton label="CheckOut" secondary={true} fullWidth={true}  onClick={()=>this.proceedTopayment()}/>
									</Row>
									}
									
								</Col>
								
							</Row>
							

						</div>
					</div>
				

		);
	}

}
FoodMenuList.contextTypes = {
    router: PropTypes.object
};





function mapStateToProps(state) {

	return {
		menuList:state.MenuDetails,
		checkOutDetails: state.checkOutDetails,
		priceChanged:state.priceDetails
	};
}

let FoodMenuListDetails=muiThemeable()(FoodMenuList);


export default connect(mapStateToProps, {getMenuDetails, CheckOutDetails })(FoodMenuListDetails);