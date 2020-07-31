import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
        <TextInput
          style={{ borderWidth: 1, marginHorizontal: 40, marginBottom: 40, height: 45, borderRadius: 10, paddingHorizontal: 40 }}
          value={phoneNumber}
          onChangeText={value => setPhoneNumber(value)}
        />
        <Button
          title="Enviar SMS"
          onPress={() => signInWithPhoneNumber(`+55${phoneNumber}`)}
        />
      </View>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};

export { App };