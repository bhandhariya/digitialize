import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
@Injectable({
  providedIn: 'root'
})
export class MyFireService {

  constructor(private db:AngularFireDatabase) { }
  getUserFromDatabase(uid){
    const ref=this.db.database.ref('users/'+uid);
    return ref.once('value').then(snapshot=>snapshot.val());
  }
}
