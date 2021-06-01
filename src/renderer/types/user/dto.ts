export class LoginDTO {
  name = "";
  password = "";
}

export class RegDTO extends LoginDTO {
  confirmPassword = "";
}

export class UserInfoDTO {
  id = 0;
  name = "";
  token = "";
}
