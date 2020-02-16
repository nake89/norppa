#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var axios = require("axios").default;
var program = require("commander");
var Conf = require("conf");
var config = new Conf();
program.version("1.0.3");
program
    .option("-i, --country-id <country-id>", "Get NordVPN server for country ID")
    .option("-s, --set-default-id <country-id>", "Set default country ID")
    .option("-r, --remove-default-id", "Removes default country ID. Will get closest server instead.")
    .option("-v, --verbose", "Verbose");
program.parse(process.argv);
(function () { return __awaiter(_this, void 0, void 0, function () {
    var nordvpnResult, countryId, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!program.setDefaultId) return [3 /*break*/, 1];
                config.set("countryId", program.setDefaultId);
                console.log("Default country ID set to: " + program.setDefaultId);
                return [3 /*break*/, 7];
            case 1:
                if (!program.removeDefaultId) return [3 /*break*/, 2];
                config.delete("countryId");
                console.log("Removed country ID. Will now get closest server instead. ");
                return [3 /*break*/, 7];
            case 2:
                _a.trys.push([2, 6, , 7]);
                nordvpnResult = void 0;
                countryId = config.get("countryId");
                if (!program.countryId) return [3 /*break*/, 3];
                countryId = program.countryId;
                return [3 /*break*/, 5];
            case 3:
                if (!countryId) {
                    countryId = "";
                }
                return [4 /*yield*/, axios.get("https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_recommendations&filters={%22country_id%22:" + countryId + ",%22servers_groups%22:[15]}")];
            case 4:
                nordvpnResult = _a.sent();
                _a.label = 5;
            case 5:
                if (nordvpnResult.data[0].hostname) {
                    console.log(nordvpnResult.data[0].hostname);
                }
                else {
                    console.log("Cannot get NordVPN address. Try again later. Sorry :(");
                }
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                if (program.verbose) {
                    console.log(e_1);
                }
                console.log("Connection error. Cannot get NordVPN address. Try again later. Sorry :(");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); })();
