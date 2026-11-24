// Lê as credenciais das variáveis de ambiente (.env local ou Credentials do Jenkins).
// Falha com mensagem clara se alguma estiver faltando.
export function getCredenciais() {
  const email = process.env.USER_EMAIL;
  const senha = process.env.USER_PASSWORD;

  if (!email || !senha) {
    throw new Error(
      'Defina USER_EMAIL e USER_PASSWORD (copie .env.example para .env e preencha).'
    );
  }

  return { email, senha };
}
