import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');  // Pode ser nome de usuário ou email
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Recuperar credenciais armazenadas
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      // Validar se as credenciais fornecidas coincidem com as armazenadas
      if ((identifier === storedUsername || identifier === storedEmail) && password === storedPassword) {
        Alert.alert('Login bem-sucedido', 'Bem-vindo!');
        navigation.navigate('Home');  // Redireciona para a tela principal
      } else {
        Alert.alert('Erro', 'Credenciais inválidas!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível recuperar as credenciais.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#141414' }}>
      <Text style={stilo.titulo}> Login {"\n"} ≻───── ⋆✩⋆ ─────≺ 
      </Text> 
      
      <TextInput
        style={stilo.caixa} placeholder="Nome de Usuário ou Email" value={identifier} onChangeText={setIdentifier}
      />
      
      <TextInput
        style={stilo.caixa}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={stilo.botao} onPress={handleLogin}> 
        <Text style={stilo.texto}> Entrar </Text>
      </TouchableOpacity>

       <TouchableOpacity style={stilo.botao}   onPress={() => navigation.navigate('Register')}> 
        <Text style={stilo.texto}> Ainda não tem uma conta? Cadastre-se </Text>
      </TouchableOpacity>

    </View>
  );
}
 const stilo = StyleSheet.create({

     texto:{
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 600,
      fontStyle: "italic",

  },

  caixa:{
      borderWidth: 1, 
      padding: 10, 
      marginBottom: 10, 
      borderRadius: 5,
      fontSize: 14,
      fontStyle: "italic",
      borderColor: 'black',
      color: '#141414',
      backgroundColor:'white'

  },

  titulo:{
      color: '#63D53C',
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 25,
      fontWeight: 700,
      fontStyle: "italic",

  },

    botao:{
      backgroundColor: '#63D53C',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      width: '80%',
      alignSelf: 'center',
      fontFamily:'Pompiere-Regular'
    }

})

