import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  HostURL: string =
    //"https:secureone.anvayaa.com";
      "https:secureone.anvayaa.in"
     //"http://192.168.1.72:3333"
    // "http://192.168.1.85:3333"



  constructor(private httpclient: HttpClient) { }

  getToken() {
    var TokenObj = localStorage.getItem("x-fiftyaccess-token")
    TokenObj = JSON.stringify(TokenObj)

    let Headers = new HttpHeaders()
    Headers = Headers.set("x-fiftyaccess-token", TokenObj)
    return Headers;
  }

  userlogin(login: any): Observable<any> {

    let result = this.httpclient.post(`${this.HostURL}/login`, login)
    return result;
  }


  customerlist(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/users/getAllRegisteredUsers`, httpOptions)
    return result;
  }

  beneficiaries(CustRecID: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    const body = JSON.stringify({ "CustRecID": CustRecID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/ASERS/getRequiredDataForConfiguration`, { "CustRecID": CustRecID }, httpOptions)
    return result;
  }

  customerConfiguration(reqiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/ASERS/registerAndUpdateConfigurationDetails`, reqiredParams, httpOptions)
    return result;

  }

  configrationDetails(CustomerID: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/ASERS/getCustomersConfigurationDetails?CustomerID=` + CustomerID, httpOptions)
    return result;

  }

  customerConfigurationDetails(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    const body = JSON.stringify({ "CustRecID": CustRecID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/users/viewregistereduserdetails`, { "CustRecID": CustRecID }, httpOptions)
    return result;

  }

  VitalData(CustomerID: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/ASERS/getASERSDashboardData/` + CustomerID, httpOptions)
    return result;

  }

  emergencyList(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/emergency/getActiveEmergencies`, httpOptions)
    return result;

  }
  // emergencyCustomerData(RequestID:any):Observable<any>{
  //   let Headers=this.getToken();

  //   const httpOptions={
  //     'headers':Headers,
  //     'params':{"RequestID":RequestID}
  //   }

  //   let result = this.httpclient.get<any>(`${this.HostURL}/api/emergency/getEmergencyDetails`,httpOptions)
  //    return result;

  // }
  cutomerDetails(RequestID: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/emergency/getEmergencyDetails?RequestID=` + RequestID, httpOptions)
    return result;

  }

  emegencyAccept(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,

    }
    // const body=JSON.stringify({"RequestID":RequestID});
    let result = this.httpclient.post<any>(`${this.HostURL}/api/emergency/confirmEmergency`, requiredParams, httpOptions)
    return result;

  }

  supportDashBoard(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/customersupport/getDashboardCounts`, requiredParams, httpOptions)
    return result;

  }
  Permissions(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/permissions/ViewPermissions`, httpOptions)
    return result;

  }
  supportDasshBoardTypeData(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/customersupport/getDashboardData`, requiredParams, httpOptions)
    return result;

  }
  anchorsDashboard(reqiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    const body = JSON.stringify({});

    let result = this.httpclient.post<any>(`${this.HostURL}/api/franchisemaster/updateFranchiseDetails`, reqiredParams, httpOptions)
    return result;

  }
  anchorsdata(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/franchisemaster/viewFranchiseDetails`, requiredParams, httpOptions)
    return result;

  }
  viewDementiaSchedules(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiaSchedule/viewAllSchedules`, httpOptions)
    return result;
  }
  viewAllDementiaCustomers(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/PackageSub/viewAllDementialPlanCustomerDetails`, httpOptions)
    return result;
  }
  getAllEmployees(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/employees/getAllEmployees`, requiredParams, httpOptions)
    return result;

  }
  createDementiaSchedule(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/dementiaSchedule/createSchedule`, requiredParams, httpOptions)
    return result;

  }

  Insuranceform(formdetails: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/insurance/CreateInsurancePolicy`, formdetails, httpOptions)
    return result;

  }
  updateDementiaVisitCount(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/dementiaassesment/CreateConfigurationCount`, requiredParams, httpOptions)
    return result;

  }

  InsuranceDetails(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/insurance/getInsuranceDetails`, requiredParams, httpOptions)
    return result;

  }

  policylist(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/insurance/AllInsurancesList`, httpOptions)
    return result;

  }
  dementiaStages(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiastages/getalldata`, httpOptions)
    return result;
  }
  dementiaQuestions(Type: any): Observable<any> {


    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,

      // 'params':{"Type":Type}
    }
    // const body=JSON.stringify({"Type":Type});
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiaquestoinaries/getquestions?Type=` + Type, httpOptions)
    return result;


    // let Headers=this.getToken();
    // const httpOptions={
    //   'headers':Headers,
    // }
    // const body=JSON.stringify({"Type":Type});
    // let result=this.httpclient.get<any>(`${this.HostURL}/api/dementiaquestoinaries/getquestions`,{"Type":Type},httpOptions)
    // return result;
  }
  physicalConditions(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiaphysicalcondition/getallcondition`, httpOptions)
    return result;
  }
  dementiaassesement(requiredParams: any) {

    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/dementiaassesment/assesmentcreate`, requiredParams, httpOptions)
    return result;
  }

  dementiamusicdata() {
    // /api/dementiamusic/viewAllMusic
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiamusic/viewAllMusic`, httpOptions)
    return result;
  }
  // api/dementiavideo/viewAllVideos
  dementivideodata() {
    // /api/dementiamusic/viewAllMusic
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiavideo/viewAllVideos`, httpOptions)
    return result;
  }
  demetiaactivitydata() {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiaActivity/viewAllActivities`, httpOptions)
    return result;
  }

  dementiaInitialAssesmentData(CustRecID: any, CustID: any) {



    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
      'params': { "CustRecID": CustRecID, "CustID": CustID }
    }

    const data = JSON.stringify({ "CustRecID": CustRecID, "CustID": CustID })

    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(`${this.HostURL}/api/dementiaassesment/viewDementiaAssesment`, httpOptions)
    return result;
  }


  partnersData(Filter: any, cityID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
      'params': { "Filter": Filter, "CityID": cityID }
    }

    // const data = JSON.stringify({ "CustRecID": CustRecID, "CustID": CustID })

    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(`${this.HostURL}/api/partnertasks/getSourceProfiles`, httpOptions)
    return result;
  }

  partnersTaskCount() {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,

    }

    // const data = JSON.stringify({ "CustRecID": CustRecID, "CustID": CustID })

    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(`${this.HostURL}/api/partnertasks/getTasksCount`, httpOptions)
    return result;
  }
  assignVendor(RequestID: any,PartnerExecutiveID:any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,


    }


    const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/partnertasks/assignSourceProfile`, { "RequestID": RequestID,"PartnerExecutiveID":PartnerExecutiveID }, httpOptions)
    return result;
  }


  cityApi() {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/serviceareas/viewAllServiceAreas`, httpOptions)
    return result;
  }


  viewRequestDetails(RequestID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
      'params': { "RequestID": RequestID }


    }


    const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.get<any>(`${this.HostURL}/api/partnertasks/viewRequestDetails`, httpOptions)
    return result;
  }


  vendorId() {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,

    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/Partner/viewAllPartners?PartnerStatus=All&ServiceAreaID=All`, httpOptions)
    return result;

  }

  CreateVendorProfile(vendorprofile: any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/partnertasks/createprofile`, vendorprofile, httpOptions)
    return result;
  }


  requestView(RequestID: any,CustRecID:any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    
    }
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/viewRequest`,{"RequestID":RequestID,"CustRecID":CustRecID}, httpOptions)
    return result;
  }

  employeList(EmployeeID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/operations/ReportingManagersList`,{"EmployeeID":EmployeeID}, httpOptions)
    return result;
  }

  IdVerification(IdNumber: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/partnertasks/getprofile?IdNumber=`+ IdNumber, httpOptions)
    return result;

  }

  removeUplodedProfile(RequestID: any,ProfileID:any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/partnertasks/removeUplodedProfile`,{"RequestID":RequestID,"ProfileID":ProfileID}, httpOptions)
    return result;
  }

  submitProfiles(RequestID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/partnertasks/submitProfiles`,{"RequestID":RequestID}, httpOptions)
    return result;
  }

  CustomerDetailsData(){
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/CareCoOrdinators/activeCustomersDetails`, httpOptions)
    return result;
  }
  viewUser(CustRecID:any){
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
      'params':{"CustRecID":CustRecID}

    }

    let result = this.httpclient.get<any>(`${this.HostURL}/api/CareCoOrdinators/ViewUser`, httpOptions)
    return result;
  }
viewAllCategaryDetails(CustRecID:any,ServiceAreaID:any){
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers
    }
    let result = this.httpclient.post<any>(`${this.HostURL}/api/services/viewAllCategoriesDetails`,{"CustRecID": CustRecID, "ServiceAreaID":ServiceAreaID }, httpOptions)
    return result;
  }
viewServiceDetails(CustRecID:any,categoryID:any){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/services/viewServiceDetails`,{"CustRecID":CustRecID,"ServiceID":categoryID}, httpOptions)
  return result;
}
packageSubscription(CustRecID:any,categoryID:any){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/subscriptionvalidation/validateservice`,{"CustRecID":CustRecID,"ServiceID":categoryID}, httpOptions)
  return result;
}
creteRequest(reqParams:any){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/CareCoOrdinators/createRequest`,reqParams, httpOptions)
  return result;
}
RequestDetails(RequestID: any,CustRecID:any) {
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
  }
  const body = JSON.stringify({ "RequestID": RequestID });
  let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/viewRequest`,{ "RequestID": RequestID,"CustRecID":CustRecID }, httpOptions)
  return result;
}


profileActed(RequestID:any,ProfileID:any,Status:any,Comments:any){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
     


  }


  // const body = JSON.stringify({ "RequestID": RequestID });
  let result = this.httpclient.put<any>(`${this.HostURL}/api/CareCoOrdinators/approvePartnerProfile`,{ "RequestID": RequestID,"ProfileID":ProfileID,"Status": Status,"Comments":Comments }, httpOptions)
  return result;
}


updateVendorStatus(requiredParams:any){
  let Headers = this.getToken();

  const httpOptions = {
    'headers': Headers,

  }
 
  let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/updateVendorStatus`, requiredParams, httpOptions)
  return result;
}
assignVendorForRequest(RequestID:any,VendorID:any){
  let Headers = this.getToken();

  const httpOptions = {
    'headers': Headers,

  }
 
  let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/assignVendorForRequest`,{"VendorID":VendorID,"RequestID":RequestID}, httpOptions)
  return result;
}
getListOfSubmittedProfiles(){
  let Headers = this.getToken();

  const httpOptions = {
    'headers': Headers,
    'params':{"CityID":''}
  }

  let result = this.httpclient.get<any>(`${this.HostURL}/api/CareCoOrdinators/getListOfSubmittedProfiles`,httpOptions)
  return result;
}

getVendors(ServiceAreaID:any,SubCategoryID:any){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/getVendorForRequest`,{"ServiceAreaID":ServiceAreaID,"SubCategoryID":SubCategoryID}, httpOptions)
  return result;
}

CreateRequestConfiguration(){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.get<any>(`${this.HostURL}/api/Partner/CreateRequestConfiguration`, httpOptions)
  return result;
}

GetRequestConfigurations(){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.get<any>(`${this.HostURL}/api/Partner/ViewAllRequestConfigurations`, httpOptions)
  return result;
}

pmsVarification(CustRecID:String,RequestPrice:number){
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/subscriptionvalidation/validatepms`,{"CustRecID":CustRecID,"RequestPrice":RequestPrice}, httpOptions)
  return result;
}
}






