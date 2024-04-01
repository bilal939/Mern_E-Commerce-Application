import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './Navigators/TabNavigation'
import { Provider } from 'react-redux'
import store from './Screens/store'
import Header from './Shared/Header'
import FlashMessage from 'react-native-flash-message'
LogBox.ignoreAllLogs(true)
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header/>
        <TabNavigation />
      </NavigationContainer>
      <FlashMessage position={'top'} />
    </Provider>

  )
}

export default App

