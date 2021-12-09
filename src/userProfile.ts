let profilePicture: string = '';

export function setUserProfilePicture(pictureLink: string) {
  profilePicture = pictureLink;
}

export function getUserProfilePicture(): string {
  return profilePicture;
}
