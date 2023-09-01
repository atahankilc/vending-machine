# Vending Machine Frontend Application

deployed on render -> https://vending-machine-frontend.onrender.com/

Not: Since I use free version of render, sometimes it can stay unresponsive for a long time, or it gives a direct error. As far as I can see, it allocates resources according to the number of incoming requests, and so it reduces the resources if there is no request for a long time. Page refreshing mostly solves the problem.

## Page And Component Structure

- [App](./src/App.tsx)
  - [Customer](./src/components/Customer.tsx)
    - [Wallet](./src/components/Wallet.tsx)
  - [VendingMachine](./src/pages/VendingMachine.tsx)
    - [ProductShowcase](./src/components/ProductShowcase.tsx)
      - [Product](./src/components/Product.tsx)
    - [SidePanel](./src/components/SidePanel.tsx)
      - [CoinAcceptor](./src/components/CoinAcceptor.tsx)
      - [Cart](./src/components/Cart.tsx)
      - [Controller](./src/components/Controller.tsx)
      - [SupplierPanel](./src/components/SupplierPanel.tsx)

## Used Libraries and Frameworks

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Material-UI](https://material-ui.com/)
- [Redux](https://redux.js.org/)
- [Oauth2-Google](https://www.npmjs.com/package/@react-oauth/google)
- [Axios](https://axios-http.com/)
- [Notistack](https://notistack.com/)

## Supplier Code -> 10
    