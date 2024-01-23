import { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/login.screen";
import CoursesScreen from "./screens/courses.screen";
import InformationScreen from "./screens/information.screen";
import CreateCourseScreen from "./screens/CreateCourse.screen";
import ClassesScreen from "./screens/classes.screen";
import CreateClassScreen from "./screens/CreateClass.screen";
import ManageCourseScreen from "./screens/ManageCourse.screen";
import ManageClassScreen from "./screens/ManageClass.screen";

import { ShowMenuContext } from "./utils/contexts/ShowMenuContext";

import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [ showMenu, setShowMenu ] = useState(false);
  const showMenuContext = useMemo(
    () => ({ showMenu, setShowMenu }),
    [showMenu, setShowMenu]
  );

  const isSignedIn = useSelector((state: any) => state.user.isSignedIn);

  return (
    <ShowMenuContext.Provider value={showMenuContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            isSignedIn !== 1 ?
              <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
            :
              <Stack.Screen 
                name="Home"
                component={CoursesScreen}
                options={{
                  headerShown: false
                }}
              />   
          }
          <Stack.Screen 
            name="Information"
            component={InformationScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="CreateCourse"
            component={CreateCourseScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Classes"
            component={ClassesScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="CreateClass"
            component={CreateClassScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ManageCourse"
            component={ManageCourseScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ManageClass"
            component={ManageClassScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShowMenuContext.Provider>
  );
}

export default App;