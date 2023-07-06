export interface Api {
  code: string
  data: any
  msg: string
}
export type TabBarType = {
  text?: string
  icon?: string
  chooseIcon?: string
  path: string
} 
export type MediaType = {
  fileType: string
  size: number
  tempFilePath: string 
}
export type UserAddressType = {
  address: string | null
  location: {
    lat: number | null
    lng: number | null
  }
}