// INITIAL STATE
// --------------------
// --> initialState
// 
// FUNCTIONS
// --------------------
// --> getOptionsArray
// 
// ACTIONS
// --------------------
// --> addToCart
// --> removeFromCart
// --> updateCartItem
// --> removeStockItem
// 
// REDUCERS
// --------------------
// ------> cartItem
// ----> cart
// ------> stockItem
// ----> stock
// --> reducers
// 
// COMPONENTS
// --------------------
// ------> Header
// ----> HeaderContainer
// ----------> ShopItem
// --------> ShopItems
// ------> ShopItemsContainer
// ----> Shop
// ----------> AddItem
// --------> AddItemContainer
// ------> Item
// ----> ItemContainer
// ----------> CartItem
// --------> CartItems
// --------> Total
// --------> PayButton
// ------> Cart
// ----> CartContainer
// ----> NoMatch
// --> App

const { PropTypes } = React;
const { connect, Provider } = ReactRedux;
const {
  Router,
  Route,
  Link,
  IndexRoute,
  hashHistory } =
ReactRouter;

// INITIAL STATE
const initialState = {
  cart: [],
  stock: [
  {
    id: 0,
    name: 'char-siu chicken bahn mi',
    description: 'char-siu chicken thighs on toasted baguette with vietnamese pickled veg and sambal aioli',
    price: 7,
    count: 20,
    img: 'katsu-format.png',
    sticker: '1.png' },
  {
    id: 1,
    name: 'cauliflower grilled cheese',
    description: 'cauliflower, bechamel, parmesan & fontina',
    price: 6,
    count: 20,
    img: 'grilled-format.png',
    sticker: '2.png'  },
  {
    id: 2,
    name: 'caramel-chocolate-pretzel cookies',
    description: 'caramel pretzel chocolate chip cookies with sea salt',
    price: 1,
    count: 60,
    img: 'cookie-format.png',
    sticker: '3.png'  },
  {
    id: 3,
    name: 'mac & cheese',
    description: 'baked and breaded mac & cheese with green onions and bacon',
    price: 3,
    count: 25,
    img: 'mac-format.png',
    sticker: '4.png'  }] };





// FUNCTIONS
// getOptionsArray
const getOptionsArray = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i + 1);
  }

  return array;
};

// ACTIONS
// addToCart
const addToCart = (id, count) => (
{
  type: 'ADD_TO_CART',
  id,
  count });



// removeFromCart
const removeFromCart = (id) => (
{
  type: 'REMOVE_FROM_CART',
  id });



// updateCartItem
const updateCartItem = (id, count) => (
{
  type: 'UPDATE_CART_ITEM',
  id,
  count });



// removeStockItem
const removeStockItem = (id, count) => (
{
  type: 'REMOVE_STOCK_ITEM',
  id,
  count });




// REDUCERS
// cartItem
const cartItem = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        id: action.id,
        count: action.count };

    case 'REMOVE_FROM_CART':
      return state.id !== action.id;
    case 'UPDATE_CART_ITEM':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign(
      {},
      state,
      {
        count: action.count });


    default:
      return state;}

};

// cart
const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
      ...state,
      cartItem(undefined, action)];

    case 'REMOVE_FROM_CART':
      return state.filter(item => cartItem(item, action));
    case 'UPDATE_CART_ITEM':
      return state.map(item => cartItem(item, action));
    default:
      return state;}

};

// stockItem
const stockItem = (state, action) => {
  switch (action.type) {
    case 'REMOVE_STOCK_ITEM':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign(
      {},
      state,
      {
        count: state.count - action.count });


    default:
      return state;}

};

// stock
const stock = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_STOCK_ITEM':
      return state.map(item => stockItem(item, action));
    default:
      return state;}

};

// reducers
const reducers = Redux.combineReducers({
  cart,
  stock });



// COMPONENTS
// Header
const Header = ({ children, cartItems, backButton, cartButton }) => {
  const getBackButton = () =>
  React.createElement(Link, { to: "/", className: "back-button" }, "< Back to shop");




  const getCartButton = () =>
  React.createElement(Link, { to: "/cart", className: "cart-button" }, "Cart (",
  cartItems, ")");



  return (
    React.createElement("div", { className: "shopping-cart-app" },
    React.createElement("header", { className: "header" },
    React.createElement("div", { className: "header-contents" },
    backButton ? getBackButton() : '',
    cartButton ? getCartButton() : '')),


    React.createElement("main", { className: "main" },
    children)));



};

Header.PropTypes = {
  cartItems: PropTypes.number.isRequired,
  backButton: PropTypes.bool.isRequired,
  cartButton: PropTypes.bool.isRequired };



// HeaderContainer
const showBackButton = (pathname) =>
pathname !== '/' ? true : false;


const showCartButton = (pathname) =>
!pathname.includes('cart') ? true : false;


