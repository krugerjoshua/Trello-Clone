import "phoenix_html"
import {Socket} from "phoenix"
import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "./store"
import App from "./App"

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
const socket = new Socket("/socket", {params: {token: csrfToken}})

const root = createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)