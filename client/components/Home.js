import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  const { username } = props;

  return (
    <div className="home-main-container">
      <table className="home-quadrant-table">
        <tbody>
          <tr>
            <th>
              <table id="home-table-left">
                <tbody>
                  <tr>
                    <th>Welcome back, {username} :)</th>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Hope you have been well~</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>New Order?</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </th>
            <th>
              <img img src={"/homelineright.png"} />
            </th>
          </tr>
          <tr>
            <th>
              <img img src={"/homelineleft.png"} />
            </th>
            <th>
              <table id="home-table-right">
                <tbody>
                  <tr>
                    <th>Soon To Arrive:</th>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Orders Here</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>
        </tbody>
      </table>
      <br></br>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
