import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public readonly searchForm: FormGroup;
  @Output() public searchChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      searchTerm: ''
    });
  }

  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: val => this.searchChange.emit(val)
      });
  }

}
