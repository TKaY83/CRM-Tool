import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userID = '';
  user: User = new User();
  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paraMap => {
      this.userID = paraMap.get('id')
      console.log('User id is', this.userID)
      this.getUser();
    });
  }

  getUser() {
    this.firestore.collection('users')
      .doc(this.userID)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
        console.log('user retr',this.user)
      })
  }

  editUser(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;

  }

  editAddress(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
  }

}
