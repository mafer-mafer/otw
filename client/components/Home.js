import React from "react";
import { connect } from "react-redux";
import FormContainer from "./FormContainer";
import { addNewOrder } from "../store/singleOrder";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "orderDate",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(state) {
    this.props.createOrder(state, this.props.auth.id);
  }

  render() {
    const { username, isLoggedIn } = this.props;
    return (
      <div className="home-main-container">
        <table className="home-quadrant-table">
          <tbody>
            <tr>
              <th>
                <table className="tables" id="home-table-left">
                  {isLoggedIn ? (
                    <tbody>
                      <tr>
                        <th>Welcome Back, {username} :)</th>
                      </tr>
                      <tr>
                        <td>Hope you're having a great day~</td>
                      </tr>
                      <tr>
                        <td>♥♥</td>
                      </tr>
                      <tr>
                        <td>Have a new order to log?</td>
                      </tr>
                      <tr>
                        <td>
                          <FormContainer
                            userId={this.props.auth.id}
                            handleSubmit={this.handleSubmit}
                            purpose={"NewOrderHome"}
                            buttonText="+New Order"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <th>Welcome Collector~</th>
                      </tr>
                      <tr>
                        <td>♥♥</td>
                      </tr>
                      <tr>
                        <td>Tired of forgetting your trades and purchases?</td>
                      </tr>
                      <tr>
                        <td>Can't remember whose Group Order you joined?</td>
                      </tr>
                      <tr>
                        <td id="home-left-bold">
                          K-On The Way is the App for You!
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </th>
              <th>
                <img src="/homelineright.png" />
              </th>
            </tr>
            <tr>
              <th>
                <img src="/homelineleft.png" />
              </th>
              <th>
                <table className="tables" id="home-table-right">
                  {isLoggedIn ? (
                    <tbody>
                      <tr>
                        <th>Updates:</th>
                      </tr>
                      <tr>
                        <td>-USPS Tracking Coming Soon!</td>
                      </tr>
                      <tr>
                        <td>♥♥♥</td>
                      </tr>
                      <tr>
                        <td>Join the Discord for Updates + Feedback!</td>
                      </tr>
                      <tr>
                        <td>
                          <FormContainer
                            purpose="Community"
                            buttonText="+Learn More!"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <th id="home-right-header">
                          Log In or Sign Up To Start!
                        </th>
                      </tr>
                      <tr>
                        <td>♥</td>
                      </tr>
                      <tr>
                        <td>
                          <FormContainer
                            purpose={"LogIn"}
                            buttonText="+Log In"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormContainer
                            purpose={"SignUp"}
                            buttonText="+Sign Up"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </th>
            </tr>
          </tbody>
        </table>
        <br></br>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrder: (newOrderData, user) =>
      dispatch(addNewOrder(newOrderData, user, history)),
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
