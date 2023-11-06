import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}  options={ { headerShown: false }}/>
            <Tab.Screen name='New Post' component={PostForm}  options={ { headerShown: false }}/>            
        </Tab.Navigator>
    )
}


export default Menu;