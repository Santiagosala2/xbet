

export interface IFormInputs {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email : string;
    password: string;
}


export enum FormLabels  {
    firstName = "First name",
    lastName = "Last name",
    dateOfBirth = "Date of birth",
    email = "Email",
    password = "Password"
}

export const weatherTypes = [

    {
      "name": "Sunshine",
      "emoji": "☀"
    },
    {
      "name": "Cloudy",
      "emoji": "☁"
    },
    {
      "name": "Rain",
      "emoji": "🌧"
    },
    {
      "name": "Thunder",
      "emoji": "⚡"
    },
    {
      "name": "Windy",
      "emoji": "🌫"
    }
  ]