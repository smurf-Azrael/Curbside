export interface IUser {
  id: string,
  firstName?: string,
  lastName?: string,
  email: string,
  emailVerified: boolean,
  photoUrl?: string,
  createdAt: Date,
  city?: string,
  longitude?: number,
  latitude?: number,
}
