/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export class UserDto {
  email;

  _id;

  picture;

  constructor(model: any) {
    this.email = model.email;
    this._id = model._id;
    this.picture = model.picture;
  }
}
