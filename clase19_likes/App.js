
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Menu from './src/components/Menu/Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  // El control de sesión debería ser en app.js. Para ello tendriamos que transformarlo en componente con estado y chequear sesión en componentDidMount.

  //Para mejorar la experiencia de usuario podemos usar un loader mientras chequeamos sesión.


  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/>
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
          <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
          {/* Si implementamos tabnavigation para el resto de la app. El tercer componente debe ser una navegación que tenga a Home como primer screen */}
        </Stack.Navigator>
      </NavigationContainer>

  );
}
