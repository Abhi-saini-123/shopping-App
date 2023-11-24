import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthSrvice } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceHolderDirective, {static : false}) alertHost: PlaceHolderDirective;
    private closesub : Subscription;

    constructor(
        private authservice: AuthSrvice, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
        ){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
    //    console.log(form.value);

       if(!form.valid){
        return;
       }
       const email = form.value.email;
       const password = form.value.password;

       let authObs : Observable<AuthResponseData>

       this.isLoading = true;
       if(this.isLoginMode){
        authObs = this.authservice.login(email,password);
       }else {
        authObs = this.authservice.signup(email, password)
       }

       authObs.subscribe( {
        next: (resData) => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
        error: (errorMessage) => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrroAlert(errorMessage);
            this.isLoading = false;
        },
        complete: () => {
            // console.info('complete') 
        }
       }
       );
       
       form.reset();
    }

    onHandleError(){
        this.error = null;
    }
    
    ngOnDestroy(): void {
      if(this.closesub){
        this.closesub.unsubscribe();
      }    
    }

    private showErrroAlert(message: string){
    //    const altcmp = new AlertComponent;
    const alterccomponent = 
    this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alterccomponent);
    // const alertcomponent = this.viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closesub = componentRef.instance.close.subscribe(() => {
        this.closesub.unsubscribe();
        hostViewContainerRef.clear();
    });
    }

}