// src/components/MyDocument.js
import React, { useEffect } from "react";
import QRCode from "qrcode";
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

import moment from "moment";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "5px",
  },
  section1: {
    width: "100%",
    display: "flex",
    margin: "10px 15px",
    borderRadius: "6px",
    backgroundColor: "white",
    justifyContent: "space-between",
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
    fontFamily: "Helvetica-Bold",
    fontSize: "26px",
    color: "#87cf79",
    fontWeight: 600,
    letterSpacing: "1px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  f16: { fontSize: "8px" },
});

// Create EwayBill Component
const EwayBill = () => {
  const getQRCode = async (text) => {
    const qrCodeDataURL = await QRCode.toDataURL(text);
    return qrCodeDataURL;
  };
  // const base64Data = `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CFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdL/r+/3C+PU7UsDQplbmRzdHJlYW0KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL0JpdHNQZXJDb21wb25lbnQgOAovUHJlZGljdG9yIDE1Ci9Db2x1bW5zIDEyMAovQ29sb3JzIDMKPj4KZW5kb2JqCjEyIDAgb2JqCjw8Ci9CaXRzUGVyQ29tcG9uZW50IDgKL1ByZWRpY3RvciAxNQovQ29sdW1ucyAxMTEKL0NvbG9ycyAzCj4+CmVuZG9iagp4cmVmCjAgMTMKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAwNzggMDAwMDAgbg0KMDAwMDAwMDEzNSAwMDAwMCBuDQowMDAwMDAwMjU0IDAwMDAwIG4NCjAwMDAwMDIwNzQgMDAwMDAgbg0KMDAwMDAwMjE0NCAwMDAwMCBuDQowMDAwMDAyMTg2IDAwMDAwIG4NCjAwMDAwMDQxMzIgMDAwMDAgbg0KMDAwMDAwNTA0NCAwMDAwMCBuDQowMDAwMDA1MTQxIDAwMDAwIG4NCjAwMDAwMDUyNDQgMDAwMDAgbg0KMDAwMDAwNTMyMyAwMDAwMCBuDQp0cmFpbGVyCjw8Ci9Sb290IDEgMCBSCi9JRCBbPEMwMkExNTY3NkYzNDU4MzhGRkI5NEJDQURGOUE1QzNDPiA8QzAyQTE1Njc2RjM0NTgzOEZGQjk0QkNBREY5QTVDM0M+XQovU2l6ZSAxMwo+PgpzdGFydHhyZWYKNTQwMgolJUVPRgo=`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            border: "1px solid gray",
          }}
        >
          <Text style={{ fontSize: "16px", margin: "0px 20px" }}>
            e-Way Bill
          </Text>

          <Image
            alt=""
            src={getQRCode(data._id)}
            style={{ height: "70px", width: "70px" }}
          />
        </View>
        <View style={{ ...styles.flex, margin: "10px 2px 2px 2px" }}>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            eWay Bill No: {data.irn.EwbNo}
          </Text>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            Generated Date: {moment(data.irn.EwbDt).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            {" "}
            Generated by: {data.billedBy.gstin}
          </Text>
        </View>
        <View style={{ ...styles.flex, margin: "3px" }}>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            Mode: {data.irn.EwbNo}
          </Text>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            Approx Distance : {moment(data.irn.createdAt).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            {" "}
            Valid Upto: {data.irn.EwbNo}
          </Text>
        </View>
        <View style={{ ...styles.flex, margin: "3px" }}>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            Type: {data.irn.EwbNo}
          </Text>
          <Text style={{ ...styles.f16, width: "33.33%" }}>
            Document Details: {moment(data.irn.createdAt).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ width: "33.33%" }}></Text>
        </View>
        <View style={{ ...styles.flex, margin: "3px" }}>
          <Text style={{ ...styles.f16, width: "100%" }}>
            Transaction Type: Combination of Bill To - Ship to and Bill From
            Dispacth Form
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default EwayBill;

const data = {
  _id: "6687ba7fdea2e000c49b2f99",
  invoiceTitle: "Invoice",
  billType: "INVOICE",
  status: "UNPAID",
  discount: {
    discountType: "PERCENTAGE",
  },
  earlyPayDiscount: {
    enabled: false,
    applied: false,
    discountType: "PERCENTAGE",
  },
  vendor: null,
  isRemoved: false,
  isArchived: false,
  isHardRemoved: false,
  business: {
    name: "INFINIS AGRITECH PRIVATE LIMITED",
    alias: "INFINIS",
    urlKey: "infinis",
    timeZone: "Asia/Kolkata",
    isPrivate: true,
    _id: "648c008602aa8e0012c9d2d4",
  },
  client: "64e5804862d33c0012dd918d",
  locale: "en-IN",
  reminders: {
    replyTo: {
      phone: "+919515802627",
    },
    to: {
      email: null,
      phone: "+919440860485",
      name: "KANYAKAPARAMESHWARI TRADERS",
    },
    selfEmail: false,
    views: [],
    whatsappMessages: [],
  },
  source: "DASHBOARD",
  hideTotalInWords: true,
  platformCreated: "web",
  paymentOptions: {
    accountTransfer: false,
    smartTransfer: false,
    creditCards: false,
    debitCards: false,
    pgUPI: false,
    netBanking: false,
    wallets: false,
    foreignCards: false,
    upi: false,
    meta: {
      allowPartialPayment: false,
      createInvoiceOnPayment: false,
    },
  },
  vendorReminder: {
    to: {
      name: "rupak sai",
      email: "rupaksai2001@gmail.com",
      phone: "+919515802627",
    },
    replyTo: {
      phone: "+919440860485",
    },
    selfEmail: false,
    views: [],
    whatsappMessages: [],
  },
  attachments: [],
  recurringInvoice: {
    frequency: "None",
    status: "DRAFT",
    _id: "6687ba7fdea2e000c49b2f9a",
  },
  linkedDocuments: [],
  linkedInvoices: [],
  linkedProformaInvoices: [],
  linkedPurchaseOrders: [],
  linkedSalesOrders: [],
  tdsReportCollected: false,
  invoiceAccepted: "WAITING",
  acceptedByBusinesses: [],
  isExpenditure: false,
  isQuickExpenditure: false,
  requestedInvoice: false,
  isBulkExpenditure: false,
  batchDocument: false,
  isSharedDocument: false,
  isColumnsModified: true,
  customLabels: {
    _id: "66643105198a01005311f641",
    invoiceNumber: "Invoice No",
    invoiceDate: "Invoice Date",
    dueDate: "Due Date",
    purchaseOrderNumber: "PO Number",
    quotationNumber: "Quotation No.",
    terms: "Terms and Conditions",
    notes: "Additional Notes",
    billedBy: "Billed By",
    billedTo: "Billed To",
    expenseNumber: "Expense No",
    shippedTo: "Shipped To",
    shippedFrom: "Shipped From",
    transport: "Transport Details",
    attachment: "Attachments",
    signature: "Authorised Signatory",
    taxName: "GST",
    total: "Total",
    subTotal: "Sub Total",
    totalInWords: "Total (in words)",
    totalInWordsValue: "seven lakh five thousand rupees only",
    transportName: "Transport",
    challanDate: "Challan Date",
    challanNumber: "Challan Number",
    transportExtraInfo: "Extra Information",
    contact: "For any enquiry, reach out via",
    contactEmail: "email at",
    contactPhone: "call on",
    dueAmount: "Due Amount",
    paymentRecord: "Payment Record",
    invoiceDetails: "Invoice Details",
    paidAmount: "Paid Amount",
  },
  hideTotals: false,
  showTotalsRow: false,
  utgst: false,
  taxType: "INDIA",
  reverseCharge: false,
  showInSuggestion: false,
  hasPgPayments: false,
  tags: [],
  voucherEntries: ["de318600-6599-483d-ba1d-38c7ba4570a2"],
  supplyType: "B2B",
  upi: "650527d4df8c9d0012d2ae83",
  advanceOptions: {
    isDescriptionFullWidth: false,
    showHSNSummaryInInvoice: false,
    hsnView: "DEFAULT",
    hideCountryOfSupply: false,
    manageInventory: "IGNORE",
    taxSummaryView: "NONE",
  },
  igst: false,
  taxName: "GST",
  transportDetails: null,
  shippedFrom: null,
  shippedTo: null,
  contact: {
    email: "info@infinis.in",
    phone: "+919515802627",
  },
  signature: null,
  terms: [
    {
      label: "Terms and Conditions",
      terms: [
        "PLEASE PAY WITHIN THE DUE DATE OF THE INVOICE, OVERDUE INTEREST @ 24% WILL BE CHARGED ON DELAYED PAYMENTS.",
        "GOODS ONCE SOLD WILL NOT BE TAKEN BACK OR EXCHANGED",
        "THE ABOVE FERTILIZERS ARE FOR RESALE /CONSUMPTION IN THE STATE OF TELANGANA ONLY",
      ],
      _id: "648c0a3f2a84b800128fd8d9",
    },
  ],
  extraTotalFields: [],
  additionalCharges: [
    {
      _id: "6687ba7fdea2e000c49b2f9c",
      label: "Round off",
      amount: 1.5,
      multiplier: -1,
      amountType: "FIXED_AMOUNT",
      isPreset: true,
      key: "roribqrxqzl",
    },
  ],
  currency: "INR",
  invoiceType: "INVOICE",
  columns: [
    {
      dataType: "text",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a430f",
      key: "name",
      label: "Item",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4310",
      key: "hsn",
      label: "HSN/SAC",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4311",
      key: "gstRate",
      label: "GST Rate",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4312",
      key: "quantity",
      label: "Bags",
    },
    {
      dataType: "number",
      system: false,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4313",
      key: "s4rtwf3n5t8",
      label: "MT",
    },
    {
      dataType: "currency",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4314",
      key: "rate",
      label: "Rate",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4315",
      key: "discount",
      label: "Discount",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4316",
      key: "amount",
      label: "Amount",
      formula: "(Quantity * Rate)",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4317",
      key: "igst",
      label: "IGST",
      formula: "(Amount * GST) / 100)",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4318",
      key: "cgst",
      label: "CGST",
      formula: "(Amount * (GST/2) / 100)",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a4319",
      key: "sgst",
      label: "SGST",
      formula: "(Amount * (GST/2) / 100)",
    },
    {
      dataType: "number",
      system: true,
      isHidden: false,
      private: false,
      fxReturnType: "number",
      isCessColumn: false,
      _id: "6687bed5160e9000277a431a",
      key: "total",
      label: "Total",
      formula: "(Amount + Tax)",
    },
  ],
  items: [
    {
      discount: {
        discountType: "PERCENTAGE",
        amount: 0,
      },
      group: false,
      hidden: false,
      images: [],
      originalImages: [],
      isStockManaged: false,
      itc: null,
      unit: null,
      _id: "6687ba7fdea2e000c49b2fa9",
      name: "SPIC 10:26:26",
      description: "",
      hsn: "31052000",
      quantity: 500,
      rate: 1342.86,
      gstRate: 5,
      subTotal: 671430,
      amount: 671430,
      igst: 33571.5,
      cgst: 16785.75,
      sgst: 16785.75,
      total: 705001.5,
      custom: {
        s4rtwf3n5t8: 25,
      },
      ledgerId: "b313c785-a5fa-424a-8389-f00e781e224a",
      ledgerName: "REF Invoice Credit Account",
      totalRoundOff: 0,
      amountRoundOff: 0,
      inventory: "66868d5d30eabc008d0b4862",
      inventoryTxn: "6687ba80dea2e000c49b300f",
    },
  ],
  billedTo: {
    _id: "64e5804862d33c0012dd918d",
    name: "KANYAKAPARAMESHWARI TRADERS",
    street: "SHOP NO 1-77 1-78 1-79, OPP SBH OLD ATM RAICHUR ROAD",
    city: "MAKTHAL",
    pincode: "509208",
    state: "Telangana",
    gstState: "36",
    country: "IN",
    gstin: "36ADFPK1249P1Z7",
    vatLabel: "VAT Number",
    panNumber: "ADFPK1249P",
    customFields: [
      {
        key: "lzvreposkbn",
        label: "FMSID",
        dataType: "TEXT",
        params: {
          showInInvoice: true,
        },
        value: "242272",
        options: [],
      },
    ],
    uniqueKey: "1692761947685",
    taxPayerType: "REG",
    phone: "+919440860485",
    phoneShowInInvoice: true,
  },
  billedBy: {
    country: "IN",
    name: "INFINIS AGRITECH PRIVATE LIMITED",
    gstin: "36AAGCI9680R1ZI",
    panNumber: "AAGCI9680R",
    street: "11-5-155, 2ND FLOOR , BHAVANI NAGER ,MOOSAPET , HYDERABAD",
    city: " MEDCHAL - MALKAJIRI ",
    state: "Telangana",
    gstState: "36",
    pincode: "500018",
    vatLabel: "VAT Number",
    customFields: [
      {
        key: "qq22h9z62t",
        label: "CIN",
        dataType: "TEXT",
        params: {
          showInInvoice: true,
        },
        options: [],
        value: "U73200TG2022PTC169465",
      },
      {
        key: "lzvreposkbn",
        label: "AGL NO",
        dataType: "TEXT",
        params: {
          showInInvoice: true,
        },
        defaultValue: "",
        hideFlagEmoji: true,
        options: [],
        value: "2320018",
      },
    ],
    email: "info@infinis.in",
    phone: "+919515802627",
    emailShowInInvoice: true,
    phoneShowInInvoice: true,
  },
  customFooters: [
    {
      _id: "6687ba7fdea2e000c49b2fab",
      label: "LORRY NO",
      key: "1qugvaa3us9",
      value: "KA 39 3720",
    },
  ],
  customHeaders: [],
  dueInDays: 15,
  dueDate: "2024-07-19T18:30:00.000Z",
  invoiceDate: "2024-07-04T18:30:01.000Z",
  invoiceNumber: "IN/24-25/B/00103",
  logo: "https://s3.ap-south-1.amazonaws.com/refrens.images/642c5f127cc94400198d5740/66485de263b1f1002be750e0/ref1716018692483.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAJ2JB7HN7WUT5DNNA%2F20240705%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240705T120240Z&X-Amz-Expires=900&X-Amz-Signature=b6c3b4797b79966d4afd69a8c9bf4270dbf84b86b0e02a7726255a9969609d23&X-Amz-SignedHeaders=host&x-id=GetObject",
  template: {
    bodyFont: null,
    name: "default",
    primaryBackground: {
      r: 65,
      g: 174,
      b: 93,
      a: 1,
    },
    primaryColor: {
      r: 65,
      g: 174,
      b: 93,
      a: 1,
    },
    secondaryBackground: {
      r: 65,
      g: 174,
      b: 93,
      a: 0.2,
    },
    secondaryColor: {
      r: 65,
      g: 174,
      b: 93,
      a: 0.2,
    },
    titleFont: null,
    pdfOptions: {
      zoomSize: "0.8",
    },
  },
  cesses: [],
  bankAccount: "648c5364a062c400128a0557",
  invoiceDateUserInput: "05/07/2024",
  owner: {
    name: "INFINIS AGRITECH PRIVATE LIMITED",
    alias: "INFINIS",
    urlKey: "infinis",
    timeZone: "Asia/Kolkata",
    configuration: {
      isZatcaBusiness: false,
      tax: {
        taxName: "GST",
        taxType: "INDIA",
        defaultTaxRate: 5,
        allowTds: true,
      },
      hideHashInDocumentNumber: false,
      irnPosition: "ABOVE_LINEITEMS",
    },
    premium: {
      enabled: true,
      activated: true,
      onTrial: false,
      trialActivated: true,
      endDate: "2125-07-22T11:29:07.000Z",
      trialActivatedAt: "2023-06-16T07:04:11Z",
      trialEndedAt: "2023-07-06T11:44:35Z",
      productId: "64c15973bf9d64959f848a73",
      period: "LIFETIME",
      currentAllowedSeats: 5,
      planType: "BOOKSPRO",
    },
    createdAt: "2023-06-16T06:26:14.706Z",
    country: "IN",
    _id: "648c008602aa8e0012c9d2d4",
  },
  invoiceNumberSeries: "1711980096176",
  author: "648c008602aa8e0012c9d2d4",
  creator: {
    name: "rupak sai",
    avatar:
      "https://s3.ap-south-1.amazonaws.com/refrens.images/642c5f127cc94400198d5740/refrens-gp.png",
    email: "rupaksai2001@gmail.com",
    _id: "642c5f127cc94400198d5740",
  },
  payments: [],
  creditClaims: [],
  shareId: "0UbsB2bcgvpj1wfvdi",
  rejectedByBusinesses: [],
  acceptedByBusinessesData: [],
  invoiceId: "6687ba7fdea2e000c49b2f99",
  complianceDocuments: [],
  activities: [
    {
      _id: "6687ba80dea2e000c49b2fcd",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "upi",
      newValue: "650527d4df8c9d0012d2ae83",
    },
    {
      _id: "6687ba80dea2e000c49b2fce",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "advanceOptions",
      newValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
    },
    {
      _id: "6687ba80dea2e000c49b2fcf",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "client",
      newValue: "64e5804862d33c0012dd918d",
    },
    {
      _id: "6687ba80dea2e000c49b2fd0",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "showTotalsRow",
      newValue: false,
    },
    {
      _id: "6687ba80dea2e000c49b2fd1",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "contact",
      newValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
    },
    {
      _id: "6687ba80dea2e000c49b2fd2",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "signature",
      newValue: null,
    },
    {
      _id: "6687ba80dea2e000c49b2fd3",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "hideTotalInWords",
      newValue: true,
    },
    {
      _id: "6687ba80dea2e000c49b2fd4",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "reminders",
      newValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
      },
    },
    {
      _id: "6687ba80dea2e000c49b2fd5",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "invoiceTitle",
      newValue: "Invoice",
    },
    {
      _id: "6687ba80dea2e000c49b2fd6",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "logo",
      newValue:
        "https://s3.ap-south-1.amazonaws.com/refrens.images/642c5f127cc94400198d5740/66485de263b1f1002be750e0/ref1716018692483.png",
    },
    {
      _id: "6687ba80dea2e000c49b2fd7",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "bankAccount",
      newValue: "648c5364a062c400128a0557",
    },
    {
      _id: "6687ba80dea2e000c49b2fd8",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "paymentOptions",
      newValue: {
        accountTransfer: false,
        smartTransfer: false,
        creditCards: false,
        debitCards: false,
        pgUPI: false,
        netBanking: false,
        wallets: false,
        foreignCards: false,
        upi: false,
        meta: {
          allowPartialPayment: false,
          createInvoiceOnPayment: false,
        },
      },
    },
    {
      _id: "6687ba80dea2e000c49b2fd9",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "bankAccountDetails",
      newValue: {
        accountNo: "434705000815",
        ifsc: "ICIC0004347",
        iban: "",
        swift: "",
        name: "INFINIS AGRITECH PRIVATE LIMITED",
        accountType: "CURRENT",
        bank: "ICICI BANK",
        phone: "+919515802627",
        country: "IN",
        currency: "INR",
        customFields: [],
      },
    },
    {
      _id: "6687ba80dea2e000c49b2fda",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "vendorReminder",
      newValue: {
        to: {
          name: "rupak sai",
          email: "rupaksai2001@gmail.com",
          phone: "+919515802627",
        },
        replyTo: {
          phone: "+919440860485",
        },
        selfEmail: false,
      },
    },
    {
      _id: "6687bc72e937cc007735d856",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "advanceOptions",
      newValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
      previousValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
    },
    {
      _id: "6687bc72e937cc007735d857",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "contact",
      newValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
      previousValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
    },
    {
      _id: "6687bc72e937cc007735d858",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "reminders",
      newValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
      previousValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
    },
    {
      _id: "6687be8be3992e006ccf73f6",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "advanceOptions",
      newValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
      previousValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
    },
    {
      _id: "6687be8be3992e006ccf73f7",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "contact",
      newValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
      previousValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
    },
    {
      _id: "6687be8be3992e006ccf73f8",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "reminders",
      newValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
      previousValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
    },
    {
      _id: "6687bed8160e9000277a4355",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "advanceOptions",
      newValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
      previousValue: {
        isDescriptionFullWidth: false,
        showHSNSummaryInInvoice: false,
        hsnView: "DEFAULT",
        hideCountryOfSupply: false,
        manageInventory: "IGNORE",
        taxSummaryView: "NONE",
      },
    },
    {
      _id: "6687bed8160e9000277a4356",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "contact",
      newValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
      previousValue: {
        email: "info@infinis.in",
        phone: "+919515802627",
      },
    },
    {
      _id: "6687bed8160e9000277a4357",
      actor: "642c5f127cc94400198d5740",
      actorType: "VENDOR",
      field: "reminders",
      newValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
      previousValue: {
        replyTo: {
          phone: "+919515802627",
        },
        to: {
          email: null,
          phone: "+919440860485",
          name: "KANYAKAPARAMESHWARI TRADERS",
        },
        selfEmail: false,
        emails: [],
        views: [],
        whatsappMessages: [],
      },
    },
  ],
  createdAt: "2024-07-05T09:18:55.705Z",
  updatedAt: "2024-07-05T12:02:29.416Z",
  __v: 0,
  balance: {
    paid: 0,
    tds: 0,
    transactionCharge: 0,
    credit: 0,
    due: 705000,
  },
  beforeDiscountPay: {
    full: 705000,
    tds10: 67143,
    tds2: 13428.6,
  },
  creditDiscount: 0,
  toPay: {
    full: 705000,
    tds10: 67143,
    tds2: 13428.6,
  },
  totalConversions: {
    INR: {
      total: 705000,
      paid: 0,
      tds: 0,
      transactionCharge: 0,
      due: 705000,
    },
    USD: {
      total: 705000,
      paid: 0,
      tds: 0,
      transactionCharge: 0,
      due: 705000,
    },
  },
  totals: {
    total: 705000,
    amount: 671430,
    subTotal: 671430,
    igst: 33571.5,
    cgst: 16785.75,
    sgst: 16785.75,
    amountRoundOff: 0,
    totalRoundOff: 0,
    cessTotal: {},
    discount: 0,
  },
  gstrCategory: "4A",
  bookKeepingSyncStatus: {
    errorMessage: null,
    isSynced: true,
    syncSource: "DOCUMENT",
  },
  irn: {
    AckNo: "112420961901925",
    AckDt: "2024-07-05 14:56:00",
    Irn: "90af76d6aa8903683be540c5b0e51459ebee9035053b4b8fe742210aeb902286",
    SignedInvoice:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IkI4RDYzRUNCNThFQTVFNkY0QUFDM0Q1MjQ1NDNCMjI0NjY2OUIwRjgiLCJ4NXQiOiJ1TlkteTFqcVhtOUtyRDFTUlVPeUpHWnBzUGciLCJ0eXAiOiJKV1QifQ.eyJkYXRhIjoie1wiQWNrTm9cIjoxMTI0MjA5NjE5MDE5MjUsXCJBY2tEdFwiOlwiMjAyNC0wNy0wNSAxNDo1NjowMFwiLFwiSXJuXCI6XCI5MGFmNzZkNmFhODkwMzY4M2JlNTQwYzViMGU1MTQ1OWViZWU5MDM1MDUzYjRiOGZlNzQyMjEwYWViOTAyMjg2XCIsXCJWZXJzaW9uXCI6XCIxLjFcIixcIlRyYW5EdGxzXCI6e1wiVGF4U2NoXCI6XCJHU1RcIixcIlN1cFR5cFwiOlwiQjJCXCIsXCJSZWdSZXZcIjpcIk5cIixcIklnc3RPbkludHJhXCI6XCJOXCJ9LFwiRG9jRHRsc1wiOntcIlR5cFwiOlwiSU5WXCIsXCJOb1wiOlwiSU4vMjQtMjUvQi8wMDEwM1wiLFwiRHRcIjpcIjA1LzA3LzIwMjRcIn0sXCJTZWxsZXJEdGxzXCI6e1wiR3N0aW5cIjpcIjM2QUFHQ0k5NjgwUjFaSVwiLFwiTGdsTm1cIjpcIklORklOSVMgQUdSSVRFQ0ggUFJJVkFURSBMSU1JVEVEXCIsXCJBZGRyMVwiOlwiMTEtNS0xNTUsIDJORCBGTE9PUiAsIEJIQVZBTkkgTkFHRVIgLE1PT1NBUEVUICwgSFlERVJBQkFEXCIsXCJMb2NcIjpcIlRlbGFuZ2FuYVwiLFwiUGluXCI6NTAwMDE4LFwiU3RjZFwiOlwiMzZcIixcIlBoXCI6XCI5NTE1ODAyNjI3XCIsXCJFbVwiOlwiaW5mb0BpbmZpbmlzLmluXCJ9LFwiQnV5ZXJEdGxzXCI6e1wiR3N0aW5cIjpcIjM2QURGUEsxMjQ5UDFaN1wiLFwiTGdsTm1cIjpcIktBTllBS0FQQVJBTUVTSFdBUkkgVFJBREVSU1wiLFwiUG9zXCI6XCIzNlwiLFwiQWRkcjFcIjpcIlNIT1AgTk8gMS03NyAxLTc4IDEtNzksIE9QUCBTQkggT0xEIEFUTSBSQUlDSFVSIFJPQURcIixcIkxvY1wiOlwiVGVsYW5nYW5hXCIsXCJQaW5cIjo1MDkyMDgsXCJQaFwiOlwiOTQ0MDg2MDQ4NVwiLFwiU3RjZFwiOlwiMzZcIn0sXCJEaXNwRHRsc1wiOntcIk5tXCI6XCJJTkZJTklTIEFHUklURUNIIFBSSVZBVEUgTElNSVRFRFwiLFwiQWRkcjFcIjpcIk11bm5hbGFsIFRyYW5zcG9ydCAsIE1PT1NBUEVUICwgSFlERVJBQkFEXCIsXCJMb2NcIjpcIlRlbGFuZ2FuYVwiLFwiUGluXCI6NTAwMDE4LFwiU3RjZFwiOlwiMzZcIn0sXCJTaGlwRHRsc1wiOntcIkxnbE5tXCI6XCJLQU5ZQUtBUEFSQU1FU0hXQVJJIFRSQURFUlNcIixcIkFkZHIxXCI6XCJTSE9QIE5PIDEtNzcgMS03OCAxLTc5LCBPUFAgU0JIIE9MRCBBVE0gUkFJQ0hVUiBST0FEXCIsXCJMb2NcIjpcIlRlbGFuZ2FuYVwiLFwiUGluXCI6NTA5MjA4LFwiU3RjZFwiOlwiMzZcIn0sXCJJdGVtTGlzdFwiOlt7XCJJdGVtTm9cIjowLFwiU2xOb1wiOlwiMVwiLFwiSXNTZXJ2Y1wiOlwiTlwiLFwiUHJkRGVzY1wiOlwiU1BJQyAxMDoyNjoyNlwiLFwiSHNuQ2RcIjpcIjMxMDUyMDAwXCIsXCJRdHlcIjo1MDAsXCJVbml0XCI6XCJPVEhcIixcIlVuaXRQcmljZVwiOjEzNDIuODYsXCJUb3RBbXRcIjo2NzE0MzAsXCJEaXNjb3VudFwiOjAsXCJQcmVUYXhWYWxcIjo2NzE0MzAsXCJBc3NBbXRcIjo2NzE0MzAsXCJHc3RSdFwiOjUsXCJJZ3N0QW10XCI6MCxcIkNnc3RBbXRcIjoxNjc4NS43NSxcIlNnc3RBbXRcIjoxNjc4NS43NSxcIkNlc1J0XCI6MCxcIkNlc0FtdFwiOjAsXCJDZXNOb25BZHZsQW10XCI6MCxcIlN0YXRlQ2VzUnRcIjowLFwiU3RhdGVDZXNBbXRcIjowLFwiU3RhdGVDZXNOb25BZHZsQW10XCI6MCxcIk90aENocmdcIjowLFwiVG90SXRlbVZhbFwiOjcwNTAwMS41fV0sXCJWYWxEdGxzXCI6e1wiQXNzVmFsXCI6NjcxNDMwLFwiQ2dzdFZhbFwiOjE2Nzg1Ljc1LFwiU2dzdFZhbFwiOjE2Nzg1Ljc1LFwiSWdzdFZhbFwiOjAsXCJDZXNWYWxcIjowLFwiU3RDZXNWYWxcIjowLFwiRGlzY291bnRcIjowLFwiT3RoQ2hyZ1wiOjAsXCJSbmRPZmZBbXRcIjotMS41LFwiVG90SW52VmFsXCI6NzA1MDAwfX0iLCJpc3MiOiJOSUMifQ.XKN96cotKZJg6DXLo8FqLlzlgtG_UzxdfUnkRMmsvXLWMRzIJkhbuiNXU-_RAysJzj6BpwkAKQ7_Ajv5NyO5_p9Nei8eRHnDm53xoDNQEAyEeja1i49-YgQBjcb_OYfRkiybIVPiyCzpWhCvbiZ0NP9e2peWf5C_HrRyzsdFwAvjLCkfNTeKqOCqGl2jOXP-l2LpxBL5i6ojk9s1Zo-BHtdm3ejjRMbxvsXC_eHnza83cgo3eMRmwMYK6loKnLunnaoQD_6pIEh4x87zIRYHQbnYrRdSqzVa9eZGspePapUkyYNQ7rK8Jy8O6Ny71UZG9_Sy87rpaHnNCXa_nHji-w",
    SignedQRCode:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IkI4RDYzRUNCNThFQTVFNkY0QUFDM0Q1MjQ1NDNCMjI0NjY2OUIwRjgiLCJ4NXQiOiJ1TlkteTFqcVhtOUtyRDFTUlVPeUpHWnBzUGciLCJ0eXAiOiJKV1QifQ.eyJkYXRhIjoie1wiU2VsbGVyR3N0aW5cIjpcIjM2QUFHQ0k5NjgwUjFaSVwiLFwiQnV5ZXJHc3RpblwiOlwiMzZBREZQSzEyNDlQMVo3XCIsXCJEb2NOb1wiOlwiSU4vMjQtMjUvQi8wMDEwM1wiLFwiRG9jVHlwXCI6XCJJTlZcIixcIkRvY0R0XCI6XCIwNS8wNy8yMDI0XCIsXCJUb3RJbnZWYWxcIjo3MDUwMDAsXCJJdGVtQ250XCI6MSxcIk1haW5Ic25Db2RlXCI6XCIzMTA1MjAwMFwiLFwiSXJuXCI6XCI5MGFmNzZkNmFhODkwMzY4M2JlNTQwYzViMGU1MTQ1OWViZWU5MDM1MDUzYjRiOGZlNzQyMjEwYWViOTAyMjg2XCIsXCJJcm5EdFwiOlwiMjAyNC0wNy0wNSAxNDo1NjowMFwifSIsImlzcyI6Ik5JQyJ9.s_TIrpCko6LNqlS4Ad-eMwzIcpXl4BIm9OBtNluDPiFAT4eC9F8hZjYvMxc70PYPV46-ywIvIQKmD2yXppudRs1t8usA2pRdzxX3PGqEOxLDCQ6t3i5OBZaRdhtGBWQHcI8ePUk2oO5lzFy_ZTOl29Tx5m2zzEigWXKlTmzZq5MXy0HozhVyPRmkXbUo1P6186Gm6hPJPG784adCXvyRNRjGRn8NT5noiXCTpGDyoTSxHW1K2_7Rvj5t5AYjqg0XY9BvPcER24uKsYyb8-e4jPkvYoYABDd0wjdwuXMDh886osoQx_UOycc4W_lZPBmc3wZWKQ6v4tQ3Y-4oLvq_dA",
    Status: "ACT",
    EwbNo: "131891287813",
    EwbDt: "2024-07-05T15:07:00.000Z",
    EwbValidTill: "2024-07-06T23:59:00.000Z",
    Remarks: null,
    info: null,
    additionalInfo: null,
    alert: null,
    qr: '{"SellerGstin":"36AAGCI9680R1ZI","BuyerGstin":"36ADFPK1249P1Z7","DocNo":"IN/24-25/B/00103","DocTyp":"INV","DocDt":"05/07/2024","TotInvVal":705000,"ItemCnt":1,"MainHsnCode":"31052000","Irn":"90af76d6aa8903683be540c5b0e51459ebee9035053b4b8fe742210aeb902286","IrnDt":"2024-07-05 14:56:00"}',
    ewayErrorMessage: "Invalid Vehicle Number Format",
    ewayErrorMessageDate: 1720171704618,
    ewayAdditionalInfo: null,
    ewayAlert: null,
    ewayInfo: null,
  },
  pendingApprovalPayments: [],
  activeCreditConsumed: [],
  pendingApprovalClaims: [],
  allPayments: [],
  transactions: [],
  finalTotal: {
    total: 705000,
    amount: 671430,
    subTotal: 671430,
    igst: 33571.5,
    cgst: 16785.75,
    sgst: 16785.75,
    amountRoundOff: 0,
    totalRoundOff: 0,
    cessTotal: {},
    discount: 0,
  },
  isOverdue: false,
  showBranding: false,
  share: {
    link: "https://www.refrens.com/app/invoices/6687ba7fdea2e000c49b2f99?_at=0UbsB2bcgvpj1wfvdi",
    name: "Invoice #IN/24-25/B/00103 - INFINIS AGRITECH PRIVATE LIMITED - KANYAKAPARAMESHWARI TRADERS",
    fileName:
      "invoice-in24-25b00103-infinis-agritech-private-limited-kanyakaparameshwari-traders",
    pdf: "https://og.refrens.com/pdf/eyJwcmludExpbmsiOiJodHRwczovL2x5ZGlhLXByb2QxOGU2ZDM4Ni5henVyZXdlYnNpdGVzLm5ldC9hcHAvaW52b2ljZXMvNjY4N2JhN2ZkZWEyZTAwMGM0OWIyZjk5P19hdD0wVWJzQjJiY2d2cGoxd2Z2ZGkiLCJwZGZPcHRpb25QYXJhbXMiOnsic2lnbmF0dXJlIjpmYWxzZSwiZG9jTnVtYmVyTGFiZWwiOiJJbnZvaWNlIE5vIiwiZG9jTnVtYmVyIjoiSU4vMjQtMjUvQi8wMDEwMyIsImRvY0RhdGVMYWJlbCI6Ikludm9pY2UgRGF0ZSIsImRvY0RhdGUiOiIwNSBKdWwgMjAyNCIsImRvY1RvTGFiZWwiOiJCaWxsZWQgVG8iLCJkb2NUbyI6IktBTllBS0FQQVJBTUVTSFdBUkkgVFJBREVSUyIsInpvb21TaXplIjoiMC44In0sInVwZGF0ZWRBdCI6IjIwMjQtMDctMDVUMTI6MDI6MjkuNDE2WiIsInNob3dCcmFuZGluZyI6ZmFsc2UsImJyYW5kaW5nVXJsIjoiaHR0cHM6Ly93d3cucmVmcmVucy5jb20vZnJlZS1vbmxpbmUtaW52b2ljZS1nZW5lcmF0b3I%2Fcj1rcmlzaG5hNzgxNzE3JnV0bV9zb3VyY2U9UERGJnV0bV9tZWRpdW09aW52b2ljZXNoYXJlJnV0bV9jYW1wYWlnbj1yZWZyZW5zYnJhbmRpbmcifQ%3D%3D/fbb9e91483935acac594a4eb03ced68cea5c37b03b596882ea6bcc109c3c4752/invoice-in24-25b00103-infinis-agritech-private-limited-kanyakaparameshwari-traders.pdf",
    printLabels: [
      {
        label: "Duplicate",
        pdf: "https://og.refrens.com/pdf/eyJwcmludExpbmsiOiJodHRwczovL2x5ZGlhLXByb2QxOGU2ZDM4Ni5henVyZXdlYnNpdGVzLm5ldC9hcHAvaW52b2ljZXMvNjY4N2JhN2ZkZWEyZTAwMGM0OWIyZjk5P19hdD0wVWJzQjJiY2d2cGoxd2Z2ZGkmY29weT1SSFZ3YkdsallYUmwiLCJwZGZPcHRpb25QYXJhbXMiOnsic2lnbmF0dXJlIjpmYWxzZSwiZG9jTnVtYmVyTGFiZWwiOiJJbnZvaWNlIE5vIiwiZG9jTnVtYmVyIjoiSU4vMjQtMjUvQi8wMDEwMyIsImRvY0RhdGVMYWJlbCI6Ikludm9pY2UgRGF0ZSIsImRvY0RhdGUiOiIwNSBKdWwgMjAyNCIsImRvY1RvTGFiZWwiOiJCaWxsZWQgVG8iLCJkb2NUbyI6IktBTllBS0FQQVJBTUVTSFdBUkkgVFJBREVSUyIsInpvb21TaXplIjoiMC44In0sInVwZGF0ZWRBdCI6IjIwMjQtMDctMDVUMTI6MDI6MjkuNDE2WiIsInNob3dCcmFuZGluZyI6ZmFsc2UsImJyYW5kaW5nVXJsIjoiaHR0cHM6Ly93d3cucmVmcmVucy5jb20vZnJlZS1vbmxpbmUtaW52b2ljZS1nZW5lcmF0b3I%2Fcj1rcmlzaG5hNzgxNzE3JnV0bV9zb3VyY2U9UERGJnV0bV9tZWRpdW09aW52b2ljZXNoYXJlJnV0bV9jYW1wYWlnbj1yZWZyZW5zYnJhbmRpbmcifQ%3D%3D/bdbb74ffc287af456a15b0868d9e6e8fbdbfbcd0c2de269a5def5bf9ee519d66/invoice-in24-25b00103-infinis-agritech-private-limited-kanyakaparameshwari-traders.pdf",
      },
      {
        label: "Triplicate",
        pdf: "https://og.refrens.com/pdf/eyJwcmludExpbmsiOiJodHRwczovL2x5ZGlhLXByb2QxOGU2ZDM4Ni5henVyZXdlYnNpdGVzLm5ldC9hcHAvaW52b2ljZXMvNjY4N2JhN2ZkZWEyZTAwMGM0OWIyZjk5P19hdD0wVWJzQjJiY2d2cGoxd2Z2ZGkmY29weT1WSEpwY0d4cFkyRjBaUSUzRCUzRCIsInBkZk9wdGlvblBhcmFtcyI6eyJzaWduYXR1cmUiOmZhbHNlLCJkb2NOdW1iZXJMYWJlbCI6Ikludm9pY2UgTm8iLCJkb2NOdW1iZXIiOiJJTi8yNC0yNS9CLzAwMTAzIiwiZG9jRGF0ZUxhYmVsIjoiSW52b2ljZSBEYXRlIiwiZG9jRGF0ZSI6IjA1IEp1bCAyMDI0IiwiZG9jVG9MYWJlbCI6IkJpbGxlZCBUbyIsImRvY1RvIjoiS0FOWUFLQVBBUkFNRVNIV0FSSSBUUkFERVJTIiwiem9vbVNpemUiOiIwLjgifSwidXBkYXRlZEF0IjoiMjAyNC0wNy0wNVQxMjowMjoyOS40MTZaIiwic2hvd0JyYW5kaW5nIjpmYWxzZSwiYnJhbmRpbmdVcmwiOiJodHRwczovL3d3dy5yZWZyZW5zLmNvbS9mcmVlLW9ubGluZS1pbnZvaWNlLWdlbmVyYXRvcj9yPWtyaXNobmE3ODE3MTcmdXRtX3NvdXJjZT1QREYmdXRtX21lZGl1bT1pbnZvaWNlc2hhcmUmdXRtX2NhbXBhaWduPXJlZnJlbnNicmFuZGluZyJ9/d9555d6a9f3f301aebf3faf01c22e6b6bd44d786dcbcd592b86ad1c519c8da98/invoice-in24-25b00103-infinis-agritech-private-limited-kanyakaparameshwari-traders.pdf",
      },
    ],
  },
  onlinePaymentsEnabled: false,
  domesticPaymentDisabled: true,
};
