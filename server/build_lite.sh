#!/bin/sh
 
go build -ldflags "-w" -o wfs_server wfs_server_lite.go wfs_websockets_hub.go
mv ./wfs_server ../demo/
