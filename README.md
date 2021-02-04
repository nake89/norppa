# norppa

Gives the closest P2P Nordvpn server or server of your choice. The same one that this site would give: https://nordvpn.com/servers/tools

You can give two letter country code id. E.g. Finland would be fi and United States of America would be us. Currently only Finland, Sweden, Norway, Denmark, US and UK are supported. Please post an issue if you want your country added.

## Installation

`npm install -g norppa`

## Usage

```
$ norppa
fi101.nordvpn.com
```

### More usage

```
$ norppa --help
Usage: norppa [options]

Options:
  -V, --version                      output the version number
  -i, --country-id <country-id>      Get NordVPN server for country ID
  -s, --set-default-id <country-id>  Set default country ID
  -r, --remove-default-id            Removes default country ID. Will get closest server instead.
  -v, --verbose                      Verbose
  -h, --help                         output usage information
```
