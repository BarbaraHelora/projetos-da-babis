import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      // Salvar as credenciais no AsyncStorage
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      Alert.alert('Cadastro realizado', 'Você foi cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as credenciais.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#141414'  }}>
      <Text style={stilo.titulo}> Cadastro {"\n"} ≻───── ⋆✩⋆ ─────≺ 
      </Text> 
      
      <TextInput
        style={stilo.caixa}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={stilo.caixa}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={stilo.caixa}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={stilo.botao} onPress={handleRegister}> 
        <Text style={stilo.texto}> Cadastrar </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={stilo.botao} onPress={() => navigation.navigate('Login')}> 
        <Text style={stilo.texto}> Já tem uma conta? Faça login </Text>
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

