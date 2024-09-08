import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @Input() suggestions: string[] = [];
  @Output() suggestionSelected = new EventEmitter<string>();

  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    if (value) {
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
  }

  onSelectSuggestion(suggestion: string): void {
    this.showSuggestions = false;
    this.suggestionSelected.emit(suggestion);
  }

  onBlur(): void {
    setTimeout(() => this.showSuggestions = false, 100);
  }
}
