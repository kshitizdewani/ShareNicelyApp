import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching-service/searching.service';
import {url} from '../../services/urls';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: any[];
  url = url.slice(0,-1);
  constructor(private searchService: SearchingService, private router: Router) { }

  ngOnInit() {
    console.log('search page');
  }

  searched(term){
    console.log(term);
    if (term && term.trim !=''){
    this.searchService.search(term).subscribe(result => {
      this.results = result;
    });
    }
  }

    goToProfile(username){
    console.log(username);
    this.router.navigateByUrl('/profile/'+username);
  }



}
