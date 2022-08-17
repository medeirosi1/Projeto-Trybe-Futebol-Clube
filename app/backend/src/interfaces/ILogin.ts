export default interface Login {
  email: string,
  password: string
}

// export interface token {
//   token: string,
// }

export interface createLogin {
  login(props: Login): Promise<string>,
}
