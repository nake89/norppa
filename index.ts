#!/usr/bin/env node
const axios = require("axios").default
const program = require("commander")
const Conf = require("conf")
const config = new Conf()

program.version("1.0.2")

program
  .option("-i, --country-id <country-id>", "Get NordVPN server for country ID")
  .option("-s, --set-default-id <country-id>", "Set default country ID")
  .option(
    "-r, --remove-default-id",
    "Removes default country ID. Will get closest server instead."
  )
  .option("-v, --verbose", "Verbose")

program.parse(process.argv)
;(async () => {
  if (program.setDefaultId) {
    config.set("countryId", program.setDefaultId)
    console.log(`Default country ID set to: ${program.setDefaultId}`)
  } else if (program.removeDefaultId) {
    config.delete("countryId")
    console.log("Removed country ID. Will now get closest server instead. ")
  } else {
    try {
      let nordvpnResult
      let countryId = config.get("countryId")
      if (program.countryId) {
        countryId = program.countryId
      } else {
        if (!countryId) {
          countryId = ""
        }
        nordvpnResult = await axios.get(
          `https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_recommendations&filters={%22country_id%22:${countryId},%22servers_groups%22:[15]}`
        )
      }

      if (nordvpnResult.data[0].hostname) {
        console.log(nordvpnResult.data[0].hostname)
      } else {
        console.log("Cannot get NordVPN address. Try again later. Sorry :(")
      }
    } catch (e) {
      if (program.verbose) {
        console.log(e)
      }
      console.log(
        "Connection error. Cannot get NordVPN address. Try again later. Sorry :("
      )
    }
  }
})()
