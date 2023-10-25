import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import blurBG from '../src/assets/bgblur.png'
import Stripes from '../src/assets/stripes.svg'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const Styledstripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBG}
      className="relative flex-1 bg-gray-900 "
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      {/* <Text className=" font-alt text-5xl  text-gray-50">Rocketseat</Text> */}
      <Styledstripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="index"
          redirect={isUserAuthenticated}
        ></Stack.Screen>
        <Stack.Screen name="memories"></Stack.Screen>
        <Stack.Screen name="new"></Stack.Screen>
      </Stack>
    </ImageBackground>
  )
}
