import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { ConsoleReporter } from 'jasmine'; 
import { UsersService } from '../../users.service';


@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
  taxIMG: any
  submitted: any = false
  contacts: any
  empIndex: any
  controls: any
  coInsuranceList: any = [];
  ODvalue: any
  Tpvalue: any
  // coInsuranceForm: FormGroup = new FormGroup({
  //   coInsuranceItems: new FormArray([this.createItem()])

  // });
  items: FormArray | undefined;
  insurerData: any = []
  // PolicyIssuedDetails: any = {};
  // CoInsurerDetailsControl:any

  // items!: FormArray; 
  premiumValue: any

  CoInsurerDetails: any = false

  formdetails: any;
  public insuranceForm!: FormGroup;
  public CoInsurenceDetails!: FormGroup;
  public form!: FormGroup;
  public coins!: FormGroup;
  // public insurer !: FormGroup;
  // public CoInsurerDetails!: FormArray;
  public alias: any;
  Type: any
  // InsuranceType:any  
  public PolicyIssuedDetails !: FormGroup
  PolicyPremiumDetails !: FormGroup
  InsuranceType: any
  InsuranceID: any
  updateData: any
  maxdate = new Date();
  constructor(private route: Router, private formBuilder: FormBuilder, private userservice: UsersService, private router: ActivatedRoute) { }
  contact: any
  IsCoinsurencerAvailable: any
  file: any = false
  updatefile: any = []
  link: any
  imgFile: any
  imglink: any
  insid: any
  idlink: any
  uploadtag:any = true;
  ngOnInit(): void {





    this.Type = this.router.snapshot.queryParamMap.get("type")
    this.InsuranceType = this.router.snapshot.queryParamMap.get("InsuranceType")
    this.InsuranceID = this.router.snapshot.queryParamMap.get("InsuranceID")

    // updateDetails. append("Insurancetype",this.InsuranceType)
    // updateDetails. append("InsuranceID",this.InsuranceID)

    const updateDetails = {
      "InsuranceType": this.InsuranceType,
      "InsuranceID": this.InsuranceID

    }
    this.userservice.InsuranceDetails(updateDetails).subscribe(formdetails => {
      //console.log("responsedwbcksdckdck", formdetails.data)
      this.updateData = formdetails.data
      //console.log('ins ID',this.InsuranceID)
      // this.insuranceForm.patchValue({InsuranceID:this.InsuranceID})
      this.insuranceForm.patchValue({ InsuranceType: this.updateData.InsuranceType }),
        this.insuranceForm.patchValue({ RelationshipManager: this.updateData.RelationshipManager }),
        this.insuranceForm.patchValue({ BusinessSourcedBy: this.updateData.BusinessSourcedBy }),
        this.insuranceForm.patchValue({ ClientName: this.updateData.ClientName }),
        this.insuranceForm.patchValue({ BusinessType: this.updateData.BusinessType }),
        this.insuranceForm.patchValue({ ProductDepartment: this.updateData.ProductDepartment }),
        this.insuranceForm.patchValue({ ProductType: this.updateData.ProductType }),
        this.insuranceForm.patchValue({ Category: this.updateData.Category }),
        this.insuranceForm.patchValue({ SubProductName: this.updateData.SubProductName }),
        this.insuranceForm.patchValue({ IntermediaryName: this.updateData.IntermediaryName })
      if (this.updateData.IntermediaryName == "Others") {
        this.intermediateOther = true
      }
      this.insuranceForm.patchValue({ IntermediaryOtherName: this.updateData.IntermediaryOtherName }),
        this.insuranceForm.patchValue({ CoBroking: this.updateData.CoBroking })
      if (this.updateData.CoBroking == "Yes") {
        this.broking = true;
      }
      this.insuranceForm.patchValue({ CoBrokingName: this.updateData.CoBrokingName }),
        this.insuranceForm.patchValue({ PolicyStartDate: this.updateData.PolicyStartDate }),
        this.insuranceForm.patchValue({ PolicyEndDate: this.updateData.PolicyEndDate }),
        this.insuranceForm.patchValue({ OD_BasicPremium: this.updateData.OD_BasicPremium }),
        this.insuranceForm.patchValue({ TP_TerrorismPremium: this.updateData.TP_TerrorismPremium })
      this.insuranceForm.patchValue({ NetPremium: this.updateData.NetPremium }),
        this.insuranceForm.patchValue({ "IsGST@18%": this.updateData["IsGST@18%"] })
      if (this.updateData["IsGST@18%"] == "No") {
        this.noGst = true;
      }
      this.insuranceForm.patchValue({ PaymentDate: this.updateData.PaymentDate }),
        this.insuranceForm.patchValue({ ModeOfPayment: this.updateData.ModeOfPayment }),
        this.insuranceForm.patchValue({ BankReferenceNo: this.updateData.BankReferenceNo }),
        this.insuranceForm.patchValue({ BankName: this.updateData.BankName }),
        this.insuranceForm.patchValue({ ExpectedTotalCommision: this.updateData.ExpectedTotalCommision }),
        this.insuranceForm.patchValue({ Remarks: this.updateData.Remarks }),
        this.insuranceForm.patchValue({ TotalGSTAmount: this.updateData.TotalGSTAmount }),
        this.insuranceForm.get('MainInsurerDetails')?.patchValue({ MainInsurerName: this.updateData.MainInsurerDetails.MainInsurerName }),
        this.insuranceForm.get('MainInsurerDetails')?.patchValue({ MainInsurerBranchName: this.updateData.MainInsurerDetails.MainInsurerBranchName }),
        this.insuranceForm.get('MainInsurerDetails')?.patchValue({ MainInsurerCommision: this.updateData.MainInsurerDetails.MainInsurerCommision }),
        this.insuranceForm.get('PolicyIssuedDetails')?.patchValue({ IsThePolicyIssued: this.updateData.PolicyIssuedDetails.IsThePolicyIssued })
      if (this.updateData.PolicyIssuedDetails.IsThePolicyIssued == "Yes") {
        this.isNameSelected = true;
        this.file = true
        this.uploadtag = false;

        //console.log("fileupdate",this.updatefile)
      }
      this.insuranceForm.get('PolicyIssuedDetails')?.patchValue({ PolicyNumber: this.updateData.PolicyIssuedDetails.PolicyNumber })
      this.insuranceForm.get('PolicyPremiumDetails')?.patchValue({ IsThePolicyPremium: this.updateData.PolicyPremiumDetails.IsThePolicyPremium })
      if (this.updateData.PolicyPremiumDetails.IsThePolicyPremium == "No") {
        this.isPremiumSelected = true;
      }
      this.insuranceForm.get('PolicyPremiumDetails')?.patchValue({ TypeOfPremiumPolicyTransaction: this.updateData.PolicyPremiumDetails.TypeOfPremiumPolicyTransaction }),
        this.insuranceForm.get('PolicyPremiumDetails')?.patchValue({ PremiumPolicyInstallmentNumber: this.updateData.PolicyPremiumDetails.PremiumPolicyInstallmentNumber }),
        this.insuranceForm.get('PolicyPremiumDetails')?.patchValue({ PremiumPolicyEffectiveDate: this.updateData.PolicyPremiumDetails.PremiumPolicyEffectiveDate }),
        this.insuranceForm.get('CoInsurenceDetails')?.patchValue({ IsCoinsurencerAvailable: this.updateData.CoInsurenceDetails.IsCoinsurencerAvailable })
      if (this.updateData.CoInsurenceDetails.IsCoinsurencerAvailable == "Yes") {
        this.coInsurance = true;
      }
      this.insuranceForm.get('PolicyIssuedDetails')?.patchValue({ PolicyDocument: this.updateData.PolicyDocument })
      this.updatefile = this.updateData.PolicyIssuedDetails.PolicyDocument.FileName
        
      console.log('updateFile',this.updatefile)
      // this.link = "https://s3-us-west-2.amazonaws.com/secureoneanvayaa/Insurance/PolicyDocumentDetails/"
      // this.insid = this.InsuranceID + "/"
      // console.log("id", this.insid)
      // this.idlink = this.link.concat(this.insid.toString())
      // this.imgFile = this.updatefile.slice(-1)[0].FileName
      // this.imglink = this.idlink.concat(this.imgFile.toString())
      // for(let Doc of this.updatefile){
      // console.log("itrated file array", this.imglink)
      // }

      console.log('document', this.updatefile)

      this.insuranceForm.get('CoInsurenceDetails')?.patchValue({ CoInsurerDetails: this.updateData.CoInsurenceDetails.CoInsurerDetails })

      for (let a of this.updateData.CoInsurenceDetails.CoInsurerDetails) {

        this.items = this.insuranceForm.controls['CoInsurenceDetails'].get('CoInsurerDetails') as FormArray;
        this.items.push(this.createItem());
        this.insuranceForm.get('CoInsurenceDetails')?.patchValue({ CoInsurerDetails: this.updateData.CoInsurenceDetails.CoInsurerDetails })


        //console.log('a keys', this.insuranceForm.get('CoInsurenceDetails'))

      }

    })

    this.insuranceForm = this.formBuilder.group({
      // InsuranceID :this.InsuranceID,
      InsuranceType: this.Type,
      RelationshipManager: [''],
      BusinessSourcedBy: ['', [Validators.required, Validators.minLength(5)]],
      ClientName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      BusinessType: ['', [Validators.required]],
      ProductDepartment: ['', [Validators.required]],
      ProductType: [''],
      Category: [''],
      SubProductName: ['', [Validators.required, Validators.minLength(5)]],
      IntermediaryName: [''],
      IntermediaryOtherName: [''],
      CoBroking: [''],
      CoBrokingName: [''],
      PolicyStartDate: [''],
      PolicyEndDate: [''],
      OD_BasicPremium: ['', [Validators.required]],
      TP_TerrorismPremium: [''],
      NetPremium: [''],
      "IsGST@18%": [''],
      PaymentDate: [''],
      ModeOfPayment: [''],
      BankReferenceNo: [''],
      BankName: [''],
      ExpectedTotalCommision: [''],
      Remarks: [''],
      TotalGSTAmount: [''],


      // PolicyNumber:[''],
      PolicyIssuedDetails: this.formBuilder.group({
        IsThePolicyIssued: ['', [Validators.required]],
        PolicyNumber: [''],
        // PolicyDocument: ['  ',],

      }),
      PolicyPremiumDetails: this.formBuilder.group({
        "IsThePolicyPremium": [''],
        "TypeOfPremiumPolicyTransaction": [''],
        "PremiumPolicyInstallmentNumber": [''],
        "PremiumPolicyEffectiveDate": [''],
      }),
      MainInsurerDetails: this.formBuilder.group({
        "MainInsurerName": [''],
        "MainInsurerBranchName": [''],
        "MainInsurerCommision": [''],

      }),
      CoInsurenceDetails: this.formBuilder.group({
        "IsCoinsurencerAvailable": [''],
        CoInsurerDetails: this.formBuilder.array([]),
      }),




    })


    this.coins = this.formBuilder.group({
      "CoInsurerBranchName": [''],
      "CoInsurerName": [''],
      "CoInsurerCommision": ['']
    })


  }


    fileView(){
      console.log("function Url",this.updatefile)
      return window.location.href = this.updatefile
    }

  premium() {
    const contro = new FormControl()
    this.ODvalue = parseInt(this.ODvalue);
    this.Tpvalue = parseInt(this.Tpvalue);

    this.premiumValue = this.ODvalue + this.Tpvalue
    //console.log(this.premiumValue)
    this.insuranceForm.patchValue({ NetPremium: this.premiumValue })


  }

  oncoinsadded() {
    //console.log("coins", this.coins.value)

    this.insurerData.push(this.coins.value)
    for (let keys in this.coins.value) {

      this.coins.get(keys)?.setValue("")

    }

    //console.log('new array', this.insurerData)
  }

  addingOD(event: any) {

    this.ODvalue = event.target.value

    if (this.ODvalue != NaN && this.Tpvalue != NaN) {
      this.ODvalue = parseInt(this.ODvalue);
      this.Tpvalue = parseInt(this.Tpvalue);
      this.premiumValue = this.ODvalue + this.Tpvalue
      this.insuranceForm.patchValue({ NetPremium: this.premiumValue })

    }
  }


  addingtp(event: any) {

    this.Tpvalue = event.target.value

    if (this.ODvalue != NaN && this.Tpvalue != NaN) {
      this.ODvalue = parseInt(this.ODvalue);
      this.Tpvalue = parseInt(this.Tpvalue);
      this.premiumValue = this.ODvalue + this.Tpvalue
      this.insuranceForm.patchValue({ NetPremium: this.premiumValue })

    }


  }


  onuploadtaxFile(img: any) {

    if (img.target.files.length > 0) {
      this.taxIMG = img.target.files[0];
      console.log(this.taxIMG);
    }

  }


  onInsurenceSubmit() {

    const insurence = new FormData();
    // //console.log("Insu", this.insuranceForm);



    this.submitted = true;
    insurence.append("PolicyDocument", this.taxIMG);
    // insurence.append("CoInsurenceDetails.CoInsurerDetails",this.insurerData)
    // insurence.append("CoInsurenceDetails.IsCoinsurencerAvailable",this.IsCoinsurencerAvailable)


    for (let a in this.insuranceForm.value) {

      if (a == "PolicyIssuedDetails") {
        for (let i in this.insuranceForm.value[a]) {

          if (i == "PolicyDocument") {
            insurence.append(`PolicyIssuedDetails[${i}]`, this.taxIMG);
          } else {
            insurence.append(`PolicyIssuedDetails[${i}]`, this.insuranceForm.value[a][i])
          }
        }
      } else if (a == "PolicyPremiumDetails") {
        for (let i in this.insuranceForm.value[a]) {

          insurence.append(`PolicyPremiumDetails[${i}]`, this.insuranceForm.value[a][i])
        }
      }
      else if (a == "MainInsurerDetails") {
        for (let i in this.insuranceForm.value[a]) {

          insurence.append(`MainInsurerDetails[${i}]`, this.insuranceForm.value[a][i])
        }
      }
      else if (a == "CoInsurenceDetails") {

        for (let k in this.insuranceForm.value[a]) {

          insurence.append(`CoInsurenceDetails[${k}]`, JSON.stringify(this.insuranceForm.value[a][k]))

        }
      }
      else {
        insurence.append(a, this.insuranceForm.value[a])

      }
    }



    //console.log("update params datataa", insurence)
    console.log("Insurance ID", this.InsuranceID);
    if (this.InsuranceID != null || this.InsuranceID != undefined) {
      // insurence['InsuranceID']=this.InsuranceID;
      insurence.append("InsuranceID", this.InsuranceID);
    }
    this.userservice.Insuranceform(insurence).subscribe(formdetails => {
      //console.log("response", this.insuranceForm.value)
      // this.route.navigate(['/insurancedashboard'])

    }, (error) => {
      alert(error.error.data)
    })


  }

  onKeydown(event: any) {

    //console.log("reset Function", event)
    this.insuranceForm.reset(this.insuranceForm.value);

  }

  event: any
  intermediateOther: boolean = false;
  coInsurance: boolean = false;
  isNameSelected: boolean = false;
  isPremiumSelected: boolean = false;
  broking: boolean = false;
  noGst: boolean = false;
  ispolicyBtn: any;
  policyIssued(event: any) {
    let selected = event.target.value;
    this.ispolicyBtn = selected;
    //console.log(this.ispolicyBtn);
    if (selected == "Yes") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }

  policypremium(event: any) {
    let selected = event.target.value;
    if (selected == "Yes") {
      this.isPremiumSelected = false;
    } else {
      this.isPremiumSelected = true;

    }


  }

  createItem(): FormGroup {
    // let coInsuranceObj: any;
    // for (let k = 0; k < 2; k++) {
    //   coInsuranceObj = this.formBuilder.group({
    //     CoInsurerName: ['', Validators.required],
    //     CoInsurerBranchName: '',
    //     CoInsurerCommision: ''
    //   });
    // }
    let coInsuranceObj = this.formBuilder.group({
      CoInsurerName: ['', Validators.required],
      CoInsurerBranchName: '',
      CoInsurerCommision: ''
    });
    return coInsuranceObj;

  }

  addInput() {
    this.items = this.insuranceForm.controls['CoInsurenceDetails'].get('CoInsurerDetails') as FormArray;
    this.items.push(this.createItem());
    //console.log('items', this.items)
  }
  getTrackBy(item: any) {
    return item.name
  }
  InsuranceCo(event: any) {
    let selected = event.target.value;
    if (selected == "Yes") {
      this.coInsurance = true;
      this.coInsuranceList.push({ "name": this.coInsuranceList.length })

      //console.log('array', this.coInsuranceList)
    } else {
      this.coInsurance = false;
      this.coInsuranceList = []

    }

  }

  intermediate(event: any) {
    let selected = event.target.value;
    if (selected == "Others") {
      this.intermediateOther = true;
    } else {
      this.intermediateOther = false;
    }
  }

  coBroking(event: any) {
    let selected = event.target.value;
    if (selected == "Yes") {
      this.broking = true;
    } else {
      this.broking = false;
    }
  }

  gst(event: any) {
    //console.log("event", event.target.value)
    let selected = event.target.value;
    if (selected == "No") {
      this.noGst = true;
    } else {
      this.noGst = false;
    }
  }

  getControls() {
    return (this.insuranceForm.controls['CoInsurenceDetails'].get('CoInsurerDetails') as FormArray).controls;
  }


}
