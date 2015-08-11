var ProductPanel = React.createClass({
	getInitialState : function() {
		return { data : [] };
	},
	loadData : function(tab) {
		var apiTabMap = [];
			apiTabMap['Vegetables'] = 'veggie';
			apiTabMap['Fruits'] = 'fruit';
			apiTabMap['Dairy'] = 'dairy';
		$.ajax({
			url: 'http://192.168.0.100:5000/api/v1/products/' + apiTabMap[tab],
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data.products});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('http://192.168.0.100:5000/api/v1/products/' + apiTabMap[tab], status, err.toString());
			}.bind(this)
		});
	},
	componentWillReceiveProps : function(nextProps) {
		this.loadData(nextProps.tab);
	},
	componentDidMount : function() {
		this.loadData(this.props.tab);
	},
	render : function() {
		return (
			<div className="container">
				<div id="contentpanel" className="row">
					<ProductList data={this.state.data} addToCart={this.props.addToCart} isInCart={this.props.isInCart} />
				</div>
			</div>
		);
	}
});

var ProductList = React.createClass({
	getProduct : function(product) {
		return (
			<Product key={product._id} id={product._id} photo={product.photo} rate={product.rate} 
				ticker={product.ticker} name={product.name} addToCart={this.props.addToCart} isInCart={this.props.isInCart} />
		);
	},
	render : function() {
		var productNodes = this.props.data.map(this.getProduct);
		return (
			<ReactCSSTransitionGroup transitionName="item">
				{productNodes}
			</ReactCSSTransitionGroup>
		);
	}
});

var Product = React.createClass({
	getInitialState : function(){
		return {
			qty : 0,
			inCart : false,
			blur : 0
		};
	},
	onUpClick : function(event){
		var qty = parseFloat(this.state.qty) + parseFloat(this.props.ticker)
		this.setState({
			qty : qty,
		});
		if(this.state.inCart) this.props.addToCart(this.props.id, qty, this.props.rate);
	},
	onDownClick : function(event){
		if(parseFloat(this.state.qty) - parseFloat(this.props.ticker) > 0) {
			var qty = parseFloat(this.state.qty) - parseFloat(this.props.ticker);
			this.setState({
				qty : qty
			});
			if(this.state.inCart) this.props.addToCart(this.props.id, qty, this.props.rate);
		}
		if(parseFloat(this.state.qty) - parseFloat(this.props.ticker) <= 0) {
			this.removeItemFromCart();
		}
		
	},
	addItemToCart : function() {
		var qty = this.state.qty;
		if(qty <= 0) {
			qty = parseFloat(this.props.ticker);
		}
		this.setState({
			inCart : true,
			blur : 'blur',
			qty : qty
		});
		this.props.addToCart(this.props.id, qty, this.props.rate);
	},
	removeItemFromCart : function() {
		this.setState({
			inCart : false,
			blur : '',
			qty : 0
		});
		this.props.addToCart(this.props.id, 0, 0);
	},
	overlay : function() {
		return (
		   		<div className="overlay">
		   			<div className="col-xs-12">			   							   			
			   			<h3><strong>{this.state.qty}KG<br />{this.props.name}</strong></h3><br />
						<a onClick={this.removeItemFromCart}>REMOVE</a>
		   			</div>
				</div>
			);
	},
	componentDidMount : function() {
		var qty = this.props.isInCart(this.props.id);
		if(qty > 0) {
			this.setState({
				qty : qty,
				blur : 'blur',
				inCart : true
			})
		}
	},
	render : function () {
		return (
			<div className="item col-md-4 col-sm-6 col-xs-12">
			<div className="row">
				<div className={this.state.blur}>
					<div className="showcase col-xs-6" onClick={this.onUpClick}>
						<img src={"img/products/" + this.props.photo} className="img-responsive" />
						<h4>Rs. {this.props.rate} / kg</h4>
					</div>
					<div className="qty col-xs-4">
						<i className="fa fa-chevron-up" onClick={this.onUpClick}></i>
						<span className="number">{this.state.qty} kg</span>
						<i className="fa fa-chevron-down" onClick={this.onDownClick}></i>
					</div>
					<div className="addcart col-xs-2">
						<i className="fa fa-cart-plus" onClick={this.addItemToCart}></i>
						<span style={{display: 'block'}}>Add To Cart</span>
					</div>
				</div>
				<If test={this.state.inCart}>
					{this.overlay()}
				</If>
			</div>
		</div>
		);
	}
});