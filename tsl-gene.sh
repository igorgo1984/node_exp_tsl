#!/usr/bin/env bash

#mkdir tsl
echo "[+] Generating public and private keys pair (.key)..."
openssl genrsa -out ./tsl/server-key.pem 4096

openssl req -new -key ./tsl/server-key.pem -out ./tsl/server-csr.pem

echo -e "\n[>] Certificate's dump:"
openssl x509 -req -in ./tsl/server-csr.pem -signkey ./tsl/server-key.pem -out ./tsl/server-cert.pem

echo "[+] Generating a self-signed x509 CA's certificate (.crt)..."
openssl req -new -key $FILENAME.key -x509 -sha256 -days 3600 -out $FILENAME.crt

#echo "[+] Generating the PEM file out of the key and certificate files..."
#cat $FILENAME.key $FILENAME.crt > $FILENAME.pem
