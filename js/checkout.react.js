var CheckoutCart = React.createClass({
	render : function() {
		return (
			<div className="container">
				<div id="contentpanel" className="row">
					<Cart cart={this.props.cart} />
					<Delivery />
				</div>
			</div>
		);
	}
});

var Cart = React.createClass({
	getInitialState : function() {
		return {
			style : {
				tr : {
					height : '50px'
				}
			}
		}
	},
	getItem : function(item) {
		return (
			<tr style={this.state.style.tr}>
				<td><img src={"img/products/" + item.details.photo} width="50px" />  {item.details.name}</td>
				<td>{item.qty} kg</td>
				<td>Rs. {item.rate * item.qty}</td>
			</tr>
		)
	},
	render : function() {
		var items = this.props.cart.items.map(this.getItem);
		return(
			<div className="col-md-8 col-sm-6 col-xs-12">
				<h4>Your Cart</h4>
				<table className="table">
					<tbody>
						{items}
						<tr>
							<td></td>
							<td><strong style={{ float : 'right' }}>Total</strong></td>
							<td>Rs. {this.props.cart.totalAmt}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var Delivery = React.createClass({
	getInitialState : function() {
		return {
			style : {
				input : {
					width : '100%',
					height : '40px',
					padding : '5px 10px',
					margin : '5px auto'
				},
				select : {
					width : '100%',
					height : '40px',

				},
				textarea : {
					width : '100%',
					height : '100px',
					padding : '5px 10px',
					margin : '5px auto',
					border : 'thin black solid'
				}
			}
		}
	},
	render : function() {
		return (
			<div className="col-md-4 col-sm-6 col-xs-12">
				<h4>Delivery Details</h4>
				<form>
					<input type="text" placeholder="Your Name" style={this.state.style.input} disabled/>
					<select type="text" placeholder="Address" style={this.state.style.select} >
						<option>E-1</option>
					</select>
					<input type="text" placeholder="Landmark" style={this.state.style.input}/>
					<textarea placeholder="Delivery Notes" style={this.state.style.input} />
				</form>
			</div>
		);
	}
})