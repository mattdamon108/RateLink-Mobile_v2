import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import RateStack from "./Rate";
import ProfileScreen from "./Profile";
import DrawerContainer from "../../components/DrawerContainer";

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen
  }
});

const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: RateStack
    },
    Profile: {
      screen: ProfileStack
    }
  },
  { contentComponent: DrawerContainer, drawerWidth: 250 }
);

export default AppDrawer;
