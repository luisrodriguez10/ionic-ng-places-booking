import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces!: Place[];
  listedLoadedPlaces!: Place[];

  constructor(
    private placesService: PlacesService,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onOpenMenu(){
    this.menuController.toggle();
  }

  onFilterUpdate(event: Event){
    const customEvent = event as CustomEvent<SegmentChangeEventDetail>;
    console.log(customEvent.detail);
  }

}
