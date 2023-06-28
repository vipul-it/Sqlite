import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const Database = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS LoanData (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, interest REAL, tenure INTEGER, monthlyEMI REAL, totalInterest REAL, totalPayment REAL, loanAmountPercentage REAL, totalInterestPercentage REAL)',
        []
      );
    });
  }, []);

  const insertData = () => {
    const amount = 5000;
    const interest = 10;
    const tenure = 12;
    const monthlyEMI = 500;
    const totalInterest = 1000;
    const totalPayment = 6000;
    const loanAmountPercentage = 80;
    const totalInterestPercentage = 20;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO LoanData (amount, interest, tenure, monthlyEMI, totalInterest, totalPayment, loanAmountPercentage, totalInterestPercentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          amount,
          interest,
          tenure,
          monthlyEMI,
          totalInterest,
          totalPayment,
          loanAmountPercentage,
          totalInterestPercentage,
        ],
        (_, result) => {
          if (result.insertId !== undefined) {
            Alert.alert('Success', 'Data inserted successfully!');
            fetchData();
          } else {
            Alert.alert('Error', 'Failed to insert data!');
          }
        }
      );
    });


  };

  const deleteRecord = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM LoanData WHERE id = ?', [id], (_, result) => {
        if (result.rowsAffected > 0) {
          Alert.alert('Success', 'Record deleted successfully!');
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete record!');
        }
      });
    });
  };

  const deleteAllRecords = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM LoanData', [], (_, result) => {
        if (result.rowsAffected > 0) {
          Alert.alert('Success', 'All records deleted successfully!');
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete records!');
        }
      });
    });
  };

//   const fetchData = () => {
//     db.transaction((tx) => {
//       tx.executeSql('SELECT * FROM LoanData', [], (_, { rows }) => {
//         const len = rows.length;
//         const tempData = [];

//         for (let i = 0; i < len; i++) {
//           tempData.push(rows.item(i));
//         }

//         setData(tempData);
//       });
//     });
//   };



  return (
   <ScrollView><View style={{flex:1}}>
      <Text>Loan Data from Database:</Text>
      {/* {data.map((item) => (
        <View key={item.id}>
          <Text>Amount: {item.amount}</Text>
          <Text>Interest: {item.interest}</Text>
          <Text>Tenure: {item.tenure}</Text>
          <Text>Monthly EMI: {item.monthlyEMI}</Text>
          <Text>Total Interest: {item.totalInterest}</Text>
          <Text>Total Payment: {item.totalPayment}</Text>
          <Text>Loan Amount Percentage: {item.loanAmountPercentage}</Text>
          <Text>Total Interest Percentage: {item.totalInterestPercentage}</Text>

          <Button
            title="Delete"
            onPress={() => deleteRecord(item.id)}
          />
          <View style={{ marginVertical: 10 }} />
        </View>
      ))} */}

      <Button  title="Insert Data" onPress={insertData} />
      {/* <Text style={{marginTop:4}}></Text>
      <Button title="Delete All" onPress={deleteAllRecords} /> */}
    </View></ScrollView>
  );
};

export default Database;
