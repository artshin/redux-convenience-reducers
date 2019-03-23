import uuidV4 from 'uuid/v4'

export class Resource {
  public readonly id: string = uuidV4()
}

export interface ResourceById {
  [index: string]: Resource
}
