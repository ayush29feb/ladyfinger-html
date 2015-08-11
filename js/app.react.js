var App = React.createClass({
	getInitialState : function() {
		return {
			cart : {
				totalAmt : 0,
				items : []
			},
			page : {
				name : 'ORDER',
				tabs : ['Vegetables', 'Fruits', 'Dairy'],
				activeIndex : 0
			},
			user : {
				guest : true
			}
		}
	},
	addToCart : function(id, qty, rate) {
		var newItems = this.state.cart.items;
		var newTotalAmt = this.state.cart.totalAmt;
		// Old ID
		var added = false;
		for(var i in newItems) {
			if(newItems[i].itemId == id) {
				newTotalAmt -= newItems[i].qty * newItems[i].rate;
				if(qty <= 0) {
					newItems.splice(i, 1);
					console.log(newItems);
				} else {
					newItems[i].qty = qty;
					newItems[i].rate = rate;
					newTotalAmt += qty * rate
					added = true;
				}
			}
		}
		// New iD
		if(!added && qty > 0) {
			var item = {
				itemId : id,
				qty : qty,
				rate : rate
			};
			newItems.push(item);
			newTotalAmt += rate * qty;
		}
		this.setState({
			cart : {
				items : newItems,
				totalAmt : newTotalAmt
			}
		});
	},
	isInCart : function(id) {
		for(var i in this.state.cart.items) {
			if(this.state.cart.items[i].itemId == id) {
				return this.state.cart.items[i].qty;
			}
		}
		return 0;
	},
	changeTabs : function(tabIndex) {
		var newPage = this.state.page;
		newPage.activeIndex = tabIndex;
		newPage.name = 'ORDER';
		newPage.tabs = ['Vegetables', 'Fruits', 'Dairy'];
		this.setState({
			page : newPage
		});
	},
	checkout : function() {
		var newPage = this.state.page;
		newPage.name = 'CHECKOUT';
		newPage.tabs = ['Go Back'];
		newPage.activeIndex = 0;
		this.setState({
			page : newPage
		});
	},
	placeOrder : function() {
		console.log('checked out');
	},
	getPage : function() {
		var result = {
			header : (<Header page={this.state.page} changeTabs={this.changeTabs} key="header" />),
			content : (<div></div>),
			bottom : (<div></div>)
		}
		if(this.state.page.name == 'ORDER') {
			result.content = (<ProductPanel tab={this.state.page.tabs[this.state.page.activeIndex]} isInCart={this.isInCart} addToCart={this.addToCart} key="productpanel" />);
			result.bottom = (<BottomBar text={"Checkout Rs." + this.state.cart.totalAmt} action={this.checkout} key="bottombar" />);
		} else if(this.state.page.name == 'CHECKOUT') {
			result.content = (<CheckoutCart key="cart" />);
			result.bottom = (<BottomBar text="Place Order" action={this.placeOrder} key="bottombar" />);
		}
		return result;
	},
	render : function() {
		var page = this.getPage();
		return (
			<ReactCSSTransitionGroup transitionName="page">
				{page.header}
				{page.content}
				{page.bottom}
			</ReactCSSTransitionGroup>
		);
	}
});

var Header = React.createClass({
	render : function() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div id="header" className="row">
						<div className="col-md-12">
							<img src="img/logo.png" className="img-responsive logo" />
						</div>
					</div>
					<NavTabs page={this.props.page} changeTabs={this.props.changeTabs} />
				</div>
			</nav>
		);
	}
});

var NavTabs = React.createClass({
	getTab : function(title, i) {
		var count = this.props.page.tabs.length;
		var size = 4;
		if(count < 3) size = 12 / count;
		var active = false;
		if(i == this.props.page.activeIndex) active = true;
		return (<Tab index={i} title={title} changeTabs={this.props.changeTabs} active={active} size={size}/>);
	},
	render : function() {
		var tabs = this.props.page.tabs.map(this.getTab)
		return (
			<div id="tabs" className="row">
				{tabs}
			</div>
		);
	}
});

var Tab = React.createClass({
	render : function() {
		var selected = '';
		if(this.props.active) selected = 'selected';
		return (
			<div className={"tab " + selected + " col-xs-" + this.props.size} 
				onClick={this.props.changeTabs.bind(this, this.props.index)}>
				<h4>{this.props.title}</h4>
			</div>
		);
	}
});

var BottomBar = React.createClass({
	render : function() {
		return (
			<nav id="bottombar" className="navbar navbar-default navbar-fixed-bottom" 
				onClick={this.props.action} >
				<div className="container">
					<span>{this.props.text}</span>
				</div>
			</nav>
		);
	}
});
