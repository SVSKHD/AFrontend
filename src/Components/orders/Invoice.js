import React from "react";
import { Document, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import Default from "../../images/Default.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  Table: {
    borderRadius: "1rem",
    fontFamily: "Montserrat",
  },
  TableFont: {
    fontFamily: "Montserrat",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  image: {
    height: "100px",
    width: "100px",
    padding: "0, 0, 0, 0",
    margin: "33%, 2rem, 2rem, 2rem",
    borderRadius: "2rem",
    boxShadow: "5px 10px",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Invoice = ({ order }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          {new Date().toLocaleString()}
        </Text>
        <Image
          style={{ height: "100px", width: "100px", textAlign: "center" }}
          src={Default}
        />
        <Text style={styles.title}>AquaKart</Text>
        <hr />
        <Text style={styles.author}>Shop Your Favorite Products</Text>
        <Text style={styles.subtitle}>Order Summary</Text>
        <Table style={styles.Table}>
          <TableHeader style={styles.TableFont}>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>

        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(x) => x.product.title} />
            <DataTableCell getContent={(x) => ` ${x.product.price}`} />
            <DataTableCell getContent={(x) => x.count} />
            <DataTableCell getContent={(x) => x.product.brand} />
            <DataTableCell getContent={(x) => x.product.color} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>Date : {`${date}/${months[month]}/${year}`}</Text>
          {"\n"}
          <Text>Payment Mode : {order.orderStatus}</Text>
          {"\n"}
        </Text>

        <Text>Customer Care Details</Text>
        <Table style={styles.Table}>
          <TableHeader style={styles.TableFont}>
            <TableCell>Kent</TableCell>
            <TableCell>Grundfos</TableCell>
            <TableCell>Aquakart</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <TableCell>9278912345</TableCell>
            <TableCell>18001022535</TableCell>
            <TableCell>9182119842</TableCell>
          </TableBody>
        </Table>
        <Text style={styles.footer}> Thank you for shopping with us </Text>
      </Page>
    </Document>
  );
};
export default Invoice;
