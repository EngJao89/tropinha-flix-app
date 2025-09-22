import { Colors } from '@/constants/theme';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import { Movies } from '@/app/(movies)/page';
import IndexScreen from './index';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Tropinha Flix</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.gray_900,
          width: 280,
        },
        drawerLabelStyle: {
          color: Colors.white,
          fontSize: 16,
        },
        drawerActiveTintColor: Colors.secondary_400,
        drawerInactiveTintColor: Colors.white,
      }}>
      <Drawer.Screen 
        name="index" 
        component={IndexScreen}
        options={{ 
          drawerLabel: 'Início',
          title: 'Início'
        }} 
      />
      <Drawer.Screen 
        name="movies" 
        component={Movies}
        options={{ 
          drawerLabel: 'Meus Filmes',
          title: 'Meus Filmes'
        }} 
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.gray_900,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_700,
  },
  drawerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
