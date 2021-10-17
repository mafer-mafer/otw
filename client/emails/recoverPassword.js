import axios from "axios";
export const resetPasswordEmail = async (username, email, link) => {
  try {
    let data = await axios.post(`/api/mail/send`, {
      email: email,
      subject: "Reset Password - K-On The Way!",
      text: "Link for resetting your password.",
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>K-On The Way! Reset Password</title>
    <style>
      @media only screen and (max-width: 620px) {
        table[class="body"] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }

        table[class="body"] p,
        table[class="body"] ul,
        table[class="body"] ol,
        table[class="body"] td,
        table[class="body"] span,
        table[class="body"] a {
          font-size: 16px !important;
        }

        table[class="body"] .wrapper,
        table[class="body"] .article {
          padding: 10px !important;
        }

        table[class="body"] .content {
          padding: 0 !important;
        }

        table[class="body"] .container {
          padding: 0 !important;
          width: 100% !important;
        }

        table[class="body"] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        table[class="body"] .btn table {
          width: 100% !important;
        }

        table[class="body"] .btn a {
          width: 100% !important;
        }

        table[class="body"] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }

        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }

        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }

        .btn-primary table td:hover {
          background-color: #64d8bd !important;
        }

        .btn-primary a:hover {
          background-color: #64d8bd !important;
        }
      }
    </style>
  </head>
  <body
    class=""
    style="
      background-color: #f6f6f6;
      font-family: sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      line-height: 1.4;
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    "
  >
    <span
      class="preheader"
      style="
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      "
      >Reset Password - K-On The Way!</span
    >
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
      style="
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #fdebfc;
        width: 100%;
      "
      width="100%"
      bgcolor="#fdebfc"
    >
      <tr>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top"
          valign="top"
        >
          &nbsp;
        </td>
        <td
          class="container"
          style="
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
            display: block;
            max-width: 580px;
            padding: 10px;
            width: 580px;
            margin: 0 auto;
          "
          width="580"
          valign="top"
        >
          <div
            class="content"
            style="
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
            "
          >
            <!-- START CENTERED WHITE CONTAINER -->
            <table
              role="presentation"
              class="main"
              style="
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background: #ffffff;
                border-radius: 15px;
                width: 100%;
                box-shadow: -5px 5px #ff35dc;
              "
              width="100%"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td
                  class="wrapper"
                  style="
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top;
                    box-sizing: border-box;
                    padding: 20px;
                  "
                  valign="top"
                >
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse: separate;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      width: 100%;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        style="
                          font-family: sans-serif;
                          font-size: 14px;
                          vertical-align: top;
                        "
                        valign="top"
                      >
                        <a
                          href="kontheway.herokuapp.com"
                          target="_blank"
                          style="color: #3498db; text-decoration: underline"
                          ><h3
                            style="
                              color: #000000;
                              font-family: 'PT Sans Narrow', sans-serif;
                              font-weight: 600;
                              font-size: 28px;
                              line-height: 1.4;
                              margin: 0;
                              margin-bottom: 30px;
                              text-shadow: -1px 1px #ff35dc;
                              text-decoration: underline;
                            "
                          >
                            K - On The Way! ○ ○ ○ ➲
                          </h3></a
                        >
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          Hi ${username},
                        </p>
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          We have received a request to reset your password.
                          Press the button below to continue.
                        </p>
                        <br />
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="btn btn-primary"
                          style="
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            box-sizing: border-box;
                            width: 100%;
                          "
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                align="left"
                                style="
                                  font-family: sans-serif;
                                  font-size: 14px;
                                  vertical-align: top;
                                  padding-bottom: 15px;
                                "
                                valign="top"
                              >
                                <table
                                  role="presentation"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="
                                    border-collapse: separate;
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    width: auto;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          font-family: sans-serif;
                                          font-size: 14px;
                                          vertical-align: top;
                                          border-radius: 15px;
                                          text-align: center;
                                          background-color: #3498db;
                                        "
                                        valign="top"
                                        align="center"
                                        bgcolor="#3498db"
                                      >
                                        <a
                                          href="${link}"
                                          target="_blank"
                                          style="
                                            border-radius: 15px;
                                            box-sizing: border-box;
                                            cursor: pointer;
                                            display: inline-block;
                                            font-size: 14px;
                                            font-weight: bold;
                                            margin: 0;
                                            padding: 12px 25px;
                                            text-decoration: none;
                                            text-transform: capitalize;
                                            box-shadow: -5px 5px #ff35dc;
                                            background-color: #68eccd;
                                            color: #000000;
                                            border: 2px dotted #000000;
                                            text-shadow: -1px 1px #ffffff;
                                          "
                                          >Reset Password</a
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          If you did not request a password reset, please change
                          your password for security purposes.
                        </p>
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          For any questions or problems, please check out the
                          <a
                            href="https://discord.gg/VFVypKebxy"
                            target="_blank"
                            style="color: #3498db; text-decoration: underline"
                            >Discord</a
                          >
                          Server.
                        </p>
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          Thank you for using this service.
                        </p>
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          Best,
                        </p>
                        <p
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                          "
                        >
                          K-On The Way!
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

            <!-- START FOOTER -->
            <div
              class="footer"
              style="
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%;
              "
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  width: 100%;
                "
                width="100%"
              >
                <tr>
                  <td
                    class="content-block"
                    style="
                      font-family: sans-serif;
                      vertical-align: top;
                      padding-bottom: 10px;
                      padding-top: 10px;
                      color: #999999;
                      font-size: 12px;
                      text-align: center;
                    "
                    valign="top"
                    align="center"
                  >
                    <span
                      class="apple-link"
                      style="
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                      "
                      >K-On The Way! © 2021</span
                    >
                    <br />
                  </td>
                </tr>
                <tr>
                  <td
                    class="content-block powered-by"
                    style="
                      font-family: sans-serif;
                      vertical-align: top;
                      padding-bottom: 10px;
                      padding-top: 10px;
                      color: #999999;
                      font-size: 12px;
                      text-align: center;
                    "
                    valign="top"
                    align="center"
                  >
                    Powered by
                    <a
                      href="http://htmlemail.io"
                      style="
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                        text-decoration: none;
                      "
                      >HTMLemail</a
                    >.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->
          </div>
        </td>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top"
          valign="top"
        >
          &nbsp;
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
