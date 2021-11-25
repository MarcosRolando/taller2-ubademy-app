export function newUserProfile(name: string, email: string, location: string, 
    subType: string, image: string, genres: Array<string>) {
  return {
    name: name,
    email: email,
    location: location,
    subType: subType,
    image: image,
    genres: genres
  }
}
