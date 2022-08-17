export default interface IService<T> {
  list(): Promise<T[]>
  create(props: any): Promise<T>
}
