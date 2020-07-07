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

	Após executar o projeto você deverá ver a tela do seu emulador/celular parecido com a imagem abaixo:

	COLOCAR UMA IMAGEM INICIAL DO EMULADOR AQUI

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