const HeaderContainer = connect(
(state, ownProps) => (
{
  children: ownProps.children,
  cartItems: state.cart.length,
  backButton: showBackButton(ownProps.location.pathname),
  cartButton: showCartButton(ownProps.location.pathname) }))(


Header);

  
// ShopItem
const ShopItem = ({ id, name, price, count, img, sticker }) =>
React.createElement("li", { className: 'shop-item shop-item-' + id },
React.createElement(Link, { to: '/item/' + id },
React.createElement("div", { className: "shop-item-container" },
  React.createElement("div", { className: "shop-item-counter" }, "Orders left: ", React.createElement("span", { className: "shop-item-counter-num" }, count)),
React.createElement("img", {
  className: "shop-item-image",
  src: img }),

React.createElement("h1", { className: "shop-item-name" },
name),

React.createElement("h2", { className: "shop-item-price" }, "$",
price),

React.createElement("img", { className: "shop-item-sticker", src: sticker}))));






ShopItem.PropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  sticker: PropTypes.string.isRequired};



// ShopItems
const ShopItems = ({ items }) => {
  if (!items.length) {
    return React.createElement("p", { className: "no-shop-items" }, "No items");
  }

  return (
    React.createElement("ul", { className: "shop-item-list" },
    items.map((item) =>
    React.createElement(ShopItem, {
      key: item.id,
      id: item.id,
      name: item.name,
      price: item.price,
      count: item.count,
      img: item.img,
      sticker: item.sticker }))));




};

ShopItems.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired }).
  isRequired).isRequired };



// ShopItemsContainer
const ShopItemsContainer = connect(
(state) => (
{
  items: state.stock }))(


ShopItems);


// Shop
const Shop = () =>
React.createElement("div", { className: "shop" },
React.createElement("h1", { className: "main-header shop-header" }, 
React.createElement("img", {
  className: "header-logo",
  src: 'logo.png' }),
React.createElement("img", {
  className: "earth-center-image",
  src: 'earth-try-now.png' }),
React.createElement("img", {
  className: "order-today-image",
  src: 'order-today.png' }),
React.createElement(ShopItemsContainer, null)));




// AddItem
const AddItem = ({ id, count, onSubmit }) => {
  if (!count) {
    return (
      React.createElement("p", { className: "item-sold-out" }, "Sold out!"));



  }

  handleClick = () => {
    this.setState(({ count }) => ({
      count: count + 1
    }));
  };

  return (
    React.createElement("form", {
      className: "item-add-form",
      onSubmit: e => {
        e.preventDefault();
        onSubmit(e, id);
      } },

    React.createElement("span", { className: "item-qty-label" }, "Qty:"),


    React.createElement("select", { className: "item-qty" },
    getOptionsArray(count).map((num) =>
    React.createElement("option", {
      key: num,
      value: num },

    num))),



    React.createElement("button", {
      className: "item-add-button",
      type: "submit" }, "Add to cart")));





};

AddItem.PropTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired };



// AddItemContainer
const addItemGetSelectedValue = (e) =>
e.target.getElementsByClassName('item-qty')[0].value;


const AddItemContainer = connect(
(state, ownProps) => (
{
  id: ownProps.id,
  count: state.stock.find(item => item.id === ownProps.id).count,
  inCart: state.cart.some(item => item.id === ownProps.id) }),


null,
(stateProps, dispatchProps, ownProps) => {
  const onSubmit = stateProps.inCart ? updateCartItem : addToCart;

  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: (e, id) => {
      dispatchProps.dispatch(onSubmit(id, addItemGetSelectedValue(e)));
    } });

})(
AddItem);


// Item
const Item = ({ id, name, description, price, img }) =>
React.createElement("div", { className: 'item item-' + id },
React.createElement("img", {
  className: "item-image",
  src: img }),

React.createElement("div", { className: "item-details" },
React.createElement("h1", { className: "item-name" },
name),

React.createElement("h2", { className: "item-price" }, "$",
price),



React.createElement("p", { className: "item-desc" },
description),

React.createElement(AddItemContainer, { id: id })));




Item.PropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired };



// ItemContainer
const ItemContainer = connect(
(state, ownProps) =>
state.stock.find(item => String(item.id) === ownProps.params.id))(

Item);


// CartItem
const CartItem = (
{ id, name, price, img, count, stockCount, onQtyChange, onRemoveClick }) =>

React.createElement("li", { className: 'cart-item cart-item-' + id },
React.createElement(Link, {
  to: '/item/' + id,
  className: "cart-item-image-link" },

React.createElement("img", {
  className: "cart-item-image",
  src: img })),


React.createElement("div", { className: "cart-item-info" },
React.createElement(Link, {
  to: '/item/' + id,
  className: "cart-item-name-link" },

React.createElement("h1", { className: "cart-item-name" },
name)),


React.createElement("div", { className: "cart-item-value" },
React.createElement("span", { className: "cart-item-price" }, "$",
price),

React.createElement("span", { className: "cart-item-qty" }, "Qty:",

React.createElement("select", {
  className: "cart-item-qty-select",
  value: count,
  onChange: e => onQtyChange(e, id) },

getOptionsArray(stockCount).map((num) =>
React.createElement("option", {
  key: num,
  value: num },

num)))))),






React.createElement("a", {
  href: "#",
  className: "cart-item-delete",
  onClick: e => {
    onRemoveClick(e, id);
  } }, "\xD7"));






