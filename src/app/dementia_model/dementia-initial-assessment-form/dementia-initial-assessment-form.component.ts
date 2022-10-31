import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { first, retryWhen } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dementia-initial-assessment-form',
  templateUrl: './dementia-initial-assessment-form.component.html',
  styleUrls: ['./dementia-initial-assessment-form.component.css']
})
export class DementiaInitialAssessmentFormComponent implements OnInit {
  Demographicsbtn: any = false
  medicalhistorybtn: any = false
  title: any = ""
  dropdownSettings = {}
  dropdownSetting = {}
  generalabilitydataOBj: any = {}
  otherphysicalcondition: any = {}
  status: any = {}
  public dementiaAssesmentForm!: FormGroup;
  public dementiaAssesmentFormMedicalHistory!: FormGroup;
  public dementiaAssesmentFormGeneralAbilities!: FormGroup;
  public dementiaAssesmentBiography!: FormGroup
  public children!: FormGroup
  public Spouses!: FormGroup
  public ClosestFriends!:FormGroup
  public silblings!: FormGroup
  Conditions: any[] = [


    {
      ConditionName: 'HTN',
      ConditionStatus: '',
      Duration: ''
    }
    ,
    {
      ConditionName: 'DM',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'CVD/CAD',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_Stroke',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_head_injury',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_allergies',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_illness',
      ConditionStatus: '',
      Duration: ''
    }




  ]
  step: any
  impdata: any = false
  stagedata: any
  // dementiaQuestion:any
  dementiaassesment: any;
  dementiaPhyConditions: any
  Type: any;
  childrendata: any = []
  spousedata: any = []
  siblingsdata: any = []
  CustID: any;
  // element:any
  CustRecID: any
  foundgenablityqn: any
  demographicsdata: any
  stagevalues: any
  items: FormArray | undefined
  data: FormArray | undefined
  phisicalcondition: any
  dementiacondition: any
  phisicalconditionID: any
  dropdownphydata: any
  lastgeneralability: any
  index: any
  objdata: any
  dropdownmusicSetting: any;
  dropdownvideosetting: any
  dementiavideodataarray: any = []
  dropdownActivitysetting: any = []
  activitydataarray: any = []
  selectphy: any = []
  othercondition: any = []
  dementiamusicdataarray: any = []
  generalAbilityData: any = [

  ]
  selectedData: any
  dementiamusic: any
  dementiavideo: any
  dementiaActivity: any
  cmtdata: any = {
    'datanew': ""
  }
  ondataadded = false
  spouseadded = false
  childrenadded = false

  music = false
  video = false
  activity = false
  phycondition = false
  genbtn = false
  dementiaSpouseData: any
  demetiaChildrenData: any
  dementiaSiblingData: any
  dementiaClosestFrndData:any=[]
  physicalconditionData: any

