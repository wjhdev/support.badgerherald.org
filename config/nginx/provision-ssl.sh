#!/bin/bash
#
# Shell script for generating self-signed cert for Vagrant
#



# Check if the domain name ends in ".test" or is "localhost" and generate our own self-signed certificate
if [[ $1 =~ \.test$ ]] || [ $1 == "localhost" ]; then
    cd /tmp/
    # Define the SSL certificate and key paths
    CERT_PATH="/etc/letsencrypt/live/support.badgerherald.org/fullchain.pem"
    KEY_PATH="/etc/letsencrypt/live/support.badgerherald.org/privkey.pem"
    
    DOMAIN=$1
    if [ -z "$DOMAIN" ]; then
      echo "Usage: $(basename $0) <domain>"
      exit 11
    fi
    fail_if_error() {
      [ $1 != 0 ] && {
        unset PASSPHRASE
        exit 10
      }
    }
    # Generate a passphrase
    export PASSPHRASE=$(head -c 500 /dev/urandom | tr -dc a-z0-9A-Z | head -c 128; echo)
    # Certificate details; replace items in angle brackets with your own info
    subj="/C=US/ST=WI/O=localhost/localityName=Madison/commonName=$DOMAIN/organizationalUnitName=The Badger Herald Alumni Association/emailAddress=alumni@badgerherald.com"
    # Generate the server private key
    openssl genrsa -des3 -out $DOMAIN.key -passout env:PASSPHRASE 2048
    fail_if_error $?
    # Generate the CSR
    openssl req \
        -new \
        -batch \
        -subj "$(echo -n "$subj" | tr "\n" "/")" \
        -key $DOMAIN.key \
        -out $DOMAIN.csr \
        -passin env:PASSPHRASE

    # Strip the password so we don't have to type it every time we restart nginx
    openssl rsa -in $DOMAIN.key -out $DOMAIN.key -passin env:PASSPHRASE
    # Generate the cert (good for 10 years)
    openssl x509 -req -days 3650 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt

    mkdir -p /etc/letsencrypt/live/support.badgerherald.org/
    
    # Move the key and cert to their appropriate locations
    mv $1.key $KEY_PATH
    mv $1.crt $CERT_PATH
    
else
    echo "Generating LetsEncrypt certificate for $1"
    
    # Generate LetsEncrypt certificate using certbot
    certbot certonly --webroot --webroot-path=/var/www/html -d $1 --non-interactive --agree-tos --email will@broadsheet.technology
fi