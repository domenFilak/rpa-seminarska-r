import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();  
  @Output() navigateToCart = new EventEmitter<void>();  

  // Close the modal and continue shopping
  continueShopping() {
    this.closeModal.emit(true);
  }

  // Navigate to the cart
  goToCart() {
    this.navigateToCart.emit();
  }
}
