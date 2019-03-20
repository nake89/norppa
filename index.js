#!/usr/bin/env node
const fetch = require("node-fetch")

let status
fetch(
  "https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_recommendations&filters={%22country_id%22:73,%22servers_groups%22:[15]}"
)
  .then(res => {
    status = res.status
    return res.json()
  })
  .then(jsonData => {
    console.log(jsonData[0].hostname)
    // console.log(status)
  })
  .catch(err => {
    // handle error for example
    // console.error(err);
  })
