export interface ItemInterface {
  id: number|string;
  name: string;
  items?: ItemInterface[]|null;
}
