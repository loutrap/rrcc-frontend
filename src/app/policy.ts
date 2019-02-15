/* Policy interface represents a policy with a description, url, and acknowledged field.
 * It also keeps track of the number of users who have acknowledged the policy */
export interface Policy {
  id: number;
  title: string;
  description: string;
  departments: Array<number>;
  url: string;
  acknowledged: boolean;
  date: string;
  numHaveAcked: number;
  numHavePolicy: number;
}
