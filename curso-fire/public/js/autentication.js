var authEmailPassButton = document.getElementById('authEmailPassButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authGitHubButton = document.getElementById('authGitHubButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var authCreateUserButton = document.getElementById('authCreateUserButton');
var logOutButton = document.getElementById('logOutButton');

// Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

// Displays
var displayName = document.getElementById('displayName');

// Criar usuário
createUserButton.addEventListener('click', function() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (){
        alert('Bem vindo ' + emailInput.value);
    })
    .catch(function(error){
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console.')
    });
    create(nameInput.value, ageInput.value);
});

// Autenticar com e-mail e senha
authEmailPassButton.addEventListener('click', function() {
    firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (result){
        console.log(result);
        displayName.innerText = 'Bem vindo, ' + emailInput.value;
        alert('Autenticado ' + emailInput.value);
    })
    .catch(function(error){
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
    });
});

// Logout de autenticação e-mail e senha
logOutButton.addEventListener('click', function() {
    firebase
    .auth()
    .signOut()
    .then(function (){
        displayName.innerText = 'Você não está autenticado';
        alert('Você se deslogou!');
        }, function (error){
            console.error(error);
        });
});

// Autenticar via Github
authGitHubButton.addEventListener('click', function(){
    // providers autentication
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

// Autenticar via Facebook
authFacebookButton.addEventListener('click', function(){
    // providers autentication
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

// Autenticar via Twitter
authTwitterButton.addEventListener('click', function(){
    // providers autentication
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

// Autenticar via Google
authGoogleButton.addEventListener('click', function(){
    // providers autentication
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});


// Encapsulamento de prodivers
function signIn(provider){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function (result){
        console.log (result);
        var token = result.credential.accessToken;
        displayName.innerText = 'Bem vindo, ' + result.user.displayName;
    }).catch(function (error) {
        console.log(error);
        alert('Falha na autenticação');
    });
}

// Autenticar no modo Anonimo
authAnonymouslyButton.addEventListener('click', function() {
    firebase
    .auth()
    .signInAnonymously()
    .then(function (result){
        console.log(result);
        displayName.innerText = 'Bem vindo, Anônimo! Vejo que não quer se identificar, não tem problema.';
        alert('Autenticado Anonimamente');
    })
    .catch(function(error){
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
    });
});

function create(name, age){
    var data = {
        name: name,
        age: age
    };
     return firebase.database().ref().child('users').push(data);
}