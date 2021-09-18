// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import classNames from "classnames";
// import { countries } from "../../script/countries";
// import { editOrder, setSingleOrder } from "../store/singleOrder";

// export class EditOrder extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       items: [],
//       seller: "",
//       platform: "",
//       type: "",
//       dateOrdered: "",
//       onHand: false,
//       onHandDate: "",
//       sellerLocation: "",
//       shippingType: "",
//       tracking: "",
//       shipped: false,
//       dateShipped: "",
//       arrived: false,
//       proofGiven: false,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     try {
//       if (this.props.auth.id) {
//         this.props.getOrder(this.props.match.params.orderId);
//         const order = this.props.order;
//         this.setState({
//           seller: order.seller || "",
//           platform: order.platform || "Twitter",
//           type: order.type || "Purchase",
//           dateOrdered: order.dateOrdered || "",
//           onHand: order.onHand || false,
//           onHandDate: order.onHandDate || null,
//           sellerLocation: order.sellerLocation || "Unknown",
//           shippingType: order.shippingType || "Stamped",
//           tracking: order.tracking || "",
//           shipped: order.shipped || false,
//           dateShipped: order.dateShipped || null,
//           arrived: order.arrived || false,
//           proofGiven: order.proofGiven || false,
//           items: order.items || [],
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   handleChange(e) {
//     if (e.target.value === "false") {
//       this.setState({
//         [e.target.name]: true,
//       });
//     } else if (e.target.value === "true") {
//       this.setState({
//         [e.target.name]: false,
//       });
//     } else {
//       this.setState({
//         [e.target.name]: e.target.value,
//       });
//     }
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     //this.setState({ dateOrdered: new Date(this.state.dateOrdered) });
//     console.log(this.state);
//     this.props.editOrder(this.props.order.id, { ...this.state });
//   }

//   render() {
//     console.log(this.state);
//     const { handleSubmit, handleChange } = this;
//     const {
//       seller,
//       sellerLocation,
//       type,
//       platform,
//       dateOrdered,
//       onHand,
//       onHandDate,
//       shipped,
//       shippedDate,
//       shippingType,
//       tracking,
//       arrived,
//       proofGiven,
//     } = this.state;
//     return (
//       <div className="after-scallop">
//         <h3>
//           <span className="title-groups">Edit Order:</span>
//           <Link to="/orders">
//             <span className="edit-groups">Cancel</span>
//           </Link>
//         </h3>
//         <form id="new-order" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="seller">Seller:</label>
//             <input name="seller" onChange={handleChange} value={seller} />
//           </div>
//           <br></br>
//           <div>
//             <label htmlFor="platform">Platform:</label>
//             <select name="platform" onChange={handleChange} value={platform}>
//               <option value="Twitter">Twitter</option>
//               <option value="Instagram">Instagram</option>
//               <option value="eBay">eBay</option>
//               <option value="Mercari">Mercari</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <br></br>
//           <div>
//             <label htmlFor="type">Seller's Location:</label>
//             <select
//               name="sellerLocation"
//               onChange={handleChange}
//               value={sellerLocation}
//             >
//               <option value="Unkown">Unknown</option>
//               {countries.map((country, idx) => {
//                 return (
//                   <option value={`${country}`} key={idx}>{`${country}`}</option>
//                 );
//               })}
//             </select>
//           </div>
//           <br></br>
//           <div>
//             <label htmlFor="type" value={type}>
//               Type:
//             </label>
//             <select name="type" onChange={handleChange}>
//               <option value="Purchase">Purchase</option>
//               <option value="Trade">Trade</option>
//               <option value="Group Order">Group Order</option>
//             </select>
//           </div>
//           <br></br>
//           <div>
//             <label htmlFor="dateOrdered">Date Ordered:</label>
//             <input
//               type="date"
//               id="dateOrdered"
//               name="dateOrdered"
//               value={dateOrdered}
//               onChange={handleChange}
//             />
//           </div>
//           <br></br>
//           <div className="type-radio">
//             <span>On Hand:</span>
//             <br></br>
//             <input
//               id="on-hand-checkbox"
//               type="checkbox"
//               name="onHand"
//               onChange={handleChange}
//               value={onHand}
//             />
//           </div>
//           {onHand ? (
//             <div>
//               <label htmlFor="dateOrdered">On Hand Date:</label>
//               <input
//                 type="date"
//                 id="onHandDate"
//                 name="onHandDate"
//                 value={onHandDate}
//                 onChange={handleChange}
//               />
//             </div>
//           ) : (
//             <span />
//           )}
//           <br></br>
//           <div>
//             <label htmlFor="shippingType">Type:</label>
//             <select name="shippingType" onChange={handleChange}>
//               <option value="Stamped">Stamped</option>
//               <option value="Tracked">Tracked</option>
//               <option value="EMS">EMS</option>
//               <option value="DHL">DHL</option>
//               <option value="Boat">Boat</option>
//             </select>
//           </div>
//           <br></br>
//           <div>
//             <span>Order Shipped?</span>
//             <br></br>
//             <input
//               type="checkbox"
//               name="shipped"
//               onChange={handleChange}
//               value={shipped}
//             />
//           </div>
//           <br></br>
//           {shipped ? (
//             <div>
//               <label htmlFor="dateShipped">Shipping Date:</label>
//               <input
//                 type="date"
//                 id="shippedDate"
//                 name="shippedDate"
//                 value={shippedDate}
//                 onChange={handleChange}
//               />
//             </div>
//           ) : (
//             <span></span>
//           )}
//           {shippingType !== "Stamped" ? (
//             <div>
//               <label htmlFor="tracking">Tracking:</label>
//               <input name="tracking" onChange={handleChange} value={tracking} />
//             </div>
//           ) : (
//             <span></span>
//           )}
//           <div>
//             <span>Order Arrived?</span>
//             <br></br>
//             <input
//               type="checkbox"
//               name="arrived"
//               onChange={handleChange}
//               value={arrived}
//             />
//           </div>
//           <br></br>
//           <div>
//             <span>Proof Sent to Seller?</span>
//             <br></br>
//             <input
//               type="checkbox"
//               name="proofGiven"
//               onChange={handleChange}
//               value={proofGiven}
//             />
//           </div>
//           <br></br>
//           <div>
//             <p>
//               <button type="submit">Submit</button>
//             </p>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     order: state.singleOrder,
//   };
// };

// const mapDispatchToProps = (dispatch, { history }) => {
//   return {
//     getOrder: (id) => dispatch(setSingleOrder(id)),
//     editOrder: (orderId, order) => dispatch(editOrder(orderId, order, history)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
