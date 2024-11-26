import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [valueBRL, setValueBRL] = useState('');
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);
  const [gbpRate, setGbpRate] = useState(null);
  const [convertedUSD, setConvertedUSD] = useState('');
  const [convertedEUR, setConvertedEUR] = useState('');
  const [convertedGBP, setConvertedGBP] = useState('');

  // Recupera o nome do usuário do AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Erro ao recuperar o nome do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  // Busca as cotações da AwesomeAPI
  const fetchRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
      const data = await response.json();

      // Salva as cotações no estado
      setUsdRate(parseFloat(data.USDBRL.ask));
      setEurRate(parseFloat(data.EURBRL.ask));
      setGbpRate(parseFloat(data.GBPBRL.ask))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter as cotações.');
    }
  };

  // Chama a função para buscar as cotações ao carregar a tela
  useEffect(() => {
    fetchRates();
  }, []);

  // Atualiza os valores convertidos em tempo real
  const handleValueChange = (value) => {
    setValueBRL(value);

    if (value && usdRate && eurRate && gbpRate ) {
      const brlValue = parseFloat(value);
      if (!isNaN(brlValue)) {
        setConvertedUSD((brlValue / usdRate).toFixed(2));
        setConvertedEUR((brlValue / eurRate).toFixed(2));
        setConvertedGBP((brlValue / gbpRate).toFixed(2));
      } else {
        setConvertedUSD('');
        setConvertedEUR('');
        setConvertedGBP('');
      }
    } else {
      setConvertedUSD('');
      setConvertedEUR('');
      setConvertedGBP('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#141414' }}>
      <Text style={stilo.titulo}> Bem Vindo, {username}! {"\n"} ≻───── ⋆✩⋆ ─────≺ 
      </Text> 
      
      <TextInput
        style={stilo.caixa}
        placeholder="Digite um valor em BRL"
        keyboardType="numeric"
        value={valueBRL}
        onChangeText={handleValueChange}
      />

      <Text style={{ fontSize: 18, color: 'white', marginBottom: 5, fontStyle: 'italic' }}>
        {convertedUSD ? `Valor em USD: $ ${convertedUSD}` : ''}
      </Text>
      
      <Text style={{ fontSize: 18, color: 'white', marginBottom: 5 }}>
        {convertedEUR ? `Valor em EUR: € ${convertedEUR}` : ''}
      </Text>

      <Text style={{ fontSize: 18, color: 'white', marginBottom: 20 }}>
        {convertedGBP ? `Valor em GBP: £ ${convertedGBP}` : ''}
      </Text>

      <TouchableOpacity style={stilo.botao} onPress={() => navigation.navigate('Login')}> 
        <Text style={stilo.texto}> Sair </Text>
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
      marginTop: 20,
      padding: 10,
      margin: 10,
      borderRadius: 5,
      width: '80%',
      alignSelf: 'center',
      fontFamily:'Pompiere-Regular'
    }

})