  activithyData: any
  musicData: any
  videoData: any
  comment: any = ''
  MedicalHistorybtn: any = false
  Biographysbtn: any = false
  dementiaQuestion: any
  dementiaQuestiondata: any = []
  constructor(private spinner:NgxSpinnerService,private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  maxdate = new Date();
  dataaaaaaaaaa: any = []
  itemss: any = []
  dropdownList: any = [];
  dropdownphysnd: any = []
  selectedItems: any = [];
  selectedItem: any = []
  phydata: any;
  otherconditiondata: any = []
  dementiaclosestfrndData:any=[]
  physicalImparimentData:any=[]

  ngOnInit(): void {

this.spinner.show();
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
    this.CustID = this.route.snapshot.queryParamMap.get("CustID")
    this.userservice.dementiaInitialAssesmentData(this.CustRecID,this.CustID).subscribe((dementiaviewData) => {

if(dementiaviewData.code=='S001'){
  
this.spinner.hide()
  this.physicalImparimentData=dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData

  this.videoData = dementiaviewData.data.Biography[0].Preference_Of_TV_or_Videos.Data
  this.musicData = dementiaviewData.data.Biography[0].Preference_Of_Music.Data
  this.activithyData = dementiaviewData.data.Biography[0].Recreational_Activitie_They_Enjoy.Past.Data
  this.physicalconditionData = dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData

  this.dementiaSpouseData = dementiaviewData.data.Biography[0].Personal_Life.Name_of_Spouses
  this.demetiaChildrenData = dementiaviewData.data.Biography[0].Personal_Life.Name_of_Children
  this.dementiaSiblingData = dementiaviewData.data.Biography[0].Personal_Life.Name_of_Siblings
this.dementiaclosestfrndData=dementiaviewData.data.Biography[0].Closest_Friends.Past_friends


// this.dementiaAssesmentForm.value.Demographics.Date_of_birth=dementiaviewData.data.Demographics[0].Date_of_birth
  this.dementiaAssesmentForm.patchValue({ Responder_Name: dementiaviewData.data.Responder_Name })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Languages_known: dementiaviewData.data.Demographics[0].Languages_known})
  this.dementiaAssesmentForm.patchValue({ Relationship_With_PWD: dementiaviewData.data.Relationship_With_PWD })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Name: dementiaviewData.data.Demographics[0].Name })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Gender: dementiaviewData.data.Demographics[0].Gender })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Occupation: dementiaviewData.data.Demographics[0].Occupation })
  // this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Langduages_known: dementiaviewData.data.Demographics[0].Languages_known })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Primary_Caregiver_Name: dementiaviewData.data.Demographics[0].Primary_Caregiver_Name })
  this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Current_Homecare_Attender: dementiaviewData.data.Demographics[0].Current_Homecare_Attender })

  let data = new Date((dementiaviewData.data.MedicalHistory[0].Date_Of_Diagnosis) * 1000)

//medicalhistory

