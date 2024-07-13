// src/components/MyDocument.js
import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "./Vector Smart Object.png";
import sign from "./Layer 10.png";
import moment from "moment";

const chemlist = [
  {
    title: "Chemtech Fertilisers Private Limited",
    desc: `Ssp (p),ssp (gr), Npk 18:18:9 (g), Npk 20:10:10 (g), Npk 22:0:11 (g), Npk 17:17:17 (g), Nk 15:15:15 (g) Npk 19:19:19 (g), Npk 20:20:0 (g)`,
  },
  {
    title: "Nagarjuna Fertilisers &Chemicals Limited",
    desc: `Urea, Nem Coated Urea, (Imported Nem Coated Urea, DAP, MOP, 20:20:0:13, Sulpher, Boi Fertilizers, Azospirilum, Rhizobium, PSB (Phosphobactor)`,
  },
  {
    title: "Fertis India Private Limited",
    desc: `Mono Potassium Phosphate-0:52:34 (MKP), Potassium Nitrate 13:0:45 (Klassic) Calcium Nitrate (CN), Urea Phosphate NPK 19.19.19 (Peck / Zetol Sure) NPK 13:40:13 (Peek)`,
  },
  {
    title: "Pradeep Phosphate Limited",
    desc: `DAP 18:46:0, NPKS 20:20:0:13, NPK 28:28:0, NPK 12:32:16, NPK 10:26:26, NPK 14:35:14, APS (16:20:0:13), AS (IMP), M.O.P. (IMP), DAP (IMP), NPKS 15:15:15:09, Potassium Nitrate (IMP) 13:0:45, PS (IMP) 0:0:50, CN 15% (IMP), NPKS 16:20:0:13 (IMP), 10:26:26 (IMP)`,
  },
  {
    title: "Iffco Limited",
    desc: `Neem coated Urea 46% N, DAP 18-46-0, DAP Imported 18-46-0, MAP 11-52-0, NP 20-20-0 (Imported), NPKS 20-20-0-13, NPK 10-26-26, NPK 12-32-16, PK 17-17-17, NPK 28-28-0, NPK Imported 10-26-26, MOP Imported 0-0-60,Urea Phosphate (WSF) 17-44-0, Boron Imported 20%, Calcium Nitrate Imported, Mono Ammonium Phosphate (MAP) 12-61-0 (Imported), Potassium Nitrate (NOP) Azospirillum, Liquid Consortia, Nano Urea (Liquid), Sulphate of Potash 0-0-50`,
  },

  {
    title: "Zuauri Agro Chemicals Limited",
    desc: `Urea, Neem Coated Urea, APS (20:20:0), NP 28-28-0, DAP 18-46-0, DAP (Imported), MOP (Imported), SSP (16%) P&G, 10:26:26, 19:19:19, 14:35:14, 12:32:16, 15:15:15 (NPK Complex), DI Sodium Octa, Borate Tetra Hydrate, 0-52-34 (100% WSC), 12-61-0 (100% WSC),`,
  },
  {
    title: "Greenstar Fertilizers Limited.",
    desc: `AP Micronutrient Mixture Formula No. 1,2,3,4,5,6 & 7. Zine EDTA 12%, Fe-EDTA 12% Znie Sulphate 21%, Ferous Sulphate 3% (Monohydrate), Ferous Sulphate-19%, Copper Sulphate 24%, Magnesium Sulphate 9.6%, Borax 10.5%, Manganese Sulphate 30.5%, Borax 19%, Di-Sodium Octa Borate Tetra Hydrate-B-20%, Boric Acdi 17%. Ammonium Chloride 25% (N), Single Super Phosphate 16% PSG, Water Soluble Fertilizers-19:19:19, 13:0:45.MAP MKP, SOP, CN, City Compost. DAP 18:46:0. ASP 20:20:0:13. (SPIC) Organic Potassium`,
  },
  {
    title: "SPIC Limited",
    desc: `Urea 46.2% Indigenous, Urea 46% Pool, DAP 18:46.0, DAP (Imp) 18:46:0, MOP. 20:20:0.13 (ind) 17:17:17 (ind) [SSP 16% Powder. Nem Coard Urea 46. 2%, Nem Coated Urea (Pool) 46%"}]`,
  },
];

