import { Injectable } from '@angular/core';
import {Registrant} from '../registrant';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Validate Email
   * Returns true if the email address is valid.
   * Regex value is from here: http://emailregex.com/
   * @param email - user's email address
   */
  validateEmail(email: string): boolean {
    if (email == null) { return false; }
    email = email.trim();
    const regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
      '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    const result = regex.test(email);
    return result;
  }

  /**
   * Validate Password
   * Returns true if the password meets the criteria mentioned on the registration page
   * @param password - user's password
   */
  validatePassword(password: string): boolean {
    if (password == null) { return false; }
    const regex = new RegExp('((?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,})');
    const result = regex.test(password);
    return result;
  }
  /**
   * Validate Name
   * Returns true if the name contains only letters, spaces, and characters ' and -
   * @param name - user's name
   */
  validateName(name: string): boolean {
    if (name == null) { return false; }
    name = name.trim();
    const regex = new RegExp('^[A-Za-z][A-Za-z\\\'\\-]+([\\ A-Za-z][A-Za-z\\\'\\-]+)*');
    const result = regex.exec(name);
    // Check if there still remains invalid characters after first part of name
    if (result) {
      // Removes valid portion of string
      const nameFragment = name.replace(result[0], '');
      // If there are still characters left over, check them for validity
      return nameFragment === '' ? true : !!regex.exec(nameFragment.trim());
    }
    return !!result;
  }

  /**
   * Validate Phone Number
   * Returns true if the phone number is 10 digits, regardless of how it is formatted
   * Regex value is from here: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
   * @param phoneNumber - user's phone number
   */
  validatePhoneNumber(phoneNumber: string): boolean {
    if (phoneNumber == null) { return false; }
    phoneNumber = phoneNumber.trim();
    const regex = new RegExp('^(\\+\\d{1,2})?\\d{10}$');
    const result = regex.test(phoneNumber);
    return result;
  }

  /**
   * Validate Password Match
   * Returns true if the two passwords are equal
   * @param pw1 - first entered password
   * @param pw2 - second entered password
   */
  validatePasswordMatch(pw1: string, pw2: string): boolean {
    if (pw1 == null || pw2 == null) { return false; }
    return ((pw1 === pw2) && this.validatePassword(pw1) && this.validatePassword(pw2));
  }

  /**
   * Validate Registrant
   * Returns true if all of the registrant's fields are valid
   * @param registrant - user's info entered on the registration page
   */
  validateRegistrant(registrant: Registrant): boolean {
    if (registrant == null) { return false; }
    return (
      this.validateName(registrant.fName)
      && this.validateName(registrant.lName)
      && this.validateEmail(registrant.email)
      && this.validatePhoneNumber(registrant.phoneNum)
      && this.validatePassword(registrant.password));
  }
}