// this.selectphy=dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData
  this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Dementia_Diagnosis: dementiaviewData.data.MedicalHistory[0].Dementia_Diagnosis })
  this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Stage: dementiaviewData.data.MedicalHistory[0].Stage })
  this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({Date_Of_Diagnosis:dementiaviewData.data.MedicalHistory[0].Date_Of_Diagnosis})
  this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ MRI_CTScan: dementiaviewData.data.MedicalHistory[0].MRI_CTScan })
  this.stagevalues = dementiaviewData.data.MedicalHistory[0].StageID

  this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Date_Of_Diagnosis: data.getDay() + '-' + data.getMonth() + '-' + data.getFullYear() })


  // this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.get('Physical_impairment')?.get('Physical_impairmentData')?.patchValue({ Physical_impairmentData: dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData[0].PhysicalCondition })
  this.Conditions = dementiaviewData.data.MedicalHistory[0].Other_Conditions
  // console.log("meddtaaaaaaaaaaaaaa",dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData)
  this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Physical_Impairment.Physical_impairmentData=dementiaviewData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData
  // console.log(this.dementiaAssesmentFormMedicalHistory.value)


 
  //generalabilities
  this.dementiaQuestiondata=dementiaviewData.data.GeneralAbilities[0]





  //Biography
  //console.log("biogra", dementiaviewData.data.Biography[0].Personal_Life.Name_of_Spouses[0])
  this.dementiaAssesmentBiography.get('Biography')?.patchValue({ What_does_typical_Day_look_like_for_PWD: dementiaviewData.data.Biography[0].What_does_typical_Day_look_like_for_PWD })
  this.dementiaAssesmentBiography.get('Biography')?.patchValue({ OtherInformation: dementiaviewData.data.Biography[0].OtherInformation })
  this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Place_of_Birth: dementiaviewData.data.Biography[0].Personal_Life.Place_of_Birth })
  this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Any_award_or_achievement: dementiaviewData.data.Biography[0].Personal_Life.Any_award_or_achievement })
  this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Any_important_personal_information: dementiaviewData.data.Biography[0].Personal_Life.Any_important_personal_information })


  //likesand dislikes
  this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_makes_him/her_happy": dementiaviewData.data.Biography[0].Likes_And_Dislikes['What_makes_him/her_happy'] })
  this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_Are_things_upset_him/her": dementiaviewData.data.Biography[0].Likes_And_Dislikes['What_Are_things_upset_him/her'] })
  this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_makes_him/her_physically_comfortable": dementiaviewData.data.Biography[0].Likes_And_Dislikes['What_makes_him/her_physically_comfortable'] })

  //Dietary_Habits
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Breakfast: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.Breakfast })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ BreakfastComment: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.BreakfastComment })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Lunch: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.Lunch })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ LunchComment: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.LunchComment })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Snacks: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.Snacks })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ SnacksComment: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.SnacksComment })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Dinner: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.Dinner })
  this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ DinnerComment: dementiaviewData.data.Biography[0].Dietary_Habits.Timings_of_meals.DinnerComment })
  this.dementiaAssesmentBiography.value.Biography.Dietary_Habits.Favourite_foods=dementiaviewData.data.Biography[0].Dietary_Habits.Favourite_foods

  //preference of music
  this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_Music')?.patchValue({ OtherInfo: dementiaviewData.data.Biography[0].Preference_Of_Music.OtherInfo })
  this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_Music')?.patchValue({ AdditionalInfo: dementiaviewData.data.Biography[0].Preference_Of_Music.AdditionalInfo })
  //video
  this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ OtherInfo: dementiaviewData.data.Biography[0].Preference_Of_TV_or_Videos.OtherInfo })
  this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ AdditionalInfo: dementiaviewData.data.Biography[0].Preference_Of_TV_or_Videos.AdditionalInfo })
  //closestfrnd
  // this.dementiaAssesmentBiography.get('Biography')?.get('Closest_Friends')?.patchValue({OtherIue({Name:dementiaviewData.data.Biography[0].Closest_Friends.Past_friends[0].Name})
  //console.log("value=====", this.dementiaAssesmentBiography.get('Biography')?.get('Closest_Friends')?.get('Past_friends'))
  //console.log("clcclclclc", dementiaviewData.data.Biography[0].Closest_Friends.Past_friends[0])


}else {
 
}
         

                                        
    },
    
    function(error){
      alert(error.error.data)
    })

    this.dementiamusicData();
    this.dementiavideodata();
    this.dementiaActivityData();

    this.dropdownList = [
      "kannada",
      "English",
      "Hindi",
      "Tamil",
      "Telugu",
      "Malyalam",
      "Bengali"
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 6,
      allowSearchFilter: true,

    };

    this.dropdownSetting = {
      singleSelection: false,

      idField: 'PhysicalConditionID',
      textField: 'PhysicalCondition',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,

      allowSearchFilter: true
    };
    this.dropdownmusicSetting = {
      singleSelection: false,
      idField: 'MusicID',
      textField: 'MusicName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.dropdownvideosetting = {
      singleSelection: false,
      idField: 'VideoID',
      textField: 'VideoName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.dropdownActivitysetting = {
      singleSelection: false,
      idField: 'ActivityID',
      textField: 'ActivityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    }
    this.Type = this.route.snapshot.queryParamMap.get("Type")
    this.CustID = this.route.snapshot.queryParamMap.get("CustID")
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")

    this.children = this.formBuilder.group({
      "ChildrenName": [''],
      "Expired": [''],
      "ChildrenComment": ['']
    })
    this.Spouses = this.formBuilder.group({
      "SpouseName": [''],
      "Marital_Status": [''],
      "Expired": [''],
      "SpouseComment": ['']

    })
    this.silblings = this.formBuilder.group({
      "Name": [''],
      "Expired": [''],
      "SiblingComment": ['']
    })
this.ClosestFriends=this.formBuilder.group({

  "Name":[''],
  "FriendType":[''],
  "PastFriendsComment":['']
})



    this.dementiaAssesmentForm = this.formBuilder.group({

      // FranchiseType: [''],
      Relationship_With_PWD: ['', Validators.pattern('[a-zA-Z \-\]*$')],
      Responder_Name: ['', Validators.pattern('[a-zA-Z \-\]*$')],
      Demographics: this.formBuilder.group({
        Name: ['', Validators.pattern('[a-zA-Z \-\]*$')],
        Gender: ['', Validators.required],
        Date_of_birth: ['', Validators.required],
        Occupation: ['', Validators.required],
        Languages_known: ['', Validators.required],
        Primary_Caregiver_Name: [''],
        Current_Homecare_Attender: [''],


      }),

    })
    this.dementiaAssesmentFormMedicalHistory = this.formBuilder.group({
      MedicalHistory: this.formBuilder.group({
        Dementia_Diagnosis: [''],
        Stage: [''],
        StageID: [''],
        Date_Of_Diagnosis: [''],
        MRI_CTScan: [''],
        Physical_Impairment: this.formBuilder.group({
          // AdditionalInfo:[''],
          // OtherInfo:[''],
          Physical_impairmentData: this.formBuilder.array([]),
        }),
        Other_Conditions: this.formBuilder.array([

        ]),


      }),

    })
    this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Physical_Impairment.Physical_impairmentData=this.physicalImparimentData

    this.dementiaAssesmentBiography = this.formBuilder.group({
      Biography: this.formBuilder.group({
        What_does_typical_Day_look_like_for_PWD: [''],
        OtherInformation: [''],
        Personal_Life: this.formBuilder.group({
          Place_of_Birth: [''],
          Any_award_or_achievement: [''],
          Any_important_personal_information: [''],
          Name_of_Spouses: this.formBuilder.array([this.nameOfSpouses()]),
          Name_of_Children: this.formBuilder.array([this.namesOfChildren()]),
          Name_of_Siblings: this.formBuilder.array([this.namesOfSibling()
          ])
        })
        ,
        Likes_And_Dislikes: this.formBuilder.group({
          "What_makes_him/her_happy": [''],
          "What_Are_things_upset_him/her": [''],
          "What_makes_him/her_physically_comfortable": ['']


        }),
        Dietary_Habits: this.formBuilder.group({
          Timings_of_meals: this.formBuilder.group({
            Breakfast: [''],
            BreakfastComment: [''],
            Lunch: [''],
            LunchComment: [''],
            Snacks: [''],
            SnacksComment: [''],
            Dinner: [''],
            DinnerComment: []
          }),
          Favourite_foods: ['']
        }),
        Recreational_Activitie_They_Enjoy: this.formBuilder.group({
          Past: this.formBuilder.group({
            AdditionalInfo: [''],
            Data: this.formBuilder.array([])

          })
        })
        ,
        Preference_Of_Music: this.formBuilder.group({

          OtherInfo: [''],
          AdditionalInfo: [''],
          Data: this.formBuilder.array([])

        }),
        Preference_Of_TV_or_Videos: this.formBuilder.group({
          OtherInfo: [''],
          AdditionalInfo: [''],
          Data: this.formBuilder.array([])

        }),
        Closest_Friends: this.formBuilder.group({
          Past_friends: this.formBuilder.array([this.pastFrndsData()]),
          Present_friends: this.formBuilder.array([this.PresentFrndsData()
          ])
        })
      })
    })
console.log(this.dementiaAssesmentBiography.value.Biography.Dietary_Habits.Favourite_foods.length<1)

    // console.log("ddddoooooo",this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Favourite_foods')?<1)

    this.userservice.dementiaStages().subscribe((dementiaviewData) => {
      this.stagedata = dementiaviewData.data

      this.spinner.show()
      if(dementiaviewData.code=='S001'){
        this.spinner.hide()
      }else{
        alert(dementiaviewData.data)
      }


    },function(error){
      alert(error.error.data)
    }
    )

    this.dementiaQuestions();
    this.dementiaPhysicalConditions();
  }
  previous() {
    if (this.Type == 'MedicalHistory') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "Demographics", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'Demographics'

    }
    if (this.Type == 'GeneralAbilities') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'MedicalHistory'

    }
    if (this.Type == 'Biography') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'GeneralAbilities'

    }


  }
  Next() {

    if (this.Type == 'Demographics') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'MedicalHistory'

    }
    if (this.Type == 'MedicalHistory') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'GeneralAbilities,'

    }
    if (this.Type == 'GeneralAbilities') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "Biography", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'Biography'

    }
  }
  dementiamusicData() {
    this.spinner.show()
    this.userservice.dementiamusicdata().subscribe((dementiaviewData) => {
     

if(dementiaviewData.code=='S001'){
  this.dementiamusic = dementiaviewData.data
  this.spinner.hide()
}else{
  alert(dementiaviewData.data)
}

    },function(error){
      alert(error.error.data)
    }
    )
  }
  onChildrenAdd() {

    this.childrenadded = true

    if (this.children.status == 'INVALID') {
      return;
    } else {
      this.childrendata.push(this.children.value)

      for (let keys in this.children.value) {

        this.children.get(keys)?.setValue("")
        this.childrenadded = false
      }




    }
    ;


  }

  onspouseadd() {
    this.spouseadded = true


    if (this.Spouses.status == 'INVALID') {
      return;
    } else {


      this.spousedata.push(this.Spouses.value)

      for (let keys in this.Spouses.value) {

        this.Spouses.get(keys)?.setValue("")
        this.spouseadded = false
      }

    }
  }
  onsiblingsadd() {
    this.ondataadded = true

    if (this.silblings.status == 'INVALID') {
      return;
    } else {

      this.siblingsdata.push(this.silblings.value)
      for (let keys in this.silblings.value) {

        this.silblings.get(keys)?.setValue("")
        this.ondataadded = false
      }

    }


  }
  onAddClosestFrnds(){
    this.ondataadded=true
    // console.log(this.ClosestFriends.value)
    if (this.ClosestFriends.status == 'INVALID') {
      return;
    } else {
      

      this.dementiaClosestFrndData.push(this.ClosestFriends.value)
      // console.log(this.dementiaClosestFrndData)
      for (let keys in this.ClosestFriends.value) {

        this.ClosestFriends.get(keys)?.setValue("")
        this.ondataadded = false
      }
    }
  }
