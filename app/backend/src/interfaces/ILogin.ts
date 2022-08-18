export default interface Login {
  email: string,
  password: string
}

export interface TokenFace {
  token: string,
}

export interface AuthorizationToken {
  authorization: TokenFace;
}

export interface createLogin {
  login(props: Login): Promise<string>,
}
