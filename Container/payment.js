import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/remove';
import TextField from 'material-ui/TextField';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

 class Payment extends Component {

	constructor(props) {
		super(props)
		this.state = {
			paymentSucessMsg:'',
			open: false

		}
       this.totalPrice=0;
	}


	  handleClose = () => {
		this.setState({open: false});
	  };

	paymentSucess()
	{
		var obj={}
		if(this.refs.name.input.value==''||this.refs.cardNumber.input.value==''||this.refs.expDate.input.value==''||this.refs.cvv.input.value=='')
		{
			this.setState({open: true});
	
		}
		else
		{
					
		obj={
			name:this.refs.name.input.value,
			cardNumber:this.refs.cardNumber.input.value,
			expiryDate:this.refs.expDate.input.value,
			cvv:this.refs.cvv.input.value,
   
		   }
		   this.setState({paymentSucessMsg:'Payment is SuccessFully done ! Your Order in on way'})
		}
		
		
	}
	getTotal()
	{
		
		if(this.props.checkOutDetails)
		{
			for(let i=0;i<this.props.checkOutDetails.length;i++)
			{
				this.totalPrice+=(this.props.checkOutDetails[i].quantity*this.props.checkOutDetails[i].price);
			}
		}
		return this.totalPrice;
	}

	render() {
		const actions = [
			<FlatButton
			  label="Close"
			  secondary={true}
			  onClick={this.handleClose}
			/>
			
		  ];


		return (
		
				
					<div>
					<Dialog
          title="Payment Error"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please Fill all the fields required for Payment !!
        </Dialog>
						<Row>
							<Col md="4" style={{ textAlign: 'center',marginLeft:'390px',marginTop:'60px' }}>
								 <Paper > 
                                  <div style={{fontWeight:'bold'}}> Payment Detials</div>
									<div>
										<TextField type='number' floatingLabelText="Name On card" ref="name" />
									</div>
									<div>
										<TextField type='number' floatingLabelText="card Number" ref="cardNumber" />
									</div>

									<div>
										<TextField  type='number' floatingLabelText="Expiry Date" ref="expDate" />
									</div>
									<div>

										<TextField type='number' floatingLabelText="Cvv" ref="cvv" />

									</div>
									<div style={{margin:'15px'}}>
										<RaisedButton secondary={true} label="submit"  onClick={()=>this.paymentSucess()}/>
									</div>
									<div style={{fontWeight:'bold',color:'green'}}>
										{this.state.paymentSucessMsg}
										</div>

                                 </Paper>


							</Col>
							<Col md="4">
									{this.props.checkOutDetails && <Row style={{ margin: '10px' }}>
									<Paper zDepth='2'>
										<div style={{ fontWeight: 'bold',marginTop:'50px' }}> Order Summary</div>
										{this.props.checkOutDetails.map((menu, index) =>
											<Row>
												<Col key={index} >

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
														        
															</TableRow>
															
															
														</TableBody>
													</Table>
													
												</Col>


											</Row>
										)}
										<div style={{fontWeight:'bold',float:'right'}}>Payment To be paid : {this.getTotal()}</div>
										</Paper>
									</Row>
									
									}
									
								</Col>
						</Row>
					</div>
			

		);
	}

}


function mapStateToProps(state) {

	return {
	
		checkOutDetails: state.checkOutDetails
	};
}
let PaymentDetails=muiThemeable()(Payment);

export default connect(mapStateToProps)(PaymentDetails);





