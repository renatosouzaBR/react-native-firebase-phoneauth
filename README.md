**O projeto tem como objetivo ajudar os desenvolvedores a criar um aplicativo com React Native que tenha a função de validação de número de celular utilizando a ferramenta Google Firebase.**

Sem mais delongas, bora lá!

### 1. Criando o projeto e instalando as dependências

* Execute o seguinte comando em seu terminal. Este comando criará uma pasta contendo um projeto em React Native.

		npx react-native init firebasePhoneAuth

* Instale as seguintes dependências:

		yarn add @react-native-firebase/app
		yarn add @react-native-firebase/auth

* Para IOS, execute:

		cd ios && pod install && cd ..

### 2. Executando o projeto no emulador

* Em seu terminal, rode o seguinte comando conforme a plataforma escolhida (sem as aspas).

		"yarn ios" para rodar no IOS

		"yarn android" para rodar no Android

	Após executar o projeto você deverá ver a tela do seu emulador/celular com a tela inicial de um projeto React Native.

### 3. Codificação inicial

* Vamos agora criar uma pasta na raiz do projeto com o nome **src**, e dentro criar o arquivo **index.js**. É neste arquivo que vamos trabalhar nossa implementação.
* Vamos copiar e colar o conteúdo a seguir para dentro do index.js:

		import React from 'react';
		import { View, Text } from 'react-native';
		
		const App = () => {
		  return (
		    <View style={{ marginTop: 50 }}>
		      <Text>Aplicativo inicial</Text>
		    </View>
		  );
		};
		
		export { App };

* Agora vamos remover o arquivo **App.js** e vamos modificar o arquivo index.js, sendo que ambos estão na raiz do projeto:

		import { AppRegistry } from 'react-native';
		import { App } from './src';
		import { name as appName } from './app.json';
		
		AppRegistry.registerComponent(appName, () => App);

* Agora você deve ter uma tela igual a essa:

	![](https://github.com/renatosouzaBR/react-native-firebase-phoneauth/blob/develop/src/assets/Image2.png)
	
### 4. Criando o projeto no Google Firebase

* Vamos acessar o console clicando no link [Google Firebase](https://console.firebase.google.com/).
* Seu navegador deve abrir na página de autenticação do Google, portanto, faça o login com sua conta, ou caso ainda não tenha, faça o cadastro e depois volte para a etapa anterior, para realizar o login com sua nova conta.
* Após realizar o login, você deve ver a página inicial do console.

	![](https://github.com/renatosouzaBR/react-native-firebase-phoneauth/blob/develop/src/assets/Image3.png)
	
* Clique em "Criar um Projeto e depois dê um nome para o projeto. Vou dar o nome de PhoneAuth no meu exemplo.
* Clique em continuar e depois desmarque a opção "Ativar o Google Analytics neste projeto" e depois clique em "Criar projeto".
* Na proxima etapa você deve ser redirecionado para a página principal do seu projeto, conforme imagem abaixo.

	![](https://github.com/renatosouzaBR/react-native-firebase-phoneauth/blob/develop/src/assets/Image4.png)
	
* Depois do projeto criado, vamos criar a configuração para IOS e Android. Na mesma página inicial do projeto, acima da frase **adicione um app para começar**, clique no ícone do IOS.
* Você será redirecionado para criar o projeto para IOS, siga as etapas.
* Após concluir as etapas você já deve ter o firebase configurado em seu aplicativo para rodar no IOS. Faça o mesmo para criar um projeto para o Android.


### 5. Configurações adicionais para IOS e Android

* Mesmo com a etapa 4 pronta, devemos nos atentar há mais alguns passos, pois são itens que se não adicionados, seu projeto logo deixara de executar com o Firebase.
* Primeiro, para o IOS abra o arquivo **GoogleService-Info.plist** e copie o valor de **REVERSED_CLIENT_ID**. Com o valor copiado abra o projeto no xcode, e no painel de navegação, clique em **Show de project navigator** e depois clique no item com o nome do projeto. Agora no centro da tela, em **TARGETS** clique novamente no nome do projeto, depois vá até a aba **Info** e em **URL Types** clique em **+**. No campo **URL Schemes** cole o link que copiamos. Pronto, para o IOS é isso.
* Para o Android nós precisamos configurar as chaves SHA-1. Quando você criou o projeto para a plataforma Android, deve se lembrar deu um campo opcional referente ao certificado SHA-1, o que na verdade é obrigatório caso você queira debugar ou utilizar seu aplicativo na loja. Bom, no terminal execute o seguinte comando:

		cd android && ./gradlew signingReport && cd .. 
		
* Isto fará com que seja exibido o certificado SHA-1 gerado para o projeto. Copie e depois no firebase nas configurações do projeto Android, clique em **Adicionar impressão digital**, cole a chave e clique em salvar, depois faça novamente o download do arquivo **google-services.json** e cole na pasta do projeto android. Pronto, tudo pronto para codificar.

### 6. Codando pra valer agora!

* Bom, documentação é sempre seu melhor amigo durante o desenvolvimento, e aqui não será diferente. Vamos acessar o link [React Native Firebase](https://rnfirebase.io/auth/usage), e vamos fazer a instalação conforme o tópico **Usage**:

		yarn add @react-native-firebase/app
		yarn add @react-native-firebase/auth
		cd ios/ && pod install && cd ..
		
* Após instalar as dependências necessarias, vamos abrir o nosso **index.js** da pasta **src** e substitiur o código por:

		import React, { useState } from 'react';
		import { Button, TextInput, View, StyleSheet } from 'react-	native';
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
		      console.log('Código válido');
		    } catch (error) {
		      console.log('Código inválido');
		    }
		  }
		
		  if (!confirm) {
		    return (
		      <View style={styles.container}>
		        <TextInput
		          style={styles.textInput}
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
		    <View style={styles.container}>
		      <TextInput
		        style={styles.textInput}
		        value={code}
		        onChangeText={text => setCode(text)}
		      />
		      <Button title="Confirm Code" onPress={() => confirmCode()} />
		    </View>
		  );
		};
		
		const styles = StyleSheet.create({
		  container: {
		    flex: 1,
		    backgroundColor: '#fff',
		    justifyContent: 'center',
		  },
		  textInput: {
		    borderWidth: 1,
		    marginHorizontal: 40,
		    marginBottom: 40,
		    height: 45,
		    borderRadius: 10,
		    paddingHorizontal: 40,
		  },
		});
		
		export { App };
		
		
Vamos entender o código. Primeiramente o método **signInWithPhoneNumber** dispara a ação para enviar o sms, e depois atribui o resultado para a variavel **confirm**. O segundo método **confirmCode** é utilizado para verficiar o código após o envio, ou seja, o usuário digita o código recebido e é verificado se confere com o enviado.

Agora, falando da parte visual, existem dois retornos, sendo o primeiro quando nenhum código foi enviado, é mostrado o input para digitar o telefone, e o botão de enviar. O segundo retorno é para confirmar o código após ter recebido.

Bom, o código é bem mais simples do que configurar o projeto. Uma dica é que você pode implementar isso com Redux e Saga, dividir as telas entre as partes de enviar e confirmar, e melhorar algumas coisas.

**Então é isso, se alguém tiver algum problema com o tutotial, abra uma questão que eu respondo rapidamente.**