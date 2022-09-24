import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userID = '';
  user: User = new User();
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

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

  }

  editAddress(){

  }

}