deleteClosestFrnd(index:any){
  let frndsfilter = this.dementiaClosestFrndData.filter((obj: any) => {
    return obj != this.dementiaClosestFrndData[index]
  })

  // this.childrendata.pop(index)
  this.dementiaClosestFrndData = frndsfilter
}

  deletchilddata(index: any) {


    let childfilter = this.childrendata.filter((obj: any) => {
      return obj != this.childrendata[index]
    })

    // this.childrendata.pop(index)
    this.childrendata = childfilter

  }
  deletespousedata(index: any) {

    let spousefilterdata = this.spousedata.filter((obj: any) => {
      return obj != this.spousedata[index]
    })
    this.spousedata = spousefilterdata

  }
  deletsiblingdata(index: any) {
    let siblingfilter = this.siblingsdata.filter((obj: any) => {

      return obj != this.siblingsdata[index]
    })
    this.siblingsdata = siblingfilter

  }

  dementiavideodata() {
 this.spinner.show();
    this.userservice.dementivideodata().subscribe((dementiaviewData) => {
      this.dementiavideo = dementiaviewData.data
if(dementiaviewData.code=='S001'){
  this.spinner.hide();

}else{
  alert(dementiaviewData.data)
}

    },function(error){
      alert(error.error.data)
    }
    )
  }
  dementiaActivityData() {
    this.spinner.show()
    this.userservice.demetiaactivitydata().subscribe((dementiaviewData) => {
     
      this.dementiaActivity = dementiaviewData.data
if(dementiaviewData.code=='S001'){

  this.spinner.hide();
}else{
 return;
}

    },function(error){
      alert(error.error.data)
    }
    )
  }
  dementiaQuestions() {
this.spinner.show();
    this.userservice.dementiaQuestions("General_Abilities").subscribe((viewQuestions) => {
    
if(viewQuestions.code=='S001'){
  this.dementiaQuestion = viewQuestions.data
  this.dementiaQuestiondata;
  for (let i = 0; i < this.dementiaQuestion.length; i++) {
    this.dementiaQuestion[i].Answer = ''
    this.dementiaQuestion[i].Comment = ''

    for(let j=0; j <this.dementiaQuestiondata.length; j++){

      if(this.dementiaQuestiondata[j].QuestionID ==this.dementiaQuestion[i].QuestionID){
        this.dementiaQuestion[i].Answer =this.dementiaQuestiondata[j].Answer
        this.dementiaQuestion[i].Comment =this.dementiaQuestiondata[j].Comment
      }

   
    }
   
   
  }
  this.spinner.hide()
}else{
  alert(viewQuestions.data)
}

     

    },function(error){
      alert(error.error.data)
    }
    )


  }

  dementiaPhysicalConditions() {
this.spinner.show();
    this.userservice.physicalConditions().subscribe((dementiaviewData) => {
      

if(dementiaviewData.code=="S001"){
  this.dropdownphysnd = dementiaviewData.data
  this.spinner.hide();
}else{
  alert(dementiaviewData.data)
}


    },(error)=>{
      alert(error.error.data)
    }
    )
  }
  stageSelection(stage: any) {

    for (let i = 0; i < this.stagedata.length; i++) {

      if (this.stagedata[i].StageLevel === stage.target.value) {
        this.stagevalues = this.stagedata[i].StageID
        //console.log("stage", stage.target.value)

      }

    }





  }
  phycnd(phy: any) {

    for (let i = 0; i < this.dementiaPhyConditions.length; i++) {

      if (this.dementiaPhyConditions[i].PhysicalConditionID === phy.target.value) {

        this.dementiacondition = this.dementiaPhyConditions[i].PhysicalConditionID


        this.phisicalcondition = this.dementiaPhyConditions[i].PhysicalCondition
        this.phisicalconditionID = phy.target.value
      }
    }

  }
  question(quest: any) {

    this.otherphysicalcondition = {
      "ConditionName": quest.target.name,
      "ConditionStatus": quest.target.value,
      "Comment": ''
    }


    this.impdata = quest.target.value


    if (this.otherconditiondata.length == 0) {
      this.otherconditiondata.push(this.otherphysicalcondition)

    } else {
      for (let gb in this.otherconditiondata) {
        this.foundgenablityqn = false;

        if (this.otherconditiondata[gb].ConditionName == quest.target.name) {
          this.foundgenablityqn = true;
          this.otherconditiondata[gb] = this.otherphysicalcondition
          break;
        }


      }

      if (this.foundgenablityqn == false) {
        this.otherconditiondata.push(this.otherphysicalcondition)
      }


    }






  }
  onmusicselect(muusic: any) {
    this.music = true

    this.dementiamusicdataarray.push(muusic)



  }
  onmusicDeselect(music: any) {
    let filtermusic = this.dementiamusicdataarray.filter((obj: any) => {
      return obj['MusicID'] != music.MusicID
    })

    this.dementiamusicdataarray = filtermusic

  }
  onvideoselect(video: any) {
    this.video = true

    this.dementiavideodataarray.push(video)

  }
  onDeSelectVideo(video: any) {
    let videofilter = this.dementiavideodataarray.filter((obj: any) => {
      return obj["VideoID"] != video.VideoID;
    })
    this.dementiavideodataarray = videofilter

  }
  onActivitySelct(activity: any) {
    this.activity = true
    //console.log("dementiaActivity", activity)

    this.activitydataarray.push(activity)


  }
  onDeSelectActivity(activity: any) {
    let filteractivity = this.activitydataarray.filter((obj: any) => {
      return obj['ActivityID'] !== activity.ActivityID

    })
    this.activitydataarray = filteractivity

  }
  onItemSelectphycnd(data: any) {
    this.phycondition = true
    //console.log("===", data)

    this.selectphy.push(data)

    //console.log(this.selectphy)
  }
  onDeSelectphycnd(data: any) {
    //console.log("deselectedItem", data)


    // let filteredArr=this.selectphy.remove(data)
    let filteredArr = this.selectphy.filter((obj: any) => {
      return obj["PhysicalConditionID"] != data.PhysicalConditionID;
    })
    this.selectphy = filteredArr;




  }
  dementiaQuestionsdata(data: any) {



    this.generalabilitydataOBj = {
      "QuestionID": data.target.name,
      "Answer": data.target.value,
      "comment": this.comment
    }




    return;
    if (this.generalAbilityData.length == 0) {
      this.generalAbilityData.push(this.generalabilitydataOBj)

    } else {
      for (let gb in this.generalAbilityData) {
        this.foundgenablityqn = false;
        //console.log(gb)
        if (this.generalAbilityData[gb].QuestionID == data.target.name) {
          this.foundgenablityqn = true;
          this.generalAbilityData[gb] = this.generalabilitydataOBj
          break;
        }


      }

      if (this.foundgenablityqn == false) {
        this.generalAbilityData.push(this.generalabilitydataOBj)
      }



    }

    //console.log(JSON.stringify(this.generalAbilityData))



  }
  nameOfSpouses(): FormGroup {
    return this.formBuilder.group({
      SpouseName: [''],
      Marital_Status: [''],
      SpouseComment: [''],
      Expired: ['']


    })
  }
  getControls() {

    return (this.dementiaAssesmentBiography.controls['Biography'].get('Personal_Life')?.get('Name_of_Siblings') as FormArray).controls

  }
  namesOfChildren() {
    return this.formBuilder.group({
      ChildrenName: [''],
      Expired: [''],
      ChildrenComment: [''],

    })

  }
  namesOfSibling() {
    return this.formBuilder.group({

      Name: [''],
      Expired: [''],
      SiblingComment: ['']





    })
  }
  pastFrndsData() {
    return this.formBuilder.group({
      Name: [''],
      FriendType: [''],
      PastFriendsComment: ['']

    })
  }
  PresentFrndsData() {


    return this.formBuilder.group({

      Name: [''],
      FriendType: [''],
      PresentFriendsComment: ['']

    })
  }
  dementiaCreateAssesment() {


    if (this.Type === "Demographics") {

      // this.step=2
      this.Demographicsbtn = true




      if (this.dementiaAssesmentForm.status === "INVALID") {
        //console.log("**mandatory")
      } else {
        this.Type = this.route.snapshot.queryParamMap.get("Type")

        this.demographicsdata = this.dementiaAssesmentForm.value

        this.dementiaAssesmentForm.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentForm.value['CustID'] = this.CustID
        this.dementiaAssesmentForm.value['Type'] = "Demographics"
        // this.dementiaAssesmentForm.value['Demographics']=this.dementiaAssesmentForm.value
        this.userservice.dementiaassesement(this.demographicsdata).subscribe(Response => {

          if (Response.code = "S001") {

            alert(Response.data)
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
              replaceUrl: true,
            })
            this.Type = "MedicalHistory"

          }


        },
          function (error) {
            alert(error.error.data)
          }
        )
      }


    }
    if (this.Type === "MedicalHistory") {


      this.MedicalHistorybtn = true


      this.step = 2

      if (this.selectphy.length < 1) {
        alert("select physical Condition")
        return;
      }

      if (this.dementiaAssesmentFormMedicalHistory.status === "INVALID") {
        //console.log("**mandatory")
      } else {

        this.dementiaAssesmentFormMedicalHistory.value['Type'] = "MedicalHistory"
        this.dementiaAssesmentFormMedicalHistory.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentFormMedicalHistory.value['CustID'] = this.CustID


        this.dementiaAssesmentFormMedicalHistory.value['MedicalHistory']['StageID'] = this.stagevalues
        this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Physical_Impairment.Physical_impairmentData = this.selectphy
        this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Other_Conditions = this.Conditions



        this.userservice.dementiaassesement(this.dementiaAssesmentFormMedicalHistory.value).subscribe(Response => {

          if (Response.code = "S001") {

            alert(Response.data)
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
              replaceUrl: true,
            })
            this.Type = "GeneralAbilities"

          }


        },
          function (error) {
            alert(error.error.data)
          }
        )

      }
    }
    if (this.Type == "GeneralAbilities") {
  
        this.dementiaQuestiondata=[];
      for (let i = 0; i < this.dementiaQuestion.length; i++) {

        let obj = {
          "QuestionID": this.dementiaQuestion[i].QuestionID,
          "Answer": this.dementiaQuestion[i].Answer,
          "Comment": this.dementiaQuestion[i].Comment
  
        }
        // //console.log(obj,"objjjjj")
        this.dementiaQuestiondata.push(obj)
        //console.log(this.dementiaQuestiondata)
      }
  
      this.genbtn = true
      //console.log("@@@@@@",this.dementiaQuestiondata);
      for(let ans of this.dementiaQuestiondata){
        if(ans.Answer==""){
          alert("All question mandatoy");
          return;
        }
      }
      // //console.log()
      // if (this.dementiaQuestion.length != this.dementiaQuestiondata.length) {
      //   alert("Answer All the Questions")
      //   return;
      // }

      // for (let k of this.dementiaQuestiondata) {
      //   if (k.Answer == undefined || k.Answer == "") {
      //     alert("ANs")
      //   }
      // }



      let data = {
        "Type": "GeneralAbilities",
        "CustRecID": this.CustRecID,
        "CustID": this.CustID,
        GeneralAbilities: this.dementiaQuestiondata
      }



      this.userservice.dementiaassesement(data).subscribe((Response) => {

        if (Response.code = "S001") {

          alert(Response.data)
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { Type: "Biography", CustID: this.CustID, CustRecID: this.CustRecID },
            replaceUrl: true,
          })
          this.Type = "Biography"

        }


      },
        function (error) {
          alert(error.error.data)
        }
      )




      // //console.log("answer",this.dementiaQuestion[i].Answer)

    }
    if (this.Type == "Biography") {

      this.Biographysbtn = true


      if (this.dementiaAssesmentBiography.status == 'INVALID') {
        //console.log("Mandatory")
      } else {


        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Children = this.childrendata
        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Siblings = this.siblingsdata
        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Spouses = this.spousedata


        this.dementiaAssesmentBiography.value['Type'] = "Biography"
        this.dementiaAssesmentBiography.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentBiography.value['CustID'] = this.CustID
        this.dementiaAssesmentBiography.value.Biography.Preference_Of_Music.Data = this.dementiamusicdataarray
        this.dementiaAssesmentBiography.value.Biography.Preference_Of_TV_or_Videos.Data = this.dementiavideodataarray

        this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.Data = this.activitydataarray
        this.dementiaAssesmentBiography.value.Biography.Closest_Friends.Past_friends=this.dementiaClosestFrndData



        this.userservice.dementiaassesement(this.dementiaAssesmentBiography.value).subscribe(Response => {

          if (Response.code = "S001") {

            alert(Response.data)



          }
        },
          function (error) {
            alert(error.error.data)
          }
        )
      }

    }
  }
}
