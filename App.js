import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import RegisterNewUser from './screens/RegisterNewUser';
import HomeUser from './screens/HomeUser';
import InsertBooking from './screens/InsertBooking';
import AddOtherSupplies from './screens/AddOtherSupplies';
import ViewBookingsUser from './screens/ViewBookingsUser';
import HomeAdmin from './screens/HomeAdmin';
import GetInvoice from './screens/GetInvoice';
import RegisterMechanic from './screens/RegisterMechanic';
import ViewMechanics from './screens/ViewMechanics';
import GetAllBookings from './screens/GetAllBookings';
import GetBookingsPerDay from './screens/GetBookingsPerDay';
import GetBookingsPerWeek from './screens/GetBookingsPerWeek';
import AssignTasksToStaff from './screens/AssignTasksToStaff';
import UpdateStatusOfBookings from './screens/UpdateStatusOfBookings';
import ViewRosterPerDay from './screens/ViewRosterPerDay';

const Stack = createStackNavigator();
//every page implemented must be writen here in order to connect the app.
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Garage' }}/>
        <Stack.Screen name="RegisterNewUser" component={RegisterNewUser} options={{ title: 'Garage' }}/>
        <Stack.Screen name="HomeUser" component={HomeUser} options={{ title: 'Garage' }}/>
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ title: 'Garage' }}/>
        <Stack.Screen name="InsertBooking" component={InsertBooking} options={{ title: 'Garage' }}/>
        <Stack.Screen name="AddOtherSupplies" component={AddOtherSupplies} options={{ title: 'Garage' }}/>
        <Stack.Screen name="ViewBookingsUser" component={ViewBookingsUser} options={{ title: 'Garage' }}/>
        <Stack.Screen name="GetInvoice" component={GetInvoice} options={{ title: 'Garage' }}/>
        <Stack.Screen name="RegisterMechanic" component={RegisterMechanic} options={{ title: 'Garage' }}/>
        <Stack.Screen name="ViewMechanics" component={ViewMechanics} options={{ title: 'Garage' }}/>
        <Stack.Screen name="GetAllBookings" component={GetAllBookings} options={{ title: 'Garage' }}/>
        <Stack.Screen name="GetBookingsPerDay" component={GetBookingsPerDay} options={{ title: 'Garage' }}/>
        <Stack.Screen name="GetBookingsPerWeek" component={GetBookingsPerWeek} options={{ title: 'Garage' }}/> 
        <Stack.Screen name="UpdateStatusOfBookings" component={UpdateStatusOfBookings} options={{ title: 'Garage' }}/>
        <Stack.Screen name="AssignTasksToStaff" component={AssignTasksToStaff} options={{ title: 'Garage' }}/>
        <Stack.Screen name="ViewRosterPerDay" component={ViewRosterPerDay} options={{ title: 'Garage' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
