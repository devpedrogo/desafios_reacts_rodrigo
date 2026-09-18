import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const bombaGasolinaImg = require('./assets/bomba-de-combustivel.png');

export default function App() {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [resultado, setResultado] = useState('');

  function calcularMelhorCombustivel() {
    const precoAlcool = Number(alcool.replace(',', '.'));
    const precoGasolina = Number(gasolina.replace(',', '.'));

    if (
      !Number.isFinite(precoAlcool) ||
      !Number.isFinite(precoGasolina) ||
      precoAlcool <= 0 ||
      precoGasolina <= 0
    ) {
      setResultado('Informe valores maiores que zero.');
      return;
    }

    setResultado(
      precoAlcool / precoGasolina < 0.7
        ? 'É mais vantajoso abastecer com álcool.'
        : 'É mais vantajoso abastecer com gasolina.',
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          accessibilityLabel="Bomba de combustível"
          source={bombaGasolinaImg}
          style={styles.image}
        />
        <Text style={styles.title}>Qual a melhor opção?</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Álcool (preço por litro):</Text>
          <TextInput
            accessibilityLabel="Preço do álcool por litro"
            keyboardType="decimal-pad"
            onChangeText={setAlcool}
            placeholder="0,00"
            placeholderTextColor="#8a909b"
            returnKeyType="next"
            style={styles.input}
            value={alcool}
          />

          <Text style={styles.label}>Gasolina (preço por litro):</Text>
          <TextInput
            accessibilityLabel="Preço da gasolina por litro"
            keyboardType="decimal-pad"
            onChangeText={setGasolina}
            onSubmitEditing={calcularMelhorCombustivel}
            placeholder="0,00"
            placeholderTextColor="#8a909b"
            returnKeyType="done"
            style={styles.input}
            value={gasolina}
          />

          <Pressable
            accessibilityRole="button"
            onPress={calcularMelhorCombustivel}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </Pressable>
        </View>

        {resultado ? (
          <Text style={styles.resultado}>
            {resultado}
          </Text>
        ) : null}
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 20,
  },
  image: {
    height: 179,
    marginBottom: 1,
    resizeMode: 'contain',
    width: 170,
  },
  title: {
    color: '#f2f3f5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  form: {
    gap: 6,
    width: '100%',
    maxWidth: 410,
  },
  label: {
    color: '#f2f3f5',
    fontSize: 11,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    color: '#242831',
    fontSize: 16,
    height: 38,
    paddingHorizontal: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffd12f',
    borderRadius: 2,
    justifyContent: 'center',
    marginTop: 2,
    minHeight: 38,
  },
  buttonPressed: {
    backgroundColor: '#ffe06a',
  },
  buttonText: {
    color: '#25282e',
    fontSize: 12,
    fontWeight: '700',
  },
  resultado: {
    color: '#ffd12f',
    fontSize: 13,
    marginTop: 12,
    maxWidth: 410,
    textAlign: 'center',
  },
});
