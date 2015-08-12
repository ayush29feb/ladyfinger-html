var CheckoutCart = React.createClass({
	render : function() {
		return (
			<div className="container">
				<div id="contentpanel" className="row">
					<div className="col-md-8 col-sm-6 col-xs-12">
						<Cart />
					</div>
					<div className="col-md-4 col-sm-6 col-xs-12">

					</div>
				</div>
			</div>
		);
	}
});

var Cart = React.createClass({

	render : function() {
		return(
			<h4>Your Cart</h4>
			<form>
				
			</form>
		);
	}
})