Font.register({
  family: "Neuton",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#d2e7d6",
    padding: "5px",
  },
  section1: {
    display: "flex",
    margin: "10px 15px",
    border: "2px solid #799393",
    borderRadius: "6px",
    backgroundColor: "white",
    justifyContent: "center",
  },
  section1Left: { padding: 5 },
  section1Right: {
    padding: 5,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  section1RightText: {
    fontSize: "11px",
    opacity: "0.75",
    marginTop: "5px",
    justifyContent: "center",

    fontWeight: 700,
  },
  section: {
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    border: "2px solid #799393",
    borderRadius: "10px",
    backgroundColor: "white",
    margin: "10px 15px",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "0px 5px",
  },

  tableCol1: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "4px",
    fontSize: 9,

    fontWeight: 600,
  },
  tableCellMultiple: {
    margin: "4px 0px",
    paddingLeft: "10px",
    fontSize: 9,

    fontWeight: 600,
  },

  tableCellSub: {
    margin: "3px 15px",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    fontWeight: 600,
  },
  fontStyle: {
    fontFamily: "Neuton",
    fontSize: "24px",
    color: "#87cf79",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
});

// Create Document Component
const MyDocument = ({ data, sno }) => {
  if (data === null || !data) return;
  const dealer = data.customFields?.find((item) => item.label === "TYPE");
  const aglNo = data?.customFields?.find((item) => item.label === "AGL NO");
  const dealerDOE = data?.customFields?.find(
    (item) => item.label === "Date of Expiry"
  );
  const dealerDOI = data.customFields?.find(
    (item) => item.label === "Date of Issue"
  );
  const dealerIssuer = data?.customFields?.find(
    (item) => item.label === "ISSUER"
  );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section1}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px 30px",
            }}
          >
            <Image alt="" src={logo} style={{ height: "70px" }} />

            <View style={styles.section1Right}>
              <Text style={styles.fontStyle}>
                INFINIS AGRITECH PRIVATE LIMITED
              </Text>
              <Text style={styles.section1RightText}>
                11-5-155, 2nd Floor, Bhavani Nager, Moosapet, Hyderabad, Medchal
                - Malkajiri, Telangana-500018
              </Text>
              <Text style={styles.section1RightText}>
                {" "}
                Email: info@infinis.in Phone: 9515802627
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "2px",
              backgroundColor: "#799393",
              marginTop: "5px",
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "5px 10px",
              alignItems: "center",
              width: "100%",
              margin: "3px 0px",
            }}
          >
            <Text
              style={{ fontSize: "11px", width: "33.33%", fontWeight: "bold" }}
            >
              S.no: {sno}
            </Text>
            <Text
              style={{
                textAlign: "center",
                padding: "5px 3px",
                borderRadius: "4px",
                fontSize: "12px",
                backgroundColor: "grey",
                color: "white",
              }}
            >
              {" "}
              FORM `O`
            </Text>
            <Text
              style={{
                fontSize: "11px",
                width: "33.33%",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              Date of Issue: {moment().format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
        <View
          style={{
            fontSize: "11px",
            margin: "0px 30px",
          }}
        >
          <Text>
            1. Particulars of the concern issuing the Certificate of source.
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(a) Name and Full Address</Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text
                style={{
                  ...styles.tableCell,
                  fontSize: "13.5px",
                  color: "#87cf79",
                }}
              >
                INFINIS AGRITECH PRIVATE LIMITED
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  paddingBottom: "5px",
                  paddingLeft: "5px",

                  fontWeight: 600,
                }}
              >
                11-5-155, 2nd Floor, Bhavani Nager, Moosapet, Hyderabad,{"\n"}
                Medchal - Malkajiri, Telangana-500018
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(b) Status</Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}>
                WHOLESALE DEALER IN THE STATE OF TELANGANA{" "}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                (c) If manufacturer of mixture of fertilizers, the details of
                certificate of manufacturer of mixture of fertilizers possessed.
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}>NOT APPLICABLE</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                (d) Details of certificate of registration
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}></Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(i) Number </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}>2320018</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(i) Date Of issue </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}>30/05/2023</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(ii) Date Of Expiry </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              {" "}
              <Text style={styles.tableCell}>28/05/2027</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol, borderBottom: "0" }}>
              <Text style={styles.tableCell}>
                (iv) Authority by whom issued
              </Text>
            </View>
            <View
              style={{ ...styles.tableCol, borderBottom: "0", borderRight: 0 }}
            >
              <Text style={styles.tableCell}>
                COMMISSIONER AND DIRECTOR OF AGRICULTURE, TELANGANA, HYDERABAD
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            fontSize: "11px",
            margin: "0px 30px",
          }}
        >
          <Text
            style={{
              fontStyle: "bold",
            }}
          >
            2. Particulars of the person to whom the Certificate of source is
            being issued
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(a) Name and Full Address</Text>
            </View>
            <View
              style={{
                ...styles.tableCol,
                borderRight: 0,
                padding: 0,
                margin: "0",
                justifyContent: "center",
              }}
            >
              <View style={styles.tableRow}>
                {" "}
                <Text style={{ ...styles.tableCellMultiple }}>
                  {data.name.toUpperCase()}
                </Text>
              </View>
              <View
                style={{ ...styles.tableRow, borderTop: "1px solid black" }}
              >
                {" "}
                <Text style={{ ...styles.tableCellMultiple }}>
                  {data.street.toUpperCase()}
                </Text>
              </View>
              <View
                style={{ ...styles.tableRow, borderTop: "1px solid black" }}
              >
                {" "}
                <Text style={{ ...styles.tableCellMultiple }}>
                  {data.city.toUpperCase()}, {data.state.toUpperCase()}, INDIA -{" "}
                  {data.pincode}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(b) Status</Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>
                {/* {
                  dealer?.options?.find((child) => child.value === dealer.value)
                    ?.label
                }{" "} */}
                RETAIL DEALER
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                (c) If holders a valid certificate of registration the details
                there of
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>(i) Number </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>{aglNo?.value ?? ""}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>(ii) Date Of issue </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>
                {dealerDOI?.value &&
                  moment(dealerDOI?.value).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>(iii) Date Of Expiry </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>
                {dealerDOE?.value &&
                  moment(dealerDOE?.value).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>
                (iv) Authority by whom issued
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}> {dealerIssuer?.value ?? ""}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                (d) Purpose of obtaining hte certificate of source
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>
                (i) For obtaining a fresh certificate of registration
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>-</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>
                (ii) For renewal of the certificateof registration{" "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>-</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellSub}>
                (iii) For Amendment ni certificate of registration
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRight: 0 }}>
              <Text style={styles.tableCell}>YES</Text>
            </View>
          </View>
          <View
            style={{
              ...styles.tableRow,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 10,

                padding: "15px",
                width: "75%",
                fontWeight: 600,
              }}
            >
              DECLARATION: Declared that the fertilizers mentioned above wil be
              supplied confirming tothe standards laid down under fertilizers
              (Control) Order, 1985 and as the case may be grades formulations
              of mixtures of fertilizer by the central, State Government and
              packed and marked in container as provide under clause 21 of
              fertilizer (Control) Order 1985.
            </Text>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "3px 10px",
              }}
            >
              {" "}
              <Image src={sign} style={{ height: "90px", width: "90px" }} />
              <Text style={{ fontSize: 9 }}>
                Authorized Signature with seal
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        {" "}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text
              style={{
                fontSize: "13px",
                padding: "10px",
                borderBottom: "1px solid gray",
                width: "100%",
              }}
            >
              3. Detail of fertilizer(s) Supplied : Principal Certificate
            </Text>
          </View>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol1, width: "6%" }}>
              <Text style={styles.tableCell}>S.No</Text>
            </View>
            <View
              style={{ ...styles.tableCol1, width: "47%", padding: "2px 0px" }}
            >
              <Text style={styles.tableCell}>
                {" "}
                Name of the Manufacturers & Suppliers
              </Text>
            </View>
            <View
              style={{
                ...styles.tableCol1,
                width: "47%",
                padding: "2px 0px",
                borderRight: "0",
              }}
            >
              <Text style={styles.tableCell}>
                Name Of the Products / Brand Name
              </Text>
            </View>
          </View>

          {chemlist.map((item, index) => {
            return (
              <>
                <View style={styles.tableRow}>
                  <View
                    style={{
                      ...styles.tableCol1,
                      width: "6%",
                      borderBottom: index === 7 ? "0" : "1px",
                    }}
                  >
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1,
                      width: "47%",
                      borderBottom: index === 7 ? "0" : "1px",
                    }}
                  >
                    <Text style={styles.tableCell}>{item.title}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1,
                      width: "47%",
                      borderBottom: index === 7 ? "0" : "1px",
                      borderRight: "0",
                    }}
                  >
                    <Text style={{ ...styles.tableCell, lineHeight: "1.8px" }}>
                      {item.desc}{" "}
                    </Text>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
