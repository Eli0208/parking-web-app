import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  text: {
    fontSize: 10, // Adjust the font size as needed
  },
});

const convertToPST = dateTimeString => {
  const dateTimeUTC = new Date(dateTimeString);
  return dateTimeUTC.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Singapore',
  });
};

const LogsPDF = ({ logs }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Logs</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.text}>Staff's Name</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.text}>Date</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.text}>Time In</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.text}>Time Out</Text>
            </View>
          </View>
          {logs.map((log, index) => (
            <React.Fragment key={index}>
              {log.timeIn.map((timeIn, idx) => (
                <View key={`${index}-${idx}`} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{log.ownerName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>
                      {new Date(timeIn.date).toLocaleDateString('en-US')}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{convertToPST(timeIn.date)}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>
                      {log.timeOut[idx]
                        ? convertToPST(log.timeOut[idx].date)
                        : '-----------'}
                    </Text>
                  </View>
                </View>
              ))}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default LogsPDF;
