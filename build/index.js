#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios").default;
const program = require("commander");
const Conf = require("conf");
const config = new Conf();
const chalk_1 = __importDefault(require("chalk"));
program.version("1.0.7");
program
    .option("-i, --country-id <country-id>", "Get NordVPN server for country ID")
    .option("-s, --set-default-id <country-id>", "Set default country ID")
    .option("-r, --remove-default-id", "Removes default country ID. Will get closest server instead.")
    .option("-v, --verbose", "Verbose");
program.parse(process.argv);
const options = program.opts();
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (options.setDefaultId) {
        config.set("countryId", options.setDefaultId);
        console.log(`Default country ID set to: ${options.setDefaultId}`);
    }
    else if (options.removeDefaultId) {
        config.delete("countryId");
        console.log("Removed country ID. Will now get closest server instead. ");
    }
    else {
        try {
            let nordvpnResult;
            let countryId = config.get("countryId");
            countryId = options.countryId;
            if (!countryId) {
                countryId = "fi";
            }
            let countryCodeNumber = getCountryCodeNumber(countryId);
            let url = `https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_recommendations&filters={%22country_id%22:${countryCodeNumber},%22servers_groups%22:[15]}`;
            nordvpnResult = yield axios.get(url);
            if (nordvpnResult.data[0].hostname) {
                let { hostname, name, load, status } = nordvpnResult
                    .data[0];
                console.log(`Hostname: ${chalk_1.default.blue(hostname)}`);
                console.log(`Name: ${chalk_1.default.magenta(name)}`);
                console.log(`Load: ${chalk_1.default.green(load)}`);
                console.log(`Status: ${chalk_1.default.green(status)}`);
            }
            else {
                console.log("Cannot get NordVPN address. Try again later. Sorry :(");
            }
        }
        catch (e) {
            console.log(e);
            console.log("Connection error. Cannot get NordVPN address. Try again later. Sorry :(");
        }
    }
}))();
function getCountryCodeNumber(countryId) {
    switch (countryId) {
        case "fi":
            return 73;
        case "us":
            return 228;
        case "se":
            return 208;
        case "no":
            return 163;
        case "dk":
            return 58;
        case "uk":
            return 227;
        case "nl":
            return 153;
        case "de":
            return 81;
        case "it":
            return 106;
        case "es":
            return 202;
        case "pt":
            return 175;
        case "fr":
            return 74;
        case "za":
            return 200;
        case "au":
            return 13;
        case "br":
            return 30;
        case "ca":
            return 38;
        case "hk":
            return 97;
        case "jp":
            return 108;
        case "tr":
            return 220;
        default:
            return 73;
    }
}
