export interface IEmail {
  address?: string,
  secret?: number,
  status?: string
}

export interface IMember {
  _id: string,
  member_id: number,
  first_name?: string,
  last_name?: string,
  username?: string,
  email?: IEmail,
  phone?: string,
  join_date: number,
  activated: boolean
}
