import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-router-dom'; // Assuming use of React Router for routes
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner'; // Might need modification
import { Button, Card } from 'material-ui'; // Example web equivalents (replace if needed)
import MyButton from '../../customButton'; // Custom Button component, replace if necessary
// Import appropriate routing library for web (e.g., react-router-dom)

const AttendanceScreen = () => {

  const { getAttendenceDetailByYear, attendenceObj, setEmployeeMonthData } = useContext(DataContext);
  const [selectedYear, setSelectedYear] = useState(null); // Assume initial state for web
  const [employee, setEmployee] = useState(null); // Assume initial state for web

  // Fetch data on component mount (assuming route params are passed differently)
  useEffect(() => {
    const fetchData = async () => {
      const { employeeId, year } = /* Access route params here (e.g., using useParams) */
      setSelectedYear(year);
      setEmployee(employeeId); // Assuming employee data is retrieved
      await getAttendenceDetailByYear(employeeId, year);
    };
    fetchData();
  }, []);

  // Handle local storage (consider using a state management library like Redux)
  useEffect(() => {
    if (attendenceObj) {
      localStorage.setItem('attendenceData', JSON.stringify(attendenceObj));
    }
  }, [attendenceObj]);

  if (!attendenceObj) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{ marginTop: 50 }}>
      {/* Render employee name and current year as buttons */}
      <MyButton title={employee?.name} onPress={() => {}} /> {/* Use optional chaining */}
      <MyButton title={new Date().getFullYear()} onPress={() => {}} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} style={{ marginBottom: 120 }}>
        {/* Map over attendenceObj and render each month's stats */}
        {Object.entries(attendenceObj).map(([month, stats], index) => (
          <Card key={index} style={styles.card} onClick={() => {
            setEmployeeMonthData(null);
            // Navigate to month data screen with necessary params
            // Use web routing library here (e.g., useNavigate from react-router-dom)
            const navigate = useNavigate(); // Assuming use of useNavigate
            navigate('/month-data', { month, year: selectedYear, employee_id: employee?.id }); // Use optional chaining
          }}>
            <Card.Content>
              <Text style={styles.monthText}>{month}</Text>
              <View style={styles.statsContainer}>
                <Text style={styles.statText}>Present: {stats.present}</Text>
                <Text style={styles.statText}>Half Days: {stats.half_days}</Text>
                <Text style={styles.statText}>Leave: {stats.leave}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 16,
    marginRight: 'auto',
  },
});

export default AttendanceScreen;
