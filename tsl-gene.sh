#!/usr/bin/env bash

#mkdir tsl

openssl genrsa -out ./tsl/server-key.pem 4096
openssl req -new -key ./tsl/server-key.pem -out ./tsl/server-csr.pem
openssl x509 -req -in ./tsl/server-csr.pem -signkey ./tsl/server-key.pem -out ./tsl/server-cert.pem
