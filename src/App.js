// src/App.js
import axios from "axios";
import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./document";
const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [download, setDownload] = useState(false);
  const [sno, setSno] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.refrens.com/businesses/infinis/clients",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7ImVudGl0eSI6InVzZXIiLCJzdHJhdGVneSI6Imp3dCIsIl9wbiI6Ijdibm5pNXp2MWQifSwidXNlciI6eyJuYW1lIjoiS3Jpc2huYSIsImVtYWlsIjoic2Fpa3Jpc2huYS5wdWJsaWNAZ21haWwuY29tIiwiYnVzaW5lc3NlcyI6WyJpbmZpbmlzIl19LCJleHAiOjE3Mjc3ODY5ODcsImlhdCI6MTcxODM0NDk1NywiYXVkIjoic2VyYW5hIiwiaXNzIjoic2VyYW5hIiwic3ViIjoiNjY1ZGJiYjk0OGNhNGIwMDI3NGNmMDI0IiwianRpIjoiMTRiMDlkYmUtOGFjYS00ODNkLThjMzQtYTdlOGEzNjU2YTA3In0.jALwi4w_Hy9wYBf3xIFxHFbnWplbyMG9AkAPfBHFRrk",
            Connection: "keep-alive",
            Origin: "https://www.refrens.com",
            Referer: "https://www.refrens.com/app/infinis/clients",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 Edg/125.0.0.0",
            "sec-ch-ua":
              '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "x-refrens-qs-hr": "https://www.google.com/",
            "x-refrens-qs-lp": "https://www.refrens.com/api",
            "x-refrens-wr-retry": "4",
          },
          params: {
            populateFeedback: true,
            $sort: { createdAt: -1 },
            business: "infinis",
            $limit: 50,
            $skip: 0,
            $sqs: {
              $query: query + "*",
              $fields: ["name^5", "alias", "email", "phone"],
            },
            $queryType: "es",
            isClient: true,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    buttonDiv: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    button: {
      border: "1px solid orange",
      outline: "none",
      boxShadow: "none",
      margin: "10px",
      width: "100px",
      textAlign: "center",
      padding: "10px",
      borderRadius: "8px",
      background: "orange",
      color: "white",
      textDecoration: "none",
    },
  };
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: "#d2e7d6",
          padding: "20px 20px",
          fontWeight: "600",
        }}
      >
        INFINIS AGRITECH PRIVATE LIMITED
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 20,
        }}
      >
        <label>S.no</label>{" "}
        <input
          style={{
            padding: 10,
            marginRight: 20,
            borderRadius: "8px",
            width: "250px",
          }}
          type="text"
          value={sno}
          onChange={(e) => {
            setSno(e.target.value);
          }}
          placeholder="Enter S.no"
        />
        <label>Trader/Retail name</label>{" "}
        <input
          style={{
            padding: 10,
            marginRight: 10,
            borderRadius: "8px",
            width: "250px",
          }}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter Trader Name"
        />
        <button
          style={{
            padding: 10,
            borderRadius: "8px",
            fontSize: "14px",
            border: "none",
            background: "#799393",
            color: "white",
          }}
          type="submit"
        >
          {loading ? "Loading.." : "Submit"}
        </button>
      </form>

      {error && <p>{error}</p>}
      {data && (
        <div>
          {data.map((item, index) => {
            const fmsID = item.customFields.find(
              (child) => child.label === "FMSID"
            );
            return (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px 20px",
                  borderBottom: "1px solid gray",
                }}
              >
                <div style={{ width: "30%" }}>
                  {index + 1}. {item.name} - {fmsID?.value}
                </div>
                <div style={{ width: "40%" }}>
                  {item.street},{item.city} {item.state},{item.pincode}
                </div>
                <div style={{ width: "20%" }}>{item.phone}</div>
                <div style={{ width: "10%" }}>
                  {" "}
                  <button
                    style={{
                      padding: 10,
                      borderRadius: "8px",
                      fontSize: "14px",
                      border: "none",
                      background: "#799393",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedData(item);
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* <PDFViewer style={{ height: "80vh" }}>
        <EwayBill data={selectedData} />
      </PDFViewer> */}
      {/* <PdfAnnotator2 /> */}
      {selectedData && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PDFDownloadLink
            style={styles.button}
            className="sd-btn-orange"
            document={<MyDocument data={selectedData} sno={sno} />}
            fileName={`FORM(O)-${
              selectedData.customFields.find((item) => item.label === "FMSID")
                .value
            }.pdf`}
          >
            {({ blob, url, loading, error }) => {
              return download
                ? "Loading..."
                : loading
                ? "Loading..."
                : "Download";
            }}
          </PDFDownloadLink>
        </div>
      )}
      {selectedData && (
        <PDFViewer style={{ height: "80vh" }}>
          <MyDocument data={selectedData} sno={sno} />
        </PDFViewer>
      )}
    </div>
  );
};

export default App;

// const customerdata = [
//   {
//     _meta: {
//       _index: "m_refrens_clients",
//       _id: "666bd83dd59a7a00209f283d",
//       _score: null,
//       sort: [1718343741073],
//     },
//     panNumber: "BYYPP4844E",
//     email: null,
//     phoneShowInInvoice: true,
//     emailShowInInvoice: false,
//     vatLabel: "VAT Number",
//     source: "CLIENT_DASHBOARD",
//     isVendor: false,
//     isBilledClient: true,
//     isClient: true,
//     isArchived: false,
//     isHardRemoved: false,
//     locale: "en-IN",
//     avgPayingDate: 0,
//     clientType: "COMPANY",
//     name: "DHANYA SRI TRADERS",
//     alias: "DHANYA SRI TRADERS",
//     country: "IN",
//     street: "H NO 1-92, NAGANPALLY, KAGNTI MANDAL",
//     city: "SANGAREDDY",
//     state: "Telangana",
//     pincode: "502287",
//     gstState: "36",
//     customFields: [
//       {
//         key: "lzvreposkbn",
//         label: "FMSID",
//         dataType: "TEXT",
//         params: {
//           showInInvoice: true,
//         },
//         value: "1169584",
//         options: [],
//       },
//       {
//         key: "p8z2fg0qxk",
//         label: "Date of  Issue",
//         dataType: "DATE",
//         params: {
//           showInInvoice: null,
//         },
//         value: "2019-06-09T18:30:00.000Z",
//         options: [],
//       },
//       {
//         key: "nas7o1ig2g",
//         label: "TYPE",
//         dataType: "SELECT",
//         params: {
//           showInInvoice: null,
//         },
//         value: "x4uqutf1f4",
//         options: [
//           {
//             label: "RETAILER",
//             value: "x4uqutf1f4",
//             isArchived: false,
//           },
//           {
//             label: "WHOLESALER",
//             value: "aclzoisa41q",
//             isArchived: false,
//           },
//         ],
//       },
//       {
//         key: "r093ynuqgrr",
//         label: "AGL NO",
//         dataType: "TEXT",
//         params: {
//           showInInvoice: null,
//         },
//         value: "SRD/02/ADA/FR/2019/23310",
//         options: [],
//       },
//       {
//         key: "v8x9059vsy",
//         label: "Date of Expiry",
//         dataType: "DATE",
//         params: {
//           showInInvoice: null,
//         },
//         value: "2027-06-07T18:30:00.000Z",
//         options: [],
//       },
//       {
//         key: "jgapmndk9ra",
//         label: "ISSUER",
//         dataType: "TEXT",
//         params: {
//           showInInvoice: null,
//         },
//         value: "ASSISTANT DIRECTOR OF AGRICULTURE NARAYANKHED",
//         options: [],
//       },
//     ],
//     gstin: "36BYYPP4844E1ZR",
//     uniqueKey: "1718343393597",
//     taxPayerType: "REG",
//     business: {
//       name: "INFINIS AGRITECH PRIVATE LIMITED",
//       alias: "INFINIS",
//       urlKey: "infinis",
//       currency: "INR",
//       updatedAt: "2024-06-14T13:53:29.924Z",
//       _id: "648c008602aa8e0012c9d2d4",
//     },
//     customFieldsOld: [],
//     files: [],
//     shippingDetails: [],
//     cc: [],
//     shareId: "49xKZCDWH0Rb9bJn4l",
//     createdAt: "2024-06-14T05:42:21.073Z",
//     updatedAt: "2024-06-14T13:53:06.021Z",
//     __v: 0,
//     balance: {
//       currency: "INR",
//     },
//     phone: "+919949560960",
//     ledgerId: "509e7bdb-6513-4410-afb6-ef7205196107",
//     _id: "666bd83dd59a7a00209f283d",
//     isPortfolioClient: false,
//   },
// ];
