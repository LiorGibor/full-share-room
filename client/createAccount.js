import { useNavigation ,useState } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity  } from 'react-native';

export default function CreateUserScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  function handleSubmit() {
    const userData = { userName, password, email, fullName, profilePicture, dateOfBirth };
    fetch ('http://127.0.0.1:5000/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('User created successfully');
            navigation.goBack();
        } else {
            console.log('Error creating user');
        }   
    })
    .catch(error => console.error(error));
  }

  return (  
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Create Account</Text>
      <TextInput placeholder="Username" value={userName} onChangeText={setUserName} style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Profile Picture" value={profilePicture} onChangeText={setProfilePicture} style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }} />
      <Button title="Submit" onPress={handleSubmit} /> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
