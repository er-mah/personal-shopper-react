# Personal shopper - React.js
## Requirements
- node v16.15.1
- npm v8.11.0

## AWS
- `npm run build`
- `cd /var/www/cotizador.ar.techmo.global/`
- `sudo rm -r html/`
- `sudo mkdir html`
- `sudo cp -r /home/ubuntu/client/personal-shopper-react/build/* /var/www/cotizador.ar.techmo.global/html/`
- `sudo systemctl restart nginx`