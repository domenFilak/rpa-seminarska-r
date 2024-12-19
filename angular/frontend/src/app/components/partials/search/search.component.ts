import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  searchTermSubject = new Subject<string>();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
      }
    });

    this.searchTermSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((term) => {
      this.updateSearch(term);
    });
  }

  onSearchChange(term: string): void {
    this.searchTermSubject.next(term);
  }

  updateSearch(term: string): void {
    if (term) {
      this.router.navigateByUrl(`/search/${term}`).then(() => {
        setTimeout(() => {
          const searchInput = document.getElementById('search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }, 0);
      });
    } else {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => {
          const searchInput = document.getElementById('search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }, 0);
      });
    }
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl(`/search/${term}`);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
