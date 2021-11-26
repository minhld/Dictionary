import * as React from 'react';
import { Ionicons, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Words from './pages/Words';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor: '#1f3c69',
          drawerActiveBackgroundColor: '#eee',
          drawerInactiveTintColor: '#666',
          labelStyle: {
            marginLeft: 0
          }
        }}>
        <Drawer.Screen 
          name="Dictionary" 
          component={Home} 
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Icon
              name='home'
              color='#1f3c69' />
            ),
         }}/>
        <Drawer.Screen 
          name="Used Words" 
          component={Words} 
          options={{
            drawerIcon: ({focused, size}) => (
              <Icon
              name='comment'
              color='#1f3c69' />
            ),
         }}/>
        <Drawer.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            drawerIcon: ({focused, size}) => (
              <Icon
              name='settings'
              color='#1f3c69' />
            ),
         }}/> 
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}
