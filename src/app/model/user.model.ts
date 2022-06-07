import { Timestamp } from '@angular/fire/firestore';

export interface User {
  workgroup: string;
  displayName?: string;
  email: string;
  uid: string;
  last_login: Timestamp;
}
