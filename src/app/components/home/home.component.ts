import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.builSubmitform();
  }

  submitForm: FormGroup;

  builSubmitform(){
    this.submitForm = new FormGroup({
      email: new FormControl('')
    })
  }

  // encrypt data
  ngSubmit(){
    let data = this.submitForm.value;
    const ecntyptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'data_key').toString();
    localStorage.setItem('local_data',ecntyptedData);
  }


  // decrypt data
  decrypteData : any;
  decryptData(){
    if(localStorage.getItem('local_data')){
      const eText = localStorage.getItem('local_data') || '';
      const decryptedWord = CryptoJS.AES.decrypt(eText, 'data_key');
      this.decrypteData = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8))
    }
  }


}
