import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [base, setBase] = useState('');
  const [altura, setAltura] = useState('');
  const [area, setArea] = useState('');

  function calcularArea() {
    if(base > 0 && altura > 0) {
      const area = (parseFloat(base) * parseFloat(altura)) / 2;
      setArea(area);
    } else{
      setArea('Valores inválidos');
    }
  }

  return (
    <View style={styles.container}>
      <Text selectable={true} selectionColor={"#fff"}>Insira os dados abaixo para calcular a área do triangulo:</Text>
      <TextInput
        placeholder="Base"
        value={base}
        onChangeText={setBase}
      />
      <TextInput
        placeholder="Altura"
        value={altura}
        onChangeText={setAltura}
      />
      <Button title="Calcular" onPress={calcularArea} />
      <Text>{area? `Área: ${area}` : ''}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07e7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});