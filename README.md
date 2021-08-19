# Tableau Workbook Trusted Authentication Demo

## Installation

```sh
# using yarn
yarn

# using npm
npm install
```

## Execution

```sh
yarn start:dev # start on development environment
yarn start # start
yarn stop # stop
yarn restart # restart
```

## Description

- The user loads a page containing an embedded Tableau dashboard.
- The front-end calls the back-end to get a trusted ticket.
- The back-end server sends a POST request to Tableau Server to get a trusted ticket.
- Tableau Server responds with a ticket.
- The back-end returns the ticket to the front-end.
- Redeem the ticket and display the Tableau dashboard.

## References

- [Trusted Ticket Authentication With Tableau Server](https://www.zuar.com/blog/trusted-ticket-authentication-with-tableau-server/)
- [Implementing Trusted Tickets for Tableau Server with NodeJS](https://www.zuar.com/blog/implementing-trusted-tickets-for-tableau-server-with-nodejs/)
