import auth0 from '../../lib/auth0';



const login = async (request, response) => {
    await auth0.handleLogin(request, response)
}

export default login;


//autenticação: verificar se os dados são mesmo daquele usuario ou se são validos(multi factor auth).
//autorização: saber até onde esse usuario pode ir(acesso)