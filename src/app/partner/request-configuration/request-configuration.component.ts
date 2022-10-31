import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { UsersService } from '../../users.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser'
import { FormGroup, FormControl, FormBuilder, Validators ,FormArray} from '@angular/forms';


@Component({
  selector: 'app-request-configuration',
  templateUrl: './request-configuration.component.html',
  styleUrls: ['./request-configuration.component.css']
})
export class RequestConfigurationComponent implements OnInit {
  ConfigurationData:any = [];
  public ConfigurationForm!: FormGroup;



  
  constructor(private spinner: NgxSpinnerService,private userservice: UsersService, private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    
    this.ConfigurationForm = this.formBuilder.group({
      ServiceCategoryID: '',
      QuestionName: '',
      QuestionType: '',
      Range:this.formBuilder.group({
        StartRange:'',
        EndRange:'',
      }),
      Options: this.formBuilder.array([
        this.formBuilder.group({
          Answer: new FormControl('', [Validators.required]),
        }),
        this.formBuilder.group({
          Answer: new FormControl('', [Validators.required]),
        })
      ])
    });

    

    this.spinner.show()
    this.ConfigurationData=[]
    this.userservice.GetRequestConfigurations().subscribe((response) => {
      this.spinner.hide()

      if(response && response.code =="S001"){
        this.ConfigurationData=response.data;
      }


    },function (error) {
      alert(error.error.data);

    })
    this.spinner.hide();
  }

  get Options() {
    return this.ConfigurationForm.get('Options') as FormArray;
  }

  private OptionsFormGroup(): FormGroup {
    return new FormGroup({
      'Answer': new FormControl('',),
     
    })
  }

  CreateConfiguration(){

    this.userservice.CreateRequestConfiguration().subscribe((response) => {
      this.spinner.hide()

      if(response && response.code =="S001"){
        this.ConfigurationData=response.data;
      }


    },function (error) {
      alert(error.error.data);

    })

  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.value); // true or false
    console.log('ServiceCategoryID', form.value.ServiceCategoryID);
    console.log('QuestionName', form.value.QuestionName);
    console.log('QuestionType', form.value.QuestionType);
  }

  

}
