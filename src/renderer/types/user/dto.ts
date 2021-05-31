export class LoginDTO {
  name = "";
  password = "";
}

export class RegDTO extends LoginDTO {
  confirmPassword = "";
}
