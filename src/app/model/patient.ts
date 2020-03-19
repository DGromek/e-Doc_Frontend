export class Patient {
  constructor(
    public pesel?: string,
    public firstName?: string,
    public lastName?: string,
    public city?: string,
    public street?: string,
    public houseNr?: string,
    public postalCode?: string,
    public phoneNr?: string,
    public email?: string
  ) { }
}
