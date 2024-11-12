const userNomeEmpresa = document.getElementById('userNomeEmpresa');
const userResumoEmpresa = document.getElementById('userResumoEmpresa');
const userLocalizacaoEmpresa = document.getElementById('userLocalizacaoEmpresa');
const userContatoEmpresa = document.getElementById('userContatoEmpresa');
const userRedesSociaisEmpresa = document.getElementById('userRedesSociaisEmpresa');
const userAvatarEmpresa = document.getElementById('userAvatarEmpresa');
const logoutButton = document.getElementById('logoutButton');
const messageDiv = document.getElementById('message');

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../login/login.html'; // Redireciona para login se não houver token
}

async function loadProfile() {
    try {
        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
                 // Exibir informações específicas da empresa
                userNomeEmpresa.textContent = data.user.profile.nome_completo || 'Não disponível';
                userResumoEmpresa.textContent = data.user.profile.resumo || 'Não disponível';
                userLocalizacaoEmpresa.textContent = data.user.profile.localizacao || 'Não disponível';
                userContatoEmpresa.textContent = data.user.profile.contato || 'Não disponível';
                userRedesSociaisEmpresa.textContent = JSON.stringify(data.user.profile.redes_sociais || 'Não disponível');
                if (data.user.profile.avatar) {
                    userAvatarEmpresa.src = data.user.profile.avatar;
                }

            showMessage('Perfil carregado com sucesso!', 'success');
        } else {
            showMessage('Erro ao carregar o perfil!', 'error');
            window.location.href ='../login/login.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
        showMessage('Erro na comunicação com o servidor', 'error');
    }
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
}

loadProfile();

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
});