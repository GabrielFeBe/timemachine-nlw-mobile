import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'

import * as SecureStore from 'expo-secure-store'

import NLWlogo from '../src/assets/nlw-logo.svg'
import { api } from '../src/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/9bfd740e24fc9e3464dd',
}

export default function App() {
  const [, response, singInWithGitHub] = useAuthRequest(
    {
      clientId: '9bfd740e24fc9e3464dd',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )
  const router = useRouter()
  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data
    await SecureStore.setItemAsync('token', token)
    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )
    // console.log(response)
    if (response?.type === 'success') {
      const { code } = response.params
      // console.log(code)
      handleGitHubOAuthCode(code)
    }
  }, [response])

  return (
    <View className=" flex-1 items-center px-8 py-10">
      {/* <Text className=" font-alt text-5xl  text-gray-50">Rocketseat</Text> */}
      <View className="flex-1 items-center justify-center gap-6">
        <NLWlogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => singInWithGitHub()}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            {' '}
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
