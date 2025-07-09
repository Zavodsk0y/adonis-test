export const userFullNameRegex = new RegExp(/^[А-яёЁ -]*$/u)
export const userPasswordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)
