import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place!: Place;

  constructor(
    private navController: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    })
  }

  onBookPlace(){
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navController.navigateBack('/places/tabs/discover');
    //Open the model
    this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: {selectedPlace: this.place}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if(resultData.role === 'confirm'){
          console.log('BOOKED!!!');
        }
      })
  }
}
