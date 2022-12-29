user - Repeat Customer

```mermaid
journey
    title Checkout Journey
    section Put Items in Basket
      Select item: 3: First-time User, Repeat User
      Click on Checkout: 3: First-time User, Repeat User
    section Checkout
      Enter user information: 3: First-time User
      Enter card information: 3: First-time User
      Select previous payment method: 5: Repeat User
      Click Order: 3: First-time User
    section Confirmation
      See confirmation page: 3: First-time User, Repeat User
      Receive email: 3: First-time User, Repeat User

```