CartItem.PropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  stockCount: PropTypes.number.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired };



// CartItems
const CartItems = ({ cart, onQtyChange, onRemoveClick }) => {
  if (!cart.length) {
    return React.createElement("p", { className: "empty-cart" }, "Cart is empty");
  }

  return (
    React.createElement("ul", { className: "cart-items" },
    cart.map((item) =>
    React.createElement(CartItem, {
      key: item.id,
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      count: item.count,
      stockCount: item.stockCount,
      onQtyChange: (e, id) => onQtyChange(e, id),
      onRemoveClick: (e, id) => onRemoveClick(e, id) }))));




};

CartItems.PropTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired }).
  isRequired).isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired };



// Total
const Total = ({ cart }) =>
React.createElement("div", { className: "cart-total" },
React.createElement("span", { className: "cart-total-label" }, "Total:"),


React.createElement("span", { className: "cart-total-value" }, " $",
cart.length ? cart.reduce((acc, item) =>
acc + item.price * item.count,
0) : Number(0)));




Total.PropTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired }).
  isRequired).isRequired };



// PayButton
const PayButton = ({ onPayClick }) =>
React.createElement("button", {
  type: "button",
  className: "cart-pay-button",
  onClick: () => onPayClick() }, "Pay now");





PayButton.PropTypes = {
  onPayClick: PropTypes.func.isRequired };



// Cart
const Cart = ({ cart, onQtyChange, onRemoveClick, onPayClick }) =>
React.createElement("div", { className: "cart" },

React.createElement("div", {className: "cart-container"},
React.createElement("h1", { className: "main-header cart-header" }, "MY CART"),
React.createElement(CartItems, {
  cart: cart,
  onQtyChange: onQtyChange,
  onRemoveClick: onRemoveClick }),

React.createElement(Total, { cart: cart })),
React.createElement("div", {className: "form-container"},

React.createElement("div", {className: "name"},
React.createElement("div", {className: "name-label"}, "Name"),
React.createElement("input", {type:"text"})),

React.createElement("div", {className: "phone-number"}, 
React.createElement("div", {className: "phone-label"}, "Phone Number"),
React.createElement("input", {type:"tel"})),

React.createElement("div", {className: "address"},
React.createElement("div", {className: "address-label"}, "Delivery Address"),
React.createElement("input", {type:"text"})),

React.createElement("div", {className: "instructions"},
React.createElement("div", {className: "instructions-label"}, "Special Instructions"),
React.createElement("input", {type:"text"})),

React.createElement("div", {className: "venmo"},
React.createElement("div", {className: "venmo-check-label"}, "Did you Venmo @yum-t86?")),

React.createElement("input", {type:"checkbox"})),
React.createElement(PayButton, { onPayClick: onPayClick }),
React.createElement("img", { className: "visa", src: 'payment.png' }));



Cart.PropTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired }).
  isRequired).isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onPayClick: PropTypes.func.isRequired };



// CartContainer
const cartGetSelectedValue = (e) =>
e.target.value;


const CartContainer = connect(
(state) => (
{
  cart: state.cart.map(cartItem => {
    const item = state.stock.find(stockItem => cartItem.id === stockItem.id);
    return {
      id: cartItem.id,
      name: item.name,
      price: item.price,
      img: item.img,
      count: cartItem.count,
      stockCount: item.count };

  }) }),


(dispatch) => (
{
  onQtyChange: (e, id) => {
    dispatch(updateCartItem(id, cartGetSelectedValue(e)));
  },

  onRemoveClick: (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart(id));
  },

  dispatch: reducer => dispatch(reducer) }),


(stateProps, dispatchProps, ownProps) =>
Object.assign({}, ownProps, stateProps, dispatchProps, {
  onPayClick: () =>
  stateProps.cart.map(item => {
    dispatchProps.dispatch(removeStockItem(item.id, item.count));
    dispatchProps.dispatch(removeFromCart(item.id));
  }) }))(


Cart);


// NoMatch
const NoMatch = () =>
React.createElement("p", { className: "no-match" }, "Sorry, the page you are looking for does not exist. Click above to go back to the shop.");






// App
const App = () =>
React.createElement(Router, { history: hashHistory },
React.createElement(Route, { path: "/", component: HeaderContainer },
React.createElement(IndexRoute, { component: Shop }),
React.createElement(Route, { path: "item/:id", component: ItemContainer }),
React.createElement(Route, { path: "cart", component: CartContainer }),
React.createElement(Route, { path: "*", component: NoMatch })));




const store = Redux.createStore(reducers, initialState);

ReactDOM.render(
React.createElement(Provider, { store: store },
React.createElement(App, null)),

document.getElementById('app